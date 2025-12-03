'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Star,
  Gift,
  Award,
} from 'lucide-react';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            🗺️ User Journey & Roadmap
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Perjalanan OASIS BI PRO User
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Dari sign up hingga data-driven success. Ikuti langkah-langkah ini untuk 
            memaksimalkan value dari platform Business Intelligence kami.
          </p>
        </div>
      </section>

      {/* User Journey Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          5-Step User Journey
        </h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              1
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <Target className="w-7 h-7 mr-3 text-blue-600" />
                Sign Up & Pilih Paket Subscription
              </h3>
              <p className="text-gray-700 mb-4">
                Daftar akun OASIS BI PRO dan pilih paket yang sesuai dengan kebutuhan bisnis Anda:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Starter Plan (Rp 99K/bulan)</strong> - Untuk UMKM & startup yang baru mulai analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Professional Plan (Rp 299K/bulan)</strong> - Untuk bisnis menengah dengan multiple data sources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Enterprise Plan (Rp 999K/bulan)</strong> - Untuk perusahaan besar dengan kebutuhan advanced analytics</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  💳 <strong>Pembayaran via Duitku:</strong> Customer membayar subscription ke OASIS BI PRO melalui Duitku Payment Gateway. 
                  Ini adalah transaksi LANGSUNG dari customer ke kami (end merchant).
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              2
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border-2 border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <BarChart3 className="w-7 h-7 mr-3 text-green-600" />
                Connect Data Sources
              </h3>
              <p className="text-gray-700 mb-4">
                Setelah subscription aktif, hubungkan berbagai data sources ke OASIS BI PRO:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🛍️ E-commerce Platforms</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Shopify, Tokopedia, Shopee</li>
                    <li>• WooCommerce, Lazada, Bukalapak</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">📊 Analytics Platforms</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Google Analytics 4, Mixpanel</li>
                    <li>• Facebook Pixel, Hotjar</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">💳 Payment Gateways</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Stripe, Duitku, Midtrans</li>
                    <li>• Xendit, OVO, GoPay</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">📱 Marketing Platforms</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Facebook Ads, Google Ads</li>
                    <li>• Instagram Business, TikTok Ads</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700">
                  ⚡ <strong>Auto-Sync:</strong> Setelah connect, data akan sync otomatis setiap 5 menit. 
                  Tidak perlu manual input atau import CSV!
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              3
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <Zap className="w-7 h-7 mr-3 text-purple-600" />
                Explore Analytics Dashboard
              </h3>
              <p className="text-gray-700 mb-4">
                Akses dashboard interaktif dengan real-time visualizations & AI insights:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">KPI Cards:</strong>
                    <span className="text-gray-700"> Total Revenue, Active Users, Conversion Rate, AOV dengan growth indicators</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Interactive Charts:</strong>
                    <span className="text-gray-700"> Revenue Trend (Line), Traffic Sources (Pie), Device Breakdown (Bar), Hourly Activity (Line)</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">AI Insights:</strong>
                    <span className="text-gray-700"> Revenue forecasting, churn prediction, anomaly detection, customer segmentation (RFM)</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Custom Reports:</strong>
                    <span className="text-gray-700"> Generate PDF/Excel reports, schedule automated delivery via email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              4
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-7 h-7 mr-3 text-orange-600" />
                Take Data-Driven Actions
              </h3>
              <p className="text-gray-700 mb-4">
                Gunakan insights untuk membuat keputusan bisnis yang lebih baik:
              </p>
              <div className="grid gap-3">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-2">📈 Optimize Marketing Campaigns</h4>
                  <p className="text-sm text-gray-700">
                    Identifikasi channel dengan ROI tertinggi (Facebook Ads, Google Ads, Instagram) 
                    dan realokasi budget ke channel yang paling profitable.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-2">🎯 Improve Conversion Rate</h4>
                  <p className="text-sm text-gray-700">
                    Analisis conversion funnel untuk identifikasi drop-off points. 
                    Optimasi landing page, checkout flow, dan CTA buttons.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-2">💰 Reduce Churn & Increase Retention</h4>
                  <p className="text-sm text-gray-700">
                    Gunakan churn prediction untuk identifikasi at-risk customers. 
                    Launch retention campaigns (discount, loyalty program) untuk save customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              5
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border-2 border-pink-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <Award className="w-7 h-7 mr-3 text-pink-600" />
                Scale & Grow with Advanced Features
              </h3>
              <p className="text-gray-700 mb-4">
                Seiring bisnis berkembang, unlock advanced features untuk skala lebih besar:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="w-5 h-5 mr-2 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Team Collaboration:</strong>
                    <span className="text-gray-700"> Invite team members dengan role-based permissions (Admin, Analyst, Viewer)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 mr-2 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">API Access:</strong>
                    <span className="text-gray-700"> Integrate OASIS BI PRO data ke internal tools via REST API (100K req/month)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 mr-2 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Custom ML Models:</strong>
                    <span className="text-gray-700"> Train custom machine learning models untuk use case spesifik bisnis Anda</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 mr-2 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Dedicated Support:</strong>
                    <span className="text-gray-700"> Priority email/phone support, onboarding call, quarterly business review (Enterprise plan)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Benefits untuk OASIS BI PRO Users
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-white">
              <Gift className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Hemat Waktu 80%</h3>
              <p className="text-white/90">
                Tidak perlu lagi manual export-import data atau buat Excel pivot tables. 
                Semua data teraggregasi otomatis dalam 1 dashboard.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-white">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Tingkatkan Revenue 25%+</h3>
              <p className="text-white/90">
                Average customer kami meningkatkan revenue 25% dalam 6 bulan dengan 
                data-driven decision making & conversion optimization.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-white">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Reduce Churn 40%</h3>
              <p className="text-white/90">
                Dengan churn prediction & proactive retention campaigns, 
                customer kami berhasil reduce churn rate hingga 40%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Siap Mulai Perjalanan Anda?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join 10,000+ bisnis yang sudah transform data jadi revenue dengan OASIS BI PRO
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
