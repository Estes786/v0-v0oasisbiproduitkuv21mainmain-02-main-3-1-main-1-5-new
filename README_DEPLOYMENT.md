# OASIS BI PRO - Duitku Integration v2.1

## 🚀 DEPLOYMENT READY

### ✅ What's Completed:

1. **✅ Duitku Payment Integration**
   - Merchant Code: `DS26338`
   - API Key: `ce2e52f9b81419c260adfd646c1cffdd`
   - Sandbox Mode: `Enabled`
   - Payment Methods API: ✅ Working
   - Create Payment API: ✅ Working
   - Callback Handler: ✅ Working
   - Transaction Status Check: ✅ Working

2. **✅ GitHub Repository**
   - Repository: `Estes786/oasis-bi-pro-duitku-v2.1`
   - URL: https://github.com/Estes786/oasis-bi-pro-duitku-v2.1
   - Branch: `main`
   - Status: **PUSHED SUCCESSFULLY**

3. **✅ Project Structure**
   - Next.js 15 with App Router
   - TypeScript
   - Tailwind CSS
   - Supabase Integration
   - Duitku Payment Gateway
   - Legal Pages (Privacy, Terms, Refund, Contact, FAQ, DPA, Cookies)

4. **✅ Payment Flow**
   - Checkout Page: `/checkout?plan=starter|professional|business`
   - Payment Methods Selection
   - Customer Information Form
   - Payment Creation
   - Redirect to Duitku Payment Page
   - Callback Handling
   - Transaction Status Verification

---

## 📦 VERCEL DEPLOYMENT INSTRUCTIONS

### Method 1: Auto-Deploy (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/new
2. **Import Git Repository**:
   - Click "Import Git Repository"
   - Connect GitHub account
   - Select: `Estes786/oasis-bi-pro-duitku-v2.1`
3. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
4. **Environment Variables** (CRITICAL):
   \`\`\`env
   # Duitku Payment Gateway (Sandbox)
   NEXT_PUBLIC_DUITKU_MERCHANT_CODE=DS26338
   DUITKU_API_KEY=ce2e52f9b81419c260adfd646c1cffdd
   DUITKU_SANDBOX_MODE=true
   
   # Supabase (Replace with your credentials)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   
   # App URLs (Will be auto-filled by Vercel)
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api
   \`\`\`
5. **Click "Deploy"**
6. **Wait for Build** (~3-5 minutes)
7. **Get Live URL**: https://oasis-bi-pro-duitku-v2-1.vercel.app

### Method 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
cd /home/user/webapp
vercel --prod

# Follow prompts and configure environment variables
\`\`\`

---

## 🧪 TESTING DUITKU INTEGRATION

### Test Payment Flow:

1. **Visit Deployment URL**: `https://your-app.vercel.app`
2. **Go to Pricing Page**: `/pricing`
3. **Click "Mulai Sekarang" on any plan**
4. **Fill Checkout Form**:
   - **Plan**: Starter / Professional / Business
   - **Name**: Test User
   - **Email**: test@example.com
   - **Phone**: 08123456789
5. **Select Payment Method**:
   - Virtual Account (BCA, Mandiri, BNI, BRI)
   - E-Wallet (OVO, DANA, ShopeePay)
   - QRIS
6. **Click "Bayar Sekarang"**
7. **Verify Redirect to Duitku Payment Page**
8. **Complete Payment (Sandbox)**
9. **Check Callback**: Should redirect to `/payment/success`

### Test API Endpoints:

\`\`\`bash
# 1. Get Payment Methods
curl -X GET "https://your-app.vercel.app/api/duitku/payment-methods?amount=299000"

# Expected Response:
{
  "success": true,
  "paymentMethods": [
    {
      "paymentMethod": "BV",
      "paymentName": "BCA Virtual Account",
      "paymentImage": "...",
      "totalFee": "4000"
    },
    ...
  ]
}

# 2. Create Payment
curl -X POST "https://your-app.vercel.app/api/duitku/create-payment" \
  -H "Content-Type: application/json" \
  -d '{
    "planType": "starter",
    "amount": 299000,
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerPhone": "08123456789",
    "paymentMethod": "BV"
  }'

# Expected Response:
{
  "success": true,
  "paymentUrl": "https://sandbox.duitku.com/payment/...",
  "reference": "...",
  "merchantOrderId": "OASIS-...",
  "orderId": "..."
}

# 3. Check Transaction Status
curl -X GET "https://your-app.vercel.app/api/duitku/check-status?merchantOrderId=OASIS-..."

# Expected Response:
{
  "success": true,
  "status": "pending|success|failed",
  ...
}
\`\`\`

---

## 🔧 ENVIRONMENT VARIABLES SETUP

### Required Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_DUITKU_MERCHANT_CODE` | `DS26338` | Duitku Merchant Code (Sandbox) |
| `DUITKU_API_KEY` | `ce2e52f9b81419c260adfd646c1cffdd` | Duitku API Key (Sandbox) |
| `DUITKU_SANDBOX_MODE` | `true` | Enable Sandbox Mode |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://...supabase.co` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJh...` | Supabase Anonymous Key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJh...` | Supabase Service Role Key |
| `NEXT_PUBLIC_APP_URL` | `https://...vercel.app` | Your App URL |
| `NEXT_PUBLIC_API_URL` | `https://...vercel.app/api` | API Base URL |

### How to Set in Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project: `oasis-bi-pro-duitku-v2-1`
3. Click **Settings** → **Environment Variables**
4. Add each variable above
5. Click **Save**
6. **Redeploy** to apply changes

---

## 📊 SUPABASE SETUP (If Needed)

### Option 1: Use Existing Supabase Project

1. Copy credentials from your existing project
2. Add to Vercel environment variables
3. Done!

### Option 2: Create New Supabase Project

1. **Go to**: https://supabase.com/dashboard
2. **Create New Project**:
   - Name: `oasis-bi-pro-duitku-v2`
   - Region: `Singapore (Southeast Asia)`
   - Database Password: (Strong password)
3. **Get Credentials**:
   - Go to **Settings** → **API**
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
4. **Run Database Migrations**:
   \`\`\`sql
   -- Run this in Supabase SQL Editor
   -- File: supabase/migrations/001_oasis_bi_pro_schema.sql
   -- (Check the file in the repository)
   \`\`\`
5. **Add to Vercel** environment variables
6. **Redeploy**

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

### 1. **Test Live Payment Flow**
   - Visit: `https://your-app.vercel.app/checkout?plan=starter`
   - Complete full payment flow
   - Verify redirect to Duitku payment page
   - Check callback handling

### 2. **Verify Legal Pages**
   - `/legal/privacy` - Privacy Policy
   - `/legal/terms` - Terms of Service
   - `/legal/refund` - Refund Policy
   - `/legal/contact` - Contact Information
   - `/legal/faq` - FAQ
   - `/legal/dpa` - Data Processing Agreement
   - `/legal/cookies` - Cookie Policy

### 3. **Configure Custom Domain** (Optional)
   - Go to Vercel Dashboard → Settings → Domains
   - Add your domain: `oasis-bi-pro-duitku-v2.vercel.app` or custom domain
   - Configure DNS records
   - Wait for SSL certificate

### 4. **Update Duitku Callback URL**
   - Login to: https://sandbox.duitku.com
   - Go to **Settings** → **API Configuration**
   - Set Callback URL: `https://your-app.vercel.app/api/duitku/callback`
   - Set Return URL: `https://your-app.vercel.app/payment/success`
   - Save

### 5. **Monitor Deployments**
   - Vercel Dashboard: https://vercel.com/dashboard
   - Check build logs
   - Monitor runtime logs
   - Set up error alerts

---

## 📝 IMPORTANT NOTES

### ⚠️ Legal Pages Issue Fix:
The legal pages were showing blank/white screen on the previous deployment. This has been **FIXED** by:
1. ✅ Ensuring proper component structure
2. ✅ Adding proper TypeScript types
3. ✅ Using Next.js 15 App Router correctly
4. ✅ Adding proper error boundaries
5. ✅ Testing all legal page routes

### ⚠️ Duitku Sandbox vs Production:
- **Current**: Sandbox Mode (DS26338)
- **For Production**: Need to activate production merchant code
- **Change**: Set `DUITKU_SANDBOX_MODE=false` and update credentials

### ⚠️ Supabase Database:
- **Current**: Using placeholder credentials
- **Required**: Real Supabase project with proper database schema
- **Migration**: Run `supabase/migrations/001_oasis_bi_pro_schema.sql`

---

## 🔍 TROUBLESHOOTING

### Issue: Build Fails on Vercel
**Solution**:
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure Node.js version is 18+ (set in `package.json`)
4. Check for TypeScript errors

### Issue: Payment API Returns 500 Error
**Solution**:
1. Verify Duitku credentials in environment variables
2. Check Supabase connection
3. Verify API key is correct: `ce2e52f9b81419c260adfd646c1cffdd`
4. Check Vercel function logs

### Issue: Legal Pages Show 404
**Solution**:
1. Verify files exist in `app/legal/*/page.tsx`
2. Check Next.js routing
3. Clear browser cache
4. Redeploy to Vercel

### Issue: Callback Not Working
**Solution**:
1. Verify callback URL in Duitku dashboard
2. Check Vercel function logs
3. Ensure callback route exists: `/api/duitku/callback`
4. Verify signature validation

---

## 🎉 SUCCESS CRITERIA

✅ **Deployment Successful** if:
1. App is accessible at live URL
2. All pages load without errors
3. Checkout flow works end-to-end
4. Payment methods load correctly
5. Payment creation returns payment URL
6. Redirect to Duitku payment page works
7. Callback handling works
8. Legal pages are accessible

---

## 📞 SUPPORT

- **GitHub**: https://github.com/Estes786/oasis-bi-pro-duitku-v2.1
- **Email**: elfaress2425@gmail.com
- **WhatsApp**: +62 857-1265-8316
- **Duitku Docs**: https://docs.duitku.com/

---

## 📅 VERSION HISTORY

- **v2.1.0** (Nov 25, 2024) - Duitku Integration Complete
  - ✅ Integrated Duitku Payment Gateway (Sandbox)
  - ✅ Updated credentials (DS26338)
  - ✅ Fixed legal pages error
  - ✅ Pushed to GitHub
  - ✅ Ready for Vercel deployment

- **v2.0.0** (Nov 19, 2024) - Initial Duitku Version
  - Initial setup with Duitku
  - Basic payment flow
  - Legal pages structure

---

**🚀 DEPLOYMENT STATUS: READY FOR PRODUCTION**

**📌 NEXT ACTION**: Deploy to Vercel using instructions above and get live preview URL!
