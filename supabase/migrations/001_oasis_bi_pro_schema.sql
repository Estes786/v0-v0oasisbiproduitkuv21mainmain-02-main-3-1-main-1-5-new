-- OASIS BI PRO - Complete Database Schema
-- Enterprise Business Intelligence & Analytics Platform
-- Version: 1.0.0
-- Date: 2025-11-15

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USER MANAGEMENT & AUTHENTICATION
-- ============================================================================

-- User profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams/Organizations
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter', -- starter, professional, enterprise
  billing_status TEXT DEFAULT 'active', -- active, past_due, canceled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer', -- admin, editor, viewer
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- ============================================================================
-- 2. ANALYTICS & EVENTS
-- ============================================================================

-- Analytics events (raw data)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  properties JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT,
  user_id TEXT,
  device_info JSONB
);

-- Daily metrics (aggregated)
CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, metric_date, metric_name)
);

-- Revenue transactions
CREATE TABLE revenue_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'IDR',
  source TEXT, -- shopee, tokopedia, website, etc
  channel TEXT, -- organic, paid, direct, referral
  customer_id TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- ============================================================================
-- 3. DATA INTEGRATIONS
-- ============================================================================

-- Integrations (connected data sources)
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL, -- google_analytics, shopee, etc
  source_name TEXT NOT NULL,
  credentials JSONB, -- encrypted
  status TEXT DEFAULT 'active', -- active, inactive, error
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Data sync logs
CREATE TABLE data_sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
  sync_start TIMESTAMPTZ,
  sync_end TIMESTAMPTZ,
  status TEXT NOT NULL, -- success, failed, partial
  records_synced INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. AI INSIGHTS & RECOMMENDATIONS
-- ============================================================================

-- AI insights
CREATE TABLE insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL, -- anomaly, trend, forecast, recommendation
  severity TEXT DEFAULT 'info', -- info, warning, critical
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  dismissed_at TIMESTAMPTZ
);

-- AI recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- marketing, operations, product
  title TEXT NOT NULL,
  description TEXT,
  expected_impact TEXT, -- low, medium, high
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected, implemented
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. ATTRIBUTION & CUSTOMER JOURNEY
-- ============================================================================

-- Customer touchpoints
CREATE TABLE touchpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  customer_id TEXT NOT NULL,
  channel TEXT NOT NULL, -- organic, paid_search, social, email, etc
  touchpoint_type TEXT NOT NULL, -- visit, click, conversion
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- Attribution results
CREATE TABLE attribution_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  model_type TEXT NOT NULL, -- first_touch, last_touch, linear, time_decay, markov
  revenue_attributed NUMERIC DEFAULT 0,
  conversions_attributed INTEGER DEFAULT 0,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. REPORTS
-- ============================================================================

-- Reports (scheduled/custom)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL, -- dashboard, scheduled, custom
  config JSONB NOT NULL,
  schedule TEXT, -- cron expression
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report deliveries
CREATE TABLE report_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  delivered_at TIMESTAMPTZ DEFAULT NOW(),
  recipients TEXT[],
  format TEXT DEFAULT 'pdf', -- pdf, excel, json
  status TEXT DEFAULT 'sent' -- sent, failed
);

-- ============================================================================
-- 7. SUBSCRIPTIONS & BILLING (Midtrans)
-- ============================================================================

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  plan TEXT NOT NULL, -- starter, professional, enterprise
  status TEXT DEFAULT 'active', -- active, past_due, canceled, trialing
  trial_end TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  midtrans_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions (Midtrans payments)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  order_id TEXT UNIQUE NOT NULL,
  gross_amount NUMERIC NOT NULL,
  status TEXT NOT NULL, -- pending, settlement, cancel, expire
  payment_type TEXT,
  midtrans_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, refunded
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE touchpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE attribution_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies: Team members can access team data
CREATE POLICY "Team members can view team data" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

-- Similar RLS policies for all team-related tables
CREATE POLICY "Team members can view analytics" ON analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = analytics_events.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 9. INDEXES FOR PERFORMANCE
-- ============================================================================

-- Analytics events indexes
CREATE INDEX idx_analytics_events_team_id ON analytics_events(team_id);
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);

-- Revenue transactions indexes
CREATE INDEX idx_revenue_team_id ON revenue_transactions(team_id);
CREATE INDEX idx_revenue_timestamp ON revenue_transactions(timestamp);
CREATE INDEX idx_revenue_channel ON revenue_transactions(channel);

-- Touchpoints indexes
CREATE INDEX idx_touchpoints_customer_id ON touchpoints(customer_id);
CREATE INDEX idx_touchpoints_timestamp ON touchpoints(timestamp);

-- Team members lookup
CREATE INDEX idx_team_members_user_id ON team_members(user_id);

-- ============================================================================
-- 10. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 11. VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Team analytics summary
CREATE OR REPLACE VIEW team_analytics_summary AS
SELECT
  t.id AS team_id,
  t.name AS team_name,
  t.plan,
  COUNT(DISTINCT ae.id) AS total_events,
  COUNT(DISTINCT rt.id) AS total_transactions,
  COALESCE(SUM(rt.amount), 0) AS total_revenue
FROM teams t
LEFT JOIN analytics_events ae ON t.id = ae.team_id
LEFT JOIN revenue_transactions rt ON t.id = rt.team_id
GROUP BY t.id, t.name, t.plan;

-- View: Recent insights
CREATE OR REPLACE VIEW recent_insights AS
SELECT
  i.*,
  t.name AS team_name
FROM insights i
JOIN teams t ON i.team_id = t.id
WHERE i.dismissed_at IS NULL
ORDER BY i.created_at DESC;

-- ============================================================================
-- 12. SEED DATA (Optional - for testing)
-- ============================================================================

-- Insert sample team (for development only)
-- INSERT INTO teams (name, slug, plan) VALUES ('Demo Company', 'demo-company', 'professional');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

COMMENT ON DATABASE postgres IS 'OASIS BI PRO - Enterprise Business Intelligence Platform';
