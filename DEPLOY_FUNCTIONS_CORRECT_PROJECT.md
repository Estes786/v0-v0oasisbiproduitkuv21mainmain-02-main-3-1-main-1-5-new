# 🔥 DEPLOY EDGE FUNCTIONS - PROJECT YANG BENAR

**Problem:** Functions belum di-deploy ke project yang tepat  
**Status:** Error 405 masih muncul  
**Solution:** Deploy ke project reference yang BENAR

---

## ⚠️ PENTING: CEK PROJECT REFERENCE ANDA

Anda punya **2 kemungkinan Supabase project:**

### Option 1: Project LAMA (dari credentials awal)
- **Project Ref:** `qjzdzkdwtsszqjvxeiqv`
- **URL:** `https://qjzdzkdwtsszqjvxeiqv.supabase.co`
- **ANON KEY:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I`

### Option 2: Project BARU
- **Project Ref:** (yang Anda buat baru)
- **URL:** `https://[NEW_REF].supabase.co`
- **ANON KEY:** (baru, berbeda dari yang lama)

---

## 🎯 LANGKAH 1: TENTUKAN PROJECT MANA YANG DIPAKAI

### A. Cek Project di Website
1. Buka file: `app/checkout/page.tsx` di repository
2. Cari baris ini:
   ```typescript
   const edgeFunctionUrl = process.env.NEXT_PUBLIC_DUITKU_CHECKOUT_URL || 
                          'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout';
   ```
3. **Project reference di code:** `qjzdzkdwtsszqjvxeiqv`

### B. Cek Project di Vercel
1. Login ke Vercel: https://vercel.com
2. Select project: `oasis-bi-pro`
3. Go to Settings > Environment Variables
4. Cari: `NEXT_PUBLIC_SUPABASE_URL`
5. **Lihat URL-nya**, ambil project reference dari URL

### C. Kesimpulan
**GUNAKAN PROJECT YANG SAMA dengan yang di Vercel!**

Jika Vercel pakai `qjzdzkdwtsszqjvxeiqv`, maka deploy ke project itu.

---

## 🚀 LANGKAH 2: DEPLOY KE PROJECT YANG BENAR

### A. Login ke Supabase Dashboard

1. Buka: https://supabase.com/dashboard
2. **Pilih project:** `qjzdzkdwtsszqjvxeiqv` (atau yang sesuai)
3. Pastikan Anda di project yang BENAR (lihat URL dashboard)

### B. Deploy duitku-checkout Function

1. Click **"Edge Functions"** di sidebar kiri
2. Click tombol **"New Function"** (hijau, pojok kanan atas)
3. Isi form:
   - **Function name:** `duitku-checkout`
   - **Verify JWT:** **OFF** (MATIKAN!)

4. **Copy-paste code ini** ke editor:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'
const DUITKU_BASE_URL = 'https://api.duitku.com/webapi/v1/payment'
const CALLBACK_URL = Deno.env.get('DUITKU_CALLBACK_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback'
const RETURN_URL = 'https://www.oasis-bi-pro.web.id/payment/success'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const PLANS = {
  starter: { name: 'Starter Plan', price: 50000, description: 'Paket Starter OASIS BI PRO' },
  professional: { name: 'Professional Plan', price: 100000, description: 'Paket Professional OASIS BI PRO' },
  enterprise: { name: 'Enterprise Plan', price: 200000, description: 'Paket Enterprise OASIS BI PRO' }
}

async function generateSignature(merchantCode: string, orderId: string, amount: string, apiKey: string): Promise<string> {
  const signatureString = merchantCode + orderId + amount + apiKey
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

    if (!planId || !email || !phoneNumber || !customerName) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: planId, email, phoneNumber, customerName' 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

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

    const orderId = `OASIS-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
    console.log('🆔 Order ID:', orderId)

    const amount = plan.price
    const signature = await generateSignature(DUITKU_MERCHANT_CODE, orderId, amount.toString(), DUITKU_API_KEY)
    console.log('🔐 Signature generated')

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

    console.log('📤 Calling Duitku API')

    const duitkuResponse = await fetch(`${DUITKU_BASE_URL}/createInvoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duitkuPayload)
    })

    const duitkuData = await duitkuResponse.json()
    console.log('📥 Duitku response:', duitkuData)

    if (duitkuResponse.ok && duitkuData.paymentUrl) {
      console.log('✅ Payment URL:', duitkuData.paymentUrl)

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

5. **PENTING:** Scroll kebawah, pastikan **"Verify JWT" = OFF**
6. Click **"Deploy Function"**
7. Tunggu sampai selesai (30-60 detik)

### C. Deploy duitku-callback Function

Ulangi langkah B di atas, tapi:
- **Function name:** `duitku-callback`
- **Code:** (lihat di section berikutnya)

**Code untuk duitku-callback:**

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

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

    if (!merchantCode || !amount || !merchantOrderId || !signature || !resultCode) {
      console.error('❌ Missing fields')
      return new Response('Missing fields', { status: 400 })
    }

    if (merchantCode !== DUITKU_MERCHANT_CODE) {
      console.error('❌ Invalid merchant code')
      return new Response('Invalid merchant', { status: 400 })
    }

    const localSignature = await generateSignature(merchantCode, amount, merchantOrderId, DUITKU_API_KEY)
    if (localSignature !== signature) {
      console.error('❌ Invalid signature')
      return new Response('Invalid signature', { status: 400 })
    }
    console.log('✅ Signature verified')

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

---

## 🔐 LANGKAH 3: SET ENVIRONMENT SECRETS

**DI PROJECT YANG SAMA dengan deployment functions!**

1. Go to **"Project Settings"** (icon gear)
2. Click **"Edge Functions"** di menu kiri
3. Scroll ke **"Secrets"**
4. Click **"Add Secret"**

**Add these secrets ONE BY ONE:**

```bash
# Secret 1
Name: DUITKU_MERCHANT_CODE
Value: D20919

# Secret 2
Name: DUITKU_API_KEY
Value: 17d9d5e20fbf4763a44c41a1e95cb7cb

# Secret 3
Name: DUITKU_CALLBACK_URL
Value: https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback

# Secret 4
Name: SUPABASE_URL
Value: https://qjzdzkdwtsszqjvxeiqv.supabase.co

# Secret 5
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs
```

**IMPORTANT:** Jika project reference berbeda, update URL-nya!

---

## ✅ LANGKAH 4: TEST DEPLOYMENT

### Test dengan Curl

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

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://app.duitku.com/...",
    "orderId": "OASIS-...",
    "amount": 50000
  }
}
```

**If you get HTTP 405:**
- Check: Function deployed?
- Check: JWT verification = OFF?
- Check: Using correct project?
- Check: Using correct ANON KEY?

---

## 🔍 LANGKAH 5: VERIFY DEPLOYMENT

### A. Check Functions List
1. Go to Edge Functions page
2. **You should see 2 functions:**
   - ✅ duitku-checkout (deployed)
   - ✅ duitku-callback (deployed)

### B. Check Function Logs
1. Click function name
2. Go to "Logs" tab
3. Invoke function with curl
4. **You should see logs appear**

### C. Check Secrets
1. Go to Project Settings > Edge Functions
2. **You should see 5 secrets listed**

---

## 🆘 TROUBLESHOOTING

### Problem: Function tidak muncul di list
**Solution:** Deploy lagi, pastikan di project yang benar

### Problem: HTTP 405 masih muncul
**Solution:** 
- Check JWT verification = OFF
- Check project reference sama dengan Vercel
- Check ANON KEY correct

### Problem: Logs kosong
**Solution:**
- Invoke function with curl
- Check secrets sudah di-set
- Check function code benar

### Problem: Database error
**Solution:**
- Check SERVICE_ROLE_KEY correct
- Check table `transactions` exist
- Check table structure match

---

## ✅ SUCCESS CRITERIA

**Deployment berhasil jika:**
- ✅ Functions muncul di Edge Functions list
- ✅ Test curl return HTTP 200 + payment URL
- ✅ Logs menunjukkan activity
- ✅ Test di website: NO error 405
- ✅ Redirect ke Duitku payment page

---

## 📋 FINAL CHECKLIST

- [ ] Tentukan project reference yang benar
- [ ] Login ke Supabase Dashboard (project yang tepat)
- [ ] Deploy duitku-checkout (JWT = OFF)
- [ ] Deploy duitku-callback (JWT = OFF)
- [ ] Set 5 environment secrets
- [ ] Test dengan curl (dapat payment URL)
- [ ] Test di website (no error 405)
- [ ] Check logs (ada activity)

---

**Status:** Ready untuk deployment  
**Estimasi waktu:** 30 menit  
**Priority:** HIGH - Must deploy ke project yang tepat!

**GOOD LUCK!** 🚀
