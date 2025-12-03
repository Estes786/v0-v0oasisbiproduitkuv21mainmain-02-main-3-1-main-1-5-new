# 🚀 PANDUAN DEPLOY SINGKAT - OASIS BI PRO

## ✅ YANG SUDAH SELESAI

1. ✅ Error build Vercel sudah diperbaiki
2. ✅ Kredensial Duitku baru sudah diupdate (DS26335)
3. ✅ Code sudah di-push ke GitHub
4. ✅ Siap untuk deploy!

---

## 🔧 LANGKAH DEPLOY KE VERCEL

### 1. Buka Vercel Dashboard
\`\`\`
https://vercel.com/estes786
\`\`\`

### 2. Pilih Project
- Klik project: **oasis-bi-pro-duitku-v2-1**

### 3. Set Environment Variables
- Klik **Settings** → **Environment Variables**
- Tambahkan 4 variabel ini:

\`\`\`
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=DS26335
DUITKU_API_KEY=78cb96d8cb9ea9dc40d1c77068a659f6  
DUITKU_SANDBOX_MODE=true
NEXT_PUBLIC_APP_URL=https://www.oasis-bi-pro.web.id
\`\`\`

**Optional** (untuk menghindari error):
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
\`\`\`

### 4. Redeploy
- Klik tab **Deployments**
- Klik tombol **Redeploy** pada deployment terakhir
- Tunggu 3-5 menit

### 5. Website Live!
\`\`\`
https://www.oasis-bi-pro.web.id
\`\`\`

---

## 🧪 TEST PEMBAYARAN DUITKU

### Langkah Test Payment:

**1. Buka Halaman Pricing**
\`\`\`
https://www.oasis-bi-pro.web.id/pricing
\`\`\`

**2. Pilih Paket**
- Klik "Mulai Sekarang" di paket manapun

**3. Isi Data Customer**
\`\`\`
Nama: Test User
Email: test@example.com
No HP: 081234567890
\`\`\`

**4. Pilih Metode Pembayaran**
- Pilih metode (contoh: BCA Virtual Account)
- Klik "Bayar Sekarang"

**5. ✅ HALAMAN PEMBAYARAN DUITKU**
- Anda akan diarahkan ke halaman Duitku sandbox
- **Ini adalah halaman pembayaran LIVE Duitku!**
- Akan muncul instruksi pembayaran
- Nomor Virtual Account atau QR Code
- Ikuti instruksi untuk selesaikan pembayaran

**6. Cek Dashboard Duitku**
\`\`\`
Login: https://sandbox.duitku.com
Merchant: DS26335
\`\`\`
- Buka menu **Dashboard** atau **Transaksi**
- **✅ Transaksi Anda akan muncul di sini!**
- Anda akan lihat:
  - Order ID
  - Jumlah pembayaran
  - Status (Pending/Success/Failed)
  - Metode pembayaran
  - Tanggal/waktu transaksi

---

## 🎯 TUJUAN UTAMA

### ✅ Yang Harus Dicapai:

1. **Payment berhasil**: User bisa melakukan pembayaran
2. **Redirect ke Duitku**: User diarahkan ke halaman pembayaran Duitku
3. **Transaksi tercatat**: Transaksi muncul di dashboard Duitku
4. **Riwayat transaksi**: Bisa dilihat di dashboard Duitku merchant

---

## 📊 KREDENSIAL DUITKU BARU

\`\`\`
Merchant Code: DS26335
API Key: 78cb96d8cb9ea9dc40d1c77068a659f6
Environment: Sandbox (Testing)
Dashboard: https://sandbox.duitku.com
\`\`\`

---

## 🔗 LINK PENTING

| Item | URL |
|------|-----|
| **Website** | https://www.oasis-bi-pro.web.id |
| **GitHub** | https://github.com/Estes786/oasis-bi-pro-duitku-v2.1 |
| **Vercel** | https://vercel.com/estes786 |
| **Duitku Dashboard** | https://sandbox.duitku.com |

---

## ⚠️ TROUBLESHOOTING

### Jika Build Masih Error:
1. Pastikan environment variables sudah di-set dengan benar
2. Tidak ada typo di nama variabel
3. Cek log build di Vercel untuk error spesifik

### Jika Tidak Redirect ke Duitku:
1. Cek console browser untuk error
2. Pastikan kredensial API benar
3. Test endpoint: `/api/duitku/payment-methods`

### Jika Transaksi Tidak Muncul di Dashboard:
1. Pastikan merchant code benar (DS26335)
2. Login ke akun Duitku yang tepat
3. Cek di menu "Transaksi" atau "Dashboard"
4. Refresh halaman

---

## ✅ CHECKLIST

### Sebelum Deploy:
- [x] ✅ Error build sudah diperbaiki
- [x] ✅ Kredensial Duitku baru sudah diupdate
- [x] ✅ Code sudah di GitHub
- [ ] Set environment variables di Vercel
- [ ] Redeploy dari Vercel
- [ ] Tunggu deployment selesai

### Saat Testing:
- [ ] Buka halaman pricing
- [ ] Pilih paket subscription
- [ ] Isi data customer
- [ ] Pilih metode pembayaran
- [ ] Verifikasi redirect ke Duitku
- [ ] Lihat instruksi pembayaran
- [ ] Selesaikan pembayaran (sandbox)

### Setelah Testing:
- [ ] Cek dashboard Duitku untuk transaksi
- [ ] Verifikasi transaksi muncul dengan detail yang benar
- [ ] Cek callback diterima (jika dikonfigurasi)
- [ ] Verifikasi status pembayaran terupdate

---

## 🎉 STATUS

**Build Error**: ✅ FIXED  
**Kredensial Baru**: ✅ UPDATED (DS26335)  
**Code di GitHub**: ✅ PUSHED  
**Siap Deploy**: ✅ YES

**Langkah Selanjutnya**:
1. Set environment variables di Vercel
2. Redeploy
3. Test payment flow
4. Cek dashboard Duitku untuk transaksi

---

**Terakhir Diupdate**: 26 November 2025  
**Status**: ✅ SIAP DEPLOY  
**Website**: https://www.oasis-bi-pro.web.id
