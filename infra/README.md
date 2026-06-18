# BTC Infrastructure (AWS CDK)

Deploys the Bubble Tea Company app to AWS using:
- **ECS Fargate** — containers for frontend and backend (no servers to manage)
- **RDS PostgreSQL 15** — managed database (t3.micro)
- **Internal ALB** — single entry point with path-based routing
- **VPC** — private networking, not publicly accessible

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  VPC                                                 │
│                                                      │
│   ┌──────────────────────────────────────────────┐  │
│   │  Internal ALB (port 80)                       │  │
│   │    /order/*, /bag/*, /user/* → Backend        │  │
│   │    /* (default)              → Frontend       │  │
│   └──────────────────────────────────────────────┘  │
│            │                        │                │
│   ┌────────┴──────┐     ┌──────────┴─────────┐     │
│   │  ECS Fargate  │     │   ECS Fargate      │     │
│   │  Backend:3001 │     │   Frontend:80      │     │
│   └───────┬───────┘     │   (nginx+react)    │     │
│           │              └────────────────────┘     │
│   ┌───────┴────────────┐                            │
│   │  RDS PostgreSQL    │                            │
│   │  (isolated subnet) │                            │
│   └────────────────────┘                            │
└─────────────────────────────────────────────────────┘
```

## Prerequisites

1. **Node.js 20+** — `brew install node@20`
2. **Docker** — Docker Desktop running
3. **AWS CLI** configured — `aws configure`
4. IAM permissions for: ECS, ECR, RDS, VPC, ELB, CloudFormation, Secrets Manager, CloudWatch Logs

## Deploy

From the repo root:

```bash
./deploy.sh
```

Or manually:

```bash
cd infra
npm install
npx cdk bootstrap    # first time only
npx cdk deploy
```

## Access

The ALB is internal-only. To reach the app you need to be inside the VPC:
- **VPN** (e.g., AWS Client VPN)
- **Bastion host** (SSH tunnel)
- **AWS Systems Manager Session Manager**

## Tear Down

```bash
cd infra
npx cdk destroy
```

## Costs (estimated)

| Resource | ~Monthly Cost |
|----------|--------------|
| NAT Gateway | $32 |
| RDS t3.micro | $13 |
| Fargate (2 tasks) | $15 |
| ALB | $16 |
| **Total** | **~$76/mo** |

To reduce costs, you could use a single public subnet with `assignPublicIp: true` on Fargate tasks (eliminates NAT Gateway).
