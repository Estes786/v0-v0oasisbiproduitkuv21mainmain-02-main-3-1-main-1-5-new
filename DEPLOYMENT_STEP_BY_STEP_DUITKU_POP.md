# 🚀 PANDUAN DEPLOYMENT - DUITKU POP EDITION (STEP BY STEP)

**Status:** ⚠️ **EDGE FUNCTIONS BELUM DI-DEPLOY**  
**Problem:** Duitku-checkout function tidak ditemukan di Supabase  
**Solution:** Deploy manual via Supabase Dashboard

---

## ❌ MASALAH YANG TERDETEKSI DARI SCREENSHOT

1. **Edge Function "duitku-checkout" TIDAK DITEMUKAN** ❌
   - Screenshot menunjukkan "No results found"
   - Function belum di-deploy ke Supabase

2. **API Key Yang Digunakan SALAH** ❌
   - Anda pakai: `sb_publishable_VEWHrYQl9FFFGaWhHSYFAA_KVdeD3Yk` (Publishable Key)
   - Harusnya pakai: **ANON KEY** (yang panjang, dimulai dengan `eyJhbGci...`)

3. **Request Body Salah** ❌
   - Anda kirim: `{"name":"Functions"}`
   - Harusnya kirim: Data checkout lengkap

4. **HTTP 405 Error Masih Muncul** ❌
   - Karena function belum di-deploy

---

## ✅ SOLUSI: DEPLOY EDGE FUNCTIONS MANUAL

### STEP 1: LOGIN KE SUPABASE DASHBOARD

1. Buka browser, login ke: **https://supabase.com/dashboard**
2. Pilih project: **qjzdzkdwtsszqjvxeiqv**
3. Click "Edge Functions" di sidebar kiri

---

### STEP 2: DEPLOY DUITKU-CHECKOUT FUNCTION

#### A. Buat Function Baru

1. Di halaman Edge Functions, click tombol **"New Function"** (hijau, pojok kanan atas)

2. Isi form:
   - **Function name:** `duitku-checkout`
   - **Region:** All functions are deployed globally (default)

3. **IMPORTANT:** Scroll ke bawah, cari **"Function Configuration"**
   - Find setting: **"Verify JWT"**
   - **MATIKAN (OFF/FALSE)** - Ini sangat penting!
   - Jika tidak dimatikan, akan muncul error 405

#### B. Copy-Paste Code

4. Sekarang copy code ini dan paste ke editor:

```typescript
// DUITKU POP CHECKOUT FUNCTION
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

// Configuration
const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'
const DUITKU_BASE_URL = 'https://api.duitku.com/webapi/v1/payment'
const CALLBACK_URL = Deno.env.get('DUITKU_CALLBACK_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback'
const RETURN_URL = 'https://www.oasis-bi-pro.web.id/payment/success'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// Plans configuration
const PLANS = {
  starter: { name: 'Starter Plan', price: 50000, description: 'Paket Starter OASIS BI PRO' },
  professional: { name: 'Professional Plan', price: 100000, description: 'Paket Professional OASIS BI PRO' },
  enterprise: { name: 'Enterprise Plan', price: 200000, description: 'Paket Enterprise OASIS BI PRO' }
}

// SHA256 signature generator
async function generateSignature(merchantCode: string, orderId: string, amount: string, apiKey: string): Promise<string> {
  const signatureString = merchantCode + orderId + amount + apiKey
  const encoder = new TextEncoder()
  const data = encoder.encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

// Main handler
serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), { 
      status: 405, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }

  try {
    console.log('🛒 CHECKOUT REQUEST RECEIVED')
    
    const body = await req.json()
    const { planId, email, phoneNumber, customerName } = body

    console.log('📋 Request data:', { planId, email, phoneNumber, customerName })

    // Validate
    if (!planId || !email || !phoneNumber || !customerName) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: planId, email, phoneNumber, customerName' 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    // Get plan
    const plan = PLANS[planId as keyof typeof PLANS]
    if (!plan) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Invalid planId. Valid: ${Object.keys(PLANS).join(', ')}` 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    // Generate order ID
    const orderId = `OASIS-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
    console.log('🆔 Order ID:', orderId)

    // Generate signature
    const amount = plan.price
    const signature = await generateSignature(DUITKU_MERCHANT_CODE, orderId, amount.toString(), DUITKU_API_KEY)
    console.log('🔐 Signature generated')

    // Duitku payload
    const duitkuPayload = {
      merchantCode: DUITKU_MERCHANT_CODE,
      paymentMethod: 'VC',
      merchantOrderId: orderId,
      productDetails: plan.description,
      amount: amount,
      email: email,
      phoneNumber: phoneNumber,
      customerVaName: customerName,
      itemDetails: [{
        name: plan.name,
        price: amount,
        quantity: 1
      }],
      callbackUrl: CALLBACK_URL,
      returnUrl: RETURN_URL,
      signature: signature,
      expiryPeriod: 60
    }

    console.log('📤 Calling Duitku API:', `${DUITKU_BASE_URL}/createInvoice`)

    // Call Duitku API
    const duitkuResponse = await fetch(`${DUITKU_BASE_URL}/createInvoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duitkuPayload)
    })

    const duitkuData = await duitkuResponse.json()
    console.log('📥 Duitku response:', duitkuData)

    if (duitkuResponse.ok && duitkuData.paymentUrl) {
      console.log('✅ Payment URL:', duitkuData.paymentUrl)

      // Save to database
      if (SERVICE_ROLE_KEY) {
        try {
          const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })
          await supabase.from('transactions').insert({
            order_id: orderId,
            plan_type: planId,
            amount: amount,
            customer_name: customerName,
            customer_email: email,
            customer_phone: phoneNumber,
            status: 'PENDING',
            payment_url: duitkuData.paymentUrl,
            duitku_reference: duitkuData.reference,
            created_at: new Date().toISOString()
          })
          console.log('💾 Transaction saved')
        } catch (e) {
          console.error('⚠️ DB error:', e)
        }
      }

      return new Response(JSON.stringify({
        success: true,
        data: {
          paymentUrl: duitkuData.paymentUrl,
          orderId: orderId,
          reference: duitkuData.reference,
          amount: amount
        }
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    } else {
      throw new Error(duitkuData.message || 'Payment creation failed')
    }
  } catch (error) {
    console.error('💥 ERROR:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})

console.log('✅ Duitku Checkout Function Running')
```

5. Click tombol **"Deploy Function"** (bawah)

6. **Tunggu sampai deploy selesai** (biasanya 30-60 detik)

---

### STEP 3: DEPLOY DUITKU-CALLBACK FUNCTION

1. Kembali ke halaman Edge Functions
2. Click tombol **"New Function"** lagi
3. Isi form:
   - **Function name:** `duitku-callback`
   - **Verify JWT:** **OFF/FALSE** (matikan!)

4. Copy-paste code ini:

```typescript
// DUITKU POP CALLBACK FUNCTION
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// Signature generator for verification
async function generateSignature(merchantCode: string, amount: string, merchantOrderId: string, apiKey: string): Promise<string> {
  const signatureString = merchantCode + amount + merchantOrderId + apiKey
  const encoder = new TextEncoder()
  const data = encoder.encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    console.log('📞 CALLBACK FROM DUITKU')
    
    const callbackData = await req.json()
    console.log('📋 Callback data:', callbackData)

    const { merchantCode, amount, merchantOrderId, signature, resultCode, reference } = callbackData

    // Validate
    if (!merchantCode || !amount || !merchantOrderId || !signature || !resultCode) {
      console.error('❌ Missing fields')
      return new Response('Missing fields', { status: 400 })
    }

    // Verify merchant code
    if (merchantCode !== DUITKU_MERCHANT_CODE) {
      console.error('❌ Invalid merchant code')
      return new Response('Invalid merchant', { status: 400 })
    }

    // Verify signature
    const localSignature = await generateSignature(merchantCode, amount, merchantOrderId, DUITKU_API_KEY)
    if (localSignature !== signature) {
      console.error('❌ Invalid signature')
      return new Response('Invalid signature', { status: 400 })
    }
    console.log('✅ Signature verified')

    // Determine status
    let newStatus = 'PENDING'
    let paymentSuccess = false

    switch (resultCode) {
      case '00':
        newStatus = 'SUCCESS'
        paymentSuccess = true
        console.log('✅ Payment SUCCESS')
        break
      case '01':
        newStatus = 'PENDING'
        console.log('⏳ Payment PENDING')
        break
      default:
        newStatus = 'FAILED'
        console.log('❌ Payment FAILED')
        break
    }

    // Update database
    if (!SERVICE_ROLE_KEY) {
      console.error('⚠️ SERVICE_ROLE_KEY not set')
      return new Response('Config error', { status: 500 })
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    const { data: transactionData, error: updateError } = await supabase
      .from('transactions')
      .update({
        status: newStatus,
        payment_confirmed_at: new Date().toISOString(),
        is_paid: paymentSuccess,
        duitku_result_code: resultCode,
        duitku_reference: reference
      })
      .eq('order_id', merchantOrderId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Update failed:', updateError)
      return new Response('Update failed', { status: 500 })
    }

    console.log('💾 Transaction updated')

    // Activate subscription
    if (paymentSuccess && transactionData) {
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30)

      await supabase.from('subscriptions').upsert({
        user_email: transactionData.customer_email,
        plan_type: transactionData.plan_type,
        status: 'ACTIVE',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        transaction_id: transactionData.id,
        is_active: true
      }, { onConflict: 'user_email' })

      console.log('🎉 Subscription activated')
    }

    return new Response('OK', { status: 200, headers: corsHeaders })
  } catch (error) {
    console.error('💥 ERROR:', error)
    return new Response('OK', { status: 200, headers: corsHeaders })
  }
})

console.log('✅ Duitku Callback Function Running')
```

5. Click **"Deploy Function"**
6. Tunggu sampai deploy selesai

---

### STEP 4: SET ENVIRONMENT SECRETS

1. Di Supabase Dashboard, go to **"Project Settings"** (icon gear di sidebar)
2. Click **"Edge Functions"** di menu kiri
3. Scroll ke section **"Secrets"**
4. Click tombol **"Add Secret"**

5. **Tambahkan secrets satu per satu:**

**Secret 1:**
- Name: `DUITKU_MERCHANT_CODE`
- Value: `D20919`
- Click "Save"

**Secret 2:**
- Name: `DUITKU_API_KEY`
- Value: `17d9d5e20fbf4763a44c41a1e95cb7cb`
- Click "Save"

**Secret 3:**
- Name: `DUITKU_CALLBACK_URL`
- Value: `https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback`
- Click "Save"

**Secret 4:**
- Name: `SUPABASE_URL`
- Value: `https://qjzdzkdwtsszqjvxeiqv.supabase.co`
- Click "Save"

**Secret 5:**
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs`
- Click "Save"

---

### STEP 5: TEST EDGE FUNCTION DENGAN CURL YANG BENAR

**PENTING: Gunakan ANON KEY, bukan publishable key!**

```bash
curl -X POST 'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout' \
  -H 'Content-Type: application/json' \
  -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I' \
  --data '{
    "planId": "starter",
    "email": "test@example.com",
    "phoneNumber": "08123456789",
    "customerName": "Test User"
  }'
```

**Response yang BENAR:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://app.duitku.com/...",
    "orderId": "OASIS-1234567890-ABC",
    "reference": "DK-REF-123",
    "amount": 50000
  }
}
```

**Jika masih error 405:**
- Pastikan JWT verification = OFF
- Pastikan function sudah di-deploy
- Check logs di Supabase Dashboard

---

### STEP 6: TEST DI WEBSITE

1. Buka: **https://www.oasis-bi-pro.web.id/pricing**
2. Click **"Choose Plan"** pada Starter
3. Isi form checkout dengan data lengkap
4. Pilih metode pembayaran (e.g., BCA Virtual Account)
5. Click **"Bayar Sekarang"**

**Yang HARUS TERJADI:**
- ✅ TIDAK ada error HTTP 405
- ✅ Redirect ke halaman payment Duitku
- ✅ Muncul payment URL dari Duitku

**Jika masih error 405:**
- Check Edge Functions logs di Supabase Dashboard
- Verify JWT setting = OFF
- Check API key di frontend (.env.local)

---

## 🔍 DEBUGGING TIPS

### Cek Logs Edge Function:
1. Supabase Dashboard > Edge Functions
2. Click function name (duitku-checkout)
3. Click tab "Logs"
4. Monitor real-time logs

### Common Errors:

**Error: "Function not found"**
- Solution: Deploy function via dashboard

**Error: HTTP 405**
- Solution: Set JWT verification = OFF

**Error: "Invalid signature"**
- Solution: Check DUITKU_API_KEY secret

**Error: "Missing required fields"**
- Solution: Check request body format

---

## ✅ CHECKLIST DEPLOYMENT

- [ ] Login ke Supabase Dashboard
- [ ] Deploy duitku-checkout function
- [ ] Set JWT verification = OFF untuk duitku-checkout
- [ ] Deploy duitku-callback function  
- [ ] Set JWT verification = OFF untuk duitku-callback
- [ ] Add 5 environment secrets
- [ ] Test dengan curl (gunakan ANON KEY)
- [ ] Test di website checkout
- [ ] Check logs untuk errors
- [ ] Verify no HTTP 405 error

---

## 🎯 API KEY YANG BENAR

**❌ SALAH (Publishable Key):**
```
sb_publishable_VEWHrYQl9FFFGaWhHSYFAA_KVdeD3Yk
```

**✅ BENAR (ANON KEY):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I
```

---

**Status:** Ready untuk deployment manual  
**Estimasi waktu:** 20-30 menit  
**Difficulty:** Easy (ikuti step by step)

**GOOD LUCK!** 🚀
