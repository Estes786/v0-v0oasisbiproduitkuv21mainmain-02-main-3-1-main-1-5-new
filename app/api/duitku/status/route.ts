/**
 * DUITKU PAYMENT STATUS CHECK
 * GET /api/duitku/status?orderId=XXXX
 * 
 * Purpose: Check payment status from Duitku
 */

import { NextRequest, NextResponse } from 'next/server'
import { checkDuitkuPaymentStatus } from '@/lib/duitku'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing orderId parameter' 
        },
        { status: 400 }
      )
    }

    // Check status with Duitku
    const result = await checkDuitkuPaymentStatus(orderId)

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        status: result.statusCode,
        message: result.statusMessage,
        details: result.data,
      }
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
