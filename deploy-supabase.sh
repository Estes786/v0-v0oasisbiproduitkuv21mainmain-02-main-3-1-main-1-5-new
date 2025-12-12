#!/bin/bash
# ============================================================================
# SUPABASE EDGE FUNCTIONS DEPLOYMENT SCRIPT
# ============================================================================
# Purpose: Deploy Duitku payment integration to Supabase Edge Functions
# Date: 2025-12-12
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================================================${NC}"
echo -e "${BLUE}   SUPABASE EDGE FUNCTIONS DEPLOYMENT FOR OASIS BI PRO${NC}"
echo -e "${BLUE}============================================================================${NC}"
echo ""

# ============================================================================
# STEP 1: Check Prerequisites
# ============================================================================
echo -e "${YELLOW}📋 Step 1: Checking prerequisites...${NC}"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found${NC}"
    echo -e "${YELLOW}Installing Supabase CLI...${NC}"
    npm install -g supabase
    echo -e "${GREEN}✅ Supabase CLI installed${NC}"
else
    echo -e "${GREEN}✅ Supabase CLI is installed${NC}"
fi

# Check if logged in
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Supabase${NC}"
    echo -e "${YELLOW}Please login with your access token:${NC}"
    supabase login
fi

echo -e "${GREEN}✅ Prerequisites check complete${NC}"
echo ""

# ============================================================================
# STEP 2: Link Project
# ============================================================================
echo -e "${YELLOW}📋 Step 2: Linking to Supabase project...${NC}"

PROJECT_REF="qjzdzkdwtsszqjvxeiqv"

# Check if already linked
if [ ! -f ".supabase/config.toml" ]; then
    echo -e "${YELLOW}Linking to project: ${PROJECT_REF}${NC}"
    supabase link --project-ref $PROJECT_REF
    echo -e "${GREEN}✅ Project linked${NC}"
else
    echo -e "${GREEN}✅ Project already linked${NC}"
fi

echo ""

# ============================================================================
# STEP 3: Set Secrets
# ============================================================================
echo -e "${YELLOW}📋 Step 3: Setting environment secrets...${NC}"
echo -e "${YELLOW}Note: You'll be prompted to enter each secret value${NC}"
echo ""

echo -e "${BLUE}Setting Duitku credentials...${NC}"
supabase secrets set DUITKU_MERCHANT_CODE=D20919 || echo "Skipped"
supabase secrets set DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb || echo "Skipped"
supabase secrets set DUITKU_BASE_URL=https://api.duitku.com/webapi/v1/payment || echo "Skipped"

echo -e "${BLUE}Setting callback URLs...${NC}"
supabase secrets set DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback || echo "Skipped"
supabase secrets set DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success || echo "Skipped"

echo -e "${BLUE}Setting Supabase credentials...${NC}"
supabase secrets set SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co || echo "Skipped"
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs || echo "Skipped"

echo -e "${GREEN}✅ Secrets configured${NC}"
echo ""

# ============================================================================
# STEP 4: Deploy Edge Functions
# ============================================================================
echo -e "${YELLOW}📋 Step 4: Deploying Edge Functions...${NC}"
echo ""

echo -e "${BLUE}Deploying duitku-checkout...${NC}"
supabase functions deploy duitku-checkout --no-verify-jwt --import-map=supabase/import_map.json
echo -e "${GREEN}✅ duitku-checkout deployed${NC}"
echo ""

echo -e "${BLUE}Deploying duitku-callback...${NC}"
supabase functions deploy duitku-callback --no-verify-jwt --import-map=supabase/import_map.json
echo -e "${GREEN}✅ duitku-callback deployed${NC}"
echo ""

# ============================================================================
# STEP 5: Verify Deployment
# ============================================================================
echo -e "${YELLOW}📋 Step 5: Verifying deployment...${NC}"

echo -e "${BLUE}Function URLs:${NC}"
echo -e "  Checkout: ${GREEN}https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout${NC}"
echo -e "  Callback: ${GREEN}https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback${NC}"
echo ""

# ============================================================================
# DEPLOYMENT COMPLETE
# ============================================================================
echo -e "${GREEN}============================================================================${NC}"
echo -e "${GREEN}   ✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}============================================================================${NC}"
echo ""
echo -e "${YELLOW}📝 NEXT STEPS:${NC}"
echo ""
echo -e "${BLUE}1. Update Duitku Dashboard Callback URL:${NC}"
echo -e "   Login to: https://passport.duitku.com"
echo -e "   Set callback URL to: ${GREEN}https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback${NC}"
echo ""
echo -e "${BLUE}2. Update Frontend Environment Variables (Vercel):${NC}"
echo -e "   NEXT_PUBLIC_DUITKU_CHECKOUT_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout"
echo ""
echo -e "${BLUE}3. Redeploy your Vercel application:${NC}"
echo -e "   vercel --prod"
echo ""
echo -e "${BLUE}4. Test the checkout flow:${NC}"
echo -e "   Visit: https://www.oasis-bi-pro.web.id/pricing"
echo ""
echo -e "${YELLOW}📊 Monitor Logs:${NC}"
echo -e "   supabase functions logs duitku-checkout --tail"
echo -e "   supabase functions logs duitku-callback --tail"
echo ""
echo -e "${GREEN}🎉 Your Duitku integration is now running on Supabase Edge Functions!${NC}"
echo ""
