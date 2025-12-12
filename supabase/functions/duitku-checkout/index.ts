// ============================================================================
// SUPABASE EDGE FUNCTION: DUITKU CHECKOUT
// ============================================================================
// Purpose: Create Duitku payment invoice
// Runs on: Deno Deploy (better network than Vercel)
// Solves: DNS resolution error (ENOTFOUND api.duitku.com)
// ============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

// ============================================================================
// CONFIGURATION & CREDENTIALS
// ============================================================================
const DUITKU_MERCHANT_CODE = Deno.env.get('DUITKU_MERCHANT_CODE') || 'D20919'
const DUITKU_API_KEY = Deno.env.get('DUITKU_API_KEY') || '17d9d5e20fbf4763a44c41a1e95cb7cb'
const DUITKU_BASE_URL = Deno.env.get('DUITKU_BASE_URL') || 'https://api-sandbox.duitku.com/webapi/v1/payment' // Changed from api.duitku.com to api-sandbox.duitku.com for testing/DNS issue
const CALLBACK_URL = Deno.env.get('DUITKU_CALLBACK_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback'
const RETURN_URL = Deno.env.get('DUITKU_RETURN_URL') || 'https://www.oasis-bi-pro.web.id/payment/success'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
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
// SHA256 SIGNATURE GENERATOR (FOR TRANSACTION BODY)
// ============================================================================
async function generateSignature(
  merchantCode: string,
  orderId: string,
  amount: string,
  apiKey: string
): Promise<string> {
  const signatureString = merchantCode + orderId + amount + apiKey
  const encoder = new TextEncoder()
  const data = encoder.encode(signatureString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ============================================================================
// SHA256 SIGNATURE GENERATOR (FOR BASIC AUTH HEADER)
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

    // Generate transaction body signature
    const amount = plan.price
    const signature = await generateSignature(
      DUITKU_MERCHANT_CODE,
      orderId,
      amount.toString(),
      DUITKU_API_KEY
    )
    console.log('🔐 Transaction body signature generated successfully')

    // Generate basic authentication headers
    const timestamp = Date.now().toString()
    const headerSignature = await generateHeaderSignature(
      DUITKU_MERCHANT_CODE,
      timestamp,
      DUITKU_API_KEY
    )
    console.log('🔐 Header signature generated successfully')

    // Prepare Duitku payload
    const duitkuPayload = {
      merchantCode: DUITKU_MERCHANT_CODE,
      paymentMethod: 'VC', // Virtual Account (default)
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
      expiryPeriod: 60 // 60 minutes
    }

    console.log('📤 Sending request to Duitku API:', `${DUITKU_BASE_URL}/createInvoice`)

    // Call Duitku API with retry mechanism
    let lastError: Error | null = null
    const maxRetries = 3

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries}`)
        
        const duitkuResponse = await fetch(
          `${DUITKU_BASE_URL}/createInvoice`,
          {
            method: 'POST',
            headers: {
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

        if (duitkuResponse.ok && duitkuData.paymentUrl) {
          console.log('✅ Payment URL generated:', duitkuData.paymentUrl)

          // Save transaction to database (if Supabase client is configured)
          if (SERVICE_ROLE_KEY) {
            try {
              const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
                auth: { persistSession: false }
              })

              const { error: dbError } = await supabase
                .from('transactions')
                .insert({
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

              if (dbError) {
                console.error('⚠️ Database insert failed:', dbError.message)
              } else {
                console.log('💾 Transaction saved to database')
              }
            } catch (dbError) {
              console.error('⚠️ Database error:', dbError)
            }
          }

          return new Response(
            JSON.stringify({
              success: true,
              data: {
                paymentUrl: duitkuData.paymentUrl,
                orderId: orderId,
                reference: duitkuData.reference,
                amount: amount
              }
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        } else {
          throw new Error(duitkuData.message || 'Payment creation failed')
        }
      } catch (error) {
        lastError = error as Error
        console.error(`❌ Attempt ${attempt} failed:`, lastError.message)
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          const waitTime = Math.pow(2, attempt) * 1000
          console.log(`⏳ Waiting ${waitTime}ms before retry...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
        }
      }
    }

    // All retries failed
    console.error('💥 ALL RETRY ATTEMPTS FAILED')
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Payment creation failed after ${maxRetries} attempts: ${lastError?.message}` 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('💥 GENERAL ERROR:', error)
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

console.log('✅ Duitku Checkout Edge Function is running')
