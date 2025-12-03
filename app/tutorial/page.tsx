'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Video,
  Code,
  HelpCircle,
  Play,
  Database,
  BarChart3,
  Settings,
  Download,
  Users,
} from 'lucide-react';

export default function TutorialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            📚 Tutorial & Learning Center
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Panduan Lengkap OASIS BI PRO
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Step-by-step guides untuk memaksimalkan Business Intelligence platform kami. 
            Dari setup hingga advanced analytics dalam hitungan menit.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Start Tutorial
            </Link>
            <Link
              href="/legal/faq"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Quick Start Guide (5 Minutes)
        </h2>

        <div className="space-y-6">
          {/* Tutorial 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Buat Akun & Pilih Paket</h3>
                <p className="text-gray-700 mb-4">
                  Registrasi akun baru dan pilih paket subscription yang sesuai dengan kebutuhan bisnis Anda.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Kunjungi <Link href="/pricing" className="text-blue-600 font-semibold">/pricing</Link> dan pilih paket</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Klik "Pilih Paket" dan isi form checkout (nama, email, phone)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Bayar via Duitku Payment Gateway (Rp 99K - Rp 999K/bulan)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Akses dashboard aktif langsung setelah payment berhasil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-100">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <Database className="w-7 h-7 mr-3 text-green-600" />
                  Connect Data Sources
                </h3>
                <p className="text-gray-700 mb-4">
                  Hubungkan platform e-commerce, analytics, advertising, dan payment gateway ke OASIS BI PRO.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">📊 Data Sources yang Didukung:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>• Google Analytics 4</div>
                    <div>• Facebook Ads</div>
                    <div>• Shopify Store</div>
                    <div>• Tokopedia Official Store</div>
                    <div>• Shopee Partner API</div>
                    <div>• Instagram Business</div>
                    <div>• Stripe Payments</div>
                    <div>• Duitku Payment Gateway</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Masuk ke <strong>Dashboard → Feature Settings → Data Integrations</strong></span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Klik "Add Integration" dan pilih platform</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Authorize dengan OAuth atau masukkan API key</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span>Data akan sync otomatis setiap 5 menit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="w-7 h-7 mr-3 text-purple-600" />
                  Explore Analytics Dashboard
                </h3>
                <p className="text-gray-700 mb-4">
                  Dashboard interaktif dengan real-time charts, KPIs, dan AI-powered insights.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">📊 Analytics Overview Tab</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• KPI Cards (Revenue, Users, Conversion)</li>
                      <li>• Revenue Trend Chart (Chart.js powered)</li>
                      <li>• Traffic Sources Pie Chart</li>
                      <li>• Device Breakdown Bar Chart</li>
                      <li>• Conversion Funnel Analysis</li>
                      <li>• Top Products Performance</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">⚙️ Feature Settings Tab</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Subscription Status & Billing</li>
                      <li>• AI-Powered Features (Predictive, Alerts)</li>
                      <li>• Connected Data Sources (6/50)</li>
                      <li>• Feature Usage Stats</li>
                      <li>• Team Member Management</li>
                      <li>• API Keys & Webhooks</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                    <span>Akses <Link href="/dashboard" className="text-blue-600 font-semibold">/dashboard</Link> untuk melihat analytics</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                    <span>Toggle antara "Analytics Overview" dan "Feature Settings" tabs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                    <span>Hover charts untuk lihat detail metrics & tooltips</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                    <span>Filter data dengan time range selector (24h, 7d, 30d, 90d)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial 4 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-100">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <Download className="w-7 h-7 mr-3 text-orange-600" />
                  Generate Custom Reports
                </h3>
                <p className="text-gray-700 mb-4">
                  Buat dan export custom reports dalam format PDF, Excel, atau CSV.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Klik tombol "Export" di dashboard untuk download report</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Pilih format: PDF (visual), Excel (data), atau CSV (raw)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Schedule automated delivery: Daily, Weekly, Monthly via email</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Reports include: KPI summary, charts, tables, AI insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial 5 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-pink-100">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <Users className="w-7 h-7 mr-3 text-pink-600" />
                  Invite Team Members
                </h3>
                <p className="text-gray-700 mb-4">
                  Collaborate dengan team menggunakan role-based access control (RBAC).
                </p>
                <div className="bg-pink-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">👥 Available Roles:</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Admin:</strong> Full access, manage team, edit settings, export data</li>
                    <li><strong>Analyst:</strong> View all dashboards, create reports, export data</li>
                    <li><strong>Viewer:</strong> View-only access, no export or edit permissions</li>
                    <li><strong>Manager:</strong> View, export, share reports with external stakeholders</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600" />
                    <span>Masuk ke <strong>Dashboard → Feature Settings → Team Access</strong></span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600" />
                    <span>Klik "Invite Member", masukkan email dan pilih role</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600" />
                    <span>Team member akan terima email invitation untuk join</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600" />
                    <span>Track team activity di audit logs untuk compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tutorials */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Advanced Tutorials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-white">
              <Code className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">API Integration</h3>
              <p className="text-white/90 mb-4">
                Integrate OASIS BI PRO data ke internal tools menggunakan REST API. 
                Rate limit: 100K requests/month.
              </p>
              <a href="/legal/faq" className="text-white font-semibold hover:underline">
                Read API Docs →
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-white">
              <Settings className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Custom ML Models</h3>
              <p className="text-white/90 mb-4">
                Train custom machine learning models untuk revenue forecasting, 
                churn prediction, atau customer segmentation.
              </p>
              <a href="/legal/faq" className="text-white font-semibold hover:underline">
                Learn More →
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-white">
              <Video className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Video Tutorials</h3>
              <p className="text-white/90 mb-4">
                Watch step-by-step video tutorials for dashboard navigation, 
                data integration, dan advanced analytics.
              </p>
              <a href="/legal/faq" className="text-white font-semibold hover:underline">
                Watch Videos →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Butuh Bantuan Lebih Lanjut?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Tim support kami siap membantu Anda 24/7 via email, chat, atau phone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/legal/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <HelpCircle className="w-5 h-5" />
              Contact Support
            </Link>
            <Link
              href="/legal/faq"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
