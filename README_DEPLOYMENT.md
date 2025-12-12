# 🚀 URGENT: HTTP 405 Fix - Ready for Deployment

## 🎯 Quick Start (5 Minutes)

**Problem:** Edge functions return 405 error  
**Solution:** Code fixed and ready to deploy  
**Action Required:** Deploy to production NOW

---

## ⚡ FASTEST Deployment Method

### Step 1: Open Supabase Dashboard
Click here: https://app.supabase.com/project/qjzdzkdwtsszqjvxeiqv/functions

### Step 2: Deploy duitku-checkout
1. Click on **"duitku-checkout"** function
2. Click **"Deploy new version"** button  
3. Upload file: **Browse to your local copy → `supabase/functions/duitku-checkout/index.ts`**
4. **IMPORTANT:** Uncheck "Verify JWT" ⚠️
5. Click **"Deploy"**
6. Wait 30 seconds

### Step 3: Deploy duitku-callback  
1. Click on **"duitku-callback"** function
2. Click **"Deploy new version"** button
3. Upload file: **Browse to your local copy → `supabase/functions/duitku-callback/index.ts`**  
4. **IMPORTANT:** Uncheck "Verify JWT" ⚠️
5. Click **"Deploy"**
6. Wait 30 seconds

### Step 4: Test (30 seconds)
```bash
# Open terminal and run:
curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout
curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback

# Both should return 200 OK with JSON response (NOT 405!)
```

Or open in browser:
- https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout
- https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback

**Expected Result:** JSON response with "success": true (NOT 405 error!)

---

## 📋 What Was Fixed

### Before (Current Production - BROKEN):
```
GET → 405 Method Not Allowed ❌
```

### After (New Code - FIXED):
```
GET → 200 OK with health check info ✅
POST → Payment processing (still works) ✅
```

### Files Modified:
- ✅ `supabase/functions/duitku-callback/index.ts`
- ✅ `supabase/functions/duitku-checkout/index.ts`

### Changes:
- ✅ Added GET endpoint support
- ✅ Returns health check JSON instead of 405
- ✅ POST still works for payments
- ✅ All local tests passing

---

## 🧪 Verification Checklist

After deployment, verify:

- [ ] **Test 1:** Open https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout in browser
  - Should show JSON (NOT 405 error)
  
- [ ] **Test 2:** Open https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback in browser
  - Should show JSON (NOT 405 error)
  
- [ ] **Test 3:** Run automated test
  ```bash
  cd /home/user/webapp
  ./test-production.sh
  ```
  - Should show: "🎉 ALL TESTS PASSED!"
  
- [ ] **Test 4:** Create test payment
  - Go to website
  - Select plan
  - Complete checkout
  - Verify payment works
  
- [ ] **Test 5:** Check callback
  - After payment
  - Check Supabase logs
  - Verify callback received

---

## 📁 File Locations

If you need to manually copy files:

**Checkout Function:**
```
Local: /home/user/webapp/supabase/functions/duitku-checkout/index.ts
GitHub: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/blob/main/supabase/functions/duitku-checkout/index.ts
```

**Callback Function:**
```
Local: /home/user/webapp/supabase/functions/duitku-callback/index.ts
GitHub: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/blob/main/supabase/functions/duitku-callback/index.ts
```

---

## 🔧 Alternative: CLI Deployment

If you prefer CLI:

```bash
# Get access token from: https://app.supabase.com/account/tokens
export SUPABASE_ACCESS_TOKEN=your_token_here

# Run deployment script
cd /home/user/webapp
./deploy-now.sh

# Or manually:
supabase login
supabase link --project-ref qjzdzkdwtsszqjvxeiqv
supabase functions deploy duitku-checkout --no-verify-jwt
supabase functions deploy duitku-callback --no-verify-jwt
```

---

## 📊 Expected Results

### Test Output (After Deployment):
```bash
$ ./test-production.sh

🧪 Testing Production Edge Functions
======================================

🔍 Test 1: Checkout GET (Health Check)
Response Code: 200 ✅
Response Body:
{
  "success": true,
  "message": "Duitku Checkout endpoint is running",
  "version": "3.0",
  ...
}

🔍 Test 2: Callback GET (Health Check)  
Response Code: 200 ✅
Response Body:
{
  "success": true,
  "message": "Duitku Callback endpoint is running",
  "version": "3.0",
  ...
}

🎉 ALL TESTS PASSED!
```

---

## 🆘 Troubleshooting

### Still seeing 405 after deployment?
1. Wait 1-2 minutes (cache clearing)
2. Hard refresh browser (Ctrl+Shift+R)
3. Check function version in dashboard
4. Re-deploy if needed

### Deployment failed?
1. Check you unchecked "Verify JWT"
2. Verify you uploaded correct file
3. Check for TypeScript errors
4. View deployment logs

### Can't access dashboard?
1. Check you're logged into correct account
2. Verify project permissions
3. Use CLI method instead

---

## 📞 Support Files

All documentation available:
- **This file:** Quick deployment guide
- **FIX_SUMMARY.md:** Complete problem analysis  
- **DEPLOY_INSTRUCTIONS.md:** Detailed deployment steps
- **test-production.sh:** Automated testing
- **deploy-now.sh:** CLI deployment script

---

## ✅ Success Criteria

Deployment is successful when:
1. ✅ No 405 errors on GET requests
2. ✅ Both endpoints return 200 OK
3. ✅ Health check JSON visible
4. ✅ POST payments still work
5. ✅ Callbacks received
6. ✅ Transactions complete successfully

---

## 🎉 After Deployment

Once deployed successfully:

1. **Test immediately** - Run `./test-production.sh`
2. **Verify in browser** - Open both endpoint URLs
3. **Test payment flow** - Create test transaction
4. **Monitor logs** - Check for any errors
5. **Celebrate** - Fix is live! 🎊

---

**Time to Deploy:** ~5 minutes  
**Time to Test:** ~2 minutes  
**Total Time:** ~7 minutes  

**LET'S DO THIS!** 🚀

---

**Last Updated:** 2025-12-12  
**Status:** ⏳ Awaiting Deployment  
**Code Status:** ✅ Fixed and Ready
