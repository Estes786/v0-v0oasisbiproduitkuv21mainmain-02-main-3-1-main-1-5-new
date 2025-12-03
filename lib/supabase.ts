import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper: Check if Supabase is configured
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey);
}

// Database Types (based on schema)
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  plan: 'starter' | 'professional' | 'enterprise';
  billing_status: 'active' | 'past_due' | 'canceled';
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  team_id: string;
  event_type: string;
  properties?: Record<string, any>;
  timestamp: string;
  session_id?: string;
  user_id?: string;
  device_info?: Record<string, any>;
}

export interface DailyMetric {
  id: string;
  team_id: string;
  metric_date: string;
  metric_name: string;
  metric_value: number;
  created_at: string;
}

export interface RevenueTransaction {
  id: string;
  team_id: string;
  amount: number;
  currency: string;
  source?: string;
  channel?: string;
  customer_id?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
