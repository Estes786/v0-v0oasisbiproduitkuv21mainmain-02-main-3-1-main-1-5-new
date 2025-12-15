# 📊 OASIS BI PRO - Analytics & Tracking Setup Guide

**Last Updated**: December 15, 2025  
**Version**: 2.2.0  
**Status**: ✅ Production Ready

---

## 🎯 OVERVIEW

This guide covers the complete setup for all analytics, tracking, and authentication services integrated into OASIS BI PRO:

1. **Google Analytics 4 (GA4)** - Website traffic and user behavior tracking
2. **Google Tag Manager (GTM)** - Centralized tag management
3. **Google OAuth** - Social login with Google accounts
4. **HubSpot Tracking** - Cookie consent and marketing automation
5. **Google Search Console** - SEO monitoring and sitemap submission

---

## 📈 1. GOOGLE ANALYTICS 4 (GA4)

### Current Configuration

```typescript
// components/analytics/GoogleAnalytics.tsx
const GA_MEASUREMENT_ID = 'G-YVDTXND4XB';
```

**Property Details:**
- **Measurement ID**: `G-YVDTXND4XB`
- **Stream ID**: `13134677006`
- **Property Name**: OASIS BI PRO
- **Website URL**: https://www.oasis-bi-pro.web.id

### Setup Steps

#### Step 1: Verify GA4 Configuration
1. Go to [Google Analytics](https://analytics.google.com)
2. Select property: **OASIS BI PRO (G-YVDTXND4XB)**
3. Navigate to **Admin** → **Data Streams**
4. Verify stream is **ACTIVE** and pointing to your domain

#### Step 2: Test GA4 Tracking
```bash
# Open your website in browser
open https://www.oasis-bi-pro.web.id

# Check browser console (F12)
# Should see: gtag('config', 'G-YVDTXND4XB', ...)

# Or use GA4 DebugView
# Go to: Admin → DebugView in GA4 dashboard
```

#### Step 3: Real-time Verification
1. In GA4, go to **Reports** → **Realtime**
2. Open your website in another tab
3. You should see 1 active user in real-time report

### GA4 Events Being Tracked

```javascript
// Automatically tracked:
- page_view (all page navigations)
- session_start
- first_visit
- user_engagement

// Custom events (to add):
- sign_up (user registration)
- login (user sign in)
- purchase (subscription checkout)
- add_to_cart (pricing plan selection)
```

---

## 🏷️ 2. GOOGLE TAG MANAGER (GTM)

### Current Status: ⚠️ NOT CONFIGURED YET

GTM is integrated in code but needs container ID to be fully operational.

### Setup Steps

#### Step 1: Create GTM Container
1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create a new **Container**
   - Container name: `OASIS BI PRO`
   - Target platform: **Web**
3. Copy your **Container ID** (format: `GTM-XXXXXX`)

#### Step 2: Configure Environment Variable
```bash
# Add to .env.local and .env.production
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
```

#### Step 3: Publish GTM Container
1. In GTM, create a **Workspace**
2. Add **Tags** you need:
   - Google Analytics: GA4 Configuration
   - Custom HTML tags
   - Event tracking tags
3. **Submit** and **Publish** your container

#### Step 4: Verify GTM Installation
```bash
# Use Google Tag Assistant extension
# Or check browser console:
# Should see: dataLayer.push({'gtm.start': ...})
```

### GTM Tag Examples

**Example 1: Track Button Clicks**
```javascript
// Tag Type: Custom HTML
// Trigger: Click - All Elements
<script>
  document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button')) {
      dataLayer.push({
        'event': 'cta_click',
        'button_text': e.target.textContent,
        'button_location': window.location.pathname
      });
    }
  });
</script>
```

**Example 2: Track Form Submissions**
```javascript
// Tag Type: Custom HTML
// Trigger: Form Submission
<script>
  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      dataLayer.push({
        'event': 'form_submit',
        'form_id': e.target.id,
        'form_name': e.target.name
      });
    });
  });
</script>
```

---

## 🔐 3. GOOGLE OAUTH (SIGN IN WITH GOOGLE)

### Current Configuration

**Google Cloud Console Project:**
- **Project ID**: `supabase-auth-project-481118`
- **Project Number**: `273911695562`

**OAuth 2.0 Client:**
- **Client ID**: `[YOUR_GOOGLE_CLIENT_ID]` (from Google Cloud Console)
- **Client Secret**: `[YOUR_GOOGLE_CLIENT_SECRET]` (from Google Cloud Console)
- **Redirect URI**: `https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback`

### Supabase Auth Configuration

#### Step 1: Configure Google Provider in Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **qjzdzkdwtsszqjvxeiqv**
3. Navigate to **Authentication** → **Providers**
4. Enable **Google** provider
5. Enter credentials:
   ```
   Client ID: [Your Google OAuth Client ID from Google Cloud Console]
   Client Secret: [Your Google OAuth Client Secret from Google Cloud Console]
   ```
6. **Save** configuration

#### Step 2: Update Redirect URIs
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client
4. Add **Authorized redirect URIs**:
   ```
   https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback
   https://www.oasis-bi-pro.web.id/auth/callback
   http://localhost:3000/auth/callback
   ```
5. **Save** changes

#### Step 3: Test Google Sign In
```bash
# Start dev server
npm run dev

# Open browser
open http://localhost:3000/auth/signin

# Click "Sign in with Google" button
# Should redirect to Google OAuth consent screen
# After consent, should redirect back to /member/dashboard
```

### Troubleshooting Google OAuth

**Error: "redirect_uri_mismatch"**
```
Solution: 
1. Check redirect URI in Google Cloud Console
2. Must exactly match Supabase callback URL
3. No trailing slashes
```

**Error: "OAuth client not found"**
```
Solution:
1. Verify Client ID in Supabase matches Google Cloud Console
2. Ensure OAuth client is enabled in Google Cloud
```

**Error: "Access blocked: Authorization Error"**
```
Solution:
1. Verify OAuth consent screen is configured
2. Add test users if in "Testing" mode
3. Or publish the app for "Production"
```

---

## 🍪 4. HUBSPOT TRACKING & COOKIE CONSENT

### Current Configuration

**HubSpot Portal:**
- **Portal ID**: `na2`
- **Personal Access Key**: `[YOUR_HUBSPOT_PAK]` (from HubSpot Settings → Integrations → Private Apps)
- **API Key**: `[YOUR_HUBSPOT_API_KEY]` (from HubSpot Settings → Integrations)

### Setup Steps

#### Step 1: Configure Cookie Banner
1. Go to [HubSpot Settings](https://app.hubspot.com/settings/)
2. Navigate to **Privacy & Consent**
3. Enable **Cookie Consent Banner**
4. Customize banner text and style
5. **Publish** banner

#### Step 2: Cookie Settings Button
The "Cookie Settings" button is automatically added to bottom-right corner of every page.

```typescript
// components/analytics/CookieConsent.tsx
// Button appears at: position: fixed; bottom: 20px; right: 20px;
```

#### Step 3: Test Cookie Banner
```bash
# Clear browser cookies
# Open website in incognito mode
open https://www.oasis-bi-pro.web.id

# Cookie banner should appear
# Click "Cookie Settings" button to reopen banner
```

---

## 🔍 5. GOOGLE SEARCH CONSOLE

### Current Configuration

**Verification Method**: HTML file upload
- **Verification File**: `googleea4f1b15fc6a6551.html`
- **File Location**: `/public/googleea4f1b15fc6a6551.html`
- **Verification URL**: https://www.oasis-bi-pro.web.id/googleea4f1b15fc6a6551.html

**Sitemap Configuration:**
- **Sitemap URL**: https://www.oasis-bi-pro.web.id/sitemap.xml
- **Robots.txt**: https://www.oasis-bi-pro.web.id/robots.txt

### Setup Steps

#### Step 1: Verify Domain Ownership
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Enter: `https://www.oasis-bi-pro.web.id`
4. Choose **HTML file upload** method
5. Verification file is already at `/public/googleea4f1b15fc6a6551.html`
6. Click **Verify**

#### Step 2: Submit Sitemap
1. After verification, go to **Sitemaps** section
2. Enter sitemap URL: `sitemap.xml`
3. Click **Submit**
4. Wait 24-48 hours for indexing to begin

#### Step 3: Monitor Index Coverage
```bash
# Check which pages are indexed
Go to: Search Console → Coverage

# Check crawl errors
Go to: Search Console → Coverage → Errors

# View search performance
Go to: Search Console → Performance
```

### Sitemap Contents

**Total URLs**: 17 pages

```xml
Priority 1.0 (Homepage):
- /

Priority 0.9 (Main features):
- /platform
- /how-it-works  
- /pricing

Priority 0.8 (Secondary):
- /features
- /blog

Priority 0.7 (About):
- /about
- /legal/faq

Priority 0.6 (Auth):
- /auth/signin
- /auth/signup
- /legal/contact

Priority 0.5 (Legal):
- /legal/privacy
- /legal/terms
- /legal/refund
- /legal/dpa
- /legal/cookies
```

---

## ✅ VERIFICATION CHECKLIST

### Pre-Deployment Checks

- [x] **GA4** - Measurement ID updated to `G-YVDTXND4XB`
- [ ] **GTM** - Container ID set in environment variables
- [x] **Google OAuth** - Credentials configured in Supabase
- [x] **HubSpot** - Cookie consent banner integrated
- [x] **Search Console** - Verification file uploaded
- [x] **Sitemap** - sitemap.xml created and accessible
- [x] **Robots.txt** - robots.txt created and configured
- [x] **Blog Menu** - Added to navbar and footer

### Post-Deployment Verification

```bash
# 1. Test GA4 tracking
curl https://www.oasis-bi-pro.web.id
# Check GA4 Realtime report for 1 active user

# 2. Test sitemap accessibility  
curl https://www.oasis-bi-pro.web.id/sitemap.xml
# Should return XML sitemap

# 3. Test robots.txt
curl https://www.oasis-bi-pro.web.id/robots.txt
# Should return robots.txt content

# 4. Test Google verification file
curl https://www.oasis-bi-pro.web.id/googleea4f1b15fc6a6551.html
# Should return: google-site-verification: googleea4f1b15fc6a6551.html

# 5. Test Google OAuth
# Open /auth/signin → Click "Sign in with Google"
# Should redirect to Google consent screen
```

---

## 🔧 TROUBLESHOOTING

### Common Issues

#### Issue 1: GA4 Not Tracking
```bash
Solution:
1. Check browser console for errors
2. Verify GA_MEASUREMENT_ID is correct
3. Check if AdBlocker is blocking gtag.js
4. Wait 24-48 hours for data to appear in reports
```

#### Issue 2: GTM Container Not Loading
```bash
Solution:
1. Verify NEXT_PUBLIC_GTM_ID is set in .env files
2. Check browser Network tab for gtm.js request
3. Ensure GTM container is Published (not just Saved)
```

#### Issue 3: Google OAuth Failing
```bash
Solution:
1. Check Supabase logs for auth errors
2. Verify redirect URIs match in both Google Cloud and Supabase
3. Ensure OAuth consent screen is configured
4. Check if email domain is allowed (if restricted)
```

#### Issue 4: Search Console Not Indexing
```bash
Solution:
1. Request indexing manually via Search Console
2. Check robots.txt is not blocking crawlers
3. Verify sitemap is accessible (no 404 errors)
4. Check for crawl errors in Coverage report
```

---

## 📚 ADDITIONAL RESOURCES

### Documentation Links

- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/10089681)
- [Google Tag Manager Docs](https://developers.google.com/tag-manager)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [HubSpot Tracking Code](https://knowledge.hubspot.com/reports/install-the-hubspot-tracking-code)
- [Google Search Console Help](https://support.google.com/webmasters/)

### Next.js Integration

```typescript
// All analytics components are in:
/components/analytics/
  ├── GoogleAnalytics.tsx
  ├── GoogleTagManager.tsx
  ├── CookieConsent.tsx
  └── HubSpotTracking.tsx

// Integrated in:
/app/layout.tsx
```

---

## 🎯 NEXT STEPS

After completing this setup:

1. **Monitor Analytics** (Week 1-2)
   - Check GA4 daily for traffic patterns
   - Verify all events are tracking correctly
   - Set up custom reports and dashboards

2. **Optimize Tracking** (Week 3-4)
   - Add custom events for key user actions
   - Set up conversion goals in GA4
   - Create GTM triggers for important buttons

3. **SEO Improvements** (Month 2+)
   - Monitor Search Console for ranking keywords
   - Fix any crawl errors
   - Optimize meta tags based on search performance
   - Create content based on search queries

---

**Last Updated**: December 15, 2025  
**Maintained By**: OASIS BI PRO Development Team  
**Questions?** Contact: elfaress2425@gmail.com
