# 🔍 VERCEL DNS TROUBLESHOOTING GUIDE

**Problem:** Error `ENOTFOUND api.duitku.com` di Vercel Production  
**Date:** 2025-12-11  
**Commit:** `ebb8a85`

---

## 🎯 ERROR YANG TERJADI

```
getaddrinfo ENOTFOUND api.duitku.com
errno: -3007
code: 'ENOTFOUND'
syscall: 'getaddrinfo'
hostname: 'api.duitku.com'
```

**Artinya:** Vercel tidak bisa resolve DNS untuk `api.duitku.com`

---

## 🔧 SOLUSI YANG SUDAH DIIMPLEMENTASIKAN

### 1. Retry Mechanism (Commit `ebb8a85`)

**File:** `/lib/duitku.ts`

**Changes:**
- ✅ Retry 3x dengan delay 1 detik
- ✅ Timeout 30 detik per request
- ✅ Enhanced error logging
- ✅ Specific DNS error diagnostics

**How It Helps:**
- Mengatasi transient network issues
- Memberikan waktu untuk DNS resolution
- Better error diagnostics untuk troubleshooting

---

## ✅ VERIFIKASI ENVIRONMENT VARIABLES

**CRITICAL: Pastikan environment variables ini sudah diset di Vercel:**

### Di Vercel Dashboard → Settings → Environment Variables

```bash
# Duitku Production
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=D20919
DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
NEXT_PUBLIC_DUITKU_ENV=production
NEXT_PUBLIC_DUITKU_API_URL=https://api.duitku.com/webapi/v1/payment

# URLs
NEXT_PUBLIC_DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
NEXT_PUBLIC_DUITKU_CALLBACK_URL=https://www.oasis-bi-pro.web.id/api/duitku/callback

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs
```

**Cara Set:**
1. Login ke Vercel Dashboard
2. Pilih project → Settings
3. Environment Variables → Add New
4. Paste variable di atas satu per satu
5. Pilih Environment: Production, Preview, Development
6. Klik "Save"

---

## 🔄 DEPLOYMENT STEPS

### Step 1: Redeploy di Vercel

**Via Dashboard:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments tab
4. Click "..." pada deployment terakhir
5. Click "Redeploy"

**Via CLI:**
```bash
cd /home/user/webapp
vercel --prod
```

### Step 2: Monitor Logs

Setelah redeploy, monitor logs:

```bash
vercel logs --prod
```

Atau via Dashboard:
- Vercel Dashboard → Deployments → Latest → View Function Logs

### Step 3: Test Checkout

1. Visit: `https://www.oasis-bi-pro.web.id/pricing`
2. Click "Subscribe" pada paket apapun
3. Fill form checkout
4. Submit

**Expected Behavior dengan Retry:**
- Log akan menunjukkan: "Attempt 1/3", "Attempt 2/3", "Attempt 3/3"
- Jika berhasil pada retry ke-2 atau ke-3, checkout akan sukses
- Jika gagal semua, error akan lebih descriptive

---

## 🧪 DIAGNOSTIC COMMANDS

### Check DNS dari Vercel Function

Buat temporary API route untuk test DNS:

**File:** `app/api/test-dns/route.ts`
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.duitku.com/webapi/v1/payment/createInvoice', {
      method: 'HEAD',
    })
    
    return NextResponse.json({
      success: true,
      status: response.status,
      message: 'DNS resolution successful',
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      message: 'DNS resolution failed',
    }, { status: 500 })
  }
}
```

Visit: `https://your-domain.vercel.app/api/test-dns`

---

## 🔍 POSSIBLE ROOT CAUSES

### 1. Vercel DNS Cache Issue
**Symptom:** DNS tidak resolve di Vercel tapi resolve di tempat lain  
**Solution:** 
- Redeploy project
- Wait 5-10 minutes for DNS cache to refresh
- Try again

### 2. Vercel Region Issue
**Symptom:** Works in some regions, fails in others  
**Solution:**
- Check Vercel deployment region
- Duitku API mungkin tidak accessible dari semua region
- Contact Duitku support untuk whitelist Vercel IPs

### 3. API Domain Configuration Issue
**Symptom:** Consistent ENOTFOUND across all attempts  
**Solution:**
- Verify domain spelling: `api.duitku.com` (bukan `www.api.duitku.com`)
- Check with Duitku support jika domain berubah
- Try alternative endpoint jika ada

### 4. Network/Firewall Issue
**Symptom:** Timeout atau connection refused  
**Solution:**
- Contact Vercel support
- Check if Duitku has IP whitelist requirements
- Provide Vercel IPs to Duitku

---

## 📊 WHAT TO CHECK IN LOGS

### Good Signs (Working):
```
✅ Sending request to: https://api.duitku.com/webapi/v1/payment/createInvoice (Attempt 1/3)
✅ 📥 Duitku Response: { paymentUrl: '...', reference: '...' }
✅ Payment URL: https://payment.duitku.com/...
```

### Retry Working:
```
⚠️ Network error on attempt 1/3, retrying in 1000ms...
✅ Sending request to: ... (Attempt 2/3)
✅ 📥 Duitku Response: { paymentUrl: '...', reference: '...' }
```

### Still Failing:
```
❌ 💥 DUITKU PAYMENT CREATION ERROR
   Attempt: 3/3
   🔍 DNS RESOLUTION FAILED
   Hostname: api.duitku.com
```

---

## 🆘 ALTERNATIVE SOLUTIONS

### Option 1: Use Duitku Sandbox Temporarily

**Update `.env`:**
```bash
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=DS26557
DUITKU_API_KEY=68e1d64813c7f21a1ffc3839064ab6b3
NEXT_PUBLIC_DUITKU_ENV=sandbox
NEXT_PUBLIC_DUITKU_API_URL=https://api-sandbox.duitku.com
```

Test jika sandbox bekerja. Jika ya, masalahnya spesifik ke production domain.

### Option 2: Contact Duitku Support

**Email:** support@duitku.com  
**Subject:** API DNS Resolution Issue from Vercel

**Template:**
```
Hi Duitku Team,

We are experiencing DNS resolution issues when calling your Production API from Vercel hosting:
- Domain: api.duitku.com
- Error: getaddrinfo ENOTFOUND
- Merchant Code: D20919

The same code works fine locally but fails on Vercel production.

Could you please:
1. Confirm if api.duitku.com is the correct production domain
2. Check if there are any IP whitelist requirements
3. Verify if Vercel IPs are allowed to access your API

Our Vercel deployment URL: https://www.oasis-bi-pro.web.id

Thank you!
```

### Option 3: Use Vercel Edge Config or KV for Caching

If DNS is consistently failing, cache successful payment URLs temporarily.

---

## ✅ SUCCESS CRITERIA

Deployment dianggap **BERHASIL** jika:

1. ✅ Checkout tidak error `ENOTFOUND`
2. ✅ Log menunjukkan retry berhasil (atau sukses di attempt 1)
3. ✅ User di-redirect ke Duitku payment page
4. ✅ Callback diterima setelah payment
5. ✅ Account status berubah ke `ACTIVE`

---

## 📞 NEXT STEPS

1. **Redeploy** di Vercel dengan commit terbaru (`ebb8a85`)
2. **Monitor logs** untuk lihat retry mechanism bekerja
3. **Test checkout** di production
4. **If still failing:** Contact Duitku support dengan informasi di atas
5. **If working:** Celebrate! 🎉

---

**Last Updated:** 2025-12-11  
**Commit:** `ebb8a85`  
**Status:** Retry mechanism implemented, ready for testing
