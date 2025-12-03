export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">Last updated: January 2025</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using OASIS BI PRO, you accept and agree to be bound by these Terms of Service. If you disagree with any part, you may not access the Service.</p>
        
        <h2>2. Description of Service</h2>
        
        <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
          <h3 className="text-xl font-bold text-green-900 mb-3">✅ Service Scope: Pure Business Intelligence SaaS</h3>
          
          <p className="text-green-900 font-semibold mb-2">OASIS BI PRO PROVIDES:</p>
          <ul className="list-disc pl-6 text-green-800 space-y-1 mb-4">
            <li><strong>Analytics Software:</strong> Real-time dashboards, data visualization, reports</li>
            <li><strong>AI-Powered Insights:</strong> Automated anomaly detection, revenue forecasting</li>
            <li><strong>Data Integration:</strong> Connect your business data sources (Google Analytics, Shopee, etc.)</li>
            <li><strong>Team Collaboration:</strong> Multi-user access with role-based permissions</li>
            <li><strong>Subscription-Based Access:</strong> Monthly/yearly billing for software usage</li>
          </ul>
          
          <p className="text-red-900 font-semibold mb-2">OASIS BI PRO DOES NOT PROVIDE:</p>
          <ul className="list-disc pl-6 text-red-800 space-y-1">
            <li>❌ Payment processing for third parties</li>
            <li>❌ Payment facilitation (PayFac) or aggregation services</li>
            <li>❌ Peer-to-peer (P2P) payment features</li>
            <li>❌ Multi-vendor marketplace or seller platform</li>
            <li>❌ Transaction processing between users</li>
            <li>❌ Payment gateway or merchant services</li>
          </ul>
          
          <p className="text-green-900 mt-4">
            <strong>Clear Business Model:</strong> We are a SOFTWARE COMPANY. Users pay us for analytics software access. 
            We use Midtrans ONLY for collecting our own subscription fees (we are the merchant, you are the customer).
          </p>
          
          <p className="text-green-900 mt-2">
            <strong>Similar to:</strong> DataDog, Mixpanel, Amplitude, Google Analytics 360 - pure analytics SaaS platforms.
          </p>
        </div>
        
        <h2>3. User Accounts</h2>
        <h3>3.1 Registration</h3>
        <p>You must provide accurate, complete information during registration. You are responsible for maintaining account security.</p>
        
        <h3>3.2 Account Security</h3>
        <p>You must: Keep your password confidential, Notify us immediately of unauthorized access, Not share your account credentials.</p>
        
        <h2>4. Payment Terms</h2>
        <h3>4.1 Subscription Fees</h3>
        <p>All payments are processed through Midtrans, our trusted payment gateway partner. We accept: Credit/Debit Cards (Visa, Mastercard, JCB), Virtual Accounts (BCA, Mandiri, BNI, BRI, Permata), E-wallets (GoPay, DANA, OVO, ShopeePay), QRIS.</p>
        
        <h3>4.2 Billing</h3>
        <p>Subscriptions are billed monthly or annually in advance. Prices are in Indonesian Rupiah (IDR). No refunds for partial months.</p>
        
        <h3>4.3 Refund Policy</h3>
        <p>14-day money-back guarantee for new customers. See our Refund Policy page for details.</p>
        
        <h2>5. Prohibited Uses</h2>
        <p>You may NOT: Use the Service for illegal purposes, Attempt to hack or compromise security, Upload malicious code or viruses, Violate any applicable laws, Resell or redistribute the Service.</p>
        
        <h2>6. Intellectual Property</h2>
        <p>All Service content, features, and functionality are owned by OASIS BI PRO. Your data remains yours. We only access it to provide the Service.</p>
        
        <h2>7. Limitation of Liability</h2>
        <p>We provide the Service "as is" without warranties. We are not liable for: Indirect or consequential damages, Loss of profits or revenue, Data loss (ensure you maintain backups).</p>
        
        <h2>8. Termination</h2>
        <p>We may terminate access if you: Violate these Terms, Fail to pay fees, Engage in fraudulent activity. You may cancel anytime from your account dashboard.</p>
        
        <h2>9. Changes to Terms</h2>
        <p>We may update these Terms. We'll notify you of significant changes via email 30 days before they take effect.</p>
        
        <h2>10. Governing Law</h2>
        <p>These Terms are governed by Indonesian law. Disputes will be resolved in Indonesian courts.</p>
        
        <h2>11. Contact</h2>
        <p>Questions? Contact us at:<br/>Email: elfaress2425@gmail.com<br/>Phone: +62 857-1265-8316</p>
      </div>
    </div>
  )
}
