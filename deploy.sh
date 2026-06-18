#!/bin/bash
set -e

echo "=== BTC AWS Deployment ==="
echo ""

# Load nvm so node/npm/npx are available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 22 >/dev/null 2>&1 || true

# Check prerequisites
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Install it first."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Install Docker Desktop and make sure it's running."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is installed but not running. Start Docker Desktop first."
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Install Node.js first (e.g. 'nvm install 22')."
    exit 1
fi

# Verify AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run: aws configure"
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)

echo "📋 Deploying to account: $ACCOUNT_ID in region: $REGION"
echo ""

# Install CDK dependencies
cd infra
npm install

# Bootstrap CDK (only needed once per account/region)
echo "🔧 Bootstrapping CDK..."
npx cdk bootstrap aws://$ACCOUNT_ID/$REGION

# Deploy
echo "🚀 Deploying stack..."
npx cdk deploy --all --require-approval broadening

echo ""
echo "✅ Deployment complete! Check the outputs above for the internal ALB URL."
echo "   Note: The app is only accessible from within the VPC (via VPN, bastion, etc.)"
