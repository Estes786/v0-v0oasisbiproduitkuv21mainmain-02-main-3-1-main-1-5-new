import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error('❌ CRITICAL: Missing NEXT_PUBLIC_SUPABASE_URL')
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error('❌ CRITICAL: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

console.log('✅ Supabase environment variables validated')
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
