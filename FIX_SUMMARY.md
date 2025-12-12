# 🎯 HTTP 405 Error - Fix Summary & Deployment Guide

## 📋 Executive Summary

**Problem:** Edge functions return `HTTP 405 Method Not Allowed` when accessed via GET request (browser, health checks, Duitku testing)

**Root Cause:** Functions only accepted POST requests, rejecting all GET requests with 405 error

**Solution:** Added GET endpoint support for health checks while maintaining POST for actual payment processing

**Status:** ✅ **Code Fixed & Pushed to GitHub** | ⏳ **Awaiting Production Deployment**

---

## 🔍 Problem Analysis

### Error Details
```json
{
  "event_message": "GET | 405 | https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout",
  "response": {
    "status_code": 405,
    "body": {
      "success": false,
      "error": "Method not allowed"
    }
  }
}
```

### Impact
- ❌ Browser testing fails
- ❌ Health checks fail
- ❌ Duitku endpoint validation might fail
- ❌ Poor user experience when accessing URLs directly

---

## ✅ Solution Implemented

### Changes Made

#### 1. **duitku-callback/index.ts**
```typescript
// Added GET handler before POST check
if (req.method === 'GET') {
  console.log('🔍 GET request received (health check)')
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Duitku Callback endpoint is running',
      version: '3.0',
      environment: ENVIRONMENT,
      mode: IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX',
      acceptedMethods: ['POST'],
      usage: 'POST payment callback data to this endpoint'
    }),
    { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  )
}
```

#### 2. **duitku-checkout/index.ts**
```typescript
// Added GET handler before POST check
if (req.method === 'GET') {
  console.log('🔍 GET request received (health check)')
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Duitku Checkout endpoint is running',
      version: '3.0',
      environment: ENVIRONMENT,
      mode: IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX',
      acceptedMethods: ['POST'],
      usage: 'POST checkout data: { planId, email, phoneNumber, customerName }',
      availablePlans: Object.keys(PLANS)
    }),
    { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  )
}
```

#### 3. **Updated CORS Headers**
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'  // Added GET
}
```

### Testing Results

✅ **Local Logic Tests: ALL PASSED**
```
Test 1: Callback GET   → ✅ 200 OK
Test 2: Callback POST  → ✅ 200 OK  
Test 3: Checkout GET   → ✅ 200 OK
Test 4: Checkout POST  → ✅ 200 OK
```

⏳ **Production Tests: PENDING DEPLOYMENT**
```
Test 1: Checkout GET   → ❌ 405 (Old version still deployed)
Test 2: Callback GET   → ❌ 405 (Old version still deployed)
```

---

## 🚀 Deployment Instructions

### Option 1: Supabase Dashboard (RECOMMENDED - Easiest)

1. **Login to Supabase**
   - URL: https://app.supabase.com/project/qjzdzkdwtsszqjvxeiqv/functions

2. **Deploy duitku-checkout**
   - Click "duitku-checkout" → "Deploy new version"
   - Upload: `supabase/functions/duitku-checkout/index.ts`
   - Verify JWT: **OFF** ⚠️
   - Click "Deploy"
   - Wait ~30 seconds

3. **Deploy duitku-callback**
   - Click "duitku-callback" → "Deploy new version"
   - Upload: `supabase/functions/duitku-callback/index.ts`
   - Verify JWT: **OFF** ⚠️
   - Click "Deploy"
   - Wait ~30 seconds

4. **Verify Deployment**
   ```bash
   # Run from project root
   ./test-production.sh
   ```
   
   Expected: Both tests should return ✅ 200 OK

### Option 2: Supabase CLI

```bash
# Get access token from: https://app.supabase.com/account/tokens
export SUPABASE_ACCESS_TOKEN=your_token_here

# Deploy
cd /home/user/webapp
./deploy-now.sh
```

### Option 3: GitHub Actions (Automated)

See `.github/workflows/deploy-functions.yml` (if created)

---

## 🧪 Post-Deployment Verification

### Step 1: Quick Health Check
```bash
# Test checkout endpoint
curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout

# Expected Response (200 OK):
# {
#   "success": true,
#   "message": "Duitku Checkout endpoint is running",
#   "version": "3.0",
#   ...
# }

# Test callback endpoint
curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback

# Expected Response (200 OK):
# {
#   "success": true,
#   "message": "Duitku Callback endpoint is running",
#   "version": "3.0",
#   ...
# }
```

### Step 2: Automated Test Suite
```bash
cd /home/user/webapp
./test-production.sh
```

Expected output:
```
✅ Test 1 PASSED: Checkout health check returns 200
✅ Test 2 PASSED: Callback health check returns 200

🎉 ALL TESTS PASSED!
```

### Step 3: Real Transaction Test

1. **Create Test Payment**
   ```bash
   node test-edge-functions.js
   # Answer 'yes' when prompted for POST test
   ```

2. **Or use frontend:**
   - Go to: https://www.oasis-bi-pro.web.id/payment
   - Select "Starter Plan" (Rp 50,000)
   - Fill customer details
   - Click "Bayar Sekarang"
   - Duitku Pop should appear
   - Complete payment
   - Verify status in database

3. **Check Logs**
   - Dashboard: https://app.supabase.com/project/qjzdzkdwtsszqjvxeiqv/functions
   - Select function → Logs tab
   - Look for success messages

---

## 📊 Expected Before/After Results

### BEFORE Fix (Current Production)
```
GET /duitku-checkout
→ 405 Method Not Allowed ❌

GET /duitku-callback  
→ 405 Method Not Allowed ❌

Browser Access
→ Error displayed ❌

Duitku Testing
→ Might fail ❌
```

### AFTER Fix (After Deployment)
```
GET /duitku-checkout
→ 200 OK + Health Info ✅

GET /duitku-callback
→ 200 OK + Health Info ✅

Browser Access
→ JSON info displayed ✅

Duitku Testing
→ Works properly ✅

POST /duitku-checkout
→ Creates payment ✅

POST /duitku-callback
→ Processes callback ✅
```

---

## 📁 Files Modified

```
Modified:
├── supabase/functions/duitku-callback/index.ts  (GET support added)
├── supabase/functions/duitku-checkout/index.ts  (GET support added)
├── package.json                                  (added supabase dev dep)
└── package-lock.json                            (updated)

Added:
├── test-local-functions.js      (Local logic tests)
├── test-edge-functions.js       (Production API tests)  
├── test-production.sh           (Quick health check)
├── deploy-now.sh               (Automated deployment)
├── DEPLOY_INSTRUCTIONS.md       (Full deployment guide)
└── FIX_SUMMARY.md              (This file)
```

---

## 🎯 Success Criteria

- [x] Code fixed and tested locally ✅
- [x] All local tests passing ✅
- [x] Changes pushed to GitHub ✅
- [ ] Deployed to production ⏳
- [ ] Production health checks return 200 ⏳
- [ ] Real transaction test successful ⏳
- [ ] Callback received and processed ⏳

---

## 🔧 Environment Variables (Already Set)

```bash
ENVIRONMENT=production
DUITKU_MERCHANT_CODE=D20919
DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (service role key)
```

---

## 📞 Support & Troubleshooting

### Issue: Still getting 405 after deployment
- Wait 1-2 minutes for cache to clear
- Hard refresh browser (Ctrl+Shift+R)
- Check function version in dashboard

### Issue: POST requests failing
- Verify environment variables are set
- Check function logs for errors
- Verify merchant code and API key

### Issue: Signature verification fails
- Ensure using correct production credentials
- Verify MD5 hash implementation
- Check Duitku documentation

---

## 📝 Git Commit

```bash
git log -1 --oneline
# d2ec70d Fix HTTP 405 error: Add GET endpoint support for health checks
```

**Commit SHA:** d2ec70d  
**Branch:** main  
**Remote:** https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new.git

---

## 🎉 Summary

✅ **Problem identified:** HTTP 405 on GET requests  
✅ **Root cause found:** Functions only accepted POST  
✅ **Solution implemented:** Added GET handler for health checks  
✅ **Code tested locally:** All tests passing  
✅ **Changes committed:** Pushed to GitHub  
⏳ **Next step:** Deploy to production  

**Deployment Time:** ~5 minutes via dashboard  
**Testing Time:** ~2 minutes  
**Total Fix Time:** ~15 minutes end-to-end  

---

**Last Updated:** 2025-12-12  
**Version:** 3.1 (HTTP 405 Fix)  
**Status:** ✅ Ready for Deployment
