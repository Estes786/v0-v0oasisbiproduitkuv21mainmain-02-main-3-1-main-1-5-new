// ============================================================================
// SUPABASE EDGE FUNCTION: DUITKU CHECKOUT (POP INTEGRATION)
// ============================================================================
// Purpose: Create Duitku payment invoice untuk Pop integration
// Documentation: https://docs.duitku.com/pop/en/
// Environment: PRODUCTION & SANDBOX supported
// Version: 3.0 (Production Ready)
// ============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

// ============================================================================
// CONFIGURATION & CREDENTIALS
// ============================================================================
const ENVIRONMENT = Deno.env.get('ENVIRONMENT') || 'sandbox'
const IS_PRODUCTION = ENVIRONMENT === 'production'

const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'

// CORRECT API ENDPOINTS (Fixed from wrong /webapi/v1/payment to /api/merchant)
const DUITKU_API_URL = IS_PRODUCTION
  ? 'https://api-prod.duitku.com/api/merchant'
  : 'https://api-sandbox.duitku.com/api/merchant'

const CALLBACK_URL = Deno.env.get('DUITKU_CALLBACK_URL') || 
  'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback'

const RETURN_URL = Deno.env.get('DUITKU_RETURN_URL') || 
  'https://www.oasis-bi-pro.web.id/payment/success'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 
  'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// ============================================================================
// PLAN CONFIGURATIONS
// ============================================================================
const PLANS = {
  starter: {
    name: 'Starter Plan',
    price: 50000,
    description: 'Paket Starter OASIS BI PRO'
  },
  professional: {
    name: 'Professional Plan',
    price: 100000,
    description: 'Paket Professional OASIS BI PRO'
  },
  enterprise: {
    name: 'Enterprise Plan',
    price: 200000,
    description: 'Paket Enterprise OASIS BI PRO'
  }
}

// ============================================================================
// SHA256 SIGNATURE GENERATOR FOR API REQUEST HEADERS
// Documentation: SHA256(merchantCode + timestamp + apiKey)
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
        message: 'Duitku Checkout endpoint is running',
        version: '3.0',
        environment: ENVIRONMENT,
        mode: IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX',
        acceptedMethods: ['POST'],
        usage: 'POST checkout data: { planId, email, phoneNumber, customerName }',
        availablePlans: Object.keys(PLANS)
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  if (req.method !== 'POST') {
    return new Response(
     JSON.stringify({ success: false, error: 'Method not allowed. Use POST for checkout.' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    console.log('🛒 CHECKOUT REQUEST RECEIVED')
    
    // Parse request body
    const body = await req.json()
    const { planId, email, phoneNumber, customerName } = body

    console.log('📋 Request data:', { planId, email, phoneNumber, customerName })

    // Validate required fields
    if (!planId || !email || !phoneNumber || !customerName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: planId, email, phoneNumber, customerName' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get plan details
    const plan = PLANS[planId as keyof typeof PLANS]
    if (!plan) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Invalid planId. Valid options: ${Object.keys(PLANS).join(', ')}` 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate order ID
    const orderId = `OASIS-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
    console.log('🆔 Generated order ID:', orderId)

    // Generate timestamp (Jakarta timezone, milliseconds)
    const timestamp = Date.now().toString()
    
    // Generate header signature (SHA256)
    const headerSignature = await generateHeaderSignature(
      DUITKU_MERCHANT_CODE,
      timestamp,
      DUITKU_API_KEY
    )
    console.log('🔐 Header signature generated successfully')

    // Split customer name for firstName/lastName
    const nameParts = customerName.trim().split(' ')
    const firstName = nameParts[0] || customerName
    const lastName = nameParts.slice(1).join(' ') || ''

    // Prepare Duitku payload (CORRECT format for Pop integration)
    // Documentation: https://docs.duitku.com/pop/en/#create-invoice
    const duitkuPayload = {
      paymentAmount: plan.price,          // Note: paymentAmount, not amount
      merchantOrderId: orderId,
      productDetails: plan.description,
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: customerName,
      email: email,
      phoneNumber: phoneNumber,
      itemDetails: [{
        name: plan.name,
        price: plan.price,
        quantity: 1
      }],
      customerDetail: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        billingAddress: {
          firstName: firstName,
          lastName: lastName,
          address: 'Indonesia',
          city: 'Jakarta',
          postalCode: '10110',
          phone: phoneNumber,
          countryCode: 'ID'
        },
        shippingAddress: {
          firstName: firstName,
          lastName: lastName,
          address: 'Indonesia',
          city: 'Jakarta',
          postalCode: '10110',
          phone: phoneNumber,
          countryCode: 'ID'
        }
      },
      callbackUrl: CALLBACK_URL,
      returnUrl: RETURN_URL,
      expiryPeriod: 60  // 60 minutes
    }

    console.log('📤 Sending request to Duitku API:', `${DUITKU_API_URL}/createInvoice`)
    console.log('   Environment:', IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX')

    // Call Duitku API with proper headers
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

    const responseText = await duitkuResponse.text()
    console.log('📥 Duitku raw response:', responseText)
    
    let duitkuData
    try {
      duitkuData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('❌ Failed to parse Duitku response:', parseError)
      throw new Error(`Invalid JSON response from Duitku: ${responseText.substring(0, 200)}`)
    }

    console.log('📥 Duitku parsed response:', duitkuData)
    console.log('   Status Code:', duitkuData.statusCode)
    console.log('   Status Message:', duitkuData.statusMessage)

    if (duitkuResponse.ok && duitkuData.reference) {
      console.log('✅ Payment created successfully')
      console.log('   Reference:', duitkuData.reference)
      console.log('   Payment URL:', duitkuData.paymentUrl)

      // Save order and transaction to database
      if (SERVICE_ROLE_KEY) {
        try {
          const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
            auth: { persistSession: false }
          })

          // First, create order
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
              plan_type: planId,
              amount: plan.price,
              status: 'pending',
              customer_name: customerName,
              customer_email: email,
              customer_phone: phoneNumber,
              metadata: {
                order_id: orderId,
                payment_url: duitkuData.paymentUrl,
              }
            })
            .select()
            .single()

          if (orderError) {
            console.error('⚠️ Order insert failed:', orderError.message)
          } else {
            console.log('💾 Order created with ID:', orderData.id)

            // Then, create transaction linked to order
            const { error: txError } = await supabase
              .from('transactions')
              .insert({
                order_id: orderData.id,
                merchant_order_id: orderId,
                reference: duitkuData.reference,
                amount: plan.price,
                payment_method: 'duitku',
                payment_method_name: 'Duitku Payment Gateway',
                status: 'pending',
                payment_url: duitkuData.paymentUrl,
                expired_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 60 minutes
              })

            if (txError) {
              console.error('⚠️ Transaction insert failed:', txError.message)
            } else {
              console.log('💾 Transaction saved to database')
            }
          }
        } catch (dbError) {
          console.error('⚠️ Database error:', dbError)
        }
      }

      // Return success with reference for Pop integration
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            reference: duitkuData.reference,          // For Duitku Pop JS
            paymentUrl: duitkuData.paymentUrl,        // For fallback redirect
            orderId: orderId,
            amount: plan.price,
            merchantCode: duitkuData.merchantCode,
            statusCode: duitkuData.statusCode,
            statusMessage: duitkuData.statusMessage
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      const errorMessage = duitkuData.statusMessage || duitkuData.message || 'Payment creation failed'
      console.error('❌ Duitku API error:', errorMessage)
      console.error('   Status Code:', duitkuData.statusCode)
      console.error('   Response:', duitkuData)
      
      throw new Error(errorMessage)
    }

  } catch (error) {
    console.log('💥 GENERAL ERROR:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

console.log('✅ Duitku Checkout Edge Function is running (v3.0 - Production Ready)')
console.log('   Environment:', ENVIRONMENT)
console.log('   Mode:', IS_PRODUCTION ? '🔴 PRODUCTION (LIVE)' : '🟡 SANDBOX (TEST)')
console.log('   Merchant Code:', DUITKU_MERCHANT_CODE)
console.log('   API URL:', DUITKU_API_URL)
console.log('   Callback URL:', CALLBACK_URL)
console.log('   Return URL:', RETURN_URL)
console.log('')
console.log('   ⚠️  WARNING: PRODUCTION mode will process REAL payments!')
console.log('   📚 Documentation: https://docs.duitku.com/pop/en/')
