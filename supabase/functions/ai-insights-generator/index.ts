// OASIS BI PRO - AI Insights Generator Edge Function
// Generate AI-powered insights using statistical analysis and ML

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InsightRequest {
  teamId: string;
  metricName: string;
  days?: number; // Number of days to analyze (default: 30)
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
    const body: InsightRequest = await req.json();
    const { teamId, metricName, days = 30 } = body;

    if (!teamId || !metricName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: teamId, metricName' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch historical metrics
    const { data: metrics, error } = await supabase
      .from('daily_metrics')
      .select('metric_date, metric_value')
      .eq('team_id', teamId)
      .eq('metric_name', metricName)
      .gte('metric_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('metric_date', { ascending: true });

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch metrics', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!metrics || metrics.length < 7) {
      return new Response(
        JSON.stringify({ error: 'Insufficient data for analysis (need at least 7 days)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate statistics
    const values = metrics.map(m => m.metric_value);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    // Detect anomalies (Z-score method)
    const latestValue = values[values.length - 1];
    const zScore = (latestValue - mean) / stdDev;
    const isAnomaly = Math.abs(zScore) > 2; // 95% confidence interval

    // Calculate trend
    const recentAvg = values.slice(-7).reduce((a, b) => a + b, 0) / 7;
    const previousAvg = values.slice(-14, -7).reduce((a, b) => a + b, 0) / 7;
    const trendPercent = ((recentAvg - previousAvg) / previousAvg) * 100;

    // Simple linear regression for forecast (next 7 days)
    const n = values.length;
    const sumX = values.reduce((sum, _, i) => sum + i, 0);
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + i * val, 0);
    const sumX2 = values.reduce((sum, _, i) => sum + i * i, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const forecast = [];
    for (let i = 1; i <= 7; i++) {
      forecast.push(Math.round(slope * (n + i) + intercept));
    }

    // Generate insight message
    let insightType = 'info';
    let message = '';
    
    if (isAnomaly) {
      insightType = zScore > 0 ? 'positive' : 'negative';
      message = zScore > 0
        ? `🚀 ${metricName} mengalami lonjakan signifikan (+${Math.abs(zScore * stdDev).toFixed(1)})`
        : `⚠️ ${metricName} mengalami penurunan signifikan (-${Math.abs(zScore * stdDev).toFixed(1)})`;
    } else if (Math.abs(trendPercent) > 10) {
      insightType = trendPercent > 0 ? 'positive' : 'warning';
      message = trendPercent > 0
        ? `📈 ${metricName} menunjukkan tren positif (${trendPercent.toFixed(1)}% dalam 7 hari terakhir)`
        : `📉 ${metricName} menunjukkan tren negatif (${trendPercent.toFixed(1)}% dalam 7 hari terakhir)`;
    } else {
      insightType = 'info';
      message = `ℹ️ ${metricName} stabil dengan rata-rata ${mean.toFixed(2)}`;
    }

    // Save insight to database
    const { data: insight, error: insertError } = await supabase
      .from('insights')
      .insert({
        team_id: teamId,
        type: insightType,
        severity: isAnomaly ? 'high' : 'medium',
        message,
        data: {
          metric_name: metricName,
          mean,
          std_dev: stdDev,
          z_score: zScore,
          trend_percent: trendPercent,
          forecast,
          is_anomaly: isAnomaly,
        },
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to save insight:', insertError);
    }

    // Return insights
    return new Response(
      JSON.stringify({
        success: true,
        insight: {
          type: insightType,
          message,
          statistics: {
            mean: Math.round(mean),
            stdDev: Math.round(stdDev),
            zScore: zScore.toFixed(2),
            trendPercent: trendPercent.toFixed(1),
          },
          forecast,
          isAnomaly,
        },
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
