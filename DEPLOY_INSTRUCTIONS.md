# 🚀 Deployment Instructions - Duitku Edge Functions

## ✅ Changes Made

We fixed the **HTTP 405 Method Not Allowed** error by adding GET endpoint support to both edge functions:

### Modified Files:
1. `supabase/functions/duitku-callback/index.ts`
2. `supabase/functions/duitku-checkout/index.ts`

### What Changed:
- ✅ Added GET method handler for health checks
- ✅ GET requests now return endpoint information instead of 405 error
- ✅ POST method still works for actual payment processing
- ✅ Updated CORS headers to include GET method
- ✅ Added test scripts for validation

## 📋 Pre-Deployment Checklist

- [x] Fix HTTP 405 error in edge functions
- [x] Test logic locally (all tests pass ✅)
- [x] Push changes to GitHub
- [ ] Deploy to Supabase Production
- [ ] Test live endpoints
- [ ] Perform real transaction test

## 🔧 Deployment Methods

### Method 1: Via Supabase Dashboard (RECOMMENDED)

This is the easiest method and doesn't require CLI authentication:

1. **Login to Supabase Dashboard**
   - Go to: https://app.supabase.com/project/qjzdzkdwtsszqjvxeiqv/functions

2. **Deploy duitku-checkout**
   - Click on "duitku-checkout" function
   - Click "Deploy new version"
   - Upload file: `supabase/functions/duitku-checkout/index.ts`
   - Set verify JWT: **OFF** (unchecked)
   - Click "Deploy"

3. **Deploy duitku-callback**
   - Click on "duitku-callback" function
   - Click "Deploy new version"
   - Upload file: `supabase/functions/duitku-callback/index.ts`
   - Set verify JWT: **OFF** (unchecked)
   - Click "Deploy"

4. **Verify Environment Variables**
   - Go to Settings > Edge Functions
   - Ensure these secrets are set:
     ```
     ENVIRONMENT=production
     DUITKU_MERCHANT_CODE=D20919
     DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
     DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
     DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
     SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (service role key)
     ```

### Method 2: Via Supabase CLI

**Prerequisites:**
- Supabase CLI installed
- Supabase access token

**Steps:**

1. **Get Access Token**
   - Go to: https://app.supabase.com/account/tokens
   - Click "Generate new token"
   - Copy the token

2. **Login to Supabase**
   ```bash
   export SUPABASE_ACCESS_TOKEN=your_token_here
   /home/user/.local/bin/supabase login
   ```

3. **Link Project**
   ```bash
   cd /home/user/webapp
   /home/user/.local/bin/supabase link --project-ref qjzdzkdwtsszqjvxeiqv
   ```

4. **Deploy Functions**
   ```bash
   # Deploy duitku-checkout
   /home/user/.local/bin/supabase functions deploy duitku-checkout --no-verify-jwt
   
   # Deploy duitku-callback
   /home/user/.local/bin/supabase functions deploy duitku-callback --no-verify-jwt
   ```

5. **Set Environment Secrets (if needed)**
   ```bash
   /home/user/.local/bin/supabase secrets set ENVIRONMENT=production
   /home/user/.local/bin/supabase secrets set DUITKU_MERCHANT_CODE=D20919
   /home/user/.local/bin/supabase secrets set DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
   # ... etc
   ```

### Method 3: Via GitHub Actions (Automated)

Create `.github/workflows/deploy-functions.yml`:

```yaml
name: Deploy Edge Functions

on:
  push:
    branches: [main]
    paths:
      - 'supabase/functions/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      
      - name: Deploy duitku-checkout
        run: supabase functions deploy duitku-checkout --no-verify-jwt
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_PROJECT_REF: qjzdzkdwtsszqjvxeiqv
      
      - name: Deploy duitku-callback
        run: supabase functions deploy duitku-callback --no-verify-jwt
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_PROJECT_REF: qjzdzkdwtsszqjvxeiqv
```

Then add `SUPABASE_ACCESS_TOKEN` to GitHub Secrets.

## 🧪 Testing After Deployment

### Test 1: Health Check (GET)

```bash
# Test checkout health
curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout

# Expected: 200 OK with health check info (NOT 405!)

# Test callback health
curl https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback

# Expected: 200 OK with health check info (NOT 405!)
```

### Test 2: Automated Test Script

```bash
cd /home/user/webapp
node test-edge-functions.js
```

This will test both GET and POST endpoints.

### Test 3: Real Payment Transaction

1. Go to your website payment page
2. Select a plan (e.g., Starter - Rp 50,000)
3. Fill in customer details
4. Click "Bayar Sekarang"
5. Duitku Pop should appear
6. Complete payment
7. Check transaction status in database
8. Verify callback was received

## 📊 Expected Results

### Before Fix:
- ❌ GET request to `/duitku-checkout` → **405 Method Not Allowed**
- ❌ GET request to `/duitku-callback` → **405 Method Not Allowed**
- ❌ Browser testing fails
- ❌ Duitku testing might fail

### After Fix:
- ✅ GET request to `/duitku-checkout` → **200 OK** with health check info
- ✅ GET request to `/duitku-callback` → **200 OK** with health check info
- ✅ POST request to `/duitku-checkout` → Creates payment invoice
- ✅ POST request to `/duitku-callback` → Processes payment notification
- ✅ Browser testing works
- ✅ Duitku testing works

## 🔍 Troubleshooting

### Issue: Still getting 405 after deployment
**Solution:** Clear cache, wait 1-2 minutes for deployment to propagate

### Issue: Functions not found
**Solution:** Verify deployment was successful in Supabase dashboard

### Issue: Environment variables not working
**Solution:** Check that all required secrets are set in Supabase dashboard

### Issue: Signature verification fails
**Solution:** Verify DUITKU_MERCHANT_CODE and DUITKU_API_KEY are correct

## 📞 Support

If you encounter any issues:
1. Check Supabase function logs: https://app.supabase.com/project/qjzdzkdwtsszqjvxeiqv/functions
2. Review error messages in browser console
3. Test with curl commands above
4. Check this documentation

## 🎯 Next Steps After Deployment

1. ✅ Verify both endpoints return 200 for GET requests
2. ✅ Test payment creation flow end-to-end
3. ✅ Verify callback is received and processed
4. ✅ Check transaction status in database
5. ✅ Test with real payment (small amount first!)
6. ✅ Configure Duitku dashboard callback URL if needed
7. ✅ Monitor logs for any errors

## 📝 Files Changed

```
Modified:
  - supabase/functions/duitku-callback/index.ts
  - supabase/functions/duitku-checkout/index.ts
  - package.json
  - package-lock.json

Added:
  - test-edge-functions.js
  - test-local-functions.js
  - deploy-functions.sh
  - DEPLOY_INSTRUCTIONS.md
```

## ✅ Commit Message

```
Fix HTTP 405 error: Add GET endpoint support for health checks

- Add GET method handler to both duitku-callback and duitku-checkout
- GET requests now return health check info instead of 405 error
- Maintain POST for actual payment processing
- Add test scripts for local and production testing
- Update CORS headers to allow GET method

This fixes the 405 Method Not Allowed error when accessing endpoints 
via browser or Duitku testing.
```

---

**Last Updated:** 2025-12-12  
**Status:** ✅ Code Fixed, Ready for Deployment  
**Version:** 3.1 (HTTP 405 Fix)
