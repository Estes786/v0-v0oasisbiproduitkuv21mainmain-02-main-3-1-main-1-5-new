/**
 * DUITKU PAYMENT CALLBACK HANDLER
 * POST /api/duitku/callback
 * 
 * Purpose: Receive payment notification from Duitku
 * This webhook is called by Duitku when payment status changes
 * 
 * IMPORTANT: This is for OUR subscription billing only
 * 
 * SECURITY: Signature verification using MD5 hash (Duitku standard)
 * DATABASE: Automatic Supabase update on successful payment
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyDuitkuCallback, DUITKU_STATUS } from '@/lib/duitku'
import { 
  updateSubscriptionAfterPayment, 
  getUserIdFromTransaction 
} from '@/lib/subscription-service'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Parse callback data from Duitku
    const body = await request.json()
    
    const {
      merchantOrderId,
      amount,
      resultCode,
      merchantUserId,
      reference,
      signature,
    } = body

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔔 DUITKU CALLBACK RECEIVED')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📦 Payload:', {
      merchantOrderId,
      amount,
      resultCode,
      reference,
      merchantUserId,
      timestamp: new Date().toISOString(),
    })

    // STEP 1: Verify signature (CRITICAL SECURITY CHECK)
    const isValid = verifyDuitkuCallback(merchantOrderId, amount, signature)
    
    if (!isValid) {
      console.error('❌ SIGNATURE VERIFICATION FAILED!')
      console.error('Expected signature mismatch - possible fraud attempt')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid signature' 
        },
        { status: 401 }
      )
    }
    
    console.log('✅ Signature verified successfully')

    // STEP 2: Extract plan ID from merchant order ID
    // Format: OASIS-{PLAN}-{TIMESTAMP}-{RANDOM}
    const planMatch = merchantOrderId.match(/OASIS-([A-Z]+)-/i)
    const planId = planMatch ? planMatch[1].toLowerCase() : 'starter'
    
    console.log('📋 Extracted Plan ID:', planId)

    // STEP 3: Get user ID from transaction record
    const userId = merchantUserId || await getUserIdFromTransaction(merchantOrderId)
    
    if (!userId) {
      console.error('❌ User ID not found for order:', merchantOrderId)
      // Still return 200 to avoid Duitku retry loop
      return NextResponse.json({
        success: false,
        error: 'User ID not found',
        message: 'Will process manually'
      })
    }
    
    console.log('👤 User ID:', userId)

    // STEP 4: Process payment based on result code
    // CRITICAL: '00' = SUCCESS (not PENDING!)
    if (resultCode === DUITKU_STATUS.SUCCESS || resultCode === '00') {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('💰 PAYMENT SUCCESS (resultCode: 00) - Processing subscription activation')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      
      // Update subscription in Supabase
      const result = await updateSubscriptionAfterPayment({
        userId,
        planId,
        merchantOrderId,
        amount: parseFloat(amount),
        duitkuReference: reference,
        status: 'active'
      })
      
      if (result.success) {
        console.log('✅ Subscription activated successfully!')
        console.log('   - Team ID:', result.teamId)
        console.log('   - Plan:', planId)
        console.log('   - Amount:', amount, 'IDR')
        console.log('   - Reference:', reference)
      } else {
        console.error('❌ Subscription activation failed:', result.error)
      }
      
    } else if (resultCode === DUITKU_STATUS.PENDING || resultCode === '01') {
      console.log('⏳ Payment PENDING:', merchantOrderId)
      
      await updateSubscriptionAfterPayment({
        userId,
        planId,
        merchantOrderId,
        amount: parseFloat(amount),
        duitkuReference: reference,
        status: 'pending'
      })
      
    } else if (resultCode === DUITKU_STATUS.EXPIRED || resultCode === '02') {
      console.log('⏰ Payment EXPIRED/FAILED (resultCode: 02):', merchantOrderId)
      
      await updateSubscriptionAfterPayment({
        userId,
        planId,
        merchantOrderId,
        amount: parseFloat(amount),
        duitkuReference: reference,
        status: 'expired'
      })
      
    } else if (resultCode === DUITKU_STATUS.CANCELLED || resultCode === '03') {
      console.log('❌ Payment CANCELLED:', merchantOrderId)
      
      await updateSubscriptionAfterPayment({
        userId,
        planId,
        merchantOrderId,
        amount: parseFloat(amount),
        duitkuReference: reference,
        status: 'cancelled'
      })
    } else {
      console.log('⚠️ Unknown result code:', resultCode)
    }

    const processingTime = Date.now() - startTime
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ CALLBACK PROCESSED SUCCESSFULLY')
    console.log(`⏱️  Processing time: ${processingTime}ms`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // IMPORTANT: Always return 200 to Duitku
    return NextResponse.json({
      success: true,
      message: 'Callback processed successfully',
      processingTime: `${processingTime}ms`
    })

  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('💥 CALLBACK PROCESSING ERROR')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error(error)
    console.error(`⏱️  Failed after: ${processingTime}ms`)
    
    // IMPORTANT: Still return 200 to Duitku to avoid retry loops
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal error',
        message: 'Error logged, will investigate manually',
        processingTime: `${processingTime}ms`
      },
      { status: 200 }
    )
  }
}

// GET endpoint for testing callback URL
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Duitku Callback Endpoint',
    status: 'Active',
    timestamp: new Date().toISOString(),
    note: 'This endpoint receives POST requests from Duitku payment gateway',
  })
}
