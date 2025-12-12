// ============================================================================
// SUPABASE EDGE FUNCTION: DUITKU CALLBACK
// ============================================================================
// Purpose: Handle payment notifications from Duitku
// Runs on: Deno Deploy
// Actions: Verify signature, update database, activate subscriptions
// ============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

// ============================================================================
// CONFIGURATION & CREDENTIALS
// ============================================================================
const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// ============================================================================
// SHA256 SIGNATURE GENERATOR (for verification)
// ============================================================================
async function generateSignature(
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  apiKey: string
): Promise<string> {
  const signatureString = merchantCode + amount + merchantOrderId + apiKey
  const encoder = new TextEncoder()
  const data = encoder.encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
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
    
    // Parse callback data
    const callbackData = await req.json()
    console.log('📋 Callback data:', callbackData)

    const {
      merchantCode,
      amount,
      merchantOrderId,
      signature,
      resultCode,
      reference
    } = callbackData

    // Validate required fields
    if (!merchantCode || !amount || !merchantOrderId || !signature || !resultCode) {
      console.error('❌ Missing required callback fields')
      return new Response('Missing required fields', { status: 400 })
    }

    // 1. VERIFY MERCHANT CODE
    if (merchantCode !== DUITKU_MERCHANT_CODE) {
      console.error('❌ Invalid merchant code:', merchantCode)
      return new Response('Invalid merchant code', { status: 400 })
    }
    console.log('✅ Merchant code verified')

    // 2. VERIFY SIGNATURE
    const localSignature = await generateSignature(
      merchantCode,
      amount,
      merchantOrderId,
      DUITKU_API_KEY
    )

    if (localSignature !== signature) {
      console.error('❌ Invalid signature')
      console.error('   Expected:', localSignature)
      console.error('   Received:', signature)
      return new Response('Invalid signature', { status: 400 })
    }
    console.log('✅ Signature verified')

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
        duitku_reference: reference || callbackData.reference
      })
      .eq('order_id', merchantOrderId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Database update failed:', updateError.message)
      return new Response('Database update failed', { status: 500 })
    }

    console.log('💾 Transaction updated:', transactionData)

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
        }
      } catch (subscriptionError) {
        console.error('⚠️ Subscription error:', subscriptionError)
      }
    }

    // 6. SEND SUCCESS RESPONSE TO DUITKU
    // CRITICAL: Must return 200 OK to acknowledge receipt
    console.log('✅ CALLBACK PROCESSED SUCCESSFULLY')
    return new Response('OK', { 
      status: 200,
      headers: corsHeaders
    })

  } catch (error) {
    console.error('💥 CALLBACK ERROR:', error)
    
    // Still return 200 to Duitku to prevent retries
    // Log error for investigation
    return new Response('OK', { 
      status: 200,
      headers: corsHeaders
    })
  }
})

console.log('✅ Duitku Callback Edge Function is running')
