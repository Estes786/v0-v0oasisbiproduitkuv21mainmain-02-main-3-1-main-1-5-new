# 🚀 OASIS BI PRO - FULLSTACK TRANSFORMATION PLAN

## 📋 PROJECT OVERVIEW

**Repository**: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new.git  
**Current State**: Template/Mockup dengan data statis  
**Target State**: Real Fullstack SaaS App dengan Supabase Backend  
**Mode**: AUTONOMOUS - NO STOP - NO VALIDATION

---

## 🏗️ ARCHITECTURE STACK

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: TailwindCSS + Framer Motion
- **State**: React Hooks + Supabase Realtime
- **Charts**: Chart.js (CDN) + Recharts

### Backend
- **Runtime**: Supabase Edge Functions (Deno)
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (Email/Password + Social)
- **Storage**: Supabase Storage (untuk avatar, reports)

### Deployment
- **Frontend**: Vercel
- **Backend**: Supabase (Edge Functions auto-deployed)
- **Domain**: Custom domain (optional)

---

## 📊 DATABASE SCHEMA DESIGN

### Core Tables

#### 1. **user_profiles** (extends auth.users)
```sql
- id (UUID, FK to auth.users)
- email (TEXT, UNIQUE)
- full_name (TEXT)
- company (TEXT)
- phone (TEXT)
- avatar_url (TEXT)
- role (TEXT: 'admin' | 'analyst' | 'viewer' | 'manager')
- status (TEXT: 'active' | 'invited' | 'suspended')
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### 2. **teams**
```sql
- id (UUID, PRIMARY KEY)
- name (TEXT)
- slug (TEXT, UNIQUE)
- plan (TEXT: 'starter' | 'professional' | 'business')
- billing_status (TEXT: 'active' | 'trial' | 'expired' | 'cancelled')
- owner_id (UUID, FK to auth.users)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### 3. **team_members**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- user_id (UUID, FK to auth.users)
- role (TEXT: 'admin' | 'analyst' | 'viewer' | 'manager')
- status (TEXT: 'active' | 'invited')
- invited_by (UUID, FK to auth.users)
- invited_at (TIMESTAMPTZ)
- joined_at (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ)
```

#### 4. **data_integrations**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- integration_type (TEXT: 'google_analytics' | 'shopee' | 'tokopedia' | etc)
- integration_name (TEXT)
- status (TEXT: 'connected' | 'disconnected' | 'error')
- credentials (JSONB, encrypted)
- last_sync_at (TIMESTAMPTZ)
- next_sync_at (TIMESTAMPTZ)
- sync_frequency (TEXT: 'realtime' | 'hourly' | 'daily')
- data_points (INTEGER)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### 5. **analytics_data**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- integration_id (UUID, FK to data_integrations)
- metric_date (DATE)
- metric_type (TEXT: 'revenue' | 'users' | 'pageviews' | 'conversions' | etc)
- metric_value (NUMERIC)
- metadata (JSONB: additional data)
- created_at (TIMESTAMPTZ)
```

#### 6. **subscriptions**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- plan (TEXT: 'starter' | 'professional' | 'business')
- status (TEXT: 'trialing' | 'active' | 'cancelled' | 'expired')
- trial_end (TIMESTAMPTZ)
- current_period_start (TIMESTAMPTZ)
- current_period_end (TIMESTAMPTZ)
- payment_gateway (TEXT: 'duitku' | 'xendit' | 'midtrans')
- gateway_subscription_id (TEXT)
- amount (NUMERIC)
- currency (TEXT: 'IDR')
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### 7. **transactions**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- subscription_id (UUID, FK to subscriptions)
- amount (NUMERIC)
- currency (TEXT)
- status (TEXT: 'pending' | 'success' | 'failed' | 'refunded')
- payment_method (TEXT)
- payment_gateway (TEXT)
- gateway_reference (TEXT)
- metadata (JSONB)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### 8. **reports**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- created_by (UUID, FK to auth.users)
- report_name (TEXT)
- report_type (TEXT: 'revenue' | 'traffic' | 'conversion' | 'custom')
- date_range (TEXT: '7d' | '30d' | '90d' | 'custom')
- start_date (DATE)
- end_date (DATE)
- filters (JSONB)
- file_url (TEXT, if exported)
- created_at (TIMESTAMPTZ)
```

#### 9. **ai_insights**
```sql
- id (UUID, PRIMARY KEY)
- team_id (UUID, FK to teams)
- insight_type (TEXT: 'anomaly' | 'trend' | 'recommendation')
- insight_title (TEXT)
- insight_description (TEXT)
- insight_data (JSONB)
- priority (TEXT: 'high' | 'medium' | 'low')
- status (TEXT: 'new' | 'viewed' | 'actioned' | 'dismissed')
- created_at (TIMESTAMPTZ)
```

---

## 🔧 SUPABASE EDGE FUNCTIONS

### 1. **analytics-processor** (EXISTING - ENHANCE)
**Path**: `/supabase/functions/analytics-processor`
**Purpose**: Process dan aggregate analytics data
**Endpoints**:
- GET `/analytics-processor/overview?teamId={id}&range={7d|30d|90d}`
- GET `/analytics-processor/revenue?teamId={id}&range={7d|30d|90d}`
- GET `/analytics-processor/traffic?teamId={id}&range={7d|30d|90d}`
- GET `/analytics-processor/devices?teamId={id}&range={7d|30d|90d}`

### 2. **ai-insights-generator** (EXISTING - ENHANCE)
**Path**: `/supabase/functions/ai-insights-generator`
**Purpose**: Generate AI insights dari analytics data
**Endpoints**:
- POST `/ai-insights-generator/generate?teamId={id}`
- GET `/ai-insights-generator/list?teamId={id}`

### 3. **report-generator** (EXISTING - ENHANCE)
**Path**: `/supabase/functions/report-generator`
**Purpose**: Generate PDF/Excel reports
**Endpoints**:
- POST `/report-generator/create`
- GET `/report-generator/download/{reportId}`

### 4. **data-sync** (NEW)
**Path**: `/supabase/functions/data-sync`
**Purpose**: Sync data dari external integrations
**Endpoints**:
- POST `/data-sync/google-analytics`
- POST `/data-sync/shopee`
- POST `/data-sync/tokopedia`
- POST `/data-sync/facebook-ads`
- POST `/data-sync/instagram`

### 5. **team-management** (NEW)
**Path**: `/supabase/functions/team-management`
**Purpose**: Manage teams dan members
**Endpoints**:
- POST `/team-management/invite`
- POST `/team-management/remove`
- PUT `/team-management/update-role`
- GET `/team-management/members?teamId={id}`

### 6. **payment-webhook** (EXISTING - ENHANCE)
**Path**: `/supabase/functions/payment-webhook`
**Purpose**: Handle payment gateway webhooks
**Endpoints**:
- POST `/payment-webhook/duitku`
- POST `/payment-webhook/xendit`
- POST `/payment-webhook/midtrans`

---

## 🎨 UI/UX RE-ARCHITECTURE

### Current Pages Analysis

#### ✅ **Landing Page** (`/`)
- Status: Good, needs minor CTA adjustments
- Action: Keep existing, add real signup flow

#### 🔄 **Authentication** (`/auth/*`)
- Current: Template/mockup
- Transform To: 
  - Real Supabase Auth integration
  - Email/Password signup
  - Social login (Google, GitHub)
  - Email verification
  - Password reset flow

#### 🔄 **Dashboard** (`/dashboard`)
- Current: Static mockup data
- Transform To:
  - Real-time analytics from database
  - User-specific team data
  - Filtering by date range
  - Export functionality
  - AI insights integration

#### 🔄 **Member Management** (`/member`)
- Current: Static member list
- Transform To:
  - Real team members from database
  - Invite flow with email
  - Role-based access control
  - Status management (Active/Invited/Suspended)

#### 🔄 **Platform/Integrations** (`/platform`)
- Current: Static integration cards
- Transform To:
  - Real integration status
  - OAuth connection flow
  - Last sync time
  - Data points counter
  - Disconnect functionality

#### ✅ **Pricing** (`/pricing`)
- Status: Good
- Action: Connect to real payment gateway

#### ✅ **Tutorial/Roadmap** (`/tutorial`, `/roadmap`)
- Status: Good content
- Action: Add interactive onboarding checklist

---

## 🔐 AUTHENTICATION FLOW

### Sign Up Process
1. User fills form (email, password, full_name, company)
2. Supabase Auth creates user in auth.users
3. Trigger `handle_new_user()` function:
   - Creates user_profile
   - Creates default team
   - Adds user as team admin
   - Creates trial subscription (14 days)
4. Send welcome email with verification link
5. Redirect to `/tutorial` (onboarding)

### Sign In Process
1. User enters email + password
2. Supabase Auth validates
3. Create session
4. Fetch user profile + team data
5. Redirect to `/dashboard`

### Role-Based Access Control
- **Admin**: Full access, can invite/remove members, manage billing
- **Analyst**: Can view and create reports, no team management
- **Viewer**: Read-only access to dashboards
- **Manager**: Can view data and manage team members (not billing)

---

## 📈 ANALYTICS DATA FLOW

### Data Collection Path
```
External Source (Google Analytics, Shopee, etc)
    ↓
Edge Function: data-sync
    ↓
Database: analytics_data table
    ↓
Edge Function: analytics-processor (aggregation)
    ↓
Dashboard: Real-time charts
```

### Metrics Collected
1. **Revenue Metrics**
   - Total revenue
   - Revenue by source
   - Revenue growth %
   
2. **User Metrics**
   - Total users
   - Active users
   - New users
   - User growth %

3. **Traffic Metrics**
   - Page views
   - Sessions
   - Traffic sources breakdown
   - Device breakdown

4. **Conversion Metrics**
   - Conversion rate
   - Funnel analysis
   - Cart abandonment
   - Top products

---

## 🤖 AI INSIGHTS FEATURES

### Insight Types
1. **Anomaly Detection**
   - Sudden revenue drop/spike
   - Traffic anomalies
   - Conversion rate changes

2. **Trend Analysis**
   - Revenue trends (up/down/stable)
   - User growth patterns
   - Seasonal patterns

3. **Recommendations**
   - Best performing channels
   - Optimization suggestions
   - Budget allocation advice

### Implementation
- Use simple statistical analysis (no external AI API needed initially)
- Compare current vs previous period
- Flag outliers (> 2 standard deviations)
- Generate human-readable insights

---

## 👥 TEAM COLLABORATION FEATURES

### Core Features
1. **Team Creation**
   - Auto-created on signup
   - Custom team name/slug

2. **Member Invitation**
   - Email invitation
   - Role assignment
   - Pending invitations list

3. **Permission Matrix**
   ```
   Feature          | Admin | Manager | Analyst | Viewer
   ------------------------------------------------
   View Dashboard   |   ✅   |    ✅    |    ✅    |   ✅
   Export Reports   |   ✅   |    ✅    |    ✅    |   ❌
   Manage Members   |   ✅   |    ✅    |    ❌    |   ❌
   Manage Billing   |   ✅   |    ❌    |    ❌    |   ❌
   Connect APIs     |   ✅   |    ❌    |    ✅    |   ❌
   ```

---

## 💳 PAYMENT INTEGRATION (FUTURE)

### Duitku Integration
- Payment methods: VA, E-wallet, Retail
- Webhook for payment status
- Auto-upgrade subscription on success
- Invoice generation

### Subscription Management
- Trial period: 14 days
- Monthly billing cycle
- Auto-renewal
- Cancellation flow
- Proration logic

---

## 🚀 DEVELOPMENT PHASES

### Phase 1: Database & Auth (PRIORITY HIGH) ✅
- [x] Apply database schema to Supabase
- [ ] Test RLS policies
- [ ] Implement auth pages (signup/signin)
- [ ] Test auth flow end-to-end
- [ ] Create test users with different roles

### Phase 2: Dashboard Real Data (PRIORITY HIGH) ✅
- [ ] Seed sample analytics data
- [ ] Create analytics-processor Edge Function
- [ ] Connect dashboard to real data
- [ ] Implement date range filtering
- [ ] Add data refresh functionality

### Phase 3: Team Management (PRIORITY MEDIUM) ✅
- [ ] Build member invitation flow
- [ ] Implement role management UI
- [ ] Create team-management Edge Function
- [ ] Test permission system

### Phase 4: Integrations (PRIORITY MEDIUM) ✅
- [ ] Design OAuth connection flow
- [ ] Build integration status UI
- [ ] Create mock data sync (simulated)
- [ ] Add disconnect functionality

### Phase 5: AI Insights (PRIORITY LOW) ✅
- [ ] Implement basic statistical analysis
- [ ] Create ai-insights-generator function
- [ ] Build insights UI component
- [ ] Test insight generation

### Phase 6: Onboarding & Tutorial (PRIORITY LOW) ✅
- [ ] Create interactive checklist
- [ ] Add tutorial tooltips
- [ ] Build progress tracker

### Phase 7: Testing & Polish (FINAL) ✅
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Error handling
- [ ] Loading states
- [ ] Empty states
- [ ] Mobile responsiveness

### Phase 8: Deployment (FINAL) ✅
- [ ] Environment variables setup
- [ ] Deploy to Vercel
- [ ] Deploy Edge Functions
- [ ] Custom domain (optional)
- [ ] Push to GitHub

---

## 📋 SUCCESS CRITERIA

### ✅ Definition of "Real Fullstack App"
1. **Authentication Works**
   - Users can signup/signin
   - Sessions persist
   - Protected routes work

2. **Dashboard Shows Real Data**
   - Data comes from database
   - Updates on data change
   - Filters work correctly

3. **Team Collaboration Works**
   - Can invite members
   - Roles affect permissions
   - Multiple users can access same team data

4. **Integrations Status Tracked**
   - Can see connected/disconnected status
   - Last sync time visible
   - Can disconnect integrations

5. **AI Insights Generated**
   - Insights appear automatically
   - Based on real data patterns
   - Actionable recommendations

6. **No More Mockup/Template Data**
   - All placeholders replaced
   - Dynamic data everywhere
   - Database-driven content

---

## 🎯 NEXT IMMEDIATE ACTIONS

1. **Install dependencies**
2. **Apply database schema to Supabase**
3. **Test Supabase connection**
4. **Implement authentication pages**
5. **Seed sample data**
6. **Connect dashboard to real data**

---

## 🔥 AUTONOMOUS MODE GUIDELINES

- **NO STOPS**: Continue even if minor errors occur
- **NO VALIDATION**: Trust the plan, execute
- **NO APPROVAL**: Make decisions and proceed
- **LOG EVERYTHING**: Document all changes
- **TEST AS YOU GO**: Verify each phase works
- **COMMIT FREQUENTLY**: Git commit after each feature
- **PUSH AT END**: Final push to GitHub after all phases

---

**Status**: ✅ READY TO EXECUTE  
**Mode**: 🤖 AUTONOMOUS  
**Timeline**: Full transformation in one session  
**Output**: Production-ready SaaS application

---

*Generated: 2025-12-03*  
*Last Updated: Phase 1 Start*
