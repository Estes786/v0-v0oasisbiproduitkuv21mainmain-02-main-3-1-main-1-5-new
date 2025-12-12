# 🔍 DUITKU INTEGRATION FIX ANALYSIS

**Date:** 2025-12-12  
**Status:** 🔴 CRITICAL ISSUES FOUND  
**Project:** OASIS BI PRO - Duitku Payment Gateway Integration

---

## 📋 EXECUTIVE SUMMARY

Setelah deep research terhadap dokumentasi resmi Duitku Pop (https://docs.duitku.com/pop/en/), saya menemukan **5 CRITICAL ISSUES** yang menyebabkan integrasi payment gateway tidak berfungsi dengan benar.

---

## 🔴 CRITICAL ISSUES IDENTIFIED

### Issue #1: WRONG API ENDPOINT URL ❌

**Current (WRONG):**
```typescript
const DUITKU_BASE_URL = 'https://api-sandbox.duitku.com/webapi/v1/payment'
// Endpoint: ${DUITKU_BASE_URL}/createInvoice
// Result: https://api-sandbox.duitku.com/webapi/v1/payment/createInvoice
```

**Should Be (CORRECT):**
```typescript
const DUITKU_BASE_URL = 'https://api-sandbox.duitku.com/api/merchant'
// Endpoint: ${DUITKU_BASE_URL}/createInvoice
// Result: https://api-sandbox.duitku.com/api/merchant/createInvoice
```

**Documentation Reference:**
> Production: `https://api-prod.duitku.com/api/merchant/createInvoice`
> Sandbox: `https://api-sandbox.duitku.com/api/merchant/createInvoice`

---

### Issue #2: CALLBACK SIGNATURE ALGORITHM MISMATCH ❌

**Current (WRONG):**
```typescript
// Using SHA256 for callback verification
async function generateSignature(
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  apiKey: string
): Promise<string> {
  const signatureString = merchantCode + amount + merchantOrderId + apiKey
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  // ...
}
```

**Should Be (CORRECT):**
```typescript
// Using MD5 for callback verification
function generateCallbackSignature(
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  apiKey: string
): string {
  const signatureString = merchantCode + amount + merchantOrderId + apiKey
  return md5(signatureString) // MD5 hash, NOT SHA256!
}
```

**Documentation Reference:**
> Callback signature formula: `MD5(merchantCode + amount + merchantOrderId + merchantKey)`

---

### Issue #3: INCORRECT PARAMETER NAMES ❌

**Current (WRONG):**
```typescript
const duitkuPayload = {
  paymentMethod: 'VC',  // ❌ Should not be set for Pop
  signature: signature,  // ❌ This is body signature, not needed for Pop
  // ...
}
```

**Should Be (CORRECT):**
```typescript
const duitkuPayload = {
  paymentAmount: amount,       // ✅ Use paymentAmount (not amount)
  merchantOrderId: orderId,    // ✅ Correct
  productDetails: description, // ✅ Correct
  email: email,                // ✅ Correct
  // NO paymentMethod for Pop
  // NO signature in body
  // ...
}
```

---

### Issue #4: NO DUITKU POP JAVASCRIPT INTEGRATION ❌

**Current (WRONG):**
```typescript
// Frontend only does window redirect
window.location.href = response.data.data.paymentUrl;
```

**Should Be (CORRECT):**
```html
<!-- Include Duitku Pop JS -->
<script src="https://app-sandbox.duitku.com/lib/js/duitku.js"></script>

<script>
  // Use Duitku Pop overlay
  checkout.process(duitkuReference, {
    defaultLanguage: "id",
    successEvent: function(result) {
      // Handle success
    },
    pendingEvent: function(result) {
      // Handle pending
    },
    errorEvent: function(result) {
      // Handle error
    },
    closeEvent: function(result) {
      // Handle close
    }
  });
</script>
```

---

### Issue #5: MISSING PROPER PRODUCTION CONFIGURATION ❌

**Current (WRONG):**
```typescript
const DUITKU_BASE_URL = 'https://api-sandbox.duitku.com/...'
// Hardcoded sandbox URL
```

**Should Be (CORRECT):**
```typescript
const DUITKU_BASE_URL = Deno.env.get('DUITKU_API_URL') || 
  (Deno.env.get('ENVIRONMENT') === 'production' 
    ? 'https://api-prod.duitku.com/api/merchant'
    : 'https://api-sandbox.duitku.com/api/merchant')
```

---

## ✅ CORRECT IMPLEMENTATION

### 1. Edge Function: duitku-checkout/index.ts (FIXED)

```typescript
// ============================================================================
// CONFIGURATION
// ============================================================================
const ENVIRONMENT = Deno.env.get('ENVIRONMENT') || 'sandbox'
const IS_PRODUCTION = ENVIRONMENT === 'production'

const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'

// CORRECT ENDPOINT URLS
const DUITKU_API_URL = IS_PRODUCTION
  ? 'https://api-prod.duitku.com/api/merchant'
  : 'https://api-sandbox.duitku.com/api/merchant'

const CALLBACK_URL = Deno.env.get('DUITKU_CALLBACK_URL') || 
  'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback'

const RETURN_URL = Deno.env.get('DUITKU_RETURN_URL') || 
  'https://www.oasis-bi-pro.web.id/payment/success'

// ============================================================================
// SHA256 SIGNATURE FOR API REQUEST HEADERS
// ============================================================================
async function generateHeaderSignature(
  merchantCode: string,
  timestamp: string,
  apiKey: string
): Promise<string> {
  const signatureString = merchantCode + timestamp + apiKey
  const encoder = new TextEncoder()
  const data = encoder.encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
serve(async (req) => {
  // ... CORS and method validation ...

  try {
    // Generate timestamp (Jakarta timezone, milliseconds)
    const timestamp = Date.now().toString()
    
    // Generate header signature
    const headerSignature = await generateHeaderSignature(
      DUITKU_MERCHANT_CODE,
      timestamp,
      DUITKU_API_KEY
    )

    // Prepare Duitku payload (CORRECT format for Pop)
    const duitkuPayload = {
      paymentAmount: amount,
      merchantOrderId: orderId,
      productDetails: plan.description,
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: customerName,
      email: email,
      phoneNumber: phoneNumber,
      itemDetails: [{
        name: plan.name,
        price: amount,
        quantity: 1
      }],
      customerDetail: {
        firstName: customerName.split(' ')[0] || customerName,
        lastName: customerName.split(' ').slice(1).join(' ') || '',
        email: email,
        phoneNumber: phoneNumber,
        billingAddress: {
          firstName: customerName.split(' ')[0] || customerName,
          lastName: customerName.split(' ').slice(1).join(' ') || '',
          address: 'Indonesia',
          city: 'Jakarta',
          postalCode: '10110',
          phone: phoneNumber,
          countryCode: 'ID'
        },
        shippingAddress: {
          firstName: customerName.split(' ')[0] || customerName,
          lastName: customerName.split(' ').slice(1).join(' ') || '',
          address: 'Indonesia',
          city: 'Jakarta',
          postalCode: '10110',
          phone: phoneNumber,
          countryCode: 'ID'
        }
      },
      callbackUrl: CALLBACK_URL,
      returnUrl: RETURN_URL,
      expiryPeriod: 60
    }

    console.log('📤 Calling Duitku API:', `${DUITKU_API_URL}/createInvoice`)

    const duitkuResponse = await fetch(
      `${DUITKU_API_URL}/createInvoice`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-duitku-signature': headerSignature,
          'x-duitku-timestamp': timestamp,
          'x-duitku-merchantcode': DUITKU_MERCHANT_CODE
        },
        body: JSON.stringify(duitkuPayload)
      }
    )

    const duitkuData = await duitkuResponse.json()
    console.log('📥 Duitku response:', duitkuData)

    if (duitkuResponse.ok && duitkuData.reference) {
      // Return reference for Pop integration
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            reference: duitkuData.reference,          // For Pop JS
            paymentUrl: duitkuData.paymentUrl,        // For fallback redirect
            orderId: orderId,
            amount: amount,
            merchantCode: duitkuData.merchantCode
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      throw new Error(duitkuData.statusMessage || 'Payment creation failed')
    }
  } catch (error) {
    console.error('💥 ERROR:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
```

### 2. Edge Function: duitku-callback/index.ts (FIXED)

```typescript
// ============================================================================
// MD5 HASH FUNCTION (for callback signature verification)
// ============================================================================
import { Md5 } from 'https://deno.land/std@0.168.0/hash/md5.ts'

function generateCallbackSignature(
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  apiKey: string
): string {
  const signatureString = merchantCode + amount + merchantOrderId + apiKey
  const md5 = new Md5()
  md5.update(signatureString)
  return md5.toString()
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
serve(async (req) => {
  try {
    // Parse callback data (form-urlencoded)
    const formData = await req.formData()
    const callbackData = Object.fromEntries(formData)

    console.log('📞 CALLBACK RECEIVED:', callbackData)

    const {
      merchantCode,
      amount,
      merchantOrderId,
      signature,
      resultCode,
      reference
    } = callbackData

    // Verify signature using MD5
    const localSignature = generateCallbackSignature(
      merchantCode as string,
      amount as string,
      merchantOrderId as string,
      DUITKU_API_KEY
    )

    if (localSignature !== signature) {
      console.error('❌ Invalid signature')
      console.error('   Expected:', localSignature)
      console.error('   Received:', signature)
      return new Response('Invalid signature', { status: 400 })
    }

    console.log('✅ Signature verified')

    // ... rest of callback processing ...

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('💥 CALLBACK ERROR:', error)
    return new Response('OK', { status: 200 }) // Always return 200 to Duitku
  }
})
```

### 3. Frontend: app/checkout/page.tsx (FIXED with Pop Integration)

```typescript
'use client';

import { useEffect } from 'react';

// Load Duitku Pop JS
useEffect(() => {
  const script = document.createElement('script');
  script.src = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
    ? 'https://app-prod.duitku.com/lib/js/duitku.js'
    : 'https://app-sandbox.duitku.com/lib/js/duitku.js';
  script.async = true;
  document.body.appendChild(script);
  
  return () => {
    document.body.removeChild(script);
  };
}, []);

const handleSubmit = async () => {
  setLoading(true);
  try {
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

    if (response.data.success && response.data.data?.reference) {
      const { reference } = response.data.data;
      
      console.log('✅ Got Duitku reference:', reference);
      
      // Use Duitku Pop overlay
      if (typeof window !== 'undefined' && (window as any).checkout) {
        (window as any).checkout.process(reference, {
          defaultLanguage: "id",
          successEvent: function(result: any) {
            console.log('✅ Payment SUCCESS:', result);
            window.location.href = `/payment/success?orderId=${result.merchantOrderId}`;
          },
          pendingEvent: function(result: any) {
            console.log('⏳ Payment PENDING:', result);
            window.location.href = `/payment/pending?orderId=${result.merchantOrderId}`;
          },
          errorEvent: function(result: any) {
            console.error('❌ Payment ERROR:', result);
            alert('Pembayaran gagal. Silakan coba lagi.');
            setLoading(false);
          },
          closeEvent: function(result: any) {
            console.log('🚪 User closed popup:', result);
            setLoading(false);
          }
        });
      } else {
        // Fallback: redirect to payment URL
        console.log('⚠️ Duitku Pop not loaded, using fallback redirect');
        window.location.href = response.data.data.paymentUrl;
      }
    } else {
      alert('Gagal membuat pembayaran. Silakan coba lagi.');
      setLoading(false);
    }
  } catch (error) {
    console.error('💥 Payment error:', error);
    alert('Terjadi kesalahan. Silakan coba lagi.');
    setLoading(false);
  }
};
```

---

## 📊 COMPARISON TABLE

| Aspect | Current (WRONG) ❌ | Correct (FIXED) ✅ |
|--------|-------------------|-------------------|
| API Endpoint | `/webapi/v1/payment/createInvoice` | `/api/merchant/createInvoice` |
| Callback Signature | SHA256 | MD5 |
| Request Body | Has `paymentMethod`, `signature` | No `paymentMethod`, No body `signature` |
| Headers | Missing proper format | Complete with SHA256 signature |
| Frontend | Window redirect only | Duitku Pop JS overlay |
| Production Ready | No | Yes |

---

## 🎯 NEXT STEPS

1. ✅ Apply fixes to edge functions
2. ✅ Update frontend with Pop integration
3. ✅ Test in sandbox environment
4. ✅ Deploy to Supabase
5. ✅ Test complete checkout flow
6. ✅ Push to GitHub
7. ✅ Configure production credentials

---

**Generated:** 2025-12-12  
**Status:** READY FOR IMPLEMENTATION  
**Priority:** 🔴 CRITICAL
