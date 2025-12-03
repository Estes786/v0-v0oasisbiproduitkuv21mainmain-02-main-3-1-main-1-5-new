// OASIS BI PRO - Payment Webhook Handler
// Handle Midtrans payment notifications

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MidtransNotification {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  transaction_id: string;
  payment_type: string;
  transaction_time: string;
  fraud_status?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse Midtrans notification
    const notification: MidtransNotification = await req.json();

    console.log('Received Midtrans notification:', notification);

    // Verify signature
    const serverKey = Deno.env.get('MIDTRANS_SERVER_KEY')!;
    const signatureString = `${notification.order_id}${notification.status_code}${notification.gross_amount}${serverKey}`;
    const hash = createHmac('sha512', signatureString).digest('hex');

    if (hash !== notification.signature_key) {
      console.error('Invalid signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map transaction status
    let status = 'pending';
    if (notification.transaction_status === 'capture' || notification.transaction_status === 'settlement') {
      status = 'completed';
    } else if (notification.transaction_status === 'pending') {
      status = 'pending';
    } else if (notification.transaction_status === 'deny' || notification.transaction_status === 'cancel' || notification.transaction_status === 'expire') {
      status = 'failed';
    }

    // Update transaction in database
    const { data: transaction, error: updateError } = await supabase
      .from('transactions')
      .update({
        status,
        midtrans_response: notification,
        updated_at: new Date().toISOString(),
      })
      .eq('midtrans_order_id', notification.order_id)
      .select()
      .single();

    if (updateError) {
      console.error('Failed to update transaction:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update transaction' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If payment is successful, activate subscription
    if (status === 'completed') {
      // Extract team_id from order_id (format: team_{teamId}_{timestamp})
      const teamId = notification.order_id.split('_')[1];

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('team_id', teamId)
        .eq('status', 'pending');

      if (subscriptionError) {
        console.error('Failed to activate subscription:', subscriptionError);
      }

      // Update team billing status
      const { error: teamError } = await supabase
        .from('teams')
        .update({
          billing_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('id', teamId);

      if (teamError) {
        console.error('Failed to update team billing status:', teamError);
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        status,
        orderId: notification.order_id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
