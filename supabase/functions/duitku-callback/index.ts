// ============================================================================
// SUPABASE EDGE FUNCTION: DUITKU CALLBACK (POP INTEGRATION)
// ============================================================================
// Purpose: Handle payment notifications from Duitku
// Documentation: https://docs.duitku.com/pop/en/#callback
// Fixed: MD5 signature verification sesuai dokumentasi resmi
// ============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { Md5 } from 'https://deno.land/std@0.168.0/hash/md5.ts'

// ============================================================================
// CONFIGURATION & CREDENTIALS
// ============================================================================
const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 
  'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// ============================================================================
// MD5 SIGNATURE GENERATOR (for callback verification)
// Documentation: MD5(merchantCode + amount + merchantOrderId + apiKey)
// CRITICAL: Callback uses MD5, NOT SHA256!
// ============================================================================
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
// CORS HEADERS
// ============================================================================
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    console.log('📞 CALLBACK RECEIVED FROM DUITKU')
    
    // Parse callback data (form-urlencoded)
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
      // Try parsing as JSON anyway
      try {
        callbackData = await req.json()
      } catch {
        const formData = await req.formData()
        callbackData = Object.fromEntries(formData)
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
      console.error('   Received:', Object.keys(callbackData))
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
    const localSignature = generateCallbackSignature(
      merchantCode,
      amount,
      merchantOrderId,
      DUITKU_API_KEY
    )

    if (localSignature !== signature) {
      console.error('❌ Invalid signature (MD5)')
      console.error('   Expected:', localSignature)
      console.error('   Received:', signature)
      console.error('   Formula: MD5(merchantCode + amount + merchantOrderId + apiKey)')
      console.error('   Values:', {
        merchantCode,
        amount,
        merchantOrderId,
        apiKeyLength: DUITKU_API_KEY.length
      })
      return new Response('Invalid signature', { status: 400 })
    }
    console.log('✅ Signature verified (MD5)')

    // 3. DETERMINE PAYMENT STATUS
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

    // 4. UPDATE DATABASE
    if (!SERVICE_ROLE_KEY) {
      console.error('⚠️ SERVICE_ROLE_KEY not configured')
      return new Response('Server configuration error', { status: 500 })
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    })

    // Update transaction status
    const { data: transactionData, error: updateError } = await supabase
      .from('transactions')
      .update({
        status: newStatus,
        payment_confirmed_at: new Date().toISOString(),
        is_paid: paymentSuccess,
        duitku_result_code: resultCode,
        duitku_reference: reference || callbackData.reference,
        payment_code: paymentCode || callbackData.paymentCode
      })
      .eq('order_id', merchantOrderId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Database update failed:', updateError.message)
      console.error('   Order ID:', merchantOrderId)
      console.error('   Error details:', updateError)
      return new Response('Database update failed', { status: 500 })
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

console.log('✅ Duitku Callback Edge Function is running')
console.log('   Signature verification: MD5')
