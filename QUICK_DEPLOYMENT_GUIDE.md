# 🚀 QUICK DEPLOYMENT GUIDE - OASIS BI PRO

**Status:** ✅ READY FOR PRODUCTION  
**Last Update:** 2025-12-11  
**Commit:** `75b771e`

---

## ⚡ QUICK START (5 Minutes)

### 1. Set Environment Variables

**Di Vercel Dashboard:**
```
Settings → Environment Variables → Add New
```

**Di Netlify Dashboard:**
```
Site Settings → Build & Deploy → Environment Variables → Add Variable
```

**Copy-paste these:**
```bash
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=D20919
DUITKU_API_KEY=17d9d5e20fbf4763a44c41a1e95cb7cb
NEXT_PUBLIC_DUITKU_ENV=production
NEXT_PUBLIC_DUITKU_API_URL=https://api.duitku.com/webapi/v1/payment
NEXT_PUBLIC_DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
NEXT_PUBLIC_DUITKU_CALLBACK_URL=https://www.oasis-bi-pro.web.id/api/duitku/callback
NEXT_PUBLIC_SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs
```

### 2. Deploy

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

### 3. Test

1. Visit: `https://www.oasis-bi-pro.web.id/pricing`
2. Click "Subscribe" on any plan
3. Should redirect to: `https://payment.duitku.com/...`
4. Complete payment
5. Check callback received and account activated

---

## ✅ WHAT WAS FIXED

### The Problem
```
❌ OLD URL: https://api.duitku.com/webapi/v1/payment/api/merchant/createInvoice
                                                     ^^^^^^^^^^^^^^^^^^^^^ WRONG
```

### The Solution
```
✅ NEW URL: https://api.duitku.com/webapi/v1/payment/createInvoice
                                                     ^^^^^^^^^^^^^ CORRECT
```

### Changed File
- **File:** `/lib/duitku.ts`
- **Line:** 180-183
- **Change:** `${baseUrl}/api/merchant/createInvoice` → `${baseUrl}/createInvoice`

---

## 🧪 TESTING CHECKLIST

After deployment, verify:

- [ ] No `ENOTFOUND` errors in logs
- [ ] URL in logs shows: `https://api.duitku.com/webapi/v1/payment/createInvoice`
- [ ] Checkout redirects to Duitku payment page
- [ ] Callback received after payment
- [ ] Account status changes to `ACTIVE` in Supabase

---

## 📊 COMMITS

1. **`2ce525e`** - Fixed Duitku URL endpoint
2. **`75b771e`** - Added documentation

View on GitHub:
https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/commits/main

---

## 🆘 TROUBLESHOOTING

### Error: 401 Unauthorized
**Solution:** Check API Key in environment variables

### Error: Invalid Signature
**Solution:** Verify signature generation logic matches Duitku docs

### Callback Not Received
**Solution:** Check callback URL in Duitku dashboard matches your deployment

### Payment Page Not Loading
**Solution:** 
1. Check logs for actual URL being called
2. Verify it matches: `https://api.duitku.com/webapi/v1/payment/createInvoice`
3. If wrong, check environment variables

---

## 📞 SUPPORT

**Need Help?**
- GitHub Issues: [Open Issue](https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/issues)
- Full Report: See `FINAL_FIX_REPORT_V2.md`

---

**Ready to go live? Let's do this! 🚀**
