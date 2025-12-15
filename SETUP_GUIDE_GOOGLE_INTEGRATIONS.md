# 🚀 OASIS BI PRO - Google Integrations Setup Guide

Panduan lengkap untuk mengintegrasikan Google OAuth, Google Analytics 4, Google Tag Manager, HubSpot, dan Google Search Console ke OASIS BI PRO.

---

## 📋 Table of Contents

1. [Google OAuth Setup (Sign In with Google)](#1-google-oauth-setup)
2. [Google Analytics 4 Setup](#2-google-analytics-4-setup)
3. [Google Tag Manager Setup](#3-google-tag-manager-setup)
4. [HubSpot Integration Setup](#4-hubspot-integration-setup)
5. [Google Search Console Setup](#5-google-search-console-setup)
6. [Testing & Verification](#6-testing--verification)

---

## 1. Google OAuth Setup (Sign In with Google)

### Prerequisites
- Google Cloud Console Project (You need to have your own project)
- Client ID (Get from Google Cloud Console → APIs & Services → Credentials)
- Client Secret (Get from Google Cloud Console → APIs & Services → Credentials)

### Step 1: Configure OAuth in Supabase Dashboard

1. **Login ke Supabase Dashboard**
   - URL: https://supabase.com/dashboard
   - Navigate to your project: `qjzdzkdwtsszqjvxeiqv`

2. **Go to Authentication → Providers**
   - Path: `Authentication` → `Providers` → `Google`

3. **Enable Google Provider**
   - Toggle: **Enabled** ✅
   - **Client ID**: Paste your Google OAuth Client ID
   - **Client Secret**: Paste your Google OAuth Client Secret
   - Click **Save**

### Step 2: Configure Redirect URIs in Google Cloud Console

1. **Login to Google Cloud Console**
   - URL: https://console.cloud.google.com
   - Project: `supabase-auth-project-481118`

2. **Navigate to OAuth 2.0 Client IDs**
   - Path: `APIs & Services` → `Credentials`
   - Select your OAuth 2.0 Client ID

3. **Add Authorized Redirect URIs**
   ```
   https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback
   https://www.oasis-bi-pro.web.id/auth/callback
   http://localhost:3000/auth/callback
   ```

4. **Add Authorized JavaScript Origins**
   ```
   https://www.oasis-bi-pro.web.id
   https://qjzdzkdwtsszqjvxeiqv.supabase.co
   http://localhost:3000
   ```

5. **Click Save**

### Step 3: Configure Email Confirmation Settings

1. **Go to Supabase Dashboard → Authentication → Email Templates**

2. **Confirm Your Signup Template**
   - Subject: `Confirm your signup`
   - Body: Update with custom branding if needed

3. **Settings → User Signups**
   - **Allow new users to sign up**: ✅ Enabled
   - **Confirm email**: ✅ Enabled (Recommended)
   - **Allow anonymous sign-ins**: ❌ Disabled

### Step 4: Test Google OAuth

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Sign In Page**
   - URL: http://localhost:3000/auth/signin

3. **Click "Sign in with Google"**
   - Should redirect to Google OAuth consent screen
   - After authorization, should redirect back to `/auth/callback`
   - Then redirect to `/member/dashboard`

### Troubleshooting Google OAuth

**Error: "redirect_uri_mismatch"**
- Solution: Ensure redirect URI in Google Cloud Console matches Supabase exactly
- Check: `https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback`

**Error: "Access blocked: This app's request is invalid"**
- Solution: Verify Client ID and Client Secret are correct in Supabase
- Check: OAuth consent screen is configured properly

**Error: User redirects to /auth/callback but doesn't login**
- Solution: Check browser console for errors
- Verify: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct

---

## 2. Google Analytics 4 Setup

### Prerequisites
- GA4 Property ID: `13134677006`
- Measurement ID: `G-YVDTXND4XB`

### Step 1: Verify GA4 Configuration in Code

The GA4 tracking code is already integrated in:
- File: `/components/analytics/GoogleAnalytics.tsx`
- Measurement ID: `G-YVDTXND4XB`

### Step 2: Configure GA4 in Google Analytics Dashboard

1. **Login to Google Analytics**
   - URL: https://analytics.google.com
   - Property: `OASIS BI PRO` (ID: 13134677006)

2. **Admin → Data Streams**
   - Select web data stream
   - Website URL: `https://www.oasis-bi-pro.web.id`
   - Stream name: `OASIS BI PRO Web`
   - Enhanced measurement: ✅ Enabled

3. **Enhanced Measurement Events** (Auto-tracked)
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

### Step 3: Set Up Custom Events (Optional)

Add custom event tracking for important actions:

```typescript
// Example: Track button clicks
gtag('event', 'button_click', {
  'event_category': 'engagement',
  'event_label': 'Sign Up Button'
});

// Example: Track conversions
gtag('event', 'conversion', {
  'send_to': 'G-YVDTXND4XB/purchase',
  'value': 299000,
  'currency': 'IDR'
});
```

### Step 4: Configure Goals & Conversions

1. **Admin → Events → Mark as conversion**
   - `purchase` → Mark as conversion ✅
   - `sign_up` → Mark as conversion ✅
   - `trial_start` → Mark as conversion ✅

2. **Configure E-commerce Tracking**
   - Admin → Data Settings → Data collection
   - Enable: ✅ Google signals data collection
   - Enable: ✅ User data collection

### Step 5: Verify GA4 Tracking

1. **Real-time Report**
   - Navigate to: Reports → Realtime
   - Visit your website: https://www.oasis-bi-pro.web.id
   - Should see active users in real-time report

2. **Debug View** (Development)
   - Install Chrome extension: "Google Analytics Debugger"
   - Visit site with extension enabled
   - Check browser console for GA4 events

---

## 3. Google Tag Manager Setup

### Prerequisites
- GTM Container ID: `GTM-XXXXXXX` (You need to create this)

### Step 1: Create GTM Container

1. **Login to Google Tag Manager**
   - URL: https://tagmanager.google.com
   - Click: "Create Account"

2. **Account Setup**
   - Account Name: `OASIS Analytics`
   - Country: `Indonesia`
   - Container Name: `OASIS BI PRO`
   - Target Platform: **Web**

3. **Get Container ID**
   - After creation, you'll get: `GTM-XXXXXXX`
   - Copy this ID

### Step 2: Update GTM ID in Code

1. **Update File**: `/components/analytics/GoogleTagManager.tsx`
   ```typescript
   const GTM_ID = 'GTM-XXXXXXX'; // Replace with your actual ID
   ```

2. **Deploy Changes**
   ```bash
   git add .
   git commit -m "Update GTM ID"
   git push origin main
   ```

### Step 3: Configure GTM Tags

1. **GA4 Configuration Tag**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: `G-YVDTXND4XB`
   - Trigger: All Pages

2. **Event Tracking Tags**
   
   **Button Click Tag**
   - Tag Type: GA4 Event
   - Event Name: `button_click`
   - Trigger: Click - All Elements (Filter: button clicks)

   **Form Submission Tag**
   - Tag Type: GA4 Event
   - Event Name: `form_submit`
   - Trigger: Form Submission

   **Outbound Link Tag**
   - Tag Type: GA4 Event
   - Event Name: `outbound_click`
   - Trigger: Click - Just Links (Filter: external links)

### Step 4: Publish GTM Container

1. **Click "Submit"** in GTM dashboard
2. **Version Name**: `Initial Setup - GA4 + Events`
3. **Version Description**: `GA4 configuration and basic event tracking`
4. **Click "Publish"**

### Step 5: Verify GTM Installation

1. **GTM Preview Mode**
   - Click "Preview" in GTM dashboard
   - Enter URL: `https://www.oasis-bi-pro.web.id`
   - Verify tags are firing correctly

2. **Google Tag Assistant**
   - Install Chrome extension: "Tag Assistant Legacy"
   - Visit your website
   - Check if GTM and GA4 tags are detected

---

## 4. HubSpot Integration Setup

### Prerequisites
- HubSpot Portal ID: `na2-0e63-91a8-4211-ab7d-e9106c465dd0`
- HubSpot API Key: (From your screenshot)

### Step 1: Verify HubSpot Tracking Code

The tracking code is already integrated in:
- File: `/components/analytics/HubSpotTracking.tsx`
- Portal ID: `na2-0e63-91a8-4211-ab7d-e9106c465dd0`

### Step 2: Configure HubSpot Forms

1. **Login to HubSpot**
   - URL: https://app.hubspot.com
   - Navigate to: Marketing → Lead Capture → Forms

2. **Create Newsletter Subscription Form**
   - Form Name: `Blog Newsletter Subscription`
   - Fields: Email Address
   - Submit button: `Subscribe`
   - Redirect: Thank you page

3. **Embed Form Code**
   - Get embed code from HubSpot
   - Update blog page newsletter section with HubSpot form

### Step 3: Set Up Email Workflows

1. **Navigate to**: Automation → Workflows

2. **Create Welcome Email Workflow**
   - Trigger: Form submission (Newsletter form)
   - Action: Send email → "Welcome to OASIS BI PRO"
   - Delay: 1 day → Send email → "Getting Started Guide"

### Step 4: Configure Cookie Consent

The HubSpot cookie consent banner is already configured:
- Component: `HubSpotCookieButton` in footer
- Users can manage cookies via "Cookie Settings" button

### Step 5: Verify HubSpot Tracking

1. **Real-time Activity**
   - HubSpot → Reports → Analytics Tools
   - Visit your website
   - Check if tracking script is active

2. **Page Views Tracking**
   - Navigate to: Reports → Analytics Tools → Traffic Analytics
   - Verify page views are being tracked

---

## 5. Google Search Console Setup

### Prerequisites
- Verification Meta Tag: `ea4f1b15fc6a6551`
- Website: `https://www.oasis-bi-pro.web.id`

### Step 1: Verify Site Ownership

The verification meta tag is already added to the site:
```html
<meta name="google-site-verification" content="ea4f1b15fc6a6551" />
```

Location: `/app/layout.tsx` in `<head>` section

### Step 2: Add Property in Google Search Console

1. **Login to Google Search Console**
   - URL: https://search.google.com/search-console

2. **Add Property**
   - Click: "+ Add Property"
   - URL prefix: `https://www.oasis-bi-pro.web.id`
   - Verification method: HTML tag (already added)
   - Click: "Verify"

### Step 3: Submit Sitemap

1. **Generate Sitemap** (if not exists)
   - Create file: `/public/sitemap.xml`
   - Or use Next.js automatic sitemap generation

2. **Submit to Google Search Console**
   - Navigate to: Sitemaps (left menu)
   - Enter: `https://www.oasis-bi-pro.web.id/sitemap.xml`
   - Click: "Submit"

### Step 4: Configure URL Parameters

1. **Navigate to**: Settings → Crawling → URL Parameters

2. **Configure Parameters** (if using query params)
   - `utm_source`, `utm_medium`, `utm_campaign`: No effect on content

### Step 5: Monitor Performance

1. **Performance Report**
   - Check: Clicks, Impressions, CTR, Position
   - Filter by: Pages, Queries, Countries, Devices

2. **Coverage Report**
   - Monitor: Valid pages, Error pages, Excluded pages
   - Fix any errors reported

3. **Core Web Vitals**
   - Monitor: LCP, FID, CLS scores
   - Ensure all metrics are "Good" (green)

---

## 6. Testing & Verification

### Comprehensive Testing Checklist

#### ✅ Google OAuth Testing

- [ ] Navigate to `/auth/signin`
- [ ] Click "Sign in with Google"
- [ ] Should redirect to Google OAuth consent
- [ ] Grant permissions
- [ ] Should redirect back to `/member/dashboard`
- [ ] User session should persist after refresh
- [ ] Sign out and sign in again works correctly

#### ✅ Google Analytics 4 Testing

- [ ] Open GA4 Real-time report
- [ ] Visit website in different browser
- [ ] Check if user appears in Real-time report (within 30 seconds)
- [ ] Navigate to different pages
- [ ] Verify page_view events are tracked
- [ ] Check Events → Conversions are firing (if configured)

#### ✅ Google Tag Manager Testing

- [ ] Enable GTM Preview mode
- [ ] Visit website
- [ ] Verify GTM container loads
- [ ] Check all tags fire correctly:
  - [ ] GA4 Configuration tag
  - [ ] Page view tags
  - [ ] Event tags (button clicks, form submissions)
- [ ] Disable Preview mode
- [ ] Verify tags work in production

#### ✅ HubSpot Testing

- [ ] Visit website
- [ ] Check if HubSpot tracking script loads (browser console)
- [ ] Submit newsletter form
- [ ] Verify form submission in HubSpot dashboard
- [ ] Click "Cookie Settings" button in footer
- [ ] Verify HubSpot cookie banner appears

#### ✅ Google Search Console Testing

- [ ] Verify site ownership successful
- [ ] Submit sitemap
- [ ] Wait 24-48 hours for initial crawl
- [ ] Check Coverage report for indexed pages
- [ ] Check Performance report (may take 2-3 days for data)

### Browser Console Debugging

**Check if all scripts load:**
```javascript
// Open browser console (F12)

// Check GA4
console.log(window.gtag ? '✅ GA4 Loaded' : '❌ GA4 Not Loaded');

// Check GTM
console.log(window.dataLayer ? '✅ GTM Loaded' : '❌ GTM Not Loaded');

// Check HubSpot
console.log(window._hsp ? '✅ HubSpot Loaded' : '❌ HubSpot Not Loaded');
```

### Network Tab Verification

1. Open DevTools → Network tab
2. Filter by: `google-analytics`, `googletagmanager`, `hubspot`
3. Verify requests return `200 OK` status

### Production Deployment Checklist

- [ ] All environment variables set in Vercel/Hosting
- [ ] Google OAuth redirect URIs include production URL
- [ ] GA4 Measurement ID correct
- [ ] GTM Container ID correct
- [ ] HubSpot Portal ID correct
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Build successful with zero errors
- [ ] All analytics scripts load in production
- [ ] Test OAuth flow in production
- [ ] Monitor GA4 Real-time for first production visitors

---

## 📞 Support & Troubleshooting

If you encounter issues:

1. **Check Browser Console** for JavaScript errors
2. **Check Network Tab** for failed requests
3. **Verify Environment Variables** are set correctly
4. **Test in Incognito Mode** to avoid cache issues
5. **Check Supabase Logs** for authentication errors
6. **Check GA4 DebugView** for event tracking issues

### Common Issues & Solutions

**Issue**: Google OAuth not working
- **Solution**: Verify Client ID and Secret in Supabase
- **Solution**: Check redirect URIs in Google Cloud Console

**Issue**: GA4 not tracking events
- **Solution**: Check Measurement ID is correct
- **Solution**: Verify gtag script loads in Network tab

**Issue**: GTM tags not firing
- **Solution**: Use GTM Preview mode to debug
- **Solution**: Check trigger conditions

**Issue**: HubSpot forms not submitting
- **Solution**: Verify Portal ID is correct
- **Solution**: Check CORS settings in HubSpot

---

## 🎉 Success Criteria

All integrations are successful when:

✅ Users can sign in with Google OAuth  
✅ GA4 tracks page views and events in Real-time  
✅ GTM container loads and tags fire correctly  
✅ HubSpot tracks visitors and form submissions  
✅ Google Search Console shows verified property  
✅ Sitemap indexed with no errors  
✅ All analytics scripts load without console errors  
✅ Production deployment has all tracking active  

---

**Last Updated**: December 15, 2025  
**Version**: 1.0.0  
**Maintained by**: OASIS BI PRO Engineering Team
