"use client"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <div className="text-white text-2xl">🍪</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">Bagaimana kami menggunakan cookies untuk meningkatkan pengalaman Anda</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> November 15, 2025
            <br />
            <strong>Last Updated:</strong> November 15, 2025
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-blue-900">
              <strong>What are Cookies?</strong>
              <br />
              Cookies are small text files stored on your device (computer, tablet, mobile phone) when you visit a
              website. They help websites remember your preferences, improve user experience, and provide analytics
              insights.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-6">
            This Cookie Policy explains how OASIS BI PRO ("we," "our," or "us") uses cookies and similar technologies on
            our website and platform. By using our services, you consent to the use of cookies as described in this
            policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Types of Cookies We Use</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Essential Cookies (Always Active)</h3>
          <p className="text-gray-700 mb-4">
            These cookies are necessary for the website to function and cannot be disabled. They are usually set in
            response to your actions, such as logging in or filling out forms.
          </p>
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cookie Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">sb-auth-token</td>
                <td className="px-6 py-4 text-sm text-gray-600">User authentication and session management</td>
                <td className="px-6 py-4 text-sm text-gray-600">7 days</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">csrf_token</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Security - prevents Cross-Site Request Forgery attacks
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">Session</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">session_id</td>
                <td className="px-6 py-4 text-sm text-gray-600">Maintains user session state</td>
                <td className="px-6 py-4 text-sm text-gray-600">Session</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">cookie_consent</td>
                <td className="px-6 py-4 text-sm text-gray-600">Stores your cookie preferences</td>
                <td className="px-6 py-4 text-sm text-gray-600">12 months</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Preference Cookies (Optional)</h3>
          <p className="text-gray-700 mb-4">
            These cookies remember your preferences and settings to provide a more personalized experience.
          </p>
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cookie Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">theme_preference</td>
                <td className="px-6 py-4 text-sm text-gray-600">Remembers your dark/light mode preference</td>
                <td className="px-6 py-4 text-sm text-gray-600">12 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">language_pref</td>
                <td className="px-6 py-4 text-sm text-gray-600">Stores your language selection</td>
                <td className="px-6 py-4 text-sm text-gray-600">12 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">dashboard_layout</td>
                <td className="px-6 py-4 text-sm text-gray-600">Saves your dashboard customization</td>
                <td className="px-6 py-4 text-sm text-gray-600">6 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">timezone</td>
                <td className="px-6 py-4 text-sm text-gray-600">Stores your timezone for accurate time display</td>
                <td className="px-6 py-4 text-sm text-gray-600">12 months</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2.3 Analytics Cookies (Optional - Requires Consent)
          </h3>
          <p className="text-gray-700 mb-4">
            These cookies help us understand how visitors use our website, which pages are most popular, and how we can
            improve user experience.
          </p>
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cookie Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">_ga</td>
                <td className="px-6 py-4 text-sm text-gray-600">Google Analytics - distinguishes users</td>
                <td className="px-6 py-4 text-sm text-gray-600">2 years</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">_ga_*</td>
                <td className="px-6 py-4 text-sm text-gray-600">Google Analytics - persists session state</td>
                <td className="px-6 py-4 text-sm text-gray-600">2 years</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">_gid</td>
                <td className="px-6 py-4 text-sm text-gray-600">Google Analytics - distinguishes users</td>
                <td className="px-6 py-4 text-sm text-gray-600">24 hours</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">oasis_analytics</td>
                <td className="px-6 py-4 text-sm text-gray-600">Internal analytics - tracks feature usage</td>
                <td className="px-6 py-4 text-sm text-gray-600">30 days</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            2.4 Marketing Cookies (Optional - Requires Consent)
          </h3>
          <p className="text-gray-700 mb-4">
            These cookies track your online activity to help us deliver more relevant advertising and measure the
            effectiveness of our marketing campaigns.
          </p>
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cookie Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">_fbp</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Facebook Pixel - tracks conversions from Facebook ads
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">3 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">_gcl_au</td>
                <td className="px-6 py-4 text-sm text-gray-600">Google Ads - measures ad performance</td>
                <td className="px-6 py-4 text-sm text-gray-600">3 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">utm_source</td>
                <td className="px-6 py-4 text-sm text-gray-600">Tracks marketing campaign source</td>
                <td className="px-6 py-4 text-sm text-gray-600">30 days</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Third-Party Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use services from trusted third parties that may set cookies on your device:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Google Analytics:</strong> Website traffic and user behavior analysis
            </li>
            <li>
              <strong>Vercel Analytics:</strong> Performance monitoring and real-user metrics
            </li>
            <li>
              <strong>Supabase:</strong> Authentication and database services
            </li>
            <li>
              <strong>Midtrans:</strong> Payment processing (only on payment pages)
            </li>
            <li>
              <strong>Facebook Pixel:</strong> Ad tracking and conversion measurement (with consent)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How to Control Cookies</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Cookie Consent Banner</h3>
          <p className="text-gray-700 mb-4">
            When you first visit our website, you'll see a cookie consent banner. You can choose to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Accept All:</strong> Allow all cookies (essential, preference, analytics, marketing)
            </li>
            <li>
              <strong>Reject Non-Essential:</strong> Only essential cookies will be used
            </li>
            <li>
              <strong>Customize Settings:</strong> Choose which categories of cookies to allow
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Browser Settings</h3>
          <p className="text-gray-700 mb-4">You can control cookies through your browser settings:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.3 Opt-Out Links</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Google Analytics:</strong>{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
            </li>
            <li>
              <strong>Facebook:</strong>{" "}
              <a
                href="https://www.facebook.com/ads/preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Facebook Ad Preferences
              </a>
            </li>
            <li>
              <strong>General Advertising:</strong>{" "}
              <a
                href="http://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Digital Advertising Alliance Opt-Out
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Impact of Disabling Cookies</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
            <p className="text-yellow-900 mb-3">
              <strong>⚠️ Important:</strong> Disabling certain cookies may affect your experience:
            </p>
            <ul className="mt-3 space-y-2 text-yellow-800">
              <li>
                • <strong>Essential Cookies:</strong> Website may not function properly; you may not be able to log in
              </li>
              <li>
                • <strong>Preference Cookies:</strong> Your settings and preferences will not be saved
              </li>
              <li>
                • <strong>Analytics Cookies:</strong> We won't be able to improve our services based on usage data
              </li>
              <li>
                • <strong>Marketing Cookies:</strong> You may see less relevant advertisements
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookie Duration Explained</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Session Cookies:</strong> Deleted when you close your browser
            </li>
            <li>
              <strong>Persistent Cookies:</strong> Remain on your device for a specified period (e.g., 30 days, 1 year,
              2 years)
            </li>
            <li>
              <strong>First-Party Cookies:</strong> Set by OASIS BI PRO domain
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> Set by external services (Google, Facebook, etc.)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Do Not Track (DNT)</h2>
          <p className="text-gray-700 mb-4">
            Our website respects Do Not Track (DNT) browser settings. When DNT is enabled:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>We disable all non-essential cookies automatically</li>
            <li>Analytics and marketing cookies are not loaded</li>
            <li>Third-party tracking scripts are blocked</li>
            <li>Your browsing activity is not tracked</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Mobile App Cookies</h2>
          <p className="text-gray-700 mb-4">If you use our mobile app, similar technologies are used:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Device Identifiers:</strong> Unique identifiers for analytics and authentication
            </li>
            <li>
              <strong>Local Storage:</strong> Stores app preferences and cached data
            </li>
            <li>
              <strong>Push Notification Tokens:</strong> Enables push notifications (with permission)
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            You can control these through your device's app settings (iOS: Settings → Privacy; Android: Settings →
            Privacy → Permission Manager).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our services are not directed to children under 18. We do not knowingly collect data from children. If you
            are a parent or guardian and believe your child has provided us with personal information, please contact us
            at privacy@oasisbipro.com.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Updates to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Cookie Policy from time to time. Changes will be communicated via:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Email notification to registered users</li>
            <li>Prominent notice on our website</li>
            <li>Update to "Last Updated" date at the top of this page</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Your Rights Under GDPR & Indonesian Law</h2>
          <p className="text-gray-700 mb-4">Under GDPR and Indonesian Law No. 27/2022, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Withdraw Consent:</strong> Change your cookie preferences at any time
            </li>
            <li>
              <strong>Access Your Data:</strong> Request information about cookies set on your device
            </li>
            <li>
              <strong>Delete Your Data:</strong> Request deletion of data collected via cookies
            </li>
            <li>
              <strong>Object to Processing:</strong> Object to use of cookies for specific purposes
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Privacy Team:</strong> privacy@oasisbipro.com
            </li>
            <li>
              <strong>Data Protection Officer:</strong> dpo@oasisbipro.com
            </li>
            <li>
              <strong>Support:</strong> support@oasisbipro.com
            </li>
            <li>
              <strong>WhatsApp:</strong> +62 857-1265-8316
            </li>
            <li>
              <strong>Address:</strong> Jakarta, Indonesia
            </li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-8">
            <p className="text-green-900">
              <strong>✅ Compliance</strong>
              <br />
              This Cookie Policy complies with GDPR (ePrivacy Directive), Indonesian Law No. 27/2022, CCPA, and
              international best practices for cookie consent and transparency.
            </p>
          </div>

          <p className="mt-8 pt-8 border-t border-gray-200 text-gray-600">
            <strong>Manage Your Cookie Preferences:</strong>{" "}
            <button className="text-primary-600 hover:underline">Update Cookie Settings</button>
            <br />
            <strong>Last Updated:</strong> November 15, 2025
            <br />
            <strong>Version:</strong> 1.0
          </p>
        </div>
      </div>
    </div>
  )
}
