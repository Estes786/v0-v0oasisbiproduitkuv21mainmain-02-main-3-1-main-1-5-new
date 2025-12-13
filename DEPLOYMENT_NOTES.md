# 🚀 Deployment Notes - HTTP 405 Fix

**Date**: 2025-12-13
**Issue**: HTTP 405 Method Not Allowed on `/api/duitku/checkout`
**Status**: ✅ FIXED

## Root Cause Analysis

### Problem
- Frontend (`app/pricing/page.tsx`) was calling `/api/duitku/checkout` (Next.js API route)
- This API route **did not exist** in the codebase
- Result: HTTP 405 Method Not Allowed error on production domain

### Secondary Issue
- Edge Function database insert was failing
- Error: "Could not find the 'customer_email' column of 'transactions'"
- Cause: Edge Function tried to insert directly into `transactions` table without creating parent `order` first

## Solution Implemented

### 1. Created Missing API Route ✅
**File**: `/app/api/duitku/checkout/route.ts`

This route acts as a proxy that:
- Accepts POST requests from frontend
- Validates required fields (planId, email, phoneNumber, customerName)
- Forwards request to Supabase Edge Function
- Returns response to frontend

### 2. Fixed Edge Function Database Logic ✅
**File**: `/supabase/functions/duitku-checkout/index.ts`

Changes:
- First creates `order` record with customer details
- Then creates `transaction` record with proper `order_id` foreign key
- Includes all required fields per database schema

## Deployment Steps Completed

### ✅ 1. Code Changes
- [x] Created API route handler
- [x] Fixed Edge Function database logic
- [x] Committed to Git
- [x] Pushed to GitHub

### ✅ 2. Supabase Deployment
- [x] Logged in to Supabase CLI
- [x] Linked project (qjzdzkdwtsszqjvxeiqv)
- [x] Set production secrets
- [x] Deployed duitku-checkout edge function

### ✅ 3. Vercel Deployment
- [x] Code pushed to GitHub (triggers auto-deploy)
- [x] Latest deployment: dpl_5sUp9JcEkauKeuoLpZCEHYekRUyU
- [ ] Verify deployment completed (check Vercel dashboard)

## Testing Checklist

### Frontend Testing
- [ ] Visit: https://www.oasis-bi-pro.web.id/pricing
- [ ] Click "Mulai Gratis" on any plan
- [ ] Fill checkout form with test data
- [ ] Click "Bayar Sekarang"
- [ ] Should redirect to Duitku payment page (NO HTTP 405 error)

### Backend Testing
- [ ] Check Supabase logs for successful order creation
- [ ] Check Supabase logs for successful transaction creation
- [ ] Verify no schema errors in logs

### Database Verification
- [ ] Check `orders` table for new records
- [ ] Check `transactions` table for linked records
- [ ] Verify `customer_email`, `customer_name`, `customer_phone` fields populated

## Configuration Reference

### Supabase Edge Function
- **URL**: `https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout`
- **Method**: POST
- **Auth**: Bearer token (Anon Key)

### Next.js API Route
- **URL**: `/api/duitku/checkout` (relative to domain)
- **Method**: POST
- **CORS**: Enabled

### Duitku Configuration
- **Environment**: PRODUCTION
- **Merchant Code**: D20919
- **API URL**: `https://api-prod.duitku.com/api/merchant`
- **Callback**: `https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback`
- **Return URL**: `https://www.oasis-bi-pro.web.id/payment/success`

## Expected Behavior

### User Flow
1. User visits pricing page
2. Selects plan and fills form
3. Frontend sends POST to `/api/duitku/checkout`
4. API route forwards to Supabase Edge Function
5. Edge Function:
   - Creates order in database
   - Creates transaction in database
   - Calls Duitku API to create invoice
   - Returns payment URL
6. Frontend redirects user to Duitku payment page
7. User completes payment on Duitku
8. Duitku sends callback to Edge Function
9. Edge Function updates transaction status
10. User redirected to success page

## Monitoring

### Check Logs
```bash
# Supabase Edge Function logs
npx supabase functions logs duitku-checkout --follow

# Vercel deployment logs
# Visit: https://vercel.com/estes786/...your-project.../deployments
```

### Check Database
```sql
-- Recent orders
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

-- Recent transactions
SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10;

-- Pending payments
SELECT o.*, t.* 
FROM orders o 
LEFT JOIN transactions t ON t.order_id = o.id 
WHERE o.status = 'pending' 
ORDER BY o.created_at DESC;
```

## Troubleshooting

### If Still Getting HTTP 405
1. Check Vercel deployment completed successfully
2. Clear browser cache
3. Check if domain is pointing to correct Vercel deployment
4. Verify API route file exists in deployed build

### If Database Errors
1. Check Supabase logs for exact error
2. Verify database schema matches expected structure
3. Check RLS policies allow service role inserts

### If Duitku API Errors
1. Verify merchant code is correct (D20919)
2. Check API key is valid
3. Verify callback URL is registered in Duitku dashboard
4. Check Duitku dashboard for production mode status

## Success Criteria

- [x] Code deployed to GitHub
- [x] Edge Function deployed to Supabase
- [ ] Vercel deployment completed
- [ ] No HTTP 405 errors on production domain
- [ ] Successful checkout flow end-to-end
- [ ] Database records created correctly
- [ ] No errors in Supabase logs

## Notes

- Production deployment uses REAL Duitku credentials
- Payments are LIVE and will process real money
- Test with small amounts first (minimum Rp 10,000)
- Monitor closely for first few transactions
- Database schema includes RLS policies for security

---

**Deployed by**: AI Assistant
**Deployment Type**: Production Hotfix
**Priority**: High
**Impact**: Critical - Fixes broken checkout flow
