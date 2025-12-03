import { NextRequest, NextResponse } from 'next/server';
// import { createPayment } from '@/lib/duitku';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      planType,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!planType || !amount || !customerName || !customerEmail || !customerPhone || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const merchantOrderId = `OASIS-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    
    // Create order in database first (without user_id for now - guest checkout)
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        id: uuidv4(),
        user_id: null, // Guest checkout - can be linked later
        plan_type: planType,
        amount: amount,
        status: 'pending',
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      })
      .select()
      .single();

    if (orderError || !orderData) {
      console.error('Database error:', orderError);
      return NextResponse.json(
        { success: false, error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Prepare payment data for Duitku
    const paymentData = {
      merchantOrderId,
      paymentAmount: amount,
      paymentMethod,
      customerName,
      customerEmail,
      customerPhone,
      productDetails: `OASIS BI PRO - ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
      merchantUserInfo: customerName,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/duitku/callback`,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      expiryPeriod: 60, // 60 minutes
    };

    // Create payment with Duitku
    // const paymentResponse = await createPayment(paymentData);
    const paymentResponse = { paymentUrl: null };

    if (!paymentResponse.paymentUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to create payment' },
        { status: 500 }
      );
    }

    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        id: uuidv4(),
        order_id: orderData.id,
        merchant_order_id: merchantOrderId,
        reference: paymentResponse.reference || null,
        amount: amount,
        payment_method: paymentMethod,
        payment_method_name: paymentData.productDetails,
        status: 'pending',
        payment_url: paymentResponse.paymentUrl,
        expired_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 60 minutes
      });

    if (transactionError) {
      console.error('Transaction error:', transactionError);
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentResponse.paymentUrl,
      reference: paymentResponse.reference,
      merchantOrderId,
      orderId: orderData.id,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
