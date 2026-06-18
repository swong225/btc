import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import * as path from 'path';

export class BtcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ─── VPC ────────────────────────────────────────────────────────────
    const vpc = new ec2.Vpc(this, 'BtcVpc', {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: 'Isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // ─── RDS PostgreSQL ─────────────────────────────────────────────────
    const database = new rds.DatabaseInstance(this, 'BtcDatabase', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_15,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      credentials: rds.Credentials.fromGeneratedSecret('btcadmin', {
        secretName: 'btc/db-credentials',
      }),
      databaseName: 'btc',
      allocatedStorage: 20,
      maxAllocatedStorage: 50,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
    });

    // ─── ECS Cluster ────────────────────────────────────────────────────
    const cluster = new ecs.Cluster(this, 'BtcCluster', { vpc });

    // ─── Internal ALB (single entry point) ──────────────────────────────
    const alb = new elbv2.ApplicationLoadBalancer(this, 'BtcAlb', {
      vpc,
      internetFacing: false,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    const listener = alb.addListener('HttpListener', {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
    });

    // ─── Backend Service ────────────────────────────────────────────────
    const backendImage = new ecr_assets.DockerImageAsset(this, 'BackendImage', {
      directory: path.join(__dirname, '../../btc-backend'),
    });

    const backendTaskDef = new ecs.FargateTaskDefinition(this, 'BackendTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    backendTaskDef.addContainer('backend', {
      image: ecs.ContainerImage.fromDockerImageAsset(backendImage),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'btc-backend',
        logRetention: logs.RetentionDays.ONE_WEEK,
      }),
      environment: {
        PORT: '3001',
        POSTGRES_HOST: database.dbInstanceEndpointAddress,
        POSTGRES_PORT: database.dbInstanceEndpointPort,
        POSTGRES_DB: 'btc',
        NODE_ENV: 'production',
      },
      secrets: {
        POSTGRES_USER: ecs.Secret.fromSecretsManager(database.secret!, 'username'),
        POSTGRES_PASSWORD: ecs.Secret.fromSecretsManager(database.secret!, 'password'),
      },
      portMappings: [{ containerPort: 3001 }],
    });

    const backendService = new ecs.FargateService(this, 'BackendService', {
      cluster,
      taskDefinition: backendTaskDef,
      desiredCount: 1,
      assignPublicIp: false,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    database.connections.allowDefaultPortFrom(backendService);

    // Backend target group — routes /order/*, /bag/*, /user/*
    listener.addTargets('BackendTarget', {
      port: 3001,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [backendService],
      priority: 10,
      conditions: [
        elbv2.ListenerCondition.pathPatterns(['/order/*', '/bag/*', '/user/*']),
      ],
      healthCheck: {
        path: '/',
        interval: cdk.Duration.seconds(60),
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 5,
      },
    });

    // ─── Frontend Service ───────────────────────────────────────────────
    // Build frontend with REACT_APP_BACKEND_URL pointing to empty string
    // so axios calls go to same origin (the ALB). The ALB routes API paths to backend.
    const frontendImage = new ecr_assets.DockerImageAsset(this, 'FrontendImage', {
      directory: path.join(__dirname, '../../btc-frontend'),
      buildArgs: {
        REACT_APP_BACKEND_URL: '',
      },
    });

    const frontendTaskDef = new ecs.FargateTaskDefinition(this, 'FrontendTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    frontendTaskDef.addContainer('frontend', {
      image: ecs.ContainerImage.fromDockerImageAsset(frontendImage),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'btc-frontend',
        logRetention: logs.RetentionDays.ONE_WEEK,
      }),
      portMappings: [{ containerPort: 80 }],
    });

    const frontendService = new ecs.FargateService(this, 'FrontendService', {
      cluster,
      taskDefinition: frontendTaskDef,
      desiredCount: 1,
      assignPublicIp: false,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    // Frontend is the default target (catch-all)
    listener.addTargets('FrontendTarget', {
      port: 80,
      targets: [frontendService],
      healthCheck: {
        path: '/health',
        interval: cdk.Duration.seconds(60),
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 5,
      },
    });

    // ─── Outputs ────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'AppUrl', {
      value: `http://${alb.loadBalancerDnsName}`,
      description: 'Application URL (internal — reachable from within VPC or via VPN)',
    });

    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: database.dbInstanceEndpointAddress,
      description: 'RDS PostgreSQL endpoint',
    });

    new cdk.CfnOutput(this, 'DatabaseSecretArn', {
      value: database.secret!.secretArn,
      description: 'Secrets Manager ARN for DB credentials',
    });
  }
}
