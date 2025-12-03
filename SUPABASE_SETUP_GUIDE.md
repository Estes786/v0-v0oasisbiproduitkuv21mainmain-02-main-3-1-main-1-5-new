# 🗄️ SUPABASE SETUP GUIDE

## 📋 Prerequisites

- Supabase Project: `augohrpoogldvdvdaxxy`
- URL: `https://augohrpoogldvdvdaxxy.supabase.co`
- Access to Supabase Dashboard

---

## 🚀 Step-by-Step Setup

### Step 1: Apply Database Schema

1. Go to Supabase Dashboard
2. Navigate to: **SQL Editor** → **New Query**
3. Copy entire content from: `/supabase/migrations/001_initial_schema.sql`
4. Paste into SQL Editor
5. Click **RUN** button
6. Verify success message: `Database schema created successfully! ✅`

**Direct Link**: https://supabase.com/dashboard/project/augohrpoogldvdvdaxxy/sql/new

### Step 2: Verify Tables Created

Navigate to **Table Editor** and confirm these tables exist:
- ✅ user_profiles
- ✅ teams
- ✅ team_members
- ✅ data_integrations
- ✅ analytics_data
- ✅ subscriptions
- ✅ transactions
- ✅ reports
- ✅ ai_insights

**Direct Link**: https://supabase.com/dashboard/project/augohrpoogldvdvdaxxy/editor

### Step 3: Test Authentication Trigger

1. Go to **Authentication** → **Users**
2. Create a test user manually (or use signup flow later)
3. Check **Table Editor** → **user_profiles** - should have new entry
4. Check **teams** - should have auto-created team
5. Check **team_members** - should have user as admin
6. Check **subscriptions** - should have trial subscription

**Direct Link**: https://supabase.com/dashboard/project/augohrpoogldvdvdaxxy/auth/users

### Step 4: Seed Sample Data (Optional for Testing)

Run this SQL command to seed analytics data for your test team:

```sql
-- Find your team_id first
SELECT id, name FROM teams;

-- Seed 30 days of sample data (replace YOUR_TEAM_ID)
SELECT seed_sample_analytics_data('YOUR_TEAM_ID', 30);
```

### Step 5: Configure Auth Settings

1. Go to **Authentication** → **Settings** → **Email Templates**
2. Customize confirmation email (optional)
3. Enable **Email Confirmations** (recommended for production)

For development/testing, you can disable email confirmation:
- **Authentication** → **Settings** → **Email Auth**
- Uncheck "Enable email confirmations"

**Direct Link**: https://supabase.com/dashboard/project/augohrpoogldvdvdaxxy/auth/templates

---

## 🔐 Row Level Security (RLS) Policies

All tables have RLS enabled with following access patterns:

### User Profiles
- Users can view/update only their own profile

### Teams
- Team members can view their team
- Only team owners can update team settings

### Team Members
- Team members can view all members
- Only admins/managers can invite/remove members

### Data Integrations
- Team members can view integrations
- Only admins/analysts can connect/disconnect

### Analytics Data
- All team members can view analytics
- System-generated (no direct user inserts)

### Subscriptions & Transactions
- All team members can view
- System-managed (payment gateway webhooks)

### Reports
- All team members can view reports
- Admins/Analysts/Managers can create reports
- Viewers can only view

### AI Insights
- All team members can view and update status
- System-generated

---

## 🧪 Testing Database Functions

### Test User Auto-Creation

```sql
-- This happens automatically when user signs up
-- Manually test the trigger function:

-- 1. Create a test user in auth.users (via Dashboard)
-- 2. Check if profile, team, and subscription were created
SELECT 
  up.id,
  up.email,
  up.full_name,
  t.name as team_name,
  tm.role as team_role,
  s.plan,
  s.status,
  s.trial_end
FROM user_profiles up
LEFT JOIN team_members tm ON tm.user_id = up.id
LEFT JOIN teams t ON t.id = tm.team_id
LEFT JOIN subscriptions s ON s.team_id = t.id
WHERE up.email = 'test@example.com';
```

### Test Analytics Data Generation

```sql
-- Get team_id
SELECT id, name FROM teams WHERE name LIKE '%Team%';

-- Seed data
SELECT seed_sample_analytics_data('YOUR_TEAM_ID', 30);

-- Verify data
SELECT 
  metric_date,
  metric_type,
  metric_value
FROM analytics_data
WHERE team_id = 'YOUR_TEAM_ID'
ORDER BY metric_date DESC, metric_type
LIMIT 20;
```

### Test RLS Policies

```sql
-- This should only show data for authenticated user's team
-- Test by signing in as different users and querying:

SELECT * FROM teams; -- Should only show user's team
SELECT * FROM analytics_data; -- Should only show user's team data
```

---

## 📊 Database Schema Overview

### Core Entities

**user_profiles** → **team_members** → **teams**
- User belongs to team via team_members junction table
- User can have different roles in different teams

**teams** → **data_integrations** → **analytics_data**
- Teams connect external data sources
- Analytics data flows from integrations

**teams** → **subscriptions** → **transactions**
- Teams have subscriptions
- Transactions track payments

**teams** → **reports** & **ai_insights**
- Generated reports and AI insights belong to teams

### Key Relationships

```
auth.users (Supabase Auth)
    ↓
user_profiles
    ↓
team_members ← teams
                ↓
    ┌───────────┼────────────┬───────────┐
    ↓           ↓            ↓           ↓
data_integrations  subscriptions  reports  ai_insights
    ↓               ↓
analytics_data  transactions
```

---

## 🔧 Common Database Operations

### Create Integration

```sql
INSERT INTO data_integrations (
  team_id, 
  integration_type, 
  integration_name, 
  status
) VALUES (
  'YOUR_TEAM_ID',
  'google_analytics',
  'Google Analytics 4',
  'connected'
);
```

### Add Team Member

```sql
-- First, create user profile (or they signup)
-- Then add to team:
INSERT INTO team_members (
  team_id,
  user_id,
  role,
  status,
  joined_at
) VALUES (
  'YOUR_TEAM_ID',
  'NEW_USER_ID',
  'analyst',
  'active',
  NOW()
);
```

### Generate AI Insight

```sql
INSERT INTO ai_insights (
  team_id,
  insight_type,
  insight_title,
  insight_description,
  priority,
  status
) VALUES (
  'YOUR_TEAM_ID',
  'trend',
  'Revenue Trending Up 📈',
  'Your revenue has increased by 23.5% compared to last week. Great job!',
  'high',
  'new'
);
```

---

## ✅ Verification Checklist

- [ ] Database schema applied successfully
- [ ] All 9 tables created
- [ ] RLS policies enabled on all tables
- [ ] Triggers created (handle_new_user)
- [ ] Helper functions created (seed_sample_analytics_data)
- [ ] Test user created successfully
- [ ] User profile auto-created
- [ ] Team auto-created
- [ ] Subscription auto-created
- [ ] Sample analytics data seeded
- [ ] RLS policies tested and working

---

## 🆘 Troubleshooting

### Issue: "Table already exists" error
**Solution**: Run DROP TABLE commands at the top of migration file

### Issue: RLS blocks all queries
**Solution**: Check if user is authenticated and belongs to team

### Issue: Trigger not firing on signup
**Solution**: 
1. Check if trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
2. Re-run trigger creation SQL
3. Test with new user signup

### Issue: Cannot insert data
**Solution**: Check RLS policies - may need to temporarily disable for testing:
```sql
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
-- Do your testing
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

---

## 📚 Next Steps

After database setup:
1. ✅ Test authentication flow in app
2. ✅ Build API routes to fetch data
3. ✅ Connect dashboard to real data
4. ✅ Implement team management
5. ✅ Add integration connection flows

---

**Status**: 🟢 Ready for Application Integration  
**Last Updated**: 2025-12-03
