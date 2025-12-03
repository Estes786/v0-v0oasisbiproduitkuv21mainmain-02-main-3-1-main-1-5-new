/**
 * DUITKU PAYMENT CALLBACK HANDLER
 * POST /api/duitku/callback
 * 
 * Purpose: Receive payment notification from Duitku
 * This webhook is called by Duitku when payment status changes
 * 
 * IMPORTANT: This is for OUR subscription billing only
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyDuitkuCallback, DUITKU_STATUS } from '@/lib/duitku'

export async function POST(request: NextRequest) {
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

    console.log('Duitku Callback Received:', {
      merchantOrderId,
      amount,
      resultCode,
      reference,
      timestamp: new Date().toISOString(),
    })

    // Verify signature to ensure request is from Duitku
    const isValid = verifyDuitkuCallback(merchantOrderId, amount, signature)
    
    if (!isValid) {
      console.error('Invalid signature from Duitku callback')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid signature' 
        },
        { status: 401 }
      )
    }

    // Process payment based on status
    if (resultCode === DUITKU_STATUS.SUCCESS) {
      console.log('✅ Payment SUCCESS:', merchantOrderId)
      
      // TODO: Update database with payment success
      // Example: Update user subscription status
      // await updateUserSubscription(merchantUserId, {
      //   status: 'active',
      //   orderId: merchantOrderId,
      //   amount: amount,
      //   paidAt: new Date(),
      // })
      
      // TODO: Send confirmation email to customer
      // await sendSubscriptionConfirmationEmail(merchantUserId)
      
    } else if (resultCode === DUITKU_STATUS.PENDING) {
      console.log('⏳ Payment PENDING:', merchantOrderId)
      
      // TODO: Update payment status to pending
      // await updatePaymentStatus(merchantOrderId, 'pending')
      
    } else if (resultCode === DUITKU_STATUS.EXPIRED) {
      console.log('⏰ Payment EXPIRED:', merchantOrderId)
      
      // TODO: Update payment status to expired
      // await updatePaymentStatus(merchantOrderId, 'expired')
      
    } else if (resultCode === DUITKU_STATUS.CANCELLED) {
      console.log('❌ Payment CANCELLED:', merchantOrderId)
      
      // TODO: Update payment status to cancelled
      // await updatePaymentStatus(merchantOrderId, 'cancelled')
    }

    // Return success response to Duitku
    return NextResponse.json({
      success: true,
      message: 'Callback processed successfully',
    })

  } catch (error) {
    console.error('Callback processing error:', error)
    
    // Still return 200 to Duitku to avoid retry loops
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal error',
        message: 'Error logged, will investigate'
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
