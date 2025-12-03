// OASIS BI PRO - Attribution Calculator Edge Function
// Calculate multi-touch attribution using various models

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type AttributionModel = 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'u_shaped';

interface AttributionRequest {
  teamId: string;
  customerId: string;
  model: AttributionModel;
  conversionValue: number;
}

interface Touchpoint {
  channel: string;
  timestamp: string;
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

    // Parse request
    const body: AttributionRequest = await req.json();
    const { teamId, customerId, model, conversionValue } = body;

    if (!teamId || !customerId || !model || !conversionValue) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch customer touchpoints
    const { data: touchpoints, error } = await supabase
      .from('touchpoints')
      .select('channel, timestamp, touchpoint_type')
      .eq('customer_id', customerId)
      .order('timestamp', { ascending: true });

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch touchpoints', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!touchpoints || touchpoints.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No touchpoints found for this customer' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate attribution based on model
    const attribution: Record<string, number> = {};

    switch (model) {
      case 'first_touch':
        // 100% credit to first touchpoint
        attribution[touchpoints[0].channel] = conversionValue;
        break;

      case 'last_touch':
        // 100% credit to last touchpoint
        attribution[touchpoints[touchpoints.length - 1].channel] = conversionValue;
        break;

      case 'linear':
        // Equal credit to all touchpoints
        const linearCredit = conversionValue / touchpoints.length;
        touchpoints.forEach((tp) => {
          attribution[tp.channel] = (attribution[tp.channel] || 0) + linearCredit;
        });
        break;

      case 'time_decay':
        // More credit to recent touchpoints (exponential decay)
        const decayRate = 0.5; // Half-life
        let totalWeight = 0;
        const weights: number[] = [];

        touchpoints.forEach((_, i) => {
          const weight = Math.pow(decayRate, touchpoints.length - i - 1);
          weights.push(weight);
          totalWeight += weight;
        });

        touchpoints.forEach((tp, i) => {
          const credit = (weights[i] / totalWeight) * conversionValue;
          attribution[tp.channel] = (attribution[tp.channel] || 0) + credit;
        });
        break;

      case 'u_shaped':
        // 40% first, 40% last, 20% distributed to middle
        if (touchpoints.length === 1) {
          attribution[touchpoints[0].channel] = conversionValue;
        } else if (touchpoints.length === 2) {
          attribution[touchpoints[0].channel] = conversionValue * 0.5;
          attribution[touchpoints[1].channel] = conversionValue * 0.5;
        } else {
          const firstCredit = conversionValue * 0.4;
          const lastCredit = conversionValue * 0.4;
          const middleCredit = conversionValue * 0.2;
          const middlePerTouch = middleCredit / (touchpoints.length - 2);

          attribution[touchpoints[0].channel] = (attribution[touchpoints[0].channel] || 0) + firstCredit;
          attribution[touchpoints[touchpoints.length - 1].channel] = (attribution[touchpoints[touchpoints.length - 1].channel] || 0) + lastCredit;

          for (let i = 1; i < touchpoints.length - 1; i++) {
            attribution[touchpoints[i].channel] = (attribution[touchpoints[i].channel] || 0) + middlePerTouch;
          }
        }
        break;
    }

    // Save attribution results
    const attributionResults = Object.entries(attribution).map(([channel, revenue]) => ({
      team_id: teamId,
      channel,
      revenue_attributed: revenue,
      model_used: model,
    }));

    const { error: insertError } = await supabase
      .from('attribution_results')
      .insert(attributionResults);

    if (insertError) {
      console.error('Failed to save attribution results:', insertError);
    }

    // Return results
    return new Response(
      JSON.stringify({
        success: true,
        model,
        attribution,
        touchpoints: touchpoints.length,
        totalValue: conversionValue,
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
