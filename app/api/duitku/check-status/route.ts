import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const merchantOrderId = searchParams.get('merchantOrderId');
    const orderId = searchParams.get('orderId');

    if (!merchantOrderId && !orderId) {
      return NextResponse.json(
        { success: false, error: 'merchantOrderId or orderId is required' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('transactions')
      .select('*, orders(*)');

    if (merchantOrderId) {
      query = query.eq('merchant_order_id', merchantOrderId);
    } else if (orderId) {
      query = query.eq('order_id', orderId);
    }

    const { data: transaction, error } = await query.single();

    if (error || !transaction) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        merchantOrderId: transaction.merchant_order_id,
        reference: transaction.reference,
        amount: transaction.amount,
        paymentMethod: transaction.payment_method,
        paymentMethodName: transaction.payment_method_name,
        status: transaction.status,
        paymentUrl: transaction.payment_url,
        expiredAt: transaction.expired_at,
        paidAt: transaction.paid_at,
        createdAt: transaction.created_at,
      },
      order: transaction.orders ? {
        id: transaction.orders.id,
        planType: transaction.orders.plan_type,
        status: transaction.orders.status,
        customerName: transaction.orders.customer_name,
        customerEmail: transaction.orders.customer_email,
        amount: transaction.orders.amount,
      } : null,
    });
  } catch (error: any) {
    console.error('Check status error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
