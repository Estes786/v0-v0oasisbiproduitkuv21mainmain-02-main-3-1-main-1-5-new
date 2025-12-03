# 🚀 OASIS BI PRO - Deployment Guide

## Quick Start for Vercel Deployment

### Prerequisites
- Node.js 18+ installed
- GitHub account
- Vercel account (free tier works)
- Duitku Sandbox credentials (provided)

---

## Step 1: Prepare Environment Variables

Create `.env.local` file in project root:

\`\`\`env
# Duitku Sandbox Credentials
DUITKU_MERCHANT_CODE=DS26335
DUITKU_API_KEY=78cb96d8cb9ea9dc40d1c77068a659f6
DUITKU_ENVIRONMENT=sandbox
DUITKU_BASE_URL=https://sandbox.duitku.com/webapi/api/merchant

# Site URLs (update with your domain after deployment)
NEXT_PUBLIC_SITE_URL=https://www.oasis-bi-pro.web.id
DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success
DUITKU_CALLBACK_URL=https://www.oasis-bi-pro.web.id/api/duitku/callback

# Supabase (optional - can skip for initial deployment)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
\`\`\`

---

## Step 2: Local Testing (Optional)

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
# Test checkout flow at /pricing
\`\`\`

---

## Step 3: Push to GitHub

If not already initialized:

\`\`\`bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "OASIS BI PRO v2.2.0 - Duitku compliance update"

# Add remote (your GitHub repo)
git remote add origin https://github.com/Estes786/v0-oasisbiproduitkuv21main.git

# Push to main branch
git push -u origin main
\`\`\`

---

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from `.env.local`
   - Make sure to add for all environments (Production, Preview, Development)

6. Click "Deploy"

7. Wait 2-3 minutes for deployment

8. Get deployment URL (e.g., `oasis-bi-pro-xyz.vercel.app`)

### Option B: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? oasis-bi-pro-duitku
# - Directory? ./
# - Override settings? No
\`\`\`

---

## Step 5: Configure Custom Domain

### In Vercel Dashboard:

1. Go to your project settings
2. Click "Domains"
3. Add domain: `www.oasis-bi-pro.web.id`
4. Add DNS records:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

### Update Environment Variables:

After domain is active, update these in Vercel:
- `NEXT_PUBLIC_SITE_URL=https://www.oasis-bi-pro.web.id`
- `DUITKU_RETURN_URL=https://www.oasis-bi-pro.web.id/payment/success`
- `DUITKU_CALLBACK_URL=https://www.oasis-bi-pro.web.id/api/duitku/callback`

Then redeploy.

---

## Step 6: Test Live Deployment

### Test Pages:
1. **Landing:** https://www.oasis-bi-pro.web.id/
2. **Features:** https://www.oasis-bi-pro.web.id/features
3. **How It Works:** https://www.oasis-bi-pro.web.id/how-it-works
4. **Pricing:** https://www.oasis-bi-pro.web.id/pricing
5. **Dashboard:** https://www.oasis-bi-pro.web.id/dashboard

### Test Checkout Flow:
1. Go to `/pricing`
2. Click "Pilih Paket" on any plan
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 081234567890
4. Click "Lanjutkan Pembayaran"
5. Should redirect to Duitku Sandbox payment page
6. Complete test payment
7. Should redirect back to `/payment/success`

---

## Step 7: Configure Duitku Callback URL

### In Duitku Merchant Dashboard:

1. Login to Duitku merchant dashboard
2. Go to Settings → Callback URL
3. Add callback URL: `https://www.oasis-bi-pro.web.id/api/duitku/callback`
4. Save settings

### Test Callback:

1. Make a test payment
2. Check Vercel logs: Project → Deployments → Functions
3. Look for `/api/duitku/callback` POST requests
4. Verify signature validation passes

---

## Step 8: Monitor & Verify

### Check Vercel Logs:
\`\`\`bash
# Using Vercel CLI
vercel logs

# Or in Vercel Dashboard:
# Project → Deployments → [Latest] → Functions
\`\`\`

### Check API Routes:
- **Checkout:** `POST /api/duitku/checkout`
- **Callback:** `POST /api/duitku/callback`
- **Status:** `GET /api/duitku/status?merchantOrderId=XXX`

---

## Production Checklist

Before going live with real payments:

- [ ] Test all pages load correctly
- [ ] Test checkout flow end-to-end
- [ ] Verify callback URL is reachable
- [ ] Check Duitku signature validation works
- [ ] Test all payment methods (Bank Transfer, E-Wallet, Credit Card)
- [ ] Verify email confirmations (if configured)
- [ ] Check member dashboard access after payment
- [ ] Test mobile responsiveness
- [ ] Verify SSL certificate is active
- [ ] Configure Supabase for real database
- [ ] Request Duitku production credentials
- [ ] Update environment variables with production keys
- [ ] Test production payment flow
- [ ] Enable production mode in Duitku dashboard

---

## Troubleshooting

### Build Fails
\`\`\`bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
\`\`\`

### API Routes Not Working
- Check environment variables are set in Vercel
- Verify callback URL is correct
- Check Vercel function logs for errors

### Payment Redirect Fails
- Verify `DUITKU_RETURN_URL` is correct
- Check Duitku merchant dashboard for return URL setting
- Ensure URL uses HTTPS (not HTTP)

### Callback Not Received
- Verify callback URL in Duitku dashboard
- Check Vercel function logs
- Ensure URL is publicly accessible (not localhost)
- Test callback URL with curl:
  \`\`\`bash
  curl -X POST https://www.oasis-bi-pro.web.id/api/duitku/callback \
    -H "Content-Type: application/json" \
    -d '{"merchantOrderId":"TEST123","amount":"299000","resultCode":"00","signature":"test"}'
  \`\`\`

---

## Deployment Commands Reference

\`\`\`bash
# Development
npm run dev           # Start dev server at localhost:3000

# Production Build
npm run build         # Build for production
npm start            # Start production server

# Deployment
vercel               # Deploy to preview
vercel --prod        # Deploy to production

# Environment
vercel env ls        # List environment variables
vercel env add       # Add environment variable
vercel env rm        # Remove environment variable

# Logs
vercel logs          # View function logs
vercel logs --follow # Follow logs in real-time
\`\`\`

---

## Support

If you encounter issues during deployment:

**Technical Support:**
- Email: elfaress2425@gmail.com
- Phone: +62 857-1265-8316

**Documentation:**
- README_ENHANCEMENTS.md - Feature documentation
- DUITKU_COMPLIANCE_CHECKLIST.md - Compliance verification
- Duitku API Docs: https://docs.duitku.com

---

**Deployment Status:** READY FOR PRODUCTION ✅
**Last Updated:** November 26, 2024
**Version:** 2.2.0
