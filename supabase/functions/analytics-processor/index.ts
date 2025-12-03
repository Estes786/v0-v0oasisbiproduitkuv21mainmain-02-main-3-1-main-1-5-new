// OASIS BI PRO - Analytics Processor Edge Function
// Process real-time analytics events and store in database

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsEvent {
  teamId: string;
  eventType: string;
  properties?: Record<string, any>;
  sessionId?: string;
  userId?: string;
  deviceInfo?: Record<string, any>;
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

    // Parse request body
    const body: AnalyticsEvent = await req.json();

    // Validate required fields
    if (!body.teamId || !body.eventType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: teamId, eventType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert analytics event
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        team_id: body.teamId,
        event_type: body.eventType,
        properties: body.properties || {},
        session_id: body.sessionId,
        user_id: body.userId,
        device_info: body.deviceInfo,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to insert event', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        eventId: data.id,
        timestamp: data.timestamp,
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
