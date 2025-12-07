-- ================================================================
-- OASIS BI PRO - COMPLETE DATABASE SCHEMA WITH DUITKU INTEGRATION
-- ================================================================
-- Apply this to Supabase SQL Editor
-- Project URL: https://qjzdzkdwtsszqjvxeiqv.supabase.co
-- ================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- 1. USER PROFILES (extends auth.users)
-- ================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at DESC);

-- ================================================================
-- 2. TEAMS
-- ================================================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'enterprise')),
  billing_status TEXT DEFAULT 'trialing' CHECK (billing_status IN ('trialing', 'active', 'past_due', 'canceled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teams_slug ON teams(slug);
CREATE INDEX IF NOT EXISTS idx_teams_plan ON teams(plan);
CREATE INDEX IF NOT EXISTS idx_teams_billing_status ON teams(billing_status);

-- ================================================================
-- 3. TEAM MEMBERS
-- ================================================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);

-- ================================================================
-- 4. ORDERS (Payment Orders)
-- ================================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('starter', 'professional', 'enterprise')),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'expired', 'cancelled')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_team_id ON orders(team_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ================================================================
-- 5. TRANSACTIONS (Duitku Payment Transactions)
-- ================================================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  merchant_order_id TEXT UNIQUE NOT NULL,
  reference TEXT,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  payment_method TEXT NOT NULL,
  payment_method_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'success', 'failed', 'expired', 'cancelled')),
  payment_url TEXT,
  callback_received_at TIMESTAMPTZ,
  callback_data JSONB,
  expired_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CRITICAL: Index on merchant_order_id for fast Duitku callback lookups
CREATE INDEX IF NOT EXISTS idx_transactions_merchant_order_id ON transactions(merchant_order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- ================================================================
-- 6. SUBSCRIPTIONS
-- ================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'professional', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'trialing' CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'expired')),
  trial_end TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  payment_gateway TEXT DEFAULT 'duitku' CHECK (payment_gateway IN ('duitku', 'midtrans', 'stripe')),
  gateway_subscription_id TEXT,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_team_id ON subscriptions(team_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_current_period_end ON subscriptions(current_period_end);

-- ================================================================
-- 7. DAILY METRICS (Analytics Data)
-- ================================================================
CREATE TABLE IF NOT EXISTS daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, metric_date, metric_name)
);

CREATE INDEX IF NOT EXISTS idx_daily_metrics_team_id ON daily_metrics(team_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_metric_date ON daily_metrics(metric_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_metric_name ON daily_metrics(metric_name);

-- ================================================================
-- 8. ANALYTICS EVENTS (User Activity Tracking)
-- ================================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  session_id TEXT,
  device_info JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_team_id ON analytics_events(team_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp DESC);

-- ================================================================
-- 9. REVENUE TRANSACTIONS (Revenue Tracking)
-- ================================================================
CREATE TABLE IF NOT EXISTS revenue_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  currency TEXT NOT NULL DEFAULT 'IDR',
  source TEXT,
  channel TEXT,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revenue_transactions_team_id ON revenue_transactions(team_id);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_transaction_id ON revenue_transactions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_timestamp ON revenue_transactions(timestamp DESC);

-- ================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_transactions ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- RLS POLICIES
-- ================================================================

-- User Profiles: Users can view/update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Teams: Team members can view their teams
CREATE POLICY "Team members can view team" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

-- Orders: Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR
    customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Transactions: Users can view transactions for their orders
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = transactions.order_id
      AND (orders.user_id = auth.uid() OR orders.customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    )
  );

-- Subscriptions: Team members can view team subscriptions
CREATE POLICY "Team members can view subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = subscriptions.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Daily Metrics: Team members can view team metrics
CREATE POLICY "Team members can view metrics" ON daily_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = daily_metrics.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- ================================================================
-- FUNCTIONS AND TRIGGERS
-- ================================================================

-- Function: Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_team_id UUID;
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );

  -- Create default team
  INSERT INTO public.teams (name, slug, plan, billing_status)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User') || '''s Team',
    'team-' || NEW.id,
    'starter',
    'trialing'
  )
  RETURNING id INTO new_team_id;

  -- Add user to team as owner
  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (new_team_id, NEW.id, 'owner');

  -- Create trial subscription (14 days)
  INSERT INTO public.subscriptions (
    team_id, 
    plan, 
    status, 
    trial_end,
    current_period_start, 
    current_period_end
  )
  VALUES (
    new_team_id,
    'starter',
    'trialing',
    NOW() + INTERVAL '14 days',
    NOW(),
    NOW() + INTERVAL '14 days'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: On new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at on table updates
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function: Handle successful payment (update order and subscription)
CREATE OR REPLACE FUNCTION public.handle_successful_payment()
RETURNS trigger AS $$
DECLARE
  v_order orders%ROWTYPE;
  v_team_id UUID;
BEGIN
  -- Only process when status changes to 'success'
  IF NEW.status = 'success' AND OLD.status != 'success' THEN
    -- Get order details
    SELECT * INTO v_order FROM orders WHERE id = NEW.order_id;
    
    IF v_order.id IS NOT NULL THEN
      -- Update order status to paid
      UPDATE orders 
      SET status = 'paid', updated_at = NOW() 
      WHERE id = v_order.id;
      
      -- Get or create team for the order
      IF v_order.team_id IS NULL THEN
        -- Create new team if guest checkout
        INSERT INTO teams (name, slug, plan, billing_status)
        VALUES (
          v_order.customer_name || '''s Team',
          'team-' || v_order.id,
          v_order.plan_type,
          'active'
        )
        RETURNING id INTO v_team_id;
        
        -- Update order with team_id
        UPDATE orders SET team_id = v_team_id WHERE id = v_order.id;
      ELSE
        v_team_id := v_order.team_id;
        
        -- Update existing team plan
        UPDATE teams 
        SET plan = v_order.plan_type, billing_status = 'active', updated_at = NOW()
        WHERE id = v_team_id;
      END IF;
      
      -- Create or update subscription
      INSERT INTO subscriptions (
        team_id,
        order_id,
        plan,
        status,
        current_period_start,
        current_period_end,
        payment_gateway,
        gateway_subscription_id
      )
      VALUES (
        v_team_id,
        v_order.id,
        v_order.plan_type,
        'active',
        NOW(),
        NOW() + INTERVAL '30 days',
        'duitku',
        NEW.reference
      )
      ON CONFLICT (team_id, order_id) 
      DO UPDATE SET
        status = 'active',
        current_period_start = NOW(),
        current_period_end = NOW() + INTERVAL '30 days',
        updated_at = NOW();
      
      -- Create revenue transaction
      INSERT INTO revenue_transactions (
        team_id,
        transaction_id,
        amount,
        currency,
        source,
        channel,
        customer_id,
        metadata
      )
      VALUES (
        v_team_id,
        NEW.id,
        NEW.amount,
        'IDR',
        'duitku',
        'payment_gateway',
        v_order.user_id,
        jsonb_build_object(
          'merchant_order_id', NEW.merchant_order_id,
          'reference', NEW.reference,
          'plan_type', v_order.plan_type
        )
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Handle successful payment
DROP TRIGGER IF EXISTS on_transaction_success ON transactions;
CREATE TRIGGER on_transaction_success
  AFTER UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_successful_payment();

-- ================================================================
-- SAMPLE DATA FOR TESTING (Optional)
-- ================================================================

-- Note: Sample data will be generated only if there are existing teams
-- This prevents errors on fresh database

-- Generate sample daily metrics for existing teams
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM teams LIMIT 1) THEN
    INSERT INTO daily_metrics (team_id, metric_date, metric_name, metric_value)
    SELECT 
      t.id,
      CURRENT_DATE - (n || ' days')::interval,
      'total_revenue',
      (RANDOM() * 10000000)::int
    FROM teams t
    CROSS JOIN generate_series(0, 30) AS n
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ================================================================
-- HELPFUL COMMENTS
-- ================================================================

COMMENT ON TABLE user_profiles IS 'Extended user profiles with company info';
COMMENT ON TABLE teams IS 'Organizations/Companies using OASIS BI PRO';
COMMENT ON TABLE orders IS 'Payment orders for subscription plans';
COMMENT ON TABLE transactions IS 'Payment gateway transactions (Duitku)';
COMMENT ON TABLE subscriptions IS 'Active subscription plans and billing status';
COMMENT ON TABLE daily_metrics IS 'Daily analytics metrics for teams';
COMMENT ON TABLE analytics_events IS 'User activity and behavior tracking';
COMMENT ON TABLE revenue_transactions IS 'Revenue tracking and financial analytics';

COMMENT ON COLUMN transactions.merchant_order_id IS 'Unique order ID sent to Duitku (indexed for fast callback lookups)';
COMMENT ON COLUMN transactions.reference IS 'Duitku reference/transaction ID';
COMMENT ON COLUMN transactions.callback_data IS 'Raw callback data from Duitku for debugging';

-- ================================================================
-- COMPLETION MESSAGE
-- ================================================================

SELECT '✅ Database schema applied successfully!' AS status,
       '📊 Tables created: 9' AS tables,
       '🔒 RLS enabled on all tables' AS security,
       '⚡ Indexes optimized for performance' AS performance,
       '🔄 Triggers configured for automation' AS automation;
