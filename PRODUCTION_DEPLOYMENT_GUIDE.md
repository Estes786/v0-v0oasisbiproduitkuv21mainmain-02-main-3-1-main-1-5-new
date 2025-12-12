# 🚀 DUITKU PRODUCTION DEPLOYMENT GUIDE

## 📋 Overview

Panduan lengkap untuk migrasi dari **SANDBOX (Testing)** ke **PRODUCTION (Live Payment)** untuk integrasi Duitku Pop payment gateway.

**⚠️ WARNING:** Production mode akan memproses **PEMBAYARAN NYATA**. Pastikan semua konfigurasi benar sebelum deploy!

---

## 🎯 Prerequisites

Sebelum mulai, pastikan Anda memiliki:

- ✅ Akun Duitku yang sudah terverifikasi
- ✅ Merchant Code Production: `D20919`
- ✅ API Key Production: `17d9d5e20fbf4763a44c41a1e95cb7cb`
- ✅ Akses ke Supabase project: `qjzdzkdwtsszqjvxeiqv`
- ✅ Akses ke website: `https://www.oasis-bi-pro.web.id`
- ✅ Vercel account (untuk frontend deployment)

---

## 📊 SANDBOX vs PRODUCTION Differences

| Aspect | SANDBOX (Test) | PRODUCTION (Live) |
|--------|----------------|-------------------|
| **API Endpoint** | `https://api-sandbox.duitku.com/api/merchant` | `https://api-prod.duitku.com/api/merchant` |
| **Duitku Pop JS** | `https://app-sandbox.duitku.com/lib/js/duitku.js` | `https://app-prod.duitku.com/lib/js/duitku.js` |
| **Payment Page** | `https://app-sandbox.duitku.com/redirect_checkout?...` | `https://app-prod.duitku.com/redirect_checkout?...` |
| **Merchant Code** | Test merchant code | `D20919` (Production) |
| **API Key** | Test API key | `17d9d5e20fbf4763a44c41a1e95cb7cb` (Production) |
| **Transactions** | ✅ Dummy/simulated | ⚠️ REAL money |
| **Test Cards** | ✅ Dummy cards work | ❌ Only real cards |
| **Payment Flow** | Testing only | Real payment processing |

**Documentation:** https://docs.duitku.com/pop/en/

---

## 🔧 Step-by-Step Production Deployment

### **PHASE 1: Duitku Dashboard Configuration**

#### 1.1 Login ke Duitku Merchant Dashboard
```
URL: https://passport.duitku.com
Login dengan credentials Anda
```

#### 1.2 Select Production Project
1. Navigate to **My Projects**
2. Find project dengan Merchant Code: `D20919`
3. Pastikan project dalam **PRODUCTION mode** (bukan sandbox)
4. Verify API Key: `17d9d5e20fbf4763a44c41a1e95cb7cb`

#### 1.3 Configure Callback URL
```
Setting location: Project Settings → Callback Configuration
Callback URL: https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
Return URL: https://www.oasis-bi-pro.web.id/payment/success
```

**CRITICAL:** Callback URL harus **EXACT MATCH** dengan URL edge function Supabase!

#### 1.4 Verify Merchant Account Status
- ✅ Account status: **Active/Verified**
- ✅ Bank account linked
- ✅ Settlement configured
- ✅ Production mode enabled

---

### **PHASE 2: Supabase Edge Functions Deployment**

#### 2.1 Login ke Supabase CLI
```bash
cd /home/user/webapp

# Login (akan buka browser)
npx supabase login

# Link to project
npx supabase link --project-ref qjzdzkdwtsszqjvxeiqv
```

#### 2.2 Deploy Edge Functions
```bash
# Deploy duitku-checkout function
npx supabase functions deploy duitku-checkout --no-verify-jwt

# Deploy duitku-callback function
npx supabase functions deploy duitku-callback --no-verify-jwt

# Verify deployment
npx supabase functions list
```

**Expected Output:**
```
✓ duitku-checkout (deployed)
✓ duitku-callback (deployed)
```

#### 2.3 Set Environment Variables/Secrets
```bash
# CRITICAL: Set ENVIRONMENT to production
npx supabase secrets set ENVIRONMENT=production

# Duitku credentials
npx supabase secrets set DUITKU_MERCHANT_CODE=D20919
npx supabase secrets set DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb

# Callback & Return URLs
npx supabase secrets set DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
npx supabase secrets set DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success

# Supabase Service Role Key (untuk database access)
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs

# Verify all secrets set correctly
npx supabase secrets list
```

**Expected Output:**
```
NAME                          VALUE (REDACTED)
ENVIRONMENT                   pro***tion
DUITKU_MERCHANT_CODE          D20***
DUITKU_API_KEY                17d***7cb
DUITKU_CALLBACK_URL           https://qjzdzkdwtsszqjvxeiqv...
DUITKU_RETURN_URL             https://www.oasis-bi-pro.web.id...
SUPABASE_SERVICE_ROLE_KEY     eyJ***jAs
```

#### 2.4 Test Edge Functions
```bash
# Test duitku-checkout
curl -X POST https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I" \
  -d '{
    "planId": "professional",
    "email": "test@example.com",
    "phoneNumber": "081234567890",
    "customerName": "Test User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "reference": "DXXXXX...",
    "paymentUrl": "https://app-prod.duitku.com/redirect_checkout?reference=...",
    "orderId": "OASIS-...",
    "amount": 100000,
    "merchantCode": "D20919"
  }
}
```

---

### **PHASE 3: Frontend Deployment (Vercel)**

#### 3.1 Set Environment Variables in Vercel
Login ke Vercel dashboard: https://vercel.com

**Navigate to:** Project Settings → Environment Variables

**Add these variables for PRODUCTION environment:**

```bash
# Environment
NEXT_PUBLIC_ENVIRONMENT=production

# Duitku Production Configuration
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=D20919
NEXT_PUBLIC_DUITKU_API_URL=https://api-prod.duitku.com/api/merchant
NEXT_PUBLIC_DUITKU_CHECKOUT_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout
NEXT_PUBLIC_DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
NEXT_PUBLIC_DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I

# Website URL
NEXT_PUBLIC_SITE_URL=https://www.oasis-bi-pro.web.id
```

**IMPORTANT:** Set environment ke **Production** untuk setiap variable!

#### 3.2 Deploy to Vercel
```bash
cd /home/user/webapp

# Build project first
npm run build

# Deploy to production
vercel --prod

# Or push to main branch (if auto-deploy enabled)
git push origin main
```

#### 3.3 Verify Deployment
```bash
# Check deployment status
vercel ls

# Open production URL
vercel open
```

**Expected URL:** https://www.oasis-bi-pro.web.id

---

### **PHASE 4: Testing Production Flow**

#### 4.1 Pre-Flight Checks
Before testing with real money:

- [ ] ✅ Supabase edge functions deployed and running
- [ ] ✅ All environment variables set correctly
- [ ] ✅ Duitku dashboard callback URL configured
- [ ] ✅ Frontend deployed to Vercel
- [ ] ✅ Database tables exist (transactions, subscriptions)
- [ ] ✅ Backup database before testing

#### 4.2 Test Checkout Flow (WITHOUT Real Payment)
```bash
# Open browser
https://www.oasis-bi-pro.web.id/checkout?plan=starter

# Complete checkout form:
# - Name: Test User Production
# - Email: your-email@example.com
# - Phone: 081234567890

# Click "Proses Pembayaran"

# Expected behavior:
# 1. Duitku Pop overlay muncul
# 2. Pilih metode pembayaran
# 3. Halaman pembayaran Duitku production terbuka
# 4. JANGAN LAKUKAN PEMBAYARAN DULU!
# 5. Close halaman untuk cancel
```

#### 4.3 Monitor Logs
```bash
# Terminal 1: Watch Supabase logs (duitku-checkout)
npx supabase functions logs duitku-checkout --follow

# Terminal 2: Watch Supabase logs (duitku-callback)
npx supabase functions logs duitku-callback --follow

# Terminal 3: Check database
psql -h qjzdzkdwtsszqjvxeiqv.supabase.co -U postgres -d postgres
SELECT * FROM transactions ORDER BY created_at DESC LIMIT 5;
```

#### 4.4 Test Small Real Payment (OPTIONAL)
⚠️ **WARNING:** This will process REAL payment!

```bash
# Test dengan amount terkecil (Rp 10,000)
# Gunakan kartu kredit/debit REAL Anda
# Monitor logs real-time

# After payment SUCCESS:
# 1. Check Supabase logs (duitku-callback)
# 2. Check transactions table (status should be SUCCESS)
# 3. Check subscriptions table (should be activated)
# 4. Check Duitku dashboard (transaction should appear)
```

---

### **PHASE 5: Monitoring & Verification**

#### 5.1 Check Supabase Logs
```bash
# Real-time monitoring
npx supabase functions logs duitku-callback --follow

# View recent logs
npx supabase functions logs duitku-callback

# Filter for errors
npx supabase functions logs duitku-callback | grep ERROR
```

**Look for:**
- ✅ `✅ Payment SUCCESS (Result Code: 00)`
- ✅ `✅ Signature verified successfully (MD5)`
- ✅ `💾 Transaction updated`
- ✅ `🎉 Subscription activated successfully`

#### 5.2 Check Database
```sql
-- Check recent transactions
SELECT 
  order_id, 
  status, 
  amount, 
  customer_email, 
  created_at,
  payment_confirmed_at
FROM transactions 
ORDER BY created_at DESC 
LIMIT 10;

-- Check active subscriptions
SELECT 
  user_email, 
  plan_type, 
  status, 
  start_date, 
  end_date, 
  is_active
FROM subscriptions 
WHERE is_active = true
ORDER BY start_date DESC;
```

#### 5.3 Check Duitku Dashboard
Login: https://passport.duitku.com

**Navigate to:** Transactions → Transaction History

**Verify:**
- ✅ Transaction appears in dashboard
- ✅ Status matches database (SUCCESS/PENDING/FAILED)
- ✅ Amount correct
- ✅ Settlement scheduled

#### 5.4 Check Website Frontend
Test full user flow:

1. **Access checkout:** https://www.oasis-bi-pro.web.id/checkout?plan=professional
2. **Fill form:** Name, email, phone
3. **Select payment method**
4. **Complete payment** (if testing with real payment)
5. **Verify redirect:** Should go to `/payment/success`
6. **Check email:** Should receive confirmation (if configured)

---

## 🔐 Security Checklist

Before going live, ensure:

- [ ] ✅ `.env.production` NOT committed to Git
- [ ] ✅ API keys stored as Vercel/Supabase secrets (not hardcoded)
- [ ] ✅ Callback URL uses HTTPS (not HTTP)
- [ ] ✅ Signature verification enabled (MD5 for callback)
- [ ] ✅ CORS configured properly in edge functions
- [ ] ✅ Service role key only used server-side
- [ ] ✅ Rate limiting enabled (if available)
- [ ] ✅ Error logging configured
- [ ] ✅ Monitoring/alerts set up

---

## 🐛 Troubleshooting

### Problem: Edge Function Returns 500 Error
**Solution:**
```bash
# Check logs
npx supabase functions logs duitku-checkout

# Common causes:
# 1. Environment variables not set
# 2. Wrong API endpoint
# 3. Invalid API key
# 4. Supabase service role key missing

# Fix: Re-deploy with correct secrets
npx supabase secrets set ENVIRONMENT=production
npx supabase functions deploy duitku-checkout --no-verify-jwt
```

### Problem: Callback Not Received
**Solution:**
```bash
# 1. Check Duitku dashboard callback URL
#    Must be: https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback

# 2. Test callback manually
curl -X POST https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "merchantCode=D20919" \
  -d "amount=100000" \
  -d "merchantOrderId=TEST-123" \
  -d "signature=CALCULATE_MD5" \
  -d "resultCode=00"

# 3. Check callback logs
npx supabase functions logs duitku-callback --follow
```

### Problem: Signature Mismatch
**Solution:**
```bash
# Formula: MD5(merchantCode + amount + merchantOrderId + apiKey)
# Example:
# merchantCode: D20919
# amount: 100000
# merchantOrderId: OASIS-123
# apiKey: 17d9d5e20fbf4763a44c41a1e95cb7cb

# Concatenate: D20919100000OASIS-12317d9d5e20fbf4763a44c41a1e95cb7cb
# MD5 Hash: [calculate using online tool]

# Verify:
# 1. Check logs for signature comparison
# 2. Ensure API key correct in Supabase secrets
# 3. Test with MD5 calculator: https://www.md5hashgenerator.com/
```

### Problem: Duitku Pop JS Not Loading
**Solution:**
```javascript
// Check browser console for errors
// Verify script URL in page source:

// PRODUCTION (correct):
<script src="https://app-prod.duitku.com/lib/js/duitku.js"></script>

// SANDBOX (wrong for production):
<script src="https://app-sandbox.duitku.com/lib/js/duitku.js"></script>

// Fix: Ensure NEXT_PUBLIC_ENVIRONMENT=production in Vercel
```

---

## 📊 Production Monitoring Dashboard

### Real-Time Metrics to Monitor

1. **Transaction Success Rate**
   - Target: >95% success rate
   - Monitor: Supabase transactions table

2. **Callback Response Time**
   - Target: <500ms response
   - Monitor: Supabase function logs

3. **Payment Failures**
   - Alert on: Any signature mismatch
   - Monitor: Error logs in Supabase

4. **Database Performance**
   - Monitor: Query execution time
   - Alert on: Slow queries (>1s)

---

## 🎯 Post-Deployment Checklist

After successful production deployment:

- [ ] ✅ Test full payment flow with small amount
- [ ] ✅ Verify callback received and processed
- [ ] ✅ Confirm database updates correct
- [ ] ✅ Check subscription activation
- [ ] ✅ Test multiple payment methods
- [ ] ✅ Monitor for 24 hours
- [ ] ✅ Set up alerting for errors
- [ ] ✅ Document any issues encountered
- [ ] ✅ Train team on monitoring procedures
- [ ] ✅ Prepare rollback plan if needed

---

## 📚 Reference Links

- **Duitku Documentation:** https://docs.duitku.com/pop/en/
- **Duitku Dashboard:** https://passport.duitku.com
- **Supabase Dashboard:** https://supabase.com/dashboard/project/qjzdzkdwtsszqjvxeiqv
- **Vercel Dashboard:** https://vercel.com
- **Production Website:** https://www.oasis-bi-pro.web.id
- **GitHub Repository:** https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new

---

## 🆘 Support & Emergency Contacts

- **Duitku Support:** cs@duitku.com
- **Duitku Live Chat:** https://dashboard.duitku.com (dashboard)
- **Supabase Support:** https://supabase.com/support
- **Project Documentation:** `/home/user/webapp/DUITKU_CALLBACK_FIX_v2.md`

---

## ✅ Success Criteria

Production deployment is successful when:

1. ✅ Edge functions deployed and running
2. ✅ Environment variables all set to production
3. ✅ Real payment flow completes end-to-end
4. ✅ Callback received and processed correctly
5. ✅ Database updated with transaction data
6. ✅ Subscription activated automatically
7. ✅ Monitoring and logs working
8. ✅ No errors in production logs
9. ✅ Duitku dashboard shows transaction
10. ✅ User receives confirmation (frontend)

---

**Version:** 3.0 (Production Ready)  
**Date:** 2024-12-12  
**Status:** ✅ READY FOR PRODUCTION DEPLOYMENT  
**Environment:** 🔴 PRODUCTION (LIVE PAYMENTS)
