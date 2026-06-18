#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BtcStack } from '../lib/btc-stack';

const app = new cdk.App();

new BtcStack(app, 'BtcStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
