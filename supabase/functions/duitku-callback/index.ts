// Supabase Edge Function for Duitku Callback
// Handles payment notifications from Duitku
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Duitku Configuration
const DUITKU_CONFIG = {
  merchantCode: Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919',
  apiKey: Deno.env.get('DUITKU_API_KEY') || '',
}

// Verify callback signature from Duitku
async function verifyDuitkuCallback(
  merchantOrderId: string,
  amount: string,
  signature: string
): Promise<boolean> {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  const signatureString = `${merchantCode}${amount}${merchantOrderId}${apiKey}`
  
  // MD5 hash for callback verification
  const msgUint8 = new TextEncoder().encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('MD5', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return signature.toLowerCase() === expectedSignature.toLowerCase()
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📨 DUITKU CALLBACK RECEIVED')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📦 Callback data:', body)

    const {
      merchantOrderId,
      amount,
      signature,
      resultCode,
      merchantUserId,
      reference,
      paymentMethod,
    } = body

    // Validate required fields
    if (!merchantOrderId || !amount || !signature) {
      console.error('❌ Missing required callback fields')
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Verify signature
    const isValidSignature = await verifyDuitkuCallback(merchantOrderId, amount, signature)
    
    if (!isValidSignature) {
      console.error('❌ Invalid signature!')
      console.error('   Expected signature format: MD5(merchantCode + amount + merchantOrderId + apiKey)')
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid signature' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('✅ Signature verified')

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Determine payment status
    const paymentStatus = resultCode === '00' ? 'success' : 'failed'
    console.log(`💳 Payment Status: ${paymentStatus} (Code: ${resultCode})`)

    // Update transaction in database
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .update({
        status: paymentStatus,
        payment_method: paymentMethod,
        reference: reference,
        result_code: resultCode,
        updated_at: new Date().toISOString(),
      })
      .eq('merchant_order_id', merchantOrderId)
      .select()
      .single()

    if (txError || !transaction) {
      console.error('❌ Transaction not found or update failed:', txError)
      return new Response(
        JSON.stringify({ success: false, error: 'Transaction not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('✅ Transaction updated:', transaction.id)

    // If payment successful, activate user subscription
    if (paymentStatus === 'success' && transaction.user_id) {
      try {
        // Update user subscription status
        const { error: userError } = await supabase
          .from('users')
          .update({
            subscription_status: 'active',
            subscription_plan: transaction.plan_id,
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
            updated_at: new Date().toISOString(),
          })
          .eq('id', transaction.user_id)

        if (userError) {
          console.error('⚠️ Failed to update user subscription:', userError)
        } else {
          console.log('✅ User subscription activated!')
        }

        // Create subscription record
        const { error: subError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: transaction.user_id,
            plan_id: transaction.plan_id,
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: parseInt(amount),
            payment_method: paymentMethod,
            transaction_id: transaction.id,
          })

        if (subError) {
          console.error('⚠️ Failed to create subscription record:', subError)
        } else {
          console.log('✅ Subscription record created!')
        }
      } catch (error) {
        console.error('⚠️ Error activating subscription:', error)
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ CALLBACK PROCESSED SUCCESSFULLY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Callback processed',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('💥 CALLBACK ERROR:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
