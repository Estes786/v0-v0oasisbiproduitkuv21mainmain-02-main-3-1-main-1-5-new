export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> November 19, 2025<br />
            <strong>Last Updated:</strong> November 19, 2025
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
            <h3 className="text-xl font-bold text-green-900 mb-2">14-Day Money-Back Guarantee ✓</h3>
            <p className="text-green-800">
              We stand behind our product. If you're not satisfied within 14 days of your first payment, 
              we'll refund 100% - no questions asked.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility for Refund</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">1.1 Eligible Refund Requests</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>First-time customers:</strong> Request within 14 days of first payment</li>
              <li><strong>Technical issues:</strong> Service unavailable for &gt;24 hours (any time)</li>
              <li><strong>Double billing:</strong> Accidentally charged twice (any time)</li>
              <li><strong>Unauthorized charges:</strong> Fraudulent transactions (any time)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">1.2 Non-Eligible Situations</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Requests after 14 days from first payment</li>
              <li>Partial month refunds (outside 14-day period)</li>
              <li>Free trial conversions (you chose to continue)</li>
              <li>Account suspended for Terms violation</li>
              <li>Annual plans (except within first 14 days)</li>
              <li>Previously refunded subscriptions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Process</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2.1 How to Request</h3>
            <ol className="list-decimal pl-6 text-gray-700 space-y-3">
              <li>
                <strong>Email us:</strong> Send refund request to <span className="text-blue-600">elfaress2425@gmail.com</span>
              </li>
              <li>
                <strong>Include information:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Account email address</li>
                  <li>Order ID or invoice number</li>
                  <li>Reason for refund (optional but appreciated)</li>
                  <li>Preferred refund method</li>
                </ul>
              </li>
              <li>
                <strong>Wait for confirmation:</strong> We'll respond within 24 hours
              </li>
              <li>
                <strong>Receive refund:</strong> Processed within 5-10 business days
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">2.2 Processing Time</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Approval:</strong> Within 24 hours of request</li>
              <li><strong>Midtrans processing:</strong> 3-5 business days</li>
              <li><strong>Bank/card reflection:</strong> 2-5 business days</li>
              <li><strong>Total time:</strong> 5-10 business days</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <em>Note: Processing time depends on your bank/payment provider</em>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Methods</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3.1 Original Payment Method (Default)</h3>
            <p className="text-gray-700 mb-4">
              Refunds are automatically processed to your original payment method:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Credit/Debit Cards:</strong> Refunded to same card</li>
              <li><strong>Virtual Account:</strong> Bank transfer to registered account</li>
              <li><strong>E-wallets (GoPay, DANA, OVO):</strong> Credited to wallet</li>
              <li><strong>QRIS:</strong> Refunded via original QRIS method</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">3.2 Alternative Methods</h3>
            <p className="text-gray-700 mb-2">
              If original method unavailable, we offer:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Bank transfer (require account details)</li>
              <li>Store credit for future use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Special Circumstances</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">4.1 Service Outages</h3>
            <p className="text-gray-700 mb-4">
              If our service is down for extended periods:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>24+ hours:</strong> Pro-rated refund or service credit</li>
              <li><strong>48+ hours:</strong> Full month refund eligibility</li>
              <li><strong>Enterprise SLA breach:</strong> Credits as per SLA terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">4.2 Double Billing</h3>
            <p className="text-gray-700">
              Accidentally charged twice? We'll refund the duplicate charge immediately 
              plus an additional 1-month service credit as apology.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">4.3 Fraudulent Charges</h3>
            <p className="text-gray-700">
              If you notice unauthorized charges:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Contact us immediately: <strong>elfaress2425@gmail.com</strong></li>
              <li>We'll investigate within 24 hours</li>
              <li>Full refund if confirmed fraudulent</li>
              <li>Account security audit and password reset</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription Cancellations</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">5.1 How Cancellation Works</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cancel anytime from account settings</li>
              <li>Access continues until end of paid period</li>
              <li>No auto-renewal after cancellation</li>
              <li>Data retained for 30 days after period end</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">5.2 Cancellation Refund Policy</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Within 14 days:</strong> Full refund (money-back guarantee)</li>
              <li><strong>After 14 days:</strong> No refund (service continues until period end)</li>
              <li><strong>Annual plans:</strong> Pro-rated refund only within first 14 days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Upgrade/Downgrade Refunds</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">6.1 Upgrades</h3>
            <p className="text-gray-700 mb-4">
              When you upgrade to a higher plan:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Immediate access to new features</li>
              <li>Pro-rated charge for remaining billing period</li>
              <li>New price starts on next billing cycle</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">6.2 Downgrades</h3>
            <p className="text-gray-700 mb-4">
              When you downgrade to a lower plan:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Change takes effect at next billing cycle</li>
              <li>Keep current features until period ends</li>
              <li>No refund for unused portion of higher plan</li>
              <li>Consider carefully before downgrading</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Denied Refund Appeals</h2>
            <p className="text-gray-700 mb-4">
              If your refund request is denied:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You'll receive detailed explanation</li>
              <li>You can appeal the decision within 7 days</li>
              <li>Provide additional context or evidence</li>
              <li>Final decision made by management team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact for Refunds</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Refund Support</h3>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> elfaress2425@gmail.com</li>
                <li><strong>Subject Line:</strong> "Refund Request - [Your Email]"</li>
                <li><strong>Phone/WhatsApp:</strong> +62 857-1265-8316</li>
                <li><strong>Response Time:</strong> Within 24 hours</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Frequently Asked Questions</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Q: Can I get refund after 14 days?</h3>
            <p className="text-gray-700 mb-4">
              No, unless there&apos;s technical issue on our end (service outage &gt;24h) or billing error.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Q: Do you ask reasons for refund?</h3>
            <p className="text-gray-700 mb-4">
              We appreciate feedback but it's optional. We process refunds without requiring explanation.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Q: Can I use service again after refund?</h3>
            <p className="text-gray-700 mb-4">
              Yes, but money-back guarantee only applies once per customer. Future subscriptions 
              follow standard refund policy.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Q: What if payment provider can't process refund?</h3>
            <p className="text-gray-700 mb-4">
              We'll work with you to find alternative method (bank transfer or store credit).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Policy</h2>
            <p className="text-gray-700">
              We may update this Refund Policy. Material changes will be notified via email. 
              Existing subscriptions retain terms active at signup. New subscriptions follow updated policy.
            </p>
          </section>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Last Updated:</strong> November 19, 2025<br />
              <strong>Version:</strong> 1.2.0<br />
              <strong>Guarantee:</strong> 14-Day Money-Back, No Questions Asked
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
