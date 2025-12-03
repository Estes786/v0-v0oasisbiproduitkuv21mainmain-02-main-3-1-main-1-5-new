// OASIS BI PRO - Report Generator Edge Function
// Generate automated analytics reports in JSON/CSV format

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReportRequest {
  teamId: string;
  reportType: 'daily' | 'weekly' | 'monthly';
  format: 'json' | 'csv';
  startDate: string;
  endDate: string;
  metrics?: string[]; // Optional: specific metrics to include
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
    const body: ReportRequest = await req.json();
    const { teamId, reportType, format, startDate, endDate, metrics } = body;

    if (!teamId || !reportType || !format || !startDate || !endDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch metrics data
    let query = supabase
      .from('daily_metrics')
      .select('metric_date, metric_name, metric_value')
      .eq('team_id', teamId)
      .gte('metric_date', startDate)
      .lte('metric_date', endDate)
      .order('metric_date', { ascending: true });

    if (metrics && metrics.length > 0) {
      query = query.in('metric_name', metrics);
    }

    const { data: metricsData, error: metricsError } = await query;

    if (metricsError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch metrics', details: metricsError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch revenue data
    const { data: revenueData, error: revenueError } = await supabase
      .from('revenue_transactions')
      .select('timestamp, amount, source, channel')
      .eq('team_id', teamId)
      .gte('timestamp', startDate)
      .lte('timestamp', endDate);

    if (revenueError) {
      console.error('Failed to fetch revenue:', revenueError);
    }

    // Calculate summary statistics
    const totalRevenue = revenueData?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0;
    const avgRevenue = revenueData ? totalRevenue / revenueData.length : 0;
    
    // Group metrics by name
    const metricsSummary: Record<string, {
      values: number[];
      avg: number;
      min: number;
      max: number;
      total: number;
    }> = {};

    metricsData?.forEach((metric) => {
      if (!metricsSummary[metric.metric_name]) {
        metricsSummary[metric.metric_name] = {
          values: [],
          avg: 0,
          min: Infinity,
          max: -Infinity,
          total: 0,
        };
      }
      
      const value = Number(metric.metric_value);
      metricsSummary[metric.metric_name].values.push(value);
      metricsSummary[metric.metric_name].min = Math.min(metricsSummary[metric.metric_name].min, value);
      metricsSummary[metric.metric_name].max = Math.max(metricsSummary[metric.metric_name].max, value);
      metricsSummary[metric.metric_name].total += value;
    });

    // Calculate averages
    Object.keys(metricsSummary).forEach((key) => {
      const values = metricsSummary[key].values;
      metricsSummary[key].avg = values.reduce((a, b) => a + b, 0) / values.length;
    });

    // Create report
    const report = {
      teamId,
      reportType,
      period: {
        startDate,
        endDate,
        days: Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)),
      },
      revenue: {
        total: totalRevenue,
        average: avgRevenue,
        transactions: revenueData?.length || 0,
      },
      metrics: metricsSummary,
      generatedAt: new Date().toISOString(),
    };

    // Convert to CSV if requested
    if (format === 'csv') {
      let csv = 'Date,Metric,Value\n';
      metricsData?.forEach((metric) => {
        csv += `${metric.metric_date},${metric.metric_name},${metric.metric_value}\n`;
      });
      
      return new Response(csv, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="report_${teamId}_${startDate}_${endDate}.csv"`,
        },
      });
    }

    // Save report to database
    const { error: insertError } = await supabase
      .from('reports')
      .insert({
        team_id: teamId,
        title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        type: reportType,
        schedule: null,
        config: { startDate, endDate, metrics },
      });

    if (insertError) {
      console.error('Failed to save report:', insertError);
    }

    // Return JSON report
    return new Response(
      JSON.stringify({
        success: true,
        report,
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
