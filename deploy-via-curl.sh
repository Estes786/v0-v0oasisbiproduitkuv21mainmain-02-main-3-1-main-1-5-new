#!/bin/bash

# ============================================================================
# DEPLOY EDGE FUNCTIONS USING CURL (Direct Upload to Supabase)
# ============================================================================
# This uses the Supabase Management API to deploy functions directly
# Reference: https://supabase.com/docs/reference/cli/supabase-functions-deploy
# ============================================================================

set -e

echo "🚀 Deploying Edge Functions to Supabase via Curl"
echo "================================================"
echo ""

# Project details
PROJECT_REF="qjzdzkdwtsszqjvxeiqv"
SUPABASE_ACCESS_TOKEN="${SUPABASE_ACCESS_TOKEN:-}"

if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "❌ SUPABASE_ACCESS_TOKEN environment variable is required"
  echo "   Get your token from: https://app.supabase.com/account/tokens"
  echo ""
  echo "   Usage: SUPABASE_ACCESS_TOKEN=your_token ./deploy-via-curl.sh"
  exit 1
fi

echo "✅ Access token found"
echo ""

# Create deployment package for duitku-checkout
echo "📦 Packaging duitku-checkout..."
cd supabase/functions/duitku-checkout
tar -czf ../../../duitku-checkout.tar.gz index.ts
cd ../../..
echo "✅ duitku-checkout.tar.gz created"

# Create deployment package for duitku-callback
echo "📦 Packaging duitku-callback..."
cd supabase/functions/duitku-callback
tar -czf ../../../duitku-callback.tar.gz index.ts
cd ../../..
echo "✅ duitku-callback.tar.gz created"
echo ""

# Note: The actual deployment via Management API requires authentication
# and may have different endpoints. The standard way is using supabase CLI.

echo "⚠️  Note: Direct curl deployment to Supabase Management API requires"
echo "   proper authentication and endpoints. The recommended approach is:"
echo ""
echo "   1. Install Supabase CLI: npm install -g supabase"
echo "   2. Login: supabase login"
echo "   3. Link project: supabase link --project-ref $PROJECT_REF"
echo "   4. Deploy: supabase functions deploy duitku-checkout --no-verify-jwt"
echo "   5. Deploy: supabase functions deploy duitku-callback --no-verify-jwt"
echo ""
echo "   Alternative: Use Supabase Dashboard to upload functions manually"
echo "   Dashboard: https://app.supabase.com/project/$PROJECT_REF/functions"
echo ""

# Cleanup
rm -f duitku-checkout.tar.gz duitku-callback.tar.gz
echo "✅ Cleanup completed"
