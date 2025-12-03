'use client';

import Link from 'next/link';
import {
  Database,
  BarChart3,
  Brain,
  Zap,
  TrendingUp,
  Globe,
  Lock,
  Users,
  CheckCircle,
  ArrowRight,
  Layers,
  Target,
  Activity,
  PieChart,
  LineChart,
  Shield,
  Sparkles,
  RefreshCw,
  Code,
  Boxes,
  Workflow,
} from 'lucide-react';

export default function PlatformFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            🚀 Platform Features - Business Intelligence SaaS
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Fitur Platform OASIS BI PRO
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform Business Intelligence lengkap dengan AI-powered analytics, real-time dashboards, 
            dan 50+ integrasi data sources. <strong>Semua fitur ini adalah FUNCTIONAL CAPABILITIES</strong> 
            dari software kami, bukan template kosong.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              Try Dashboard <ArrowRight size={20} />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          4 Fungsi Utama Platform
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Feature 1: Data Integration */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100 hover:border-blue-300 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-600 text-white rounded-xl">
                <Database className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">1. Data Integration & Aggregation</h3>
                <p className="text-gray-600">Sinkronisasi otomatis dari multiple sources</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              OASIS BI PRO mengintegrasikan data dari berbagai platform e-commerce, advertising, database, 
              dan payment gateway untuk memberikan analisis terpusat.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🔗 Real-Time Data Connectors</h4>
                <p className="text-sm text-gray-600">
                  Connect dengan 50+ data sources: Google Analytics, Facebook Ads, Shopify, Tokopedia, 
                  Shopee, Instagram, PostgreSQL, MySQL, MongoDB, Stripe, Duitku, dan lainnya.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">⚡ Automated Synchronization</h4>
                <p className="text-sm text-gray-600">
                  Data sync otomatis setiap 5 menit dengan scheduler yang dapat di-customize. 
                  Support untuk batch processing dan streaming data untuk analisis real-time.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🔄 Data Transformation Pipeline</h4>
                <p className="text-sm text-gray-600">
                  ETL (Extract, Transform, Load) pipeline untuk data cleaning, normalization, 
                  dan enrichment. Support untuk custom transformation rules menggunakan SQL dan Python.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Analytics & Visualization */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 hover:border-green-300 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-green-600 text-white rounded-xl">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">2. Interactive Analytics & Visualization</h3>
                <p className="text-gray-600">Chart interaktif dengan Chart.js & D3.js</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Dashboard interaktif dengan puluhan jenis visualisasi untuk menganalisis revenue, traffic, 
              conversion, dan customer behavior secara real-time.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">📊 Custom Dashboard Builder</h4>
                <p className="text-sm text-gray-600">
                  Buat unlimited custom dashboards dengan drag-and-drop interface. 
                  Support untuk 20+ chart types: Line, Bar, Pie, Area, Funnel, Heatmap, Scatter, Gauge, dll.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">📈 Real-Time KPI Monitoring</h4>
                <p className="text-sm text-gray-600">
                  Track key metrics secara real-time: Revenue (IDR), Active Users, Conversion Rate, 
                  AOV (Average Order Value), CAC (Customer Acquisition Cost), LTV (Lifetime Value), 
                  ROI, ROAS, dll.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🎨 Interactive Data Exploration</h4>
                <p className="text-sm text-gray-600">
                  Filter, drill-down, pivot, dan export data dengan interactive controls. 
                  Support untuk time-range selection (24h, 7d, 30d, 90d, custom date range).
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: AI-Powered Insights */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100 hover:border-purple-300 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-purple-600 text-white rounded-xl">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">3. AI-Powered Predictive Analytics</h3>
                <p className="text-gray-600">Machine Learning & Anomaly Detection</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Algoritma Machine Learning untuk forecasting, churn prediction, customer segmentation, 
              dan anomaly detection otomatis.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🔮 Revenue Forecasting</h4>
                <p className="text-sm text-gray-600">
                  Prediksi revenue 7-90 hari ke depan menggunakan Time Series Analysis (ARIMA, Prophet). 
                  Accuracy rate 85%+ dengan confidence intervals.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🎯 Customer Segmentation (RFM Analysis)</h4>
                <p className="text-sm text-gray-600">
                  Segmentasi customer otomatis berdasarkan Recency, Frequency, Monetary (RFM). 
                  Identifikasi VIP customers, at-risk customers, dan new customers untuk targeted campaigns.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🚨 Smart Anomaly Detection</h4>
                <p className="text-sm text-gray-600">
                  Deteksi anomaly otomatis pada revenue, traffic, dan conversion dengan real-time alerts. 
                  Machine Learning models: Isolation Forest, Z-score, Moving Average.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">💡 Churn Prediction & Retention</h4>
                <p className="text-sm text-gray-600">
                  Prediksi customer churn probability dengan Logistic Regression & Random Forest. 
                  Identifikasi users at risk of churning untuk proactive retention campaigns.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Business Intelligence Tools */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100 hover:border-orange-300 transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-orange-600 text-white rounded-xl">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">4. Advanced BI Reporting Tools</h3>
                <p className="text-gray-600">Automated reports & team collaboration</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Generate custom reports, schedule automated delivery, dan collaborate dengan team 
              menggunakan role-based access control.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">📄 Custom Report Builder</h4>
                <p className="text-sm text-gray-600">
                  Buat custom reports dengan drag-and-drop interface. Support untuk PDF, Excel, CSV export. 
                  Template library: Sales Report, Marketing ROI, Financial Summary, Customer Analytics.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">⏰ Scheduled Report Delivery</h4>
                <p className="text-sm text-gray-600">
                  Schedule automated report delivery via Email & Slack: Daily, Weekly, Monthly. 
                  Smart scheduling: Send report hanya jika ada anomaly atau threshold terlewati.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">👥 Team Collaboration & RBAC</h4>
                <p className="text-sm text-gray-600">
                  Invite unlimited team members dengan role-based permissions: Admin, Analyst, Viewer. 
                  Audit log untuk track semua perubahan data dan access history.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">🔌 REST API & Webhooks</h4>
                <p className="text-sm text-gray-600">
                  Full REST API access untuk programmatic data retrieval. 
                  Webhooks untuk real-time event notifications. Rate limit: 100,000 requests/month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            6 Core Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-white">
              <Layers className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Multi-Source Data Aggregation</h3>
              <p className="text-white/90 text-sm">
                Aggregate data dari 50+ sources ke dalam single unified dashboard. 
                ETL pipeline otomatis untuk data cleaning & normalization.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-white">
              <Activity className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Real-Time Analytics Engine</h3>
              <p className="text-white/90 text-sm">
                Streaming analytics dengan latency &lt;5 seconds. 
                Process 10M+ events per day dengan Apache Kafka & Redis.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-white">
              <Brain className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Machine Learning Models</h3>
              <p className="text-white/90 text-sm">
                Pre-trained ML models: Revenue Forecasting, Churn Prediction, Customer Segmentation, 
                Anomaly Detection menggunakan TensorFlow & Scikit-learn.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-white">
              <Shield className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-white/90 text-sm">
                SOC 2 Type II compliant. End-to-end encryption (AES-256). 
                Role-based access control (RBAC). Audit logs & compliance reports.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-white">
              <Code className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Developer-Friendly API</h3>
              <p className="text-white/90 text-sm">
                RESTful API with OpenAPI 3.0 spec. SDKs untuk Node.js, Python, PHP. 
                Webhooks untuk real-time notifications. Rate limit: 100K req/month.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-white">
              <RefreshCw className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Auto-Scaling Infrastructure</h3>
              <p className="text-white/90 text-sm">
                99.9% uptime SLA. Auto-scaling pada AWS/GCP. 
                CDN global dengan edge caching untuk low-latency worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Use Cases & Industries
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🛍️ E-commerce Analytics</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Track revenue, orders, AOV, conversion rate dari Shopify, Tokopedia, Shopee</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Identifikasi best-selling products & inventory optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Customer lifetime value (LTV) & retention analysis</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📱 Digital Marketing ROI</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Measure ROI & ROAS dari Facebook Ads, Google Ads, Instagram Ads</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Attribution modeling: First touch, Last touch, Multi-touch</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Campaign performance comparison & budget optimization</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">💳 SaaS Subscription Analytics</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>MRR, ARR, churn rate, customer acquisition cost (CAC) tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Subscription health score & churn prediction alerts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Cohort analysis & user engagement metrics</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Financial Reporting</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Real-time P&L, cash flow, balance sheet dari Stripe, Duitku, bank APIs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Automated invoicing & expense categorization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Tax compliance & financial audit trails</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* NOT PayFac Disclaimer */}
      <section className="bg-red-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              ⚠️ PENTING: Apa Yang BUKAN Dilakukan OASIS BI PRO
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-4">❌ KAMI BUKAN:</h3>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Payment Facilitator (PayFac)</strong> - Kami TIDAK memproses pembayaran untuk pihak ketiga
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Payment Aggregator</strong> - Kami TIDAK mengumpulkan pembayaran dari multiple merchants
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Payment Gateway/Processor</strong> - Kami TIDAK menyediakan infrastruktur pembayaran
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Multi-vendor Marketplace</strong> - Kami TIDAK memfasilitasi transaksi B2C/C2C
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-900 mb-4">✅ KAMI ADALAH:</h3>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Business Intelligence SaaS</strong> - Software analytics untuk menganalisis data bisnis
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Subscription Service</strong> - Customer membayar KAMI untuk akses software analytics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      <strong>End Merchant</strong> - Kami adalah PENJUAL software, customer adalah END USER
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3">💳 Bagaimana Duitku Berperan?</h4>
              <p className="text-gray-700 mb-4">
                Duitku digunakan HANYA untuk subscription billing kami sendiri:
              </p>
              <ol className="space-y-2 text-gray-700 text-sm">
                <li><strong>1.</strong> Customer memilih paket subscription (Starter/Professional/Enterprise)</li>
                <li><strong>2.</strong> Customer membayar KE OASIS BI PRO melalui Duitku</li>
                <li><strong>3.</strong> OASIS BI PRO menerima pembayaran (kami adalah MERCHANT)</li>
                <li><strong>4.</strong> Customer mendapat akses ke software analytics kami</li>
              </ol>
              <p className="text-gray-700 mt-4 font-semibold">
                TIDAK ADA transaksi antar pihak ketiga. Customer → OASIS BI PRO (end-to-end).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Siap Transform Data Jadi Revenue?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Mulai dengan Free Trial 14 hari. Tidak perlu kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Start Free Trial
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for X icon (not available in lucide-react)
function XCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
