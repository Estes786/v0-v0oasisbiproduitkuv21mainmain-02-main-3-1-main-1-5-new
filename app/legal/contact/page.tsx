import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MessageSquare, Clock, CheckCircle, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - OASIS BI PRO',
  description: 'Get in touch with OASIS BI PRO support team. Email, phone, WhatsApp support available. Response within 24 hours.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600">
            Tim support kami siap membantu Anda 24/7. Pilih metode komunikasi yang paling nyaman untuk Anda.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-100 hover:border-blue-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Response dalam 24 jam (weekdays)
            </p>
            <a 
              href="mailto:elfaress2425@gmail.com" 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              elfaress2425@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-green-100 hover:border-green-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Senin-Jumat, 09:00-18:00 WIB
            </p>
            <a 
              href="tel:+6285712658316" 
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              +62 857-1265-8316
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 text-sm mb-4">
              Fast response, 24/7 availability
            </p>
            <a 
              href="https://wa.me/6285712658316" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          
          <form className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone & Subject Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Payment</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our{' '}
              <Link href="/legal/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              {' '}and{' '}
              <Link href="/legal/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>
            </p>
          </form>
        </div>

        {/* Business Hours */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours & Response Times</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Senin - Jumat:</strong> 09:00 - 18:00 WIB</li>
                    <li>• <strong>Sabtu:</strong> 10:00 - 14:00 WIB</li>
                    <li>• <strong>Minggu:</strong> Closed</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Response Times</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Email:</strong> 24 hours (weekdays)</li>
                    <li>• <strong>Phone:</strong> Immediate (during office hours)</li>
                    <li>• <strong>WhatsApp:</strong> 1-2 hours (24/7)</li>
                    <li>• <strong>Emergency (Enterprise):</strong> 15 minutes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support FAQ */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HelpCircle className="w-7 h-7 text-blue-600 mr-2" />
            Frequently Asked Support Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Berapa lama waktu response untuk tiket support?
              </h3>
              <p className="text-gray-700">
                <strong>Starter Plan:</strong> 48 jam (email only)<br />
                <strong>Professional Plan:</strong> 24 jam (email + chat)<br />
                <strong>Business Plan:</strong> 12 jam (priority support)<br />
                <strong>Enterprise Plan:</strong> 1 jam (dedicated support + emergency hotline)
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Apakah ada biaya untuk technical support?
              </h3>
              <p className="text-gray-700">
                TIDAK. Technical support sudah termasuk dalam subscription plan Anda. 
                Kami tidak mengenakan biaya tambahan untuk troubleshooting, bug fixes, 
                atau bantuan penggunaan platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bahasa apa yang didukung untuk customer support?
              </h3>
              <p className="text-gray-700">
                Kami support <strong>Bahasa Indonesia</strong> dan <strong>English</strong>. 
                Tim support kami native speakers untuk kedua bahasa, jadi Anda bisa 
                berkomunikasi dengan nyaman.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bagaimana cara mengubah atau upgrade subscription plan saya?
              </h3>
              <p className="text-gray-700">
                Sangat mudah! Login ke dashboard → Settings → Billing → Upgrade Plan. 
                Atau hubungi kami via WhatsApp dan kami akan proses upgrade dalam 5 menit. 
                <strong> Prorated billing otomatis ter-handle.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Apakah saya bisa request demo atau onboarding session?
              </h3>
              <p className="text-gray-700">
                Ya! <strong>Professional Plan ke atas</strong> mendapat free onboarding session (30-60 menit) 
                via Zoom/Google Meet. Untuk Starter Plan, Anda bisa request demo (Rp 200K, refunded jika subscribe). 
                Book via email atau WhatsApp.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bagaimana jika saya menemukan bug atau masalah teknis?
              </h3>
              <p className="text-gray-700">
                Segera report ke <a href="mailto:elfaress2425@gmail.com" className="text-blue-600 hover:underline">elfaress2425@gmail.com</a> dengan:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Deskripsi bug (screenshot/video sangat membantu)</li>
                <li>Steps to reproduce</li>
                <li>Browser & OS version</li>
                <li>Expected vs actual behavior</li>
              </ul>
              <p className="text-gray-700 mt-2">
                <strong>Critical bugs</strong> (yang menghentikan operasi bisnis) kami prioritaskan 
                dan biasanya fix dalam 4-8 jam.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Commitment to You</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>100% Response Guarantee:</strong> Setiap message akan dijawab, tidak ada yang diabaikan</li>
                <li>✓ <strong>Real Human Support:</strong> Bukan chatbot, bukan automated replies - real people yang paham bisnis Anda</li>
                <li>✓ <strong>14-Day Money-Back:</strong> Tidak puas? Full refund, no questions asked</li>
                <li>✓ <strong>99.9% Uptime SLA:</strong> Platform kami stabil dan reliable (lihat{' '}
                  <Link href="/legal/terms" className="text-blue-600 hover:underline">SLA Terms</Link>)
                </li>
                <li>✓ <strong>Data Security:</strong> Your data is encrypted, backed up daily, and NEVER shared with third parties</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Legal Hub */}
        <div className="text-center mt-12">
          <Link 
            href="/legal/faq"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Kembali ke FAQ
          </Link>
          <span className="mx-4 text-gray-300">|</span>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  )
}
