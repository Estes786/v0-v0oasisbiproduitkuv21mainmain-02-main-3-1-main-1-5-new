# ⚡ QUICK START - Deploy dalam 5 Menit

## 🚀 Deployment Super Cepat

### Step 1: Deploy ke Supabase (2 menit)
```bash
cd /home/user/webapp
./deploy-supabase.sh
```

Script akan otomatis:
- ✅ Install Supabase CLI (jika belum)
- ✅ Login ke Supabase
- ✅ Link ke project
- ✅ Set semua secrets
- ✅ Deploy kedua functions

### Step 2: Update Duitku Dashboard (1 menit)
1. Login: https://passport.duitku.com
2. Settings → Callback URL
3. Set: `https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback`

### Step 3: Update Vercel Environment (1 menit)
Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_DUITKU_CHECKOUT_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout
```

### Step 4: Redeploy Vercel (1 menit)
```bash
vercel --prod
```

### Step 5: Test! (30 detik)
Visit: https://www.oasis-bi-pro.web.id/pricing

---

## 📊 Monitoring Commands

```bash
# Monitor checkout logs
supabase functions logs duitku-checkout --tail

# Monitor callback logs  
supabase functions logs duitku-callback --tail

# List all secrets
supabase secrets list

# List all functions
supabase functions list
```

---

## 🧪 Test dengan cURL

```bash
curl -X POST https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "planId": "professional",
    "email": "test@example.com",
    "phoneNumber": "08123456789",
    "customerName": "Test User"
  }'
```

---

## ✅ Success Indicators

Jika berhasil, Anda akan lihat:
- ✅ Payment URL generated
- ✅ No DNS errors
- ✅ Redirect ke Duitku works
- ✅ Callback received
- ✅ Subscription activated

---

## 📚 Full Documentation

- **README.md** - Complete guide
- **DEPLOYMENT_SUMMARY.md** - Detailed explanation
- **.env.production.example** - Environment variables

---

## 🆘 Troubleshooting

### Problem: Function not found
```bash
supabase functions deploy duitku-checkout --no-verify-jwt
```

### Problem: Unauthorized
Check if `apikey` header is set with SUPABASE_ANON_KEY

### Problem: Internal error
```bash
supabase functions logs duitku-checkout --tail
```

---

**That's it! 🎉**

Deployment selesai dalam 5 menit. Checkout sekarang akan bekerja tanpa DNS errors!
