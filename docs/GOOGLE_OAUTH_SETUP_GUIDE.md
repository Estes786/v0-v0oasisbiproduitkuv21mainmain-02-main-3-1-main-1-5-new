# 🔐 Google OAuth Authentication - Complete Setup Guide

**Platform**: OASIS BI PRO  
**Date**: December 14, 2025  
**Version**: v2.2.0  

---

## ✅ WHAT'S ALREADY CONFIGURED

### 1. Google Cloud Platform OAuth Credentials
**Status**: ✅ **CREATED AND READY**

**Credentials**:
```
Client ID: [Configured in Google Cloud Console]
Client Secret: [Configured in Google Cloud Console]  
Project ID: supabase-auth-project-481118
Redirect URIs: https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback
```

### 2. Frontend Implementation
**Status**: ✅ **CODE READY**

**What's Been Implemented**:
- ✅ "Daftar dengan Google" button on `/auth/signup` page
- ✅ Google OAuth handler function (`handleGoogleSignUp`)
- ✅ Google logo and branding compliance
- ✅ Analytics tracking for Google sign-ups
- ✅ Error handling for OAuth failures

**Files Modified**:
```
✅ app/auth/signup/page.tsx - Added Google OAuth button + handler
✅ lib/analytics.ts - Tracking Google sign-ups
```

---

## 🔧 WHAT YOU NEED TO DO

### Step 1: Enable Google Provider in Supabase (REQUIRED)

**This is the ONLY step needed to make Google OAuth work!**

#### 1.1 Access Supabase Dashboard

1. **Login to Supabase**:
   - Visit: https://supabase.com/dashboard
   - Login with your account
   - Select project: `qjzdzkdwtsszqjvxeiqv` (oasis-bi-pro)

2. **Navigate to Authentication Settings**:
   - Left sidebar → ⚙️ Authentication
   - Top tabs → "Providers"
   - Scroll down to find "Google"

#### 1.2 Configure Google Provider

**In Supabase Dashboard**:

1. **Click on "Google" Provider**:
   - Toggle "Enable Sign in with Google" → **ON**

2. **Enter OAuth Credentials**:
   ```
   Client ID (for OAuth):
   [Your Google OAuth Client ID from Google Cloud Console]

   Client Secret (for OAuth):
   [Your Google OAuth Client Secret from Google Cloud Console]
   ```

3. **Authorized Redirect URIs** (should be pre-filled):
   ```
   https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback
   ```

4. **Click "Save"**

**That's it!** Google OAuth is now enabled. ✅

---

### Step 2: Test Google OAuth Flow

#### 2.1 Test on Development (Optional)

**If testing locally**:

1. **Start Development Server**:
   ```bash
   cd /home/user/webapp
   npm run dev
   ```

2. **Visit Sign Up Page**:
   - Go to: http://localhost:3000/auth/signup

3. **Click "Daftar dengan Google"**:
   - Should redirect to Google login page
   - Select a Google account
   - Grant permissions
   - Should redirect back to `/member/dashboard`

4. **Verify User Created**:
   - Go to Supabase Dashboard → Authentication → Users
   - Should see new user with provider: "google"
   - User metadata should include:
     - `full_name` (from Google profile)
     - `avatar_url` (Google profile picture)
     - `provider: "google"`

#### 2.2 Test on Production (Recommended)

1. **Visit Production Site**:
   - Go to: https://www.oasis-bi-pro.web.id/auth/signup

2. **Click "Daftar dengan Google"**:
   - Should redirect to Google OAuth consent screen
   - Shows: "supabase-auth-project-481118 wants to access your Google Account"
   - Permissions requested:
     - See your email address
     - See your personal info (name, profile picture)

3. **Complete Sign Up**:
   - Select Google account
   - Click "Continue" or "Allow"
   - Should redirect to: `https://www.oasis-bi-pro.web.id/auth/callback`
   - Then redirect to: `https://www.oasis-bi-pro.web.id/member/dashboard`

4. **Verify in Analytics**:
   - Check Google Analytics (Real-Time report)
   - Should see `sign_up` event with `method: google`

---

### Step 3: Handle New User Profile Creation (Optional but Recommended)

**Issue**: OAuth users don't have profile in `user_profiles` table

**Solution**: Create Edge Function or Database Trigger

#### Option A: Database Trigger (Recommended)

**Create Supabase Function to auto-create profile**:

1. **Go to Supabase Dashboard**:
   - SQL Editor → New Query

2. **Create Trigger Function**:
   ```sql
   -- Function to create user profile automatically
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     -- Insert into user_profiles table
     INSERT INTO public.user_profiles (
       user_id,
       email,
       full_name,
       avatar_url,
       onboarding_completed
     ) VALUES (
       NEW.id,
       NEW.email,
       COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
       NEW.raw_user_meta_data->>'avatar_url',
       FALSE
     );
     
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   -- Trigger on auth.users insert
   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW
     EXECUTE FUNCTION public.handle_new_user();
   ```

3. **Run the SQL**:
   - Click "Run"
   - Should see: "Success. No rows returned"

4. **Test**:
   - Create new user via Google OAuth
   - Check `user_profiles` table
   - Should have new row with Google profile data

**Note**: This trigger will work for BOTH email signups and OAuth signups!

---

### Step 4: Update Sign In Page (Optional)

**Current Status**: Sign In page (`/auth/signin`) doesn't have Google button yet

**Add Google Sign In to Sign In Page**:

1. **Edit**: `app/auth/signin/page.tsx`

2. **Add Similar Button**:
   ```typescript
   const handleGoogleSignIn = async () => {
     try {
       setLoading(true)
       setError(null)
       
       const { data, error } = await supabase.auth.signInWithOAuth({
         provider: 'google',
         options: {
           redirectTo: `${window.location.origin}/auth/callback`,
         },
       })

       if (error) throw error
       
       // Track Google sign-in
       trackLogin('google')
     } catch (err: any) {
       setError(err.message || 'Terjadi kesalahan saat sign in dengan Google')
       setLoading(false)
     }
   }
   ```

3. **Add Button After Email/Password Form**:
   ```tsx
   {/* Divider */}
   <div className="relative my-6">
     <div className="absolute inset-0 flex items-center">
       <div className="w-full border-t border-gray-300"></div>
     </div>
     <div className="relative flex justify-center text-sm">
       <span className="px-2 bg-white text-gray-500">atau</span>
     </div>
   </div>

   {/* Google Sign In Button */}
   <button
     type="button"
     onClick={handleGoogleSignIn}
     disabled={loading}
     className="w-full py-3 px-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
   >
     <GoogleIcon />
     <span className="text-gray-700">Masuk dengan Google</span>
   </button>
   ```

---

## 🔍 TROUBLESHOOTING

### Issue 1: "Invalid OAuth Client" Error

**Error Message**: "The OAuth client was not found"

**Cause**: Client ID/Secret not configured in Supabase

**Fix**:
1. Go to Supabase Dashboard → Authentication → Providers → Google
2. Make sure "Enable Sign in with Google" is **ON**
3. Verify Client ID and Secret are correct
4. Click "Save"
5. Wait 1-2 minutes for changes to propagate
6. Try again

---

### Issue 2: Redirect URI Mismatch

**Error Message**: "redirect_uri_mismatch"

**Cause**: Google Cloud Console has wrong redirect URI

**Fix**:
1. Go to: https://console.cloud.google.com/
2. Select project: "supabase-auth-project-481118"
3. APIs & Services → Credentials
4. Click your OAuth 2.0 Client ID
5. Under "Authorized redirect URIs", verify:
   ```
   https://qjzdzkdwtsszqjvxeiqv.supabase.co/auth/v1/callback
   ```
6. If missing, add it and save
7. Try again (may take 5 minutes to update)

---

### Issue 3: User Not Created in Database

**Error**: OAuth works, but user doesn't appear in `user_profiles` table

**Cause**: No trigger to create profile automatically

**Fix**:
- Follow "Step 3: Handle New User Profile Creation" above
- Create database trigger with SQL
- Test by creating new OAuth user
- Check `user_profiles` table

---

### Issue 4: Analytics Not Tracking Google Sign-Ups

**Error**: Google Analytics doesn't show `sign_up` events with `method: google`

**Cause**: GA4 script not loaded yet when OAuth triggers

**Fix**:
1. Check browser console for errors
2. Make sure `trackSignUp('google')` is called BEFORE redirect
3. Add delay if needed:
   ```typescript
   trackSignUp('google')
   await new Promise(resolve => setTimeout(resolve, 500)) // Wait 500ms
   // Then redirect...
   ```

---

## 📊 MONITORING & ANALYTICS

### Track OAuth Performance

**In Google Analytics 4**:

1. **Compare Sign-Up Methods**:
   - Go to: Reports → Engagement → Events
   - Filter event: `sign_up`
   - Add secondary dimension: `method`
   - You'll see:
     - `sign_up` (method: email)
     - `sign_up` (method: google)

2. **Conversion Rate by Method**:
   ```
   OAuth Conversion Rate = Google Sign-Ups / Total Sign-Ups * 100%
   
   Example:
   - Email sign-ups: 50
   - Google sign-ups: 120
   - Total: 170
   - OAuth adoption: 70.6% ✅ (Very good!)
   ```

3. **Typical OAuth Adoption Rates** (Industry Benchmarks):
   - Poor: < 20% (OAuth not working well)
   - Average: 30-50%
   - Good: 50-70%
   - Excellent: > 70%

**Target for OASIS BI PRO**: 60%+ OAuth adoption (reduce friction)

---

### Track OAuth Errors

**In Supabase Dashboard**:

1. **Check Logs**:
   - Go to: Logs → Auth Logs
   - Filter: "Failed OAuth"
   - Monitor for patterns:
     - High failure rate? → Check credentials
     - Specific error messages? → Fix redirect URIs

2. **User Table**:
   - Go to: Authentication → Users
   - Filter by provider: "google"
   - Check `created_at` timestamps
   - Should see steady stream of OAuth users

---

## ✅ VERIFICATION CHECKLIST

**After Following This Guide, You Should Have**:

### Google OAuth Setup:
- [ ] Google provider enabled in Supabase
- [ ] Client ID and Secret configured
- [ ] "Daftar dengan Google" button visible on `/auth/signup`
- [ ] Tested OAuth flow successfully
- [ ] New user appears in Supabase Users table
- [ ] User profile created in `user_profiles` table

### Analytics Tracking:
- [ ] `sign_up` event tracking Google method
- [ ] Can see OAuth vs email sign-ups in GA4
- [ ] Real-Time report shows OAuth events

### User Experience:
- [ ] OAuth flow takes < 10 seconds total
- [ ] User redirected to dashboard after OAuth
- [ ] No errors in browser console
- [ ] Profile picture and name from Google appear in dashboard

---

## 📞 SUPPORT & RESOURCES

**Official Documentation**:
- Supabase Auth: https://supabase.com/docs/guides/auth/social-login/auth-google
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Google Branding Guidelines: https://developers.google.com/identity/branding-guidelines

**Common Issues**:
- Redirect URI mismatch: https://supabase.com/docs/guides/auth/social-login/auth-google#troubleshooting
- OAuth not working: https://github.com/supabase/supabase/discussions?discussions_q=google+oauth

**Contact**:
- Email: support@oasis-bi-pro.web.id
- GitHub: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/issues

---

**Next Steps**: After OAuth is working, focus on creating Help Center content! 🚀
