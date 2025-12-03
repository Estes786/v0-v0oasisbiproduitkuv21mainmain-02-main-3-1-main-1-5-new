-- OASIS BI PRO - Complete Database Schema
-- Apply this to Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if any (for clean slate)
DROP TABLE IF EXISTS ai_insights CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS analytics_data CASCADE;
DROP TABLE IF EXISTS data_integrations CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- 1. User Profiles (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'analyst', 'viewer', 'manager')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'invited', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Teams
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'business')),
  billing_status TEXT DEFAULT 'trialing' CHECK (billing_status IN ('active', 'trialing', 'expired', 'cancelled')),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'analyst', 'viewer', 'manager')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'invited')),
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- 4. Data Integrations
CREATE TABLE data_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  integration_type TEXT NOT NULL CHECK (integration_type IN (
    'google_analytics', 'shopee', 'tokopedia', 'facebook_ads', 
    'instagram', 'postgresql_db', 'stripe', 'duitku'
  )),
  integration_name TEXT NOT NULL,
  status TEXT DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  credentials JSONB, -- encrypted credentials
  config JSONB, -- integration-specific config
  last_sync_at TIMESTAMPTZ,
  next_sync_at TIMESTAMPTZ,
  sync_frequency TEXT DEFAULT 'daily' CHECK (sync_frequency IN ('realtime', 'hourly', 'daily', 'weekly')),
  data_points INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Analytics Data (time-series metrics)
CREATE TABLE analytics_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  integration_id UUID REFERENCES data_integrations(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN (
    'revenue', 'users', 'active_users', 'pageviews', 'sessions',
    'conversions', 'cart_additions', 'checkouts', 'purchases',
    'bounce_rate', 'avg_session_duration'
  )),
  metric_value NUMERIC NOT NULL,
  metadata JSONB, -- additional context
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, integration_id, metric_date, metric_type)
);

-- 6. Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'professional', 'business')),
  status TEXT DEFAULT 'trialing' CHECK (status IN ('trialing', 'active', 'cancelled', 'expired', 'past_due')),
  trial_end TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  payment_gateway TEXT CHECK (payment_gateway IN ('duitku', 'xendit', 'midtrans', 'stripe')),
  gateway_subscription_id TEXT,
  amount NUMERIC,
  currency TEXT DEFAULT 'IDR',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'IDR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded', 'expired')),
  payment_method TEXT,
  payment_gateway TEXT,
  gateway_reference TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('revenue', 'traffic', 'conversion', 'custom', 'comprehensive')),
  date_range TEXT CHECK (date_range IN ('7d', '30d', '90d', 'custom')),
  start_date DATE,
  end_date DATE,
  filters JSONB,
  file_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AI Insights
CREATE TABLE ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('anomaly', 'trend', 'recommendation', 'alert')),
  insight_title TEXT NOT NULL,
  insight_description TEXT NOT NULL,
  insight_data JSONB,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'viewed', 'actioned', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  viewed_at TIMESTAMPTZ,
  actioned_at TIMESTAMPTZ
);

-- Create indexes for performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_teams_slug ON teams(slug);
CREATE INDEX idx_teams_owner_id ON teams(owner_id);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_data_integrations_team_id ON data_integrations(team_id);
CREATE INDEX idx_data_integrations_status ON data_integrations(status);
CREATE INDEX idx_analytics_data_team_id ON analytics_data(team_id);
CREATE INDEX idx_analytics_data_metric_date ON analytics_data(metric_date);
CREATE INDEX idx_analytics_data_metric_type ON analytics_data(metric_type);
CREATE INDEX idx_subscriptions_team_id ON subscriptions(team_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_transactions_team_id ON transactions(team_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_reports_team_id ON reports(team_id);
CREATE INDEX idx_ai_insights_team_id ON ai_insights(team_id);
CREATE INDEX idx_ai_insights_status ON ai_insights(status);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_integrations_updated_at BEFORE UPDATE ON data_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for teams
CREATE POLICY "Team members can view team" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
      AND team_members.status = 'active'
    )
  );

CREATE POLICY "Team owners can update team" ON teams
  FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for team_members
CREATE POLICY "Team members can view members" ON team_members
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Team admins can manage members" ON team_members
  FOR ALL USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() 
      AND status = 'active'
      AND role IN ('admin', 'manager')
    )
  );

-- RLS Policies for data_integrations
CREATE POLICY "Team members can view integrations" ON data_integrations
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Team admins/analysts can manage integrations" ON data_integrations
  FOR ALL USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() 
      AND status = 'active'
      AND role IN ('admin', 'analyst')
    )
  );

-- RLS Policies for analytics_data
CREATE POLICY "Team members can view analytics" ON analytics_data
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- RLS Policies for subscriptions
CREATE POLICY "Team members can view subscriptions" ON subscriptions
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- RLS Policies for transactions
CREATE POLICY "Team members can view transactions" ON transactions
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- RLS Policies for reports
CREATE POLICY "Team members can view reports" ON reports
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Team members (non-viewers) can create reports" ON reports
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() 
      AND status = 'active'
      AND role IN ('admin', 'analyst', 'manager')
    )
  );

-- RLS Policies for ai_insights
CREATE POLICY "Team members can view insights" ON ai_insights
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Team members can update insight status" ON ai_insights
  FOR UPDATE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Function to auto-create user profile and team on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_team_id UUID;
  team_slug TEXT;
BEGIN
  -- Generate unique team slug
  team_slug := 'team-' || LOWER(SUBSTRING(NEW.id::TEXT FROM 1 FOR 8));
  
  -- Create user profile
  INSERT INTO public.user_profiles (id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    'admin',
    'active'
  );

  -- Create default team
  INSERT INTO public.teams (name, slug, plan, billing_status, owner_id)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User') || '''s Team',
    team_slug,
    'starter',
    'trialing',
    NEW.id
  )
  RETURNING id INTO new_team_id;

  -- Add user to team as admin
  INSERT INTO public.team_members (team_id, user_id, role, status, joined_at)
  VALUES (new_team_id, NEW.id, 'admin', 'active', NOW());

  -- Create trial subscription (14 days)
  INSERT INTO public.subscriptions (
    team_id, 
    plan, 
    status, 
    trial_end,
    current_period_start, 
    current_period_end,
    amount,
    currency
  )
  VALUES (
    new_team_id,
    'starter',
    'trialing',
    NOW() + INTERVAL '14 days',
    NOW(),
    NOW() + INTERVAL '14 days',
    0,
    'IDR'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to seed sample analytics data for a team
CREATE OR REPLACE FUNCTION seed_sample_analytics_data(p_team_id UUID, p_days INTEGER DEFAULT 30)
RETURNS VOID AS $$
DECLARE
  v_date DATE;
  v_integration_id UUID;
BEGIN
  -- Create a sample integration if none exists
  INSERT INTO data_integrations (team_id, integration_type, integration_name, status, data_points)
  VALUES (p_team_id, 'google_analytics', 'Google Analytics 4', 'connected', 0)
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_integration_id;
  
  -- If no ID returned (already exists), fetch it
  IF v_integration_id IS NULL THEN
    SELECT id INTO v_integration_id 
    FROM data_integrations 
    WHERE team_id = p_team_id 
    LIMIT 1;
  END IF;

  -- Generate sample data for each day
  FOR i IN 0..p_days-1 LOOP
    v_date := CURRENT_DATE - (i || ' days')::INTERVAL;
    
    -- Revenue
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'revenue', (RANDOM() * 5000000 + 10000000)::NUMERIC(12,2))
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
    
    -- Users
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'users', (RANDOM() * 5000 + 8000)::INTEGER)
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
    
    -- Active Users
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'active_users', (RANDOM() * 3000 + 5000)::INTEGER)
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
    
    -- Pageviews
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'pageviews', (RANDOM() * 50000 + 30000)::INTEGER)
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
    
    -- Sessions
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'sessions', (RANDOM() * 20000 + 15000)::INTEGER)
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
    
    -- Conversions
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'conversions', (RANDOM() * 500 + 200)::INTEGER)
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
    
    -- Purchases
    INSERT INTO analytics_data (team_id, integration_id, metric_date, metric_type, metric_value)
    VALUES (p_team_id, v_integration_id, v_date, 'purchases', (RANDOM() * 300 + 100)::INTEGER)
    ON CONFLICT (team_id, integration_id, metric_date, metric_type) DO NOTHING;
  END LOOP;
  
  -- Update integration data points count
  UPDATE data_integrations
  SET data_points = (SELECT COUNT(*) FROM analytics_data WHERE integration_id = v_integration_id),
      last_sync_at = NOW()
  WHERE id = v_integration_id;
END;
$$ LANGUAGE plpgsql;

-- Add table comments for documentation
COMMENT ON TABLE user_profiles IS 'Extended user profiles with role and status';
COMMENT ON TABLE teams IS 'Organizations/Companies using OASIS BI PRO';
COMMENT ON TABLE team_members IS 'Team membership with roles and permissions';
COMMENT ON TABLE data_integrations IS 'External data source integrations';
COMMENT ON TABLE analytics_data IS 'Time-series analytics metrics';
COMMENT ON TABLE subscriptions IS 'Subscription plans and billing';
COMMENT ON TABLE transactions IS 'Payment transactions history';
COMMENT ON TABLE reports IS 'Generated reports and exports';
COMMENT ON TABLE ai_insights IS 'AI-generated insights and recommendations';

SELECT 'Database schema created successfully! ✅' AS status;
