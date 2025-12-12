# 🚀 SUPABASE EDGE FUNCTIONS - MANUAL DEPLOYMENT GUIDE

**Status:** ✅ **READY FOR DEPLOYMENT**  
**Date:** 2025-12-12  
**Project:** OASIS BI PRO - Duitku Payment Integration

---

## 📊 OVERVIEW

### Problem Yang Diselesaikan
**❌ Original Error:**
```
HTTP 405 - Method Not Allowed
Error: getaddrinfo ENOTFOUND api.duitku.com
- Vercel environment tidak bisa resolve DNS api.duitku.com
- Network restrictions di Vercel
```

### Solution
**✅ Migration to Supabase Edge Functions!**
- ✅ Runs on Deno Deploy (better network access)
- ✅ No DNS resolution issues
- ✅ Better reliability for external API calls
- ✅ Built-in database integration

---

## 🎯 EDGE FUNCTIONS YANG SUDAH DIBUAT

### 1. **duitku-checkout** (Create Payment)
**Path:** `supabase/functions/duitku-checkout/index.ts`  
**URL:** `https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout`  
**Method:** `POST`

**Fungsi:**
- Menerima data checkout (planId, email, phoneNumber, customerName)
- Generate signature SHA256 untuk Duitku
- Call Duitku API untuk create invoice
- Save transaction ke database
- Return payment URL ke frontend

**Request Body:**
```json
{
  "planId": "starter|professional|enterprise",
  "email": "customer@example.com",
  "phoneNumber": "08123456789",
  "customerName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://app.duitku.com/...",
    "orderId": "OASIS-1234567890-ABC123",
    "reference": "DK-REF-123",
    "amount": 50000
  }
}
```

### 2. **duitku-callback** (Payment Notification)
**Path:** `supabase/functions/duitku-callback/index.ts`  
**URL:** `https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback`  
**Method:** `POST`

**Fungsi:**
- Menerima callback dari Duitku setelah payment
- Verify signature dari Duitku
- Update transaction status di database
- Activate subscription jika payment success

**Callback Data dari Duitku:**
```json
{
  "merchantCode": "D20919",
  "amount": "50000",
  "merchantOrderId": "OASIS-1234567890-ABC123",
  "signature": "abc123...",
  "resultCode": "00",
  "reference": "DK-REF-123"
}
```

---

## 🔧 ENVIRONMENT VARIABLES YANG DIBUTUHKAN

### Supabase Edge Functions Secrets

Anda perlu set secrets berikut di Supabase Dashboard:

```bash
# Duitku Credentials
DUITKU_MERCHANT_CODE=D20919
DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
DUITKU_BASE_URL=https://api.duitku.com/webapi/v1/payment

# Callback URLs
DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success

# Supabase Configuration
SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs
```

### Vercel Environment Variables

Set di Vercel Dashboard > Project Settings > Environment Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I

# Edge Function URLs
NEXT_PUBLIC_DUITKU_CHECKOUT_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout

# Duitku Configuration (optional - for reference)
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=D20919
NEXT_PUBLIC_DUITKU_ENV=production
```

---

## 📋 MANUAL DEPLOYMENT STEPS

### Option 1: Via Supabase Dashboard (EASIEST)

1. **Login to Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select project: `qjzdzkdwtsszqjvxeiqv`

2. **Navigate to Edge Functions**
   - Click "Edge Functions" in left sidebar
   - Click "New Function"

3. **Deploy duitku-checkout Function**
   - Function name: `duitku-checkout`
   - Copy paste content from: `supabase/functions/duitku-checkout/index.ts`
   - Click "Deploy Function"
   - Set JWT verification: **OFF** (verify_jwt = false)

4. **Deploy duitku-callback Function**
   - Function name: `duitku-callback`
   - Copy paste content from: `supabase/functions/duitku-callback/index.ts`
   - Click "Deploy Function"
   - Set JWT verification: **OFF** (verify_jwt = false)

5. **Set Environment Secrets**
   - Go to "Project Settings" > "Edge Functions"
   - Click "Add Secret"
   - Add all secrets listed above one by one

### Option 2: Via Supabase CLI (If CLI is installed)

```bash
# 1. Login to Supabase
supabase login

# 2. Link to your project
supabase link --project-ref qjzdzkdwtsszqjvxeiqv

# 3. Deploy functions
supabase functions deploy duitku-checkout
supabase functions deploy duitku-callback

# 4. Set secrets
supabase secrets set DUITKU_MERCHANT_CODE=D20919
supabase secrets set DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
supabase secrets set DUITKU_BASE_URL=https://api.duitku.com/webapi/v1/payment
supabase secrets set DUITKU_CALLBACK_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback
supabase secrets set DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
supabase secrets set SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs
```

---

## 🧪 TESTING EDGE FUNCTIONS

### Test duitku-checkout Function

```bash
curl -X POST https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I" \
  -d '{
    "planId": "starter",
    "email": "test@example.com",
    "phoneNumber": "08123456789",
    "customerName": "Test User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://app.duitku.com/...",
    "orderId": "OASIS-...",
    "reference": "DK-...",
    "amount": 50000
  }
}
```

### Test duitku-callback Function

```bash
# This will be called by Duitku, but you can test manually:
curl -X POST https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback \
  -H "Content-Type: application/json" \
  -d '{
    "merchantCode": "D20919",
    "amount": "50000",
    "merchantOrderId": "OASIS-TEST-123",
    "signature": "calculated_signature",
    "resultCode": "00",
    "reference": "DK-TEST-123"
  }'
```

---

## 🔍 MONITORING & DEBUGGING

### Check Edge Function Logs

1. **Via Supabase Dashboard:**
   - Go to "Edge Functions"
   - Select function (duitku-checkout or duitku-callback)
   - Click "Logs" tab
   - Monitor real-time logs

2. **Via CLI (if installed):**
   ```bash
   supabase functions logs duitku-checkout
   supabase functions logs duitku-callback
   ```

### Common Issues & Solutions

**Issue 1: HTTP 405 Error**
- **Solution:** Check JWT verification is OFF (verify_jwt = false)

**Issue 2: Empty Logs**
- **Solution:** 
  - Verify function is deployed
  - Check environment secrets are set
  - Try invoking function manually via curl

**Issue 3: DNS Error Still Occurs**
- **Solution:**
  - Verify DUITKU_BASE_URL is set correctly
  - Check Duitku API is accessible from edge function
  - Review retry mechanism in code

---

## 📱 FRONTEND INTEGRATION

Frontend sudah diupdate untuk menggunakan Edge Functions:

**File:** `app/checkout/page.tsx`

```typescript
const edgeFunctionUrl = process.env.NEXT_PUBLIC_DUITKU_CHECKOUT_URL || 
                       'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout';

const response = await axios.post(edgeFunctionUrl, {
  planId: selectedPlan,
  email: formData.customerEmail,
  phoneNumber: formData.customerPhone,
  customerName: formData.customerName,
}, {
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  }
});
```

---

## 🔐 SECURITY CHECKLIST

- [x] JWT verification disabled for public endpoints (checkout)
- [x] Signature verification implemented for callback
- [x] API keys stored as secrets (not in code)
- [x] CORS headers configured properly
- [x] Service role key used for database operations
- [x] Callback URL uses HTTPS
- [x] Merchant code verified in callback

---

## 🎉 NEXT STEPS

1. **Deploy Edge Functions** (Via Dashboard or CLI)
2. **Set Environment Secrets** (Supabase + Vercel)
3. **Test Checkout Flow** (End-to-end testing)
4. **Configure Duitku Dashboard** (Set callback URL)
5. **Deploy to Production** (Vercel deployment)
6. **Monitor Logs** (Check for any issues)

---

## 🆘 SUPPORT & TROUBLESHOOTING

### Jika Masih Error 405:
1. Verifikasi edge functions sudah deployed
2. Check JWT verification = OFF
3. Test dengan curl manual
4. Review logs di Supabase Dashboard

### Jika Logs Kosong:
1. Ensure function is invoked
2. Check CORS headers
3. Verify API key is correct
4. Try adding more console.log statements

### Jika DNS Error Masih Terjadi:
1. Verify you're using edge functions (not Vercel API routes)
2. Check Duitku API URL is correct
3. Test Duitku API access from edge function directly

---

## 📚 REFERENCES

- **Supabase Edge Functions Docs:** https://supabase.com/docs/guides/functions
- **Duitku API Docs:** https://docs.duitku.com/
- **Deno Deploy Docs:** https://deno.com/deploy/docs

---

**Status:** ✅ READY FOR DEPLOYMENT  
**Updated:** 2025-12-12  
**Author:** AI Assistant
