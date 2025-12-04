/**
 * DUITKU CHECKOUT API ROUTE
 * POST /api/duitku/checkout
 * 
 * Purpose: Create payment request to Duitku for SUBSCRIPTION BILLING ONLY
 * This is NOT for processing third-party payments
 * We are collecting OUR subscription fees from OUR customers
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  createDuitkuPayment, 
  generateMerchantOrderId,
  SUBSCRIPTION_PLANS,
  type DuitkuPaymentRequest 
} from '@/lib/duitku'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { planId, email, phoneNumber, customerName, userId } = body
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🛒 CHECKOUT REQUEST RECEIVED')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📦 Request data:', { planId, email, phoneNumber, customerName, userId })
    
    if (!planId || !email || !phoneNumber || !customerName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: planId, email, phoneNumber, customerName' 
        },
        { status: 400 }
      )
    }

    // Validate plan exists
    if (!SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid plan ID: ${planId}` 
        },
        { status: 400 }
      )
    }

    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    console.log('✅ Plan validated:', plan.name, '-', plan.price, 'IDR')
    
    // Generate unique order ID
    const merchantOrderId = generateMerchantOrderId(planId)
    console.log('🔑 Generated Order ID:', merchantOrderId)
    
    // Create payment request
    const paymentRequest: DuitkuPaymentRequest = {
      merchantOrderId,
      paymentAmount: plan.price,
      productDetails: `${plan.name} - OASIS BI PRO Subscription`,
      email,
      phoneNumber,
      customerName,
      planId: planId as keyof typeof SUBSCRIPTION_PLANS,
      userId: userId || undefined,
    }

    console.log('📤 Calling Duitku API...')
    
    // Call Duitku API
    const result = await createDuitkuPayment(paymentRequest)
    
    if (!result.success) {
      console.error('❌ Duitku API call failed:', result.error)
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      )
    }

    console.log('✅ Payment URL generated:', result.paymentUrl)
    console.log('✅ Duitku Reference:', result.reference)
    
    // Create pending transaction in database (if userId provided)
    if (userId) {
      try {
        console.log('🔄 Attempting to create pending transaction...')
        console.log('🔍 Checking Supabase connection...')
        
        // Verify Supabase environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        
        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('❌ CRITICAL: Missing Supabase credentials!')
          console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
          console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing')
          throw new Error('Missing Supabase environment variables')
        }
        
        console.log('✅ Supabase credentials verified')
        
        const { createPendingTransaction } = await import('@/lib/subscription-service')
        await createPendingTransaction({
          userId,
          merchantOrderId,
          amount: plan.price,
          planId
        })
        console.log('✅ Pending transaction created in database')
      } catch (dbError) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.error('⚠️ DATABASE ERROR (NON-BLOCKING)')
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.error('   Error:', dbError)
        console.error('   Context: Failed to create pending transaction')
        console.error('   Impact: Payment will proceed, but transaction not logged')
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        // Don't fail the checkout - just log the error
        // Payment URL is already generated, so customer can proceed
      }
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ CHECKOUT COMPLETED SUCCESSFULLY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // Return payment URL and reference
    return NextResponse.json({
      success: true,
      data: {
        paymentUrl: result.paymentUrl,
        reference: result.reference,
        merchantOrderId,
        amount: plan.price,
        planName: plan.name,
      }
    })

  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('💥 CHECKOUT ERROR')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error(error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
