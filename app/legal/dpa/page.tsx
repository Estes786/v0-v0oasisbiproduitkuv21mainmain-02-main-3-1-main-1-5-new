"use client"

import Link from "next/link"

export default function DPAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <div className="text-white text-2xl">✅</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Processing Agreement (DPA)</h1>
          <p className="text-lg text-gray-600">
            Perjanjian pemrosesan data yang mematuhi GDPR dan UU No. 27/2022 Indonesia
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> November 15, 2025
            <br />
            <strong>Last Updated:</strong> November 15, 2025
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-blue-900">
              <strong>What is a DPA?</strong>
              <br />A Data Processing Agreement is a legally binding contract between a data controller (you, the
              customer) and a data processor (OASIS BI PRO) that governs the processing of personal data in compliance
              with GDPR and Indonesian data protection laws.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Definitions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>"Controller"</strong> means the customer (you) who determines the purposes and means of processing
              Personal Data
            </li>
            <li>
              <strong>"Processor"</strong> means OASIS BI PRO, who processes Personal Data on behalf of the Controller
            </li>
            <li>
              <strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural
              person
            </li>
            <li>
              <strong>"Processing"</strong> means any operation performed on Personal Data (collection, recording,
              storage, retrieval, use, disclosure, erasure, destruction)
            </li>
            <li>
              <strong>"Sub-processor"</strong> means third parties engaged by OASIS BI PRO to assist in providing the
              Services
            </li>
            <li>
              <strong>"Data Subject"</strong> means the individual whose Personal Data is being processed
            </li>
            <li>
              <strong>"Data Protection Laws"</strong> means GDPR, Indonesian Law No. 27/2022, and other applicable
              regulations
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Scope and Roles</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Relationship</h3>
          <p className="text-gray-700 mb-6">
            You (the Customer) are the <strong>Data Controller</strong>, and OASIS BI PRO acts as the{" "}
            <strong>Data Processor</strong>. We process Personal Data solely on your behalf and according to your
            documented instructions.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Nature and Purpose of Processing</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Nature:</strong> Automated processing of business analytics data, user metrics, and transaction
              records
            </li>
            <li>
              <strong>Purpose:</strong> To provide business intelligence, analytics, and reporting services as described
              in our Terms of Service
            </li>
            <li>
              <strong>Duration:</strong> Throughout the term of the subscription and retention period defined in our
              Privacy Policy
            </li>
            <li>
              <strong>Types of Personal Data:</strong> Names, email addresses, IP addresses, usage data, business
              metrics, transaction data
            </li>
            <li>
              <strong>Categories of Data Subjects:</strong> Your employees, customers, and end-users whose data you
              input into our platform
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Processor Obligations</h2>
          <p className="text-gray-700 mb-4">OASIS BI PRO agrees to:</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Processing Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              Process Personal Data only on your documented instructions (via our platform interface, API, or support
              requests)
            </li>
            <li>Immediately inform you if we believe any instruction violates Data Protection Laws</li>
            <li>Not process Personal Data for any purpose other than providing the Services</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Confidentiality</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Ensure all personnel authorized to process Personal Data are bound by confidentiality obligations</li>
            <li>Maintain strict confidentiality of all Personal Data</li>
            <li>Provide regular security awareness training to our employees</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Security Measures</h3>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Encryption:</strong> TLS 1.3 for data in transit, AES-256 for data at rest
            </li>
            <li>
              <strong>Access Control:</strong> Role-Based Access Control (RBAC) with Multi-Factor Authentication (MFA)
            </li>
            <li>
              <strong>Network Security:</strong> Firewalls, intrusion detection/prevention systems (IDS/IPS)
            </li>
            <li>
              <strong>Monitoring:</strong> 24/7 security monitoring and incident response
            </li>
            <li>
              <strong>Backups:</strong> Automated daily backups with encryption and geo-redundancy
            </li>
            <li>
              <strong>Vulnerability Management:</strong> Regular penetration testing and security audits
            </li>
            <li>
              <strong>Incident Response:</strong> Documented incident response procedures and 24h notification
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.4 Sub-processors</h3>
          <p className="text-gray-700 mb-4">We engage the following sub-processors:</p>
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub-processor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Vercel Inc.</td>
                <td className="px-6 py-4 text-sm text-gray-600">Hosting & CDN</td>
                <td className="px-6 py-4 text-sm text-gray-600">USA (GDPR-compliant)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Supabase Inc.</td>
                <td className="px-6 py-4 text-sm text-gray-600">Database & Authentication</td>
                <td className="px-6 py-4 text-sm text-gray-600">USA, EU (customer choice)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">PT Midtrans</td>
                <td className="px-6 py-4 text-sm text-gray-600">Payment Processing</td>
                <td className="px-6 py-4 text-sm text-gray-600">Indonesia</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Amazon Web Services (AWS)</td>
                <td className="px-6 py-4 text-sm text-gray-600">Infrastructure</td>
                <td className="px-6 py-4 text-sm text-gray-600">Singapore, Asia-Pacific</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-700 mb-6">
            We will notify you of any changes to sub-processors at least 30 days in advance via email. You have the
            right to object to any new sub-processor within 14 days.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.5 Data Subject Rights</h3>
          <p className="text-gray-700 mb-4">
            We will assist you in fulfilling Data Subject rights requests, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Right to Access:</strong> Provide copies of Personal Data within 30 days
            </li>
            <li>
              <strong>Right to Rectification:</strong> Correct inaccurate or incomplete data
            </li>
            <li>
              <strong>Right to Erasure:</strong> Delete Personal Data ("Right to be Forgotten")
            </li>
            <li>
              <strong>Right to Restriction:</strong> Restrict processing under certain conditions
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Export data in structured, machine-readable format (JSON, CSV)
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing for specific purposes
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            Response time: Within 30 days of request. Complex requests may require additional 60 days with notification.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.6 Data Breach Notification</h3>
          <p className="text-gray-700 mb-4">In the event of a Personal Data breach, we will:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              Notify you within <strong>24 hours</strong> of becoming aware of the breach
            </li>
            <li>Provide details: nature of breach, affected data, estimated number of affected Data Subjects</li>
            <li>Describe measures taken to mitigate the breach</li>
            <li>Provide recommendations for remedial action you should take</li>
            <li>Cooperate with you and regulatory authorities in investigating the breach</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            3.7 Data Protection Impact Assessment (DPIA)
          </h3>
          <p className="text-gray-700 mb-6">
            We will provide reasonable assistance in conducting DPIAs when required under Data Protection Laws,
            including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Information about our security measures and processing activities</li>
            <li>Technical documentation and risk assessments</li>
            <li>Cooperation with Data Protection Authorities</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.8 Audits and Inspections</h3>
          <p className="text-gray-700 mb-6">You have the right to audit our compliance with this DPA:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>We provide SOC 2 Type II reports annually (available on request)</li>
            <li>Third-party security audits conducted bi-annually</li>
            <li>You may request an audit with 30 days advance notice (max once per year)</li>
            <li>Audit costs are your responsibility unless we are found non-compliant</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Controller Obligations</h2>
          <p className="text-gray-700 mb-6">You (the Customer) agree to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Comply with all applicable Data Protection Laws</li>
            <li>Ensure you have lawful basis for processing Personal Data</li>
            <li>Obtain necessary consents from Data Subjects</li>
            <li>Provide clear and transparent privacy notices to Data Subjects</li>
            <li>
              Not provide us with sensitive personal data (health, biometric, racial/ethnic origin) without prior
              written agreement
            </li>
            <li>Respond to Data Subject requests in a timely manner</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. International Data Transfers</h2>
          <p className="text-gray-700 mb-6">
            When Personal Data is transferred outside Indonesia/EEA, we ensure adequate protection through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Standard Contractual Clauses (SCCs):</strong> Approved by European Commission
            </li>
            <li>
              <strong>Adequacy Decisions:</strong> Transfer only to countries with adequate data protection
            </li>
            <li>
              <strong>Data Processing Agreements:</strong> With all sub-processors
            </li>
            <li>
              <strong>Technical Measures:</strong> Encryption for all data in transit and at rest
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Retention and Deletion</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Retention Periods</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Active Subscription:</strong> Data retained as long as account is active
            </li>
            <li>
              <strong>After Cancellation:</strong> 30-day grace period, then permanent deletion
            </li>
            <li>
              <strong>Backup Copies:</strong> Deleted within 90 days after account termination
            </li>
            <li>
              <strong>Legal Retention:</strong> Transaction records retained for 7 years (tax/accounting requirements)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Data Return and Deletion</h3>
          <p className="text-gray-700 mb-6">Upon termination of services, we will:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Provide you with a complete copy of your data within 30 days (JSON/CSV format)</li>
            <li>Permanently delete all Personal Data within 90 days</li>
            <li>Provide certification of deletion upon request</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Liability and Indemnification</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Liability Cap</h3>
          <p className="text-gray-700 mb-6">
            Our total liability under this DPA is limited to the amount paid by you in the 12 months preceding the
            claim, except for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Gross negligence or willful misconduct</li>
            <li>Breach of confidentiality</li>
            <li>Data breaches caused by our failure to implement reasonable security measures</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Indemnification</h3>
          <p className="text-gray-700 mb-6">
            We will indemnify you against claims, fines, and penalties resulting from our breach of this DPA, provided
            you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Notify us promptly of any claim</li>
            <li>Cooperate with us in defending the claim</li>
            <li>Allow us to control the defense and settlement</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Term and Termination</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Term:</strong> This DPA is effective from your first use of our Services and continues throughout
              your subscription
            </li>
            <li>
              <strong>Termination:</strong> Automatically terminates upon end of subscription
            </li>
            <li>
              <strong>Survival:</strong> Sections regarding data deletion, confidentiality, and liability survive
              termination
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Governing Law and Dispute Resolution</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Governing Law:</strong> This DPA is governed by Indonesian law
            </li>
            <li>
              <strong>Jurisdiction:</strong> Courts of Jakarta, Indonesia
            </li>
            <li>
              <strong>Dispute Resolution:</strong> Good faith negotiation → mediation → arbitration → litigation
            </li>
            <li>
              <strong>Data Protection Authority:</strong> Complaints may be filed with Indonesian Data Protection
              Authority or your local DPA
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Amendments</h2>
          <p className="text-gray-700 mb-6">
            We may update this DPA to reflect changes in Data Protection Laws or our processing activities. Material
            changes will be notified via:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Email notification 30 days in advance</li>
            <li>Prominent notice in our platform</li>
            <li>Update to "Last Updated" date</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Continued use of Services after notification constitutes acceptance of the updated DPA.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
          <p className="text-gray-700 mb-6">For questions about this DPA or to exercise your rights, contact:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Data Protection Officer:</strong> dpo@oasisbipro.com
            </li>
            <li>
              <strong>Privacy Team:</strong> privacy@oasisbipro.com
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
              <strong>✅ GDPR & Indonesian Law Compliant</strong>
              <br />
              This DPA complies with Article 28 of GDPR, Indonesian Law No. 27/2022 on Personal Data Protection, and
              international data protection standards. It provides the necessary contractual safeguards for data
              processing relationships.
            </p>
          </div>

          <p className="mt-8 pt-8 border-t border-gray-200 text-gray-600">
            <strong>Download:</strong>{" "}
            <Link href="/legal/dpa" className="text-primary-600 hover:underline">
              Download DPA as PDF
            </Link>
            <br />
            <strong>Effective Date:</strong> November 15, 2025
            <br />
            <strong>Version:</strong> 1.0
          </p>
        </div>
      </div>
    </div>
  )
}
