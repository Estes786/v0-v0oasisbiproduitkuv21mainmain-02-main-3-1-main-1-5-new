// ============================================================================
// SUPABASE EDGE FUNCTION: DUITKU CALLBACK (POP INTEGRATION)
// ============================================================================
// Purpose: Handle payment notifications from Duitku
// Documentation: https://docs.duitku.com/pop/en/#callback
// Environment: PRODUCTION & SANDBOX supported
// Version: 3.0 (Production Ready with optimized MD5)
// ============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import CryptoJS from 'https://esm.sh/crypto-js@4.2.0'

// ============================================================================
// CONFIGURATION & CREDENTIALS
// ============================================================================
// Environment detection
const ENVIRONMENT = Deno.env.get('ENVIRONMENT') || 'sandbox'
const IS_PRODUCTION = ENVIRONMENT === 'production'

// Duitku credentials
const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'

// Supabase configuration
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 
  'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// ============================================================================
// MD5 HASH FUNCTION (for callback signature verification)
// Documentation: MD5(merchantCode + amount + merchantOrderId + merchantKey)
// CRITICAL: Callback uses MD5, NOT SHA256!
// Formula dari dokumentasi resmi Duitku: https://docs.duitku.com/pop/en/#callback
// ============================================================================
function generateCallbackSignature(
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  merchantKey: string
): string {
  // Concatenate parameters sesuai formula Duitku
  const signatureString = `${merchantCode}${amount}${merchantOrderId}${merchantKey}`
  
  // Generate MD5 hash
  const hash = CryptoJS.MD5(signatureString)
  
  // Return as hexadecimal string (lowercase)
  return hash.toString(CryptoJS.enc.Hex).toLowerCase()
}

// ============================================================================
// CORS HEADERS
// ============================================================================
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Handle GET request (for health check and browser testing)
  if (req.method === 'GET') {
    console.log('🔍 GET request received (health check)')
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Duitku Callback endpoint is running',
        version: '3.0',
        environment: ENVIRONMENT,
        mode: IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX',
        acceptedMethods: ['POST'],
        usage: 'POST payment callback data to this endpoint'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  if (req.method !== 'POST') {
    return new Response(
     JSON.stringify({ success: false, error: 'Method not allowed. Use POST for callbacks.' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    console.log('📞 CALLBACK RECEIVED FROM DUITKU')
    
    // Parse callback data (form-urlencoded OR JSON)
    const contentType = req.headers.get('content-type') || ''
    let callbackData: any = {}

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData()
      callbackData = Object.fromEntries(formData)
      console.log('📋 Parsed form-urlencoded data')
    } else if (contentType.includes('application/json')) {
      callbackData = await req.json()
      console.log('📋 Parsed JSON data')
    } else {
      console.warn('⚠️ Unexpected content-type:', contentType)
      // Try parsing as JSON first, then form data
      try {
        callbackData = await req.json()
      } catch {
        try {
          const formData = await req.formData()
          callbackData = Object.fromEntries(formData)
        } catch (parseError) {
          console.error('❌ Failed to parse request body:', parseError)
          return new Response('Invalid request body', { status: 400 })
        }
      }
    }

    console.log('📋 Callback data received:', {
      merchantCode: callbackData.merchantCode,
      amount: callbackData.amount,
      merchantOrderId: callbackData.merchantOrderId,
      resultCode: callbackData.resultCode,
      reference: callbackData.reference,
      hasSignature: !!callbackData.signature
    })

    const {
      merchantCode,
      amount,
      merchantOrderId,
      signature,
      resultCode,
      reference,
      paymentCode
    } = callbackData

    // Validate required fields
    if (!merchantCode || !amount || !merchantOrderId || !signature || !resultCode) {
      console.error('❌ Missing required callback fields')
      console.error('   Required: merchantCode, amount, merchantOrderId, signature, resultCode')
      console.error('   Received fields:', Object.keys(callbackData))
      return new Response('Missing required fields', { status: 400 })
    }

    // 1. VERIFY MERCHANT CODE
    if (merchantCode !== DUITKU_MERCHANT_CODE) {
      console.error('❌ Invalid merchant code')
      console.error('   Expected:', DUITKU_MERCHANT_CODE)
      console.error('   Received:', merchantCode)
      return new Response('Invalid merchant code', { status: 400 })
    }
    console.log('✅ Merchant code verified')

    // 2. VERIFY SIGNATURE (MD5)
    // Generate expected signature using exact same formula as Duitku
    const localSignature = generateCallbackSignature(
      merchantCode,
      amount,
      merchantOrderId,
      DUITKU_API_KEY
    )

    console.log('🔐 Signature verification:')
    console.log('   Formula: MD5(merchantCode + amount + merchantOrderId + merchantKey)')
    console.log('   Merchant Code:', merchantCode)
    console.log('   Amount:', amount)
    console.log('   Order ID:', merchantOrderId)
    console.log('   Input concatenated: ' + merchantCode + amount + merchantOrderId + '[MERCHANT_KEY_HIDDEN]')
    console.log('   Expected (local):', localSignature)
    console.log('   Received (Duitku):', signature)

    // Compare signatures (case-insensitive)
    const receivedSignature = String(signature).toLowerCase().trim()
    if (localSignature !== receivedSignature) {
      console.error('❌ SIGNATURE MISMATCH!')
      console.error('   Expected:', localSignature)
      console.error('   Received:', receivedSignature)
      console.error('   Length expected:', localSignature.length)
      console.error('   Length received:', receivedSignature.length)
      return new Response('Invalid signature', { status: 400 })
    }
    console.log('✅ Signature verified successfully (MD5)')

    // 3. DETERMINE PAYMENT STATUS
    // Dokumentasi: 00 = Success, 02 = Failed (tidak ada 01 di callback)
    let newStatus = 'PENDING'
    let paymentSuccess = false

    const resultCodeStr = String(resultCode).trim()
    
    switch (resultCodeStr) {
      case '00':
        newStatus = 'SUCCESS'
        paymentSuccess = true
        console.log('✅ Payment SUCCESS (Result Code: 00)')
        break
      case '02':
        newStatus = 'FAILED'
        console.log('❌ Payment FAILED (Result Code: 02)')
        break
      default:
        // Any other result code is treated as FAILED
        newStatus = 'FAILED'
        console.log('❌ Payment FAILED (Unknown Result Code: ' + resultCodeStr + ')')
        break
    }

    // 4. UPDATE DATABASE
    if (!SERVICE_ROLE_KEY) {
      console.error('⚠️ SERVICE_ROLE_KEY not configured')
      // Still return 200 to prevent Duitku retries
      return new Response('OK', { status: 200, headers: corsHeaders })
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    })

    // Update transaction status in database
    const { data: transactionData, error: updateError } = await supabase
      .from('transactions')
      .update({
        status: newStatus,
        payment_confirmed_at: new Date().toISOString(),
        is_paid: paymentSuccess,
        duitku_result_code: resultCode,
        duitku_reference: reference || '',
        payment_code: paymentCode || ''
      })
      .eq('order_id', merchantOrderId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Database update failed:', updateError.message)
      console.error('   Order ID:', merchantOrderId)
      console.error('   Error details:', updateError)
      // Still return 200 to prevent Duitku retries
      return new Response('OK', { status: 200, headers: corsHeaders })
    }

    console.log('💾 Transaction updated:', {
      orderId: transactionData.order_id,
      status: transactionData.status,
      isPaid: transactionData.is_paid
    })

    // 5. ACTIVATE SUBSCRIPTION (if payment successful)
    if (paymentSuccess && transactionData) {
      try {
        // Calculate subscription period (30 days from now)
        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)

        // Create or update subscription
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            user_email: transactionData.customer_email,
            plan_type: transactionData.plan_type,
            status: 'ACTIVE',
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            transaction_id: transactionData.id,
            is_active: true
          }, {
            onConflict: 'user_email'
          })

        if (subscriptionError) {
          console.error('⚠️ Subscription activation failed:', subscriptionError.message)
        } else {
          console.log('🎉 Subscription activated successfully')
          console.log('   User email:', transactionData.customer_email)
          console.log('   Plan type:', transactionData.plan_type)
          console.log('   Valid until:', endDate.toISOString())
        }
      } catch (subscriptionError) {
        console.error('⚠️ Subscription error:', subscriptionError)
      }
    }

    // 6. SEND SUCCESS RESPONSE TO DUITKU
    // CRITICAL: Must return 200 OK to acknowledge receipt
    console.log('✅ CALLBACK PROCESSED SUCCESSFULLY')
    console.log('   Order ID:', merchantOrderId)
    console.log('   Status:', newStatus)
    console.log('   Reference:', reference)
    
    return new Response('OK', { 
      status: 200,
      headers: corsHeaders
    })

  } catch (error) {
    console.error('💥 CALLBACK ERROR:', error)
    console.error('   Error details:', error instanceof Error ? error.stack : error)
    
    // Still return 200 to Duitku to prevent retries
    // Log error for investigation
    return new Response('OK', { 
      status: 200,
      headers: corsHeaders
    })
  }
})

console.log('✅ Duitku Callback Edge Function is running (v3.0 - Production Ready)')
console.log('   Environment:', ENVIRONMENT)
console.log('   Mode:', IS_PRODUCTION ? '🔴 PRODUCTION (LIVE)' : '🟡 SANDBOX (TEST)')
console.log('   Merchant Code:', DUITKU_MERCHANT_CODE)
console.log('   Signature Method: MD5 (crypto-js - optimized)')
console.log('   Formula: MD5(merchantCode + amount + merchantOrderId + merchantKey)')
console.log('')
console.log('   ⚠️  WARNING: PRODUCTION mode processes REAL payment callbacks!')
console.log('   📚 Documentation: https://docs.duitku.com/pop/en/#callback')
