export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">Last updated: January 2025</p>
        <h2>1. Introduction</h2>
        <p>OASIS BI PRO ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Business Intelligence platform.</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
          <h3 className="text-xl font-bold text-blue-900 mb-2">🔒 Important Clarification: We Are NOT a Payment Processor</h3>
          <p className="text-blue-900 mb-3">
            <strong>OASIS BI PRO is a pure Business Intelligence SaaS platform.</strong> We provide analytics software and data visualization tools.
          </p>
          <p className="text-blue-800">
            <strong>We DO NOT:</strong>
          </p>
          <ul className="list-disc pl-6 text-blue-800 space-y-1 mb-3">
            <li>Act as a payment facilitator (PayFac) or payment aggregator</li>
            <li>Process payments on behalf of third parties</li>
            <li>Facilitate peer-to-peer (P2P) transactions</li>
            <li>Operate as a multi-vendor marketplace</li>
            <li>Store or handle credit card information</li>
          </ul>
          <p className="text-blue-800">
            <strong>We ONLY use Midtrans for:</strong> Collecting subscription fees for access to our Business Intelligence software. We are the merchant, you are the customer.
          </p>
        </div>
        
        <h2>2. Information We Collect</h2>
        <h3>2.1 Personal Information</h3>
        <p>We collect information that you provide directly: Name, Email address, Phone number, Company information, Payment information (processed securely through Midtrans).</p>
        
        <h3>2.2 Analytics Data</h3>
        <p>We collect business analytics data you upload or integrate: Website traffic data, Revenue metrics, Customer behavior data, Marketing campaign performance.</p>
        
        <h2>3. How We Use Your Information</h2>
        <p>We use collected information to: Provide and maintain our Service, Process your transactions through Midtrans, Send you technical notices and support messages, Generate analytics and insights, Improve our platform and develop new features.</p>
        
        <h2>4. Data Security</h2>
        <p>We implement enterprise-grade security measures: TLS 1.3 encryption in transit, AES-256 encryption at rest, Row-Level Security (RLS) in database, Regular security audits, SOC2-ready architecture.</p>
        
        <h2>5. Indonesian Law Compliance</h2>
        <p>We comply with: UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (UU ITE), PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.</p>
        
        <h2>6. Your Rights</h2>
        <p>You have the right to: Access your personal data, Correct inaccurate data, Delete your data (Right to be Forgotten), Export your data, Opt-out of marketing communications.</p>
        
        <h2>7. Cookies</h2>
        <p>We use cookies for: Session management, Analytics and performance monitoring, User preferences. You can control cookies through your browser settings.</p>
        
        <h2>8. Contact Us</h2>
        <p>For privacy concerns, contact us at:<br/>Email: elfaress2425@gmail.com<br/>Phone: +62 857-1265-8316</p>
      </div>
    </div>
  )
}
