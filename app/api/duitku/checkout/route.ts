// ============================================================================
// NEXT.JS API ROUTE: DUITKU CHECKOUT PROXY
// ============================================================================
// Purpose: Forward checkout requests to Supabase Edge Function
// This fixes HTTP 405 error by providing the missing API endpoint
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I'

// Enable CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Duitku checkout API endpoint',
      usage: 'POST with body: { planId, email, phoneNumber, customerName }',
      status: 'online',
      timestamp: new Date().toISOString()
    },
    { headers: corsHeaders }
  )
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 [API Route] Received checkout request')
    
    // Parse request body
    const body = await request.json()
    console.log('📋 [API Route] Request data:', {
      planId: body.planId,
      email: body.email,
      phone: body.phoneNumber
    })

    // Validate required fields
    if (!body.planId || !body.email || !body.phoneNumber || !body.customerName) {
      console.error('❌ [API Route] Missing required fields')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: planId, email, phoneNumber, customerName'
        },
        { status: 400, headers: corsHeaders }
      )
    }

    // Forward to Supabase Edge Function
    const edgeFunctionUrl = `${SUPABASE_URL}/functions/v1/duitku-checkout`
    console.log('🔄 [API Route] Forwarding to:', edgeFunctionUrl)

    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(body),
    })

    console.log('📊 [API Route] Edge function response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [API Route] Edge function error:', errorText)
      
      return NextResponse.json(
        {
          success: false,
          error: `Edge function error: ${response.statusText}`,
          details: errorText
        },
        { status: response.status, headers: corsHeaders }
      )
    }

    const data = await response.json()
    console.log('✅ [API Route] Edge function success:', {
      hasReference: !!data.data?.reference,
      hasPaymentUrl: !!data.data?.paymentUrl
    })

    return NextResponse.json(data, { headers: corsHeaders })

  } catch (error) {
    console.error('💥 [API Route] Error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500, headers: corsHeaders }
    )
  }
}
