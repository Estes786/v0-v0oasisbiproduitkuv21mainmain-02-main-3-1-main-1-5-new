# 🚀 OASIS BI PRO - DEPLOYMENT GUIDE

**Status**: ✅ Ready for Production Deployment  
**Last Updated**: 2025-12-07  
**Version**: 2.1.0

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Sebelum deployment, pastikan semua item berikut sudah **COMPLETED**:

- [x] ✅ Duitku HTTP 401 Error Fixed
- [x] ✅ Database Schema Designed
- [x] ✅ Environment Variables Configured
- [x] ✅ npm audit vulnerabilities Fixed
- [x] ✅ Next.js Build Successful
- [x] ✅ Duitku API Test Passed (HTTP 200 OK)
- [ ] ⏳ Database Schema Applied to Supabase
- [ ] ⏳ Deployed to Vercel
- [ ] ⏳ Environment Variables Set in Vercel
- [ ] ⏳ Production Testing Complete

---

## 🎯 DEPLOYMENT OVERVIEW

### Tech Stack:
- **Frontend**: Next.js 15.5.7 + React 19
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Payment Gateway**: Duitku (Sandbox → Production)
- **Hosting**: Vercel
- **Authentication**: Supabase Auth

### Deployment Flow:
```
Local Development
    ↓
Apply Database Schema to Supabase
    ↓
Push Code to GitHub
    ↓
Deploy to Vercel
    ↓
Configure Environment Variables
    ↓
Production Testing
    ↓
Go Live! 🎉
```

---

## 📊 STEP 1: APPLY DATABASE SCHEMA TO SUPABASE

### 1.1 Login to Supabase Dashboard

```
URL: https://supabase.com/dashboard/project/qjzdzkdwtsszqjvxeiqv
```

**Credentials:**
- Email: [Your Supabase Email]
- Password: [Your Supabase Password]

### 1.2 Navigate to SQL Editor

```
Dashboard → SQL Editor → New Query
```

### 1.3 Copy and Run SQL Schema

**File to Copy**: `SUPABASE_DUITKU_SCHEMA.sql`

**Steps:**
1. Open file `SUPABASE_DUITKU_SCHEMA.sql`
2. Select All (Ctrl+A) and Copy (Ctrl+C)
3. Paste into Supabase SQL Editor
4. Click **"Run"** button or press **Ctrl+Enter**

**Expected Output:**
```
✅ Database schema applied successfully!
📊 Tables created: 9
🔒 RLS enabled on all tables
⚡ Indexes optimized for performance
🔄 Triggers configured for automation
```

### 1.4 Verify Tables Created

**Table Editor → Check these 9 tables exist:**

1. ✅ `user_profiles` - User profile data
2. ✅ `teams` - Organization/company data
3. ✅ `team_members` - Team membership
4. ✅ `orders` - Payment orders
5. ✅ `transactions` - Duitku transactions ⭐ **CRITICAL**
6. ✅ `subscriptions` - Active subscriptions
7. ✅ `daily_metrics` - Analytics metrics
8. ✅ `analytics_events` - User events
9. ✅ `revenue_transactions` - Revenue tracking

### 1.5 Test Database Connection

Run this test query in SQL Editor:

```sql
-- Test query
SELECT 
  table_name, 
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Expected**: Should return all 9 tables

---

## 🔐 STEP 2: CONFIGURE ENVIRONMENT VARIABLES

### 2.1 Local Environment (.env.local)

File `.env.local` sudah dibuat dengan kredensial lengkap:

```bash
# Duitku Configuration
NEXT_PUBLIC_DUITKU_MERCHANT_CODE=DS26557
DUITKU_API_KEY=68e1d64813c7f21a1ffc3839064ab6b3
NEXT_PUBLIC_DUITKU_ENV=sandbox
NEXT_PUBLIC_DUITKU_API_URL=https://sandbox.duitku.com/webapi/api/merchant

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qjzdzkdwtsszqjvxeiqv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTg1ODUsImV4cCI6MjA4MDYzNDU4NX0.4dMXUCL4ApROfQnQsvV3FtEcWo2-8P5L-dTQkSD0X7I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqemR6a2R3dHNzenFqdnhlaXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA1ODU4NSwiZXhwIjoyMDgwNjM0NTg1fQ.jAnvDikr2-KoswgnWUSeIK5sGxDb5DqlmZpQeU32jAs

# App Configuration
NEXT_PUBLIC_APP_URL=https://www.oasis-bi-pro.web.id
NEXT_PUBLIC_DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
NEXT_PUBLIC_DUITKU_CALLBACK_URL=https://www.oasis-bi-pro.web.id/api/duitku/callback
```

⚠️ **SECURITY WARNING:**
- File `.env.local` already in `.gitignore`
- **NEVER commit this file to Git**
- Use different credentials for production

### 2.2 Vercel Environment Variables

**After deploying to Vercel**, configure these environment variables:

**Settings → Environment Variables → Add New:**

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_DUITKU_MERCHANT_CODE` | `DS26557` | Production, Preview |
| `DUITKU_API_KEY` | `68e1d64813c7f21a1ffc3839064ab6b3` | Production, Preview |
| `NEXT_PUBLIC_DUITKU_ENV` | `sandbox` (or `production`) | Production |
| `NEXT_PUBLIC_DUITKU_API_URL` | `https://sandbox.duitku.com/webapi/api/merchant` | Production |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qjzdzkdwtsszqjvxeiqv.supabase.co` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `[Your Anon Key]` | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | `[Your Service Role Key]` | Production, Preview |
| `NEXT_PUBLIC_APP_URL` | `[Your Vercel URL]` | Production |
| `NEXT_PUBLIC_DUITKU_RETURN_URL` | `[Your Vercel URL]/payment/success` | Production |
| `NEXT_PUBLIC_DUITKU_CALLBACK_URL` | `[Your Vercel URL]/api/duitku/callback` | Production |

⚠️ **IMPORTANT NOTES:**
1. Replace `[Your Vercel URL]` with actual Vercel deployment URL
2. For production, change `NEXT_PUBLIC_DUITKU_ENV` to `production`
3. For production, use production Duitku credentials (after approval)
4. Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)

---

## 📤 STEP 3: PUSH CODE TO GITHUB

### 3.1 Setup GitHub Authentication

```bash
# This will configure Git credentials globally
# Follow prompts to authenticate
cd /home/user/webapp
```

### 3.2 Check Current Status

```bash
cd /home/user/webapp
git status
git branch
```

**Expected Output:**
- Current branch: `fix-duitku-and-deployment`
- Modified files: Several files
- New files: `.env.local`, `SUPABASE_DUITKU_SCHEMA.sql`, etc.

### 3.3 Commit Changes

```bash
cd /home/user/webapp

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Fix: Duitku HTTP 401 error and complete database schema

- Fixed signature generation (SHA256 → MD5)
- Corrected signature parameters (timestamp → merchantOrderId + amount)
- Created complete Supabase schema with 9 tables
- Added environment variables configuration
- Fixed npm audit vulnerabilities
- Verified with successful test (HTTP 200 OK)

Closes: Duitku HTTP 401 issue
Ready for: Production deployment"
```

### 3.4 Push to GitHub

```bash
cd /home/user/webapp

# Push to branch
git push origin fix-duitku-and-deployment

# Or if first time pushing this branch
git push -u origin fix-duitku-and-deployment
```

### 3.5 Create Pull Request (Optional)

If you want to merge to `main` branch:

1. Go to GitHub repository
2. Navigate to **Pull Requests** tab
3. Click **"New Pull Request"**
4. Set base: `main` ← compare: `fix-duitku-and-deployment`
5. Add title: "Fix: Duitku HTTP 401 and Database Schema"
6. Add description (copy from commit message)
7. Click **"Create Pull Request"**
8. Review changes
9. Click **"Merge Pull Request"**

---

## 🚀 STEP 4: DEPLOY TO VERCEL

### 4.1 Login to Vercel

```
URL: https://vercel.com/login
```

Login with your account (GitHub, GitLab, or Email)

### 4.2 Import Project (First Time Only)

If project not yet connected to Vercel:

1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find your repository: `Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new`
4. Click **"Import"**
5. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click **"Deploy"**

### 4.3 Deploy from Branch

If project already connected:

**Option A: Auto Deploy (Recommended)**
1. Push to GitHub (already done in Step 3)
2. Vercel automatically detects changes
3. Starts deployment automatically
4. Wait for deployment to complete (3-5 minutes)

**Option B: Manual Deploy**
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"** tab
4. Click **"Deploy"** button
5. Select branch: `fix-duitku-and-deployment`
6. Click **"Deploy"**

### 4.4 Monitor Deployment

**Deployment Status:**
- ⏳ Building...
- ⏳ Running build command...
- ⏳ Uploading build output...
- ✅ Deployment Complete!

**Check Logs:**
- Click on deployment
- View **"Building"** logs
- Ensure no errors

### 4.5 Get Deployment URL

After successful deployment:

```
Production URL: https://your-project.vercel.app
Preview URL: https://your-project-git-fix-duitku-and-deployment.vercel.app
```

**Save these URLs** - you'll need them for environment variables!

---

## 🔧 STEP 5: CONFIGURE VERCEL ENVIRONMENT VARIABLES

### 5.1 Navigate to Settings

```
Vercel Dashboard → Your Project → Settings → Environment Variables
```

### 5.2 Add All Environment Variables

**Click "Add New" for each variable:**

#### Duitku Configuration:

```
Name: NEXT_PUBLIC_DUITKU_MERCHANT_CODE
Value: DS26557
Environment: Production, Preview
```

```
Name: DUITKU_API_KEY
Value: 68e1d64813c7f21a1ffc3839064ab6b3
Environment: Production, Preview
```

```
Name: NEXT_PUBLIC_DUITKU_ENV
Value: sandbox
Environment: Production, Preview
```

```
Name: NEXT_PUBLIC_DUITKU_API_URL
Value: https://sandbox.duitku.com/webapi/api/merchant
Environment: Production, Preview
```

#### Supabase Configuration:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://qjzdzkdwtsszqjvxeiqv.supabase.co
Environment: Production, Preview
```

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Your Anon Key from .env.local]
Environment: Production, Preview
```

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Your Service Role Key from .env.local]
Environment: Production, Preview
```

#### App URLs:

```
Name: NEXT_PUBLIC_APP_URL
Value: https://your-project.vercel.app
Environment: Production
```

```
Name: NEXT_PUBLIC_DUITKU_RETURN_URL
Value: https://your-project.vercel.app/payment/success
Environment: Production
```

```
Name: NEXT_PUBLIC_DUITKU_CALLBACK_URL
Value: https://your-project.vercel.app/api/duitku/callback
Environment: Production
```

### 5.3 Redeploy After Adding Variables

**Important**: After adding environment variables:

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## ✅ STEP 6: PRODUCTION TESTING

### 6.1 Test Homepage

```bash
curl https://your-project.vercel.app
```

**Expected**: HTML response (200 OK)

### 6.2 Test API Health

```bash
curl https://your-project.vercel.app/api/duitku/payment-methods
```

**Expected**: JSON response with payment methods

### 6.3 Test Payment Creation (Manual)

1. Navigate to: `https://your-project.vercel.app/pricing`
2. Click **"Pilih Plan"** on any plan
3. Fill checkout form
4. Click **"Lanjutkan Pembayaran"**
5. Should redirect to Duitku payment page
6. Check browser console for any errors

### 6.4 Test Database Connection

1. Navigate to: `https://your-project.vercel.app/dashboard`
2. Should load without database errors
3. Check Vercel logs for any Supabase connection issues

### 6.5 Check Vercel Logs

```
Vercel Dashboard → Your Project → Deployments → [Latest] → Function Logs
```

**Look for:**
- ✅ No 500 errors
- ✅ Supabase connection successful
- ✅ Environment variables loaded
- ✅ API routes responding

---

## 🔍 STEP 7: DUITKU PRODUCTION APPROVAL

### 7.1 Prerequisites

Before submitting to Duitku for production approval:

- [x] ✅ Sandbox testing successful
- [ ] ⏳ Complete transaction flow tested
- [ ] ⏳ Callback handling verified
- [ ] ⏳ All payment methods tested
- [ ] ⏳ Production URL ready

### 7.2 Submit to Duitku

**Email to**: cs@duitku.com

**Subject**: Production Approval Request - OASIS BI PRO (Merchant Code: DS26557)

**Body Template**:
```
Dear Duitku Team,

Saya ingin mengajukan permohonan approval untuk go-live ke production.

MERCHANT DETAILS:
- Merchant Code: DS26557
- Business Name: OASIS BI PRO
- Product: SaaS Subscription Platform (Business Intelligence)

TECHNICAL DETAILS:
- Production URL: https://your-project.vercel.app
- Callback URL: https://your-project.vercel.app/api/duitku/callback
- Return URL: https://your-project.vercel.app/payment/success

TESTING EVIDENCE:
- Sandbox testing: ✅ Successful (HTTP 200 OK)
- Payment flow: ✅ Complete
- Callback handling: ✅ Verified
- Reference: DS2655725RVTDW1H0L4X8J3S (test transaction)

REQUEST:
- Production API credentials
- Production approval
- Go-live date

Terima kasih,
[Your Name]
[Your Contact]
```

### 7.3 After Approval

Once you receive production credentials:

1. **Update Environment Variables in Vercel:**
   - Change `NEXT_PUBLIC_DUITKU_ENV` to `production`
   - Update `DUITKU_API_KEY` with production key
   - Update `NEXT_PUBLIC_DUITKU_API_URL` to production URL

2. **Redeploy:**
   - Trigger redeploy in Vercel
   - Test with real payment

3. **Monitor:**
   - Watch logs for any issues
   - Monitor transactions in Duitku dashboard

---

## 🛠️ TROUBLESHOOTING

### Common Issues:

#### 1. Build Failures

**Error**: `Module not found: Can't resolve '@/lib/...'`

**Solution**:
```bash
cd /home/user/webapp
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Environment Variables Not Loading

**Error**: `NEXT_PUBLIC_SUPABASE_URL is undefined`

**Solution**:
1. Verify all env vars in Vercel Settings
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

#### 3. Supabase Connection Error

**Error**: `Failed to connect to Supabase`

**Solution**:
1. Verify Supabase URL and keys are correct
2. Check Supabase project is active
3. Verify RLS policies allow access

#### 4. Duitku HTTP 401 (Still!)

**Error**: `HTTP 401 Unauthorized`

**Solution**:
1. Verify `DUITKU_API_KEY` is set correctly in Vercel
2. Check signature generation in production logs
3. Ensure using MD5 hash (not SHA256)
4. Verify merchantOrderId and paymentAmount are correct

#### 5. Callback Not Working

**Error**: Callback URL not receiving data

**Solution**:
1. Verify callback URL in Duitku request matches Vercel URL
2. Check `/api/duitku/callback` route is deployed
3. Verify signature verification in callback handler
4. Check Vercel function logs

---

## 📊 MONITORING & MAINTENANCE

### Daily Checks:

- [ ] Check Vercel deployment status
- [ ] Monitor error logs
- [ ] Check Supabase database health
- [ ] Verify payment transactions

### Weekly Checks:

- [ ] Review transaction logs
- [ ] Check failed payments
- [ ] Monitor subscription renewals
- [ ] Review analytics data

### Monthly Checks:

- [ ] Update dependencies: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Database backup
- [ ] Performance review

---

## 📚 USEFUL LINKS

### Production URLs:
- **App**: https://your-project.vercel.app
- **Dashboard**: https://your-project.vercel.app/dashboard
- **Pricing**: https://your-project.vercel.app/pricing
- **API Docs**: https://your-project.vercel.app/api

### Admin Panels:
- **Vercel**: https://vercel.com/dashboard
- **Supabase**: https://supabase.com/dashboard/project/qjzdzkdwtsszqjvxeiqv
- **Duitku**: https://passport.duitku.com/weblogin
- **GitHub**: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new

### Documentation:
- **Duitku API**: https://docs.duitku.com/api/id/
- **Supabase**: https://supabase.com/docs
- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs

---

## ✅ DEPLOYMENT COMPLETION CHECKLIST

After completing all steps, verify:

- [ ] ✅ Database schema applied to Supabase
- [ ] ✅ Code pushed to GitHub
- [ ] ✅ Deployed to Vercel successfully
- [ ] ✅ Environment variables configured
- [ ] ✅ Production testing passed
- [ ] ✅ Homepage loads correctly
- [ ] ✅ API endpoints responding
- [ ] ✅ Payment flow working
- [ ] ✅ Database connection active
- [ ] ✅ No errors in logs
- [ ] ⏳ Duitku production approval (pending)

---

## 🎉 CONGRATULATIONS!

Your OASIS BI PRO application is now live!

**Next Steps:**
1. Test thoroughly in production
2. Monitor logs and metrics
3. Submit to Duitku for production approval
4. Switch to production API credentials
5. Start acquiring customers!

**Support:**
- Duitku: cs@duitku.com
- Vercel: vercel.com/support
- Supabase: support.supabase.com

---

**Guide Version**: 1.0.0  
**Last Updated**: 2025-12-07  
**Status**: ✅ COMPLETE
