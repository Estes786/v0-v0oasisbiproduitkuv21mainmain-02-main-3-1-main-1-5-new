import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjzdzkdwtsszqjvxeiqv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs'

// Log validation status (without throwing errors)
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL not set, using hardcoded fallback')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY not set, using hardcoded fallback')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not set, using hardcoded fallback')
}

console.log('✅ Supabase clients initialized')
console.log('   URL:', supabaseUrl)
console.log('   Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
console.log('   Service Key:', supabaseServiceKey ? '✅ Set' : '⚠️  Missing (using anon key)')

// Client component client (browser)
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)

// Server-side client with service role (for API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'starter' | 'professional' | 'enterprise' | null
          subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled' | null
          trial_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'starter' | 'professional' | 'enterprise' | null
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled' | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'starter' | 'professional' | 'enterprise' | null
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled' | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: string
          status: string
          amount: number
          currency: string
          payment_method: string
          duitku_merchant_ref: string | null
          duitku_transaction_id: string | null
          started_at: string
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tier: string
          status: string
          amount: number
          currency?: string
          payment_method: string
          duitku_merchant_ref?: string | null
          duitku_transaction_id?: string | null
          started_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tier?: string
          status?: string
          amount?: number
          currency?: string
          payment_method?: string
          duitku_merchant_ref?: string | null
          duitku_transaction_id?: string | null
          started_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          subscription_id: string | null
          amount: number
          currency: string
          status: string
          payment_method: string
          payment_gateway: string
          gateway_reference: string | null
          metadata: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id?: string | null
          amount: number
          currency?: string
          status: string
          payment_method: string
          payment_gateway: string
          gateway_reference?: string | null
          metadata?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string | null
          amount?: number
          currency?: string
          status?: string
          payment_method?: string
          payment_gateway?: string
          gateway_reference?: string | null
          metadata?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
