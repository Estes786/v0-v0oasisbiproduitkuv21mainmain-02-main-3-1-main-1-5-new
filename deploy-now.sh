#!/bin/bash

# ============================================================================
# QUICK DEPLOYMENT SCRIPT FOR DUITKU EDGE FUNCTIONS
# ============================================================================
# This script deploys both edge functions to Supabase production
# ============================================================================

set -e

echo "🚀 Deploying Duitku Edge Functions"
echo "===================================="
echo ""

# Add supabase to PATH
export PATH="/home/user/.local/bin:$PATH"

# Verify supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found"
    echo "   Install it first: ./install-supabase-cli.sh"
    exit 1
fi

echo "✅ Supabase CLI found: $(supabase --version)"
echo ""

# Check if access token is set
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "⚠️  SUPABASE_ACCESS_TOKEN not set"
    echo ""
    echo "📝 To get your access token:"
    echo "   1. Go to: https://app.supabase.com/account/tokens"
    echo "   2. Click 'Generate new token'"
    echo "   3. Copy the token"
    echo "   4. Run: export SUPABASE_ACCESS_TOKEN=your_token_here"
    echo ""
    echo "Or run this script with token:"
    echo "   SUPABASE_ACCESS_TOKEN=your_token ./deploy-now.sh"
    echo ""
    exit 1
fi

echo "✅ Access token found"
echo ""

# Project reference
PROJECT_REF="qjzdzkdwtsszqjvxeiqv"

cd /home/user/webapp

# Check if project is already linked
if [ ! -f ".supabase/config.toml" ]; then
    echo "🔗 Linking project..."
    supabase link --project-ref $PROJECT_REF
    
    if [ $? -eq 0 ]; then
        echo "✅ Project linked successfully"
    else
        echo "❌ Failed to link project"
        echo "   Try logging in first: supabase login"
        exit 1
    fi
else
    echo "✅ Project already linked"
fi

echo ""

# Deploy duitku-checkout
echo "📦 Deploying duitku-checkout..."
supabase functions deploy duitku-checkout --no-verify-jwt

if [ $? -eq 0 ]; then
    echo "✅ duitku-checkout deployed successfully"
else
    echo "❌ Failed to deploy duitku-checkout"
    exit 1
fi

echo ""

# Deploy duitku-callback
echo "📦 Deploying duitku-callback..."
supabase functions deploy duitku-callback --no-verify-jwt

if [ $? -eq 0 ]; then
    echo "✅ duitku-callback deployed successfully"
else
    echo "❌ Failed to deploy duitku-callback"
    exit 1
fi

echo ""
echo "===================================="
echo "✅ Deployment Completed!"
echo ""
echo "🔗 Function URLs:"
echo "   Checkout:  https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout"
echo "   Callback:  https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback"
echo ""
echo "🧪 Test with:"
echo "   curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout"
echo "   curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback"
echo ""
echo "📝 Or run automated tests:"
echo "   node test-edge-functions.js"
echo ""
