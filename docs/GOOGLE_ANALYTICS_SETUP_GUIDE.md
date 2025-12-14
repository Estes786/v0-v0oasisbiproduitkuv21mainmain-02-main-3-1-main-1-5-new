# 📊 Google Analytics 4 + Google Search Console - Complete Setup Guide

**Platform**: OASIS BI PRO  
**Date**: December 14, 2025  
**Version**: v2.2.0  

---

## ✅ WHAT'S ALREADY CONFIGURED

### 1. Google Analytics 4 (GA4)
**Status**: ✅ **INSTALLED AND CONFIGURED**

**Configuration Details**:
```
GA4 Measurement ID: G-M3RKJXHLJ7
Data Stream ID: 13134600441
Property Name: oasis-bi-pro.web.id
```

**What's Been Implemented**:
- ✅ GA4 gtag.js script installed in `app/layout.tsx`
- ✅ Google Analytics component created (`components/analytics/GoogleAnalytics.tsx`)
- ✅ Event tracking library (`lib/analytics.ts`)
- ✅ Automatic page view tracking
- ✅ Custom event tracking for:
  - User Sign Ups (email & Google OAuth)
  - User Logins
  - Subscription Plan Selections
  - Checkout Starts
  - Successful Purchases
  - Content Interactions
  - Search Queries

**Files Modified**:
```
✅ app/layout.tsx - Added GA4 script
✅ components/analytics/GoogleAnalytics.tsx - GA4 component
✅ components/analytics/CookieConsent.tsx - GDPR consent (Cookiebot)
✅ lib/analytics.ts - Event tracking functions
✅ app/auth/signup/page.tsx - Signup tracking
```

---

## 🔧 WHAT YOU NEED TO DO

### Step 1: Verify GA4 Installation (DO THIS FIRST)

#### Option A: Using Google Tag Assistant (Recommended)

1. **Install Chrome Extension**:
   - Go to: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk
   - Click "Add to Chrome"

2. **Test Your Website**:
   - Visit: https://www.oasis-bi-pro.web.id
   - Click Tag Assistant icon in Chrome toolbar
   - Click "Enable" to start recording
   - Refresh the page
   - You should see "Google Analytics: G-M3RKJXHLJ7" with green checkmark

3. **Test Event Tracking**:
   - Navigate to `/auth/signup` page
   - Fill the sign-up form and submit
   - Tag Assistant should show `sign_up` event fired
   - Try clicking "Daftar dengan Google" button
   - Should show another `sign_up` event with `method: google`

#### Option B: Using GA4 Real-Time Reports

1. **Open GA4 Dashboard**:
   - Go to: https://analytics.google.com/
   - Select property: "oasis-bi-pro.web.id" (or your property name)

2. **Open Real-Time Report**:
   - Left sidebar → Reports → Realtime
   - You should see "0" active users initially

3. **Test Tracking**:
   - Open your website: https://www.oasis-bi-pro.web.id
   - In GA4 Real-Time report, you should see:
     - Active users: 1 (or more)
     - Page view event
     - Your current page path

4. **Test Custom Events**:
   - Click through different pages
   - Try signup flow
   - Visit pricing page
   - All actions should appear in Real-Time report

**⚠️ Note**: Real-time data may take 30-60 seconds to appear. If you don't see data after 2 minutes, proceed to troubleshooting section.

---

### Step 2: Setup Google Search Console

**What is Google Search Console?**  
Free tool from Google to monitor your website's SEO performance, index status, and search traffic.

#### 2.1 Verify Domain Ownership

**Method 1: HTML File Upload (Easiest for Vercel)**

1. **Go to Google Search Console**:
   - Visit: https://search.google.com/search-console

2. **Add Property**:
   - Click "Add Property"
   - Select "URL prefix"
   - Enter: `https://www.oasis-bi-pro.web.id`
   - Click "Continue"

3. **Choose Verification Method**:
   - Select "HTML file"
   - Download the verification file (e.g., `google1234abcd.html`)

4. **Upload to Your Website**:
   ```bash
   # In your project root
   cd /home/user/webapp
   
   # Create public folder if not exists
   mkdir -p public
   
   # Move downloaded file to public folder
   mv ~/Downloads/google1234abcd.html public/
   
   # Commit and push
   git add public/google1234abcd.html
   git commit -m "Add Google Search Console verification file"
   git push origin main
   ```

5. **Wait for Deployment** (Vercel auto-deploys):
   - Check deployment status in Vercel dashboard
   - After deployment, visit: `https://www.oasis-bi-pro.web.id/google1234abcd.html`
   - Should show the verification file content

6. **Verify in Search Console**:
   - Go back to Google Search Console
   - Click "Verify"
   - Should see "✓ Ownership verified"

**Method 2: Google Analytics (Fastest if GA4 is working)**

1. **Go to Search Console**:
   - Visit: https://search.google.com/search-console
   - Click "Add Property" → "URL prefix"
   - Enter: `https://www.oasis-bi-pro.web.id`

2. **Choose Verification Method**:
   - Select "Google Analytics"
   - If you're logged in with the same Google account that has GA4 access, it will auto-verify
   - Click "Verify"
   - Should see "✓ Ownership verified" immediately

**⚠️ Recommended**: Use Google Analytics method (Method 2) since you already have GA4 configured!

---

#### 2.2 Submit Sitemap

**What is a Sitemap?**  
XML file that tells Google all the pages on your website to crawl and index.

**Generate Sitemap for Next.js**:

1. **Create Sitemap Route**:
   ```bash
   cd /home/user/webapp
   ```

   Create file: `app/sitemap.ts`

   ```typescript
   import { MetadataRoute } from 'next'

   export default function sitemap(): MetadataRoute.Sitemap {
     const baseUrl = 'https://www.oasis-bi-pro.web.id'

     // Static routes
     const routes = [
       '',
       '/about',
       '/features',
       '/how-it-works',
       '/pricing',
       '/blog',
       '/auth/signin',
       '/auth/signup',
       '/legal/privacy',
       '/legal/terms',
       '/legal/refund',
       '/legal/faq',
       '/legal/contact',
       '/legal/dpa',
       '/legal/cookies',
     ].map((route) => ({
       url: `${baseUrl}${route}`,
       lastModified: new Date().toISOString(),
       changeFrequency: 'weekly' as const,
       priority: route === '' ? 1.0 : 0.8,
     }))

     return routes
   }
   ```

2. **Test Sitemap Locally**:
   ```bash
   npm run dev
   # Visit: http://localhost:3000/sitemap.xml
   # Should see XML sitemap with all URLs
   ```

3. **Deploy to Production**:
   ```bash
   git add app/sitemap.ts
   git commit -m "Add sitemap.xml for SEO"
   git push origin main
   ```

4. **Submit to Search Console**:
   - Go to Google Search Console
   - Select your property: "oasis-bi-pro.web.id"
   - Left sidebar → Sitemaps
   - Enter: `sitemap.xml`
   - Click "Submit"
   - Status should change to "Success" after few minutes

---

#### 2.3 Setup Search Console Alerts

1. **Email Notifications**:
   - Go to Search Console
   - Settings (gear icon) → "Users and permissions"
   - Make sure your email is verified
   - Go to "Message settings"
   - Enable:
     - ✅ Critical issues
     - ✅ Manual actions
     - ✅ Security issues
     - ⚠️ (Optional) Website performance suggestions

2. **Monitor Weekly**:
   - Performance report → Track impressions & clicks
   - Coverage report → Monitor indexing status
   - Core Web Vitals → Check page speed

---

### Step 3: Setup Google Tag Manager (Optional but Recommended)

**Why GTM?**  
- Easier to add/modify tracking codes without code deployment
- Better control over what data is sent to GA4
- Can integrate multiple tools (Facebook Pixel, LinkedIn Insight, etc.)

**Quick Setup**:

1. **Create GTM Account**:
   - Go to: https://tagmanager.google.com/
   - Click "Create Account"
   - Account Name: "OASIS BI PRO"
   - Container Name: "oasis-bi-pro.web.id"
   - Target platform: "Web"
   - Click "Create"

2. **Install GTM Code**:
   - Copy the GTM container snippet
   - It will look like: `GTM-XXXXXXX`

3. **Add to Next.js** (Alternative to direct GA4):
   
   Create: `components/analytics/GoogleTagManager.tsx`
   
   ```typescript
   'use client';

   import Script from 'next/script';

   const GTM_ID = 'GTM-XXXXXXX'; // Replace with your GTM ID

   export function GoogleTagManager() {
     return (
       <>
         <Script
           id="gtm-script"
           strategy="afterInteractive"
           dangerouslySetInnerHTML={{
             __html: `
               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','${GTM_ID}');
             `,
           }}
         />
       </>
     );
   }
   ```

4. **Add to `<body>`**:
   ```typescript
   // app/layout.tsx
   <body>
     <noscript>
       <iframe 
         src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
         height="0" 
         width="0" 
         style={{ display: 'none', visibility: 'hidden' }}
       />
     </noscript>
     {/* rest of body */}
   </body>
   ```

5. **Configure GA4 in GTM**:
   - GTM Dashboard → Tags → New
   - Tag Type: "Google Analytics: GA4 Configuration"
   - Measurement ID: `G-M3RKJXHLJ7`
   - Trigger: "All Pages"
   - Save & Publish

**⚠️ Note**: Since GA4 is already working with direct installation, GTM is optional. Use it if you plan to add more tracking tools later.

---

## 🔍 TROUBLESHOOTING

### GA4 Not Tracking Data?

**Issue 1: No Real-Time Data Showing**

**Check 1**: Ad Blocker / Privacy Extensions
- Disable browser extensions (uBlock Origin, Privacy Badger, etc.)
- Try in Incognito mode
- Test on different browser

**Check 2**: gtag.js Script Loading
```bash
# Open browser console (F12)
# Run this in console:
window.gtag
# Should return: function gtag(){dataLayer.push(arguments);}
# If undefined, script not loaded
```

**Check 3**: Network Tab
- Open DevTools → Network tab
- Filter: "gtag"
- Refresh page
- Should see requests to:
  - `https://www.googletagmanager.com/gtag/js?id=G-M3RKJXHLJ7`
  - `https://www.google-analytics.com/g/collect?...`

**Check 4**: Verify Measurement ID
- Make sure `G-M3RKJXHLJ7` is correct
- Check in GA4 dashboard → Admin → Data Streams → Web → Measurement ID

**Fix**:
```bash
# If still not working, clear cache and rebuild
cd /home/user/webapp
rm -rf .next
npm run build
npm run dev
# Test again
```

---

### Search Console Not Verifying?

**Issue**: "Verification failed"

**Check 1**: HTML File Upload Method
- Make sure file is in `public/` folder
- File name must match exactly (case-sensitive)
- Visit `https://www.oasis-bi-pro.web.id/google1234abcd.html` directly
- Should show file content (not 404)

**Check 2**: Google Analytics Method
- Make sure you're logged in with same Google account for both GA4 and Search Console
- GA4 must have data (at least 1 page view in last 24 hours)

**Check 3**: DNS Verification (Alternative)
- If HTML/GA methods fail, use DNS TXT record
- Go to your domain registrar (Niagahoster, Cloudflare, etc.)
- Add TXT record provided by Search Console
- Wait 10-30 minutes for DNS propagation
- Click "Verify" again

---

### Sitemap Not Being Indexed?

**Issue**: "Couldn't fetch" or "Sitemap not found"

**Check 1**: Sitemap Accessible
```bash
curl https://www.oasis-bi-pro.web.id/sitemap.xml
# Should return XML content, not HTML error page
```

**Check 2**: Correct XML Format
- Visit `/sitemap.xml` in browser
- Should see structured XML (not blank or JSON)
- All URLs should be absolute (start with `https://`)

**Check 3**: robots.txt
Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/member/', '/admin/'],
    },
    sitemap: 'https://www.oasis-bi-pro.web.id/sitemap.xml',
  }
}
```

---

## 📊 WHAT TO MONITOR (Weekly Tasks)

### Google Analytics 4 Dashboard

**Key Reports to Check**:

1. **Real-Time Report** (Daily):
   - Reports → Real-time
   - Check active users
   - Monitor events firing correctly

2. **Acquisition Report** (Weekly):
   - Reports → Acquisition → Traffic acquisition
   - See where users come from (Organic, Direct, Social)
   - Track Google OAuth signups vs email signups

3. **Engagement Report** (Weekly):
   - Reports → Engagement → Pages and screens
   - Most viewed pages
   - Bounce rate per page

4. **Conversion Report** (Weekly):
   - Reports → Engagement → Conversions
   - Track `sign_up` events
   - Track `purchase` events
   - Calculate conversion rate

5. **User Demographics** (Monthly):
   - Reports → User → Demographics
   - Age, gender, location of users
   - Adjust marketing strategy based on data

### Google Search Console

**Key Reports to Check**:

1. **Performance Report** (Weekly):
   - Search Console → Performance
   - Total clicks from Google Search
   - Average position for keywords
   - Click-through rate (CTR)

2. **Coverage Report** (Monthly):
   - Search Console → Coverage
   - Total indexed pages
   - Errors / Warnings
   - Fix any "Excluded" pages

3. **Core Web Vitals** (Monthly):
   - Search Console → Core Web Vitals
   - LCP (Largest Contentful Paint) - should be < 2.5s
   - FID (First Input Delay) - should be < 100ms
   - CLS (Cumulative Layout Shift) - should be < 0.1

4. **Mobile Usability** (Monthly):
   - Search Console → Mobile Usability
   - Fix any mobile errors
   - Test on real devices

---

## ✅ VERIFICATION CHECKLIST

**After Following This Guide, You Should Have**:

### Google Analytics 4:
- [ ] GA4 property created
- [ ] GA4 script installed on website
- [ ] Real-time data showing in GA4 dashboard
- [ ] Custom events tracking (sign_up, login, purchase)
- [ ] Cookiebot consent banner showing

### Google Search Console:
- [ ] Domain ownership verified
- [ ] Sitemap.xml created and submitted
- [ ] At least 1 page indexed by Google
- [ ] Email alerts configured
- [ ] robots.txt file created

### Testing:
- [ ] Tested signup tracking with GA Tag Assistant
- [ ] Tested page view tracking in Real-Time report
- [ ] Verified sitemap.xml accessible at `/sitemap.xml`
- [ ] Verified robots.txt accessible at `/robots.txt`

---

## 📞 SUPPORT & RESOURCES

**Official Documentation**:
- GA4 Setup: https://support.google.com/analytics/answer/9304153
- Search Console Help: https://support.google.com/webmasters
- Next.js Metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

**Debugging Tools**:
- Tag Assistant: https://tagassistant.google.com/
- GA4 DebugView: https://support.google.com/analytics/answer/7201382
- PageSpeed Insights: https://pagespeed.web.dev/

**Contact**:
- Email: support@oasis-bi-pro.web.id
- GitHub Issues: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/issues

---

**Next Steps**: After GA4 & Search Console are verified, proceed to create SEO blog content! 🚀
