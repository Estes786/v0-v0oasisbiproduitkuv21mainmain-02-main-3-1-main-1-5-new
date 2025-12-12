#!/bin/bash

# ============================================================================
# DEPLOY DUITKU EDGE FUNCTIONS TO SUPABASE PRODUCTION
# ============================================================================
# This script deploys duitku-checkout and duitku-callback functions
# to Supabase production with all necessary environment secrets
# ============================================================================

set -e  # Exit on error

echo "🚀 Deploying Duitku Edge Functions to Supabase"
echo "=============================================="
echo ""

# Project reference
PROJECT_REF="qjzdzkdwtsszqjvxeiqv"

# Check if we need to link first
echo "📌 Checking project link..."
if [ ! -f ".supabase/config.toml" ]; then
  echo "⚠️  Project not linked. Please login and link first:"
  echo "   npx supabase login"
  echo "   npx supabase link --project-ref $PROJECT_REF"
  exit 1
fi

echo "✅ Project linked"
echo ""

# Deploy duitku-checkout function
echo "📦 Deploying duitku-checkout..."
npx supabase functions deploy duitku-checkout --no-verify-jwt

if [ $? -eq 0 ]; then
  echo "✅ duitku-checkout deployed successfully"
else
  echo "❌ Failed to deploy duitku-checkout"
  exit 1
fi
echo ""

# Deploy duitku-callback function
echo "📦 Deploying duitku-callback..."
npx supabase functions deploy duitku-callback --no-verify-jwt

if [ $? -eq 0 ]; then
  echo "✅ duitku-callback deployed successfully"
else
  echo "❌ Failed to deploy duitku-callback"
  exit 1
fi
echo ""

# Set environment secrets
echo "🔐 Setting environment secrets..."
echo "⚠️  Note: You need to set these secrets manually using Supabase dashboard or CLI:"
echo ""
echo "Required secrets:"
echo "  - ENVIRONMENT=production"
echo "  - DUITKU_MERCHANT_CODE=D20919"
echo "  - DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb"
echo "  - DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback"
echo "  - DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success"
echo "  - SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co"
echo "  - SUPABASE_SERVICE_ROLE_KEY=eyJhbGc..."
echo ""
echo "To set secrets:"
echo "  npx supabase secrets set ENVIRONMENT=production"
echo "  npx supabase secrets set DUITKU_MERCHANT_CODE=D20919"
echo "  # ... etc"
echo ""

echo "=============================================="
echo "✅ Deployment completed!"
echo ""
echo "🔗 Function URLs:"
echo "   Checkout:  https://$PROJECT_REF.supabase.co/functions/v1/duitku-checkout"
echo "   Callback:  https://$PROJECT_REF.supabase.co/functions/v1/duitku-callback"
echo ""
echo "📝 Next steps:"
echo "   1. Set environment secrets (see above)"
echo "   2. Test with: node test-edge-functions.js"
echo "   3. Configure callback URL in Duitku dashboard"
echo ""
