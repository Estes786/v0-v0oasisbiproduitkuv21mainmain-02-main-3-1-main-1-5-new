// Supabase Edge Function for Duitku Checkout
// This runs on Deno Deploy with better network access than Vercel
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
  baseUrl: Deno.env.get('DUITKU_API_URL') || 'https://api.duitku.com/webapi/v1/payment',
  returnUrl: Deno.env.get('DUITKU_RETURN_URL') || 'https://www.oasis-bi-pro.web.id/payment/success',
  callbackUrl: Deno.env.get('DUITKU_CALLBACK_URL') || 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
}

// Subscription Plans
const SUBSCRIPTION_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    price: 99000,
  },
  professional: {
    id: 'professional',
    name: 'Professional Plan',
    price: 299000,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 999000,
  },
}

// Generate SHA256 signature for Duitku Pop API
async function generatePopSignature(timestamp: number): Promise<string> {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  const signatureString = `${merchantCode}${timestamp}${apiKey}`
  
  const msgUint8 = new TextEncoder().encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

// Generate unique merchant order ID
function generateMerchantOrderId(planId: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `OASIS-${planId.toUpperCase()}-${timestamp}-${random}`
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { planId, email, phoneNumber, customerName, userId } = await req.json()

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🛒 CHECKOUT REQUEST RECEIVED (Edge Function)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📦 Request data:', { planId, email, phoneNumber, customerName, userId })

    // Validate required fields
    if (!planId || !email || !phoneNumber || !customerName) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: planId, email, phoneNumber, customerName',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Validate plan exists
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    if (!plan) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid plan ID: ${planId}`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('✅ Plan validated:', plan.name, '-', plan.price, 'IDR')

    // Generate unique order ID
    const merchantOrderId = generateMerchantOrderId(planId)
    console.log('🔑 Generated Order ID:', merchantOrderId)

    // Generate timestamp and signature
    const timestamp = Date.now()
    const signature = await generatePopSignature(timestamp)

    console.log('🔐 Signature Generation (SHA256):')
    console.log('   Timestamp:', timestamp)
    console.log('   Signature:', signature)

    // Prepare request body
    const requestBody = {
      paymentAmount: plan.price,
      merchantOrderId: merchantOrderId,
      productDetails: `${plan.name} - OASIS BI PRO Subscription`,
      email: email,
      phoneNumber: phoneNumber,
      customerVaName: customerName,
      callbackUrl: DUITKU_CONFIG.callbackUrl,
      returnUrl: DUITKU_CONFIG.returnUrl,
      expiryPeriod: 60,
    }

    // Retry mechanism for network resilience
    const MAX_RETRIES = 3
    const RETRY_DELAY = 1000

    let lastError: Error | null = null
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const endpoint = `${DUITKU_CONFIG.baseUrl}/createInvoice`
        console.log(`📤 Sending request to: ${endpoint} (Attempt ${attempt}/${MAX_RETRIES})`)

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Duitku-Signature': signature,
            'X-Duitku-Timestamp': timestamp.toString(),
            'X-Duitku-Merchantcode': DUITKU_CONFIG.merchantCode,
            'X-Duitku-Client': 'sdk-node',
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('❌ Duitku API Error:', errorData)
          throw new Error(`Duitku API Error (${response.status}): ${errorData.message || errorData.statusMessage}`)
        }

        const result = await response.json()
        console.log('✅ Payment URL generated:', result.paymentUrl)
        console.log('✅ Duitku Reference:', result.reference)

        // Save pending transaction to database if userId provided
        if (userId) {
          try {
            const supabaseUrl = Deno.env.get('SUPABASE_URL')!
            const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
            const supabase = createClient(supabaseUrl, supabaseKey)

            await supabase.from('transactions').insert({
              user_id: userId,
              merchant_order_id: merchantOrderId,
              amount: plan.price,
              plan_id: planId,
              status: 'pending',
              payment_url: result.paymentUrl,
              reference: result.reference,
            })

            console.log('✅ Transaction saved to database')
          } catch (dbError) {
            console.error('⚠️ Database error (non-blocking):', dbError)
          }
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('✅ CHECKOUT COMPLETED SUCCESSFULLY')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

        return new Response(
          JSON.stringify({
            success: true,
            data: {
              paymentUrl: result.paymentUrl,
              reference: result.reference,
              merchantOrderId: merchantOrderId,
              amount: plan.price,
              planName: plan.name,
            },
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      } catch (error) {
        lastError = error as Error
        
        if (attempt < MAX_RETRIES) {
          console.warn(`⚠️ Attempt ${attempt}/${MAX_RETRIES} failed, retrying in ${RETRY_DELAY}ms...`)
          console.warn('   Error:', lastError.message)
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
          continue
        }
      }
    }

    // All retries failed
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('💥 ALL RETRY ATTEMPTS FAILED')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('   Error:', lastError)

    return new Response(
      JSON.stringify({
        success: false,
        error: lastError?.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('💥 CHECKOUT ERROR:', error)

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
