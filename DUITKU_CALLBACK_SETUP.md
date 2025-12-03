# 🔧 DUITKU CALLBACK URL SETUP - PENTING!

## ⚠️ MASALAH YANG TERJADI

**Error**: "Gagal memuat metode pembayaran. Silakan coba lagi."

**Root Cause**: 
1. URL Callback belum dikonfigurasi di Duitku Dashboard
2. Merchant belum aktif atau belum terverifikasi
3. API credentials tidak valid

---

## ✅ SOLUSI LENGKAP

### STEP 1: Konfigurasi URL Callback di Duitku Dashboard

**1. Login ke Duitku Sandbox**
\`\`\`
URL: https://sandbox.duitku.com
Merchant: DS26335
\`\`\`

**2. Masuk ke Menu "Proyek Saya" / "My Projects"**
- Di dashboard, cari menu **"Proyek Saya"** atau **"My Projects"**
- Anda akan lihat list project Anda

**3. Edit Project**
- Klik tombol **"Edit"** atau icon pensil pada project "oasisbipro"
- Atau klik **"Tambah Proyek"** jika belum ada

**4. Isi Detail Proyek**

**DETAIL PROYEK**:
\`\`\`
Nama Proyek: oasisbipro
Website Proyek: https://www.oasis-bi-pro.web.id
\`\`\`

**URL CALLBACK PROYEK (PENTING!)**:
\`\`\`
https://www.oasis-bi-pro.web.id/api/duitku/callback
\`\`\`

**Klik "Simpan" / "Save"**

---

### STEP 2: Verifikasi API Credentials

**Pastikan credentials benar**:
\`\`\`
Merchant Code: DS26335
API Key: 78cb96d8cb9ea9dc40d1c77068a659f6
\`\`\`

**Cek di Duitku Dashboard**:
1. Menu "Akun" atau "Account"
2. Bagian "API Key"
3. Verifikasi Merchant Code dan API Key cocok

---

### STEP 3: Vercel Environment Variables

**Set di Vercel Dashboard** (https://vercel.com/estes786):

\`\`\`env
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=DS26335
DUITKU_API_KEY=78cb96d8cb9ea9dc40d1c77068a659f6
DUITKU_SANDBOX_MODE=true
NEXT_PUBLIC_APP_URL=https://www.oasis-bi-pro.web.id
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
\`\`\`

**Setelah set, WAJIB REDEPLOY!**

---

### STEP 4: Test API Endpoint Secara Langsung

**Test Payment Methods API**:
\`\`\`
https://www.oasis-bi-pro.web.id/api/duitku/payment-methods?amount=99000
\`\`\`

**Expected Response** (jika berhasil):
\`\`\`json
{
  "success": true,
  "paymentMethods": [
    {
      "paymentMethod": "BV",
      "paymentName": "BCA Virtual Account",
      "paymentImage": "...",
      "totalFee": "4000"
    },
    ...
  ]
}
\`\`\`

**Jika Error**:
- Check credentials di Duitku dashboard
- Verify callback URL sudah di-set
- Pastikan merchant sudah aktif

---

## 📋 CHECKLIST KONFIGURASI

### Di Duitku Dashboard:
- [ ] Login ke https://sandbox.duitku.com
- [ ] Masuk menu "Proyek Saya" / "My Projects"
- [ ] Buat/Edit project "oasisbipro"
- [ ] Set Website: https://www.oasis-bi-pro.web.id
- [ ] Set Callback URL: https://www.oasis-bi-pro.web.id/api/duitku/callback
- [ ] Klik "Simpan"
- [ ] Verifikasi Merchant Code: DS26335
- [ ] Verifikasi API Key aktif

### Di Vercel:
- [ ] Environment variables sudah di-set (6 variabel)
- [ ] Redeploy setelah set variables
- [ ] Build berhasil tanpa error

### Testing:
- [ ] Test API endpoint payment-methods
- [ ] Visit /pricing page
- [ ] Select plan dan lanjut ke checkout
- [ ] Payment methods muncul di step 3
- [ ] Bisa pilih payment method
- [ ] Redirect ke Duitku payment page

---

## 🔍 DEBUGGING STEPS

### Jika Payment Methods Masih Gagal:

**1. Check Browser Console**
\`\`\`
F12 → Console Tab
Lihat error message detail
\`\`\`

**2. Test API Directly**
\`\`\`bash
# Via browser atau Postman
GET https://www.oasis-bi-pro.web.id/api/duitku/payment-methods?amount=99000
\`\`\`

**3. Check Vercel Logs**
\`\`\`
Go to Vercel Dashboard
→ Deployments
→ Click latest deployment
→ Function Logs
→ Look for errors in /api/duitku/payment-methods
\`\`\`

**4. Verify Duitku API Response**
\`\`\`
Check if Duitku API returns:
- responseCode: '00' (success)
- paymentFee: array of payment methods

If not, credentials might be invalid
\`\`\`

---

## 🎯 EXPECTED FLOW

### Normal Flow (Jika Konfigurasi Benar):

**1. User di Checkout Step 3**
→ Frontend calls: `/api/duitku/payment-methods?amount=99000`

**2. Next.js API Route**
→ Calls: `getPaymentMethods(99000)` from `lib/duitku.ts`

**3. Duitku API**
→ POST to: `https://sandbox.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod`
→ With signature: MD5(merchantCode + amount + datetime + apiKey)

**4. Duitku Response**
→ Returns: `{ responseCode: '00', paymentFee: [...] }`

**5. Frontend Displays**
→ Shows payment methods with icons and fees

---

## 📸 SCREENSHOT REFERENSI

**Dari screenshot yang Anda kirim, saya lihat**:

1. **Duitku Dashboard - Edit Proyek**:
   - Ada form untuk "Nama Proyek"
   - Ada field untuk "Website Proyek"
   - Ada field untuk "Url Callback Proyek" ← **INI YANG PENTING!**

2. **Duitku Dashboard - Sistem Pembayaran**:
   - Menunjukkan berbagai metode pembayaran tersedia
   - Bank Transfer, E-Wallet, dll.

3. **Website Error**:
   - "www.oasis-bi-pro.web.id menyatakan"
   - "Gagal memuat metode pembayaran"
   - Ini karena callback URL belum di-set

---

## ✅ AFTER CONFIGURATION

**Setelah konfigurasi benar, yang akan terjadi**:

1. **Checkout Page Step 3**:
   - Payment methods akan load dengan benar
   - Menampilkan list bank (BCA, Mandiri, BNI, BRI, dll.)
   - Menampilkan e-wallet (OVO, DANA, GoPay, dll.)
   - Menampilkan fee untuk setiap metode

2. **Setelah Pilih Payment Method**:
   - Klik "Bayar Sekarang"
   - Redirect ke Duitku payment page
   - Muncul instruksi pembayaran
   - User bisa complete payment

3. **Callback dari Duitku**:
   - Duitku akan POST ke callback URL
   - Website update status transaksi
   - User diarahkan ke success/failed page

4. **Di Duitku Dashboard**:
   - Transaksi muncul di list
   - Status tercatat (pending/success/failed)
   - Riwayat lengkap tersimpan

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue 1: "Akun Duitku Anda belum aktif"
**Solution**:
- Pastikan akun sudah diverifikasi
- Lengkapi data merchant di dashboard
- Hubungi support Duitku jika perlu

### Issue 2: "Invalid signature"
**Solution**:
- Verify API Key benar
- Check merchant code benar (DS26335)
- Pastikan tidak ada spasi di credentials

### Issue 3: Callback tidak berfungsi
**Solution**:
- Pastikan callback URL HTTPS (bukan HTTP)
- Format: https://www.oasis-bi-pro.web.id/api/duitku/callback
- No trailing slash
- Must be publicly accessible

### Issue 4: Payment methods kosong
**Solution**:
- Check API response di Network tab
- Verify amount parameter valid (> 0)
- Check Duitku API logs di dashboard

---

## 📞 SUPPORT DUITKU

Jika masih ada masalah:

**Duitku Support**:
- Email: support@duitku.com
- Website: https://duitku.com
- Documentation: https://docs.duitku.com

**Tanya**:
1. "Saya butuh bantuan konfigurasi callback URL untuk merchant DS26335"
2. "Kenapa API payment methods return error?"
3. "Bagaimana cara verify merchant sudah aktif?"

---

## 🎉 SUCCESS CRITERIA

**Anda tahu konfigurasi berhasil jika**:

1. ✅ Payment methods muncul di checkout step 3
2. ✅ Tidak ada error "Gagal memuat metode pembayaran"
3. ✅ Bisa pilih payment method (BCA, Mandiri, dll.)
4. ✅ Klik "Bayar Sekarang" redirect ke Duitku
5. ✅ Muncul halaman pembayaran Duitku dengan instruksi
6. ✅ Setelah bayar, transaksi muncul di Duitku dashboard
7. ✅ Callback diterima dan status terupdate

---

**Updated**: 26 November 2025  
**Merchant**: DS26335  
**Website**: https://www.oasis-bi-pro.web.id  
**Callback URL**: https://www.oasis-bi-pro.web.id/api/duitku/callback
