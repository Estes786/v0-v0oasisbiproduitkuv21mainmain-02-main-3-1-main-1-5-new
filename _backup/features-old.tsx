"use client"

import Link from "next/link"
import {
  BarChart,
  Brain,
  TrendingUp,
  Database,
  Shield,
  Zap,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Code,
  LineChart,
  PieChart,
  Activity,
  Target,
  Sparkles,
  CloudCog,
  Boxes,
  Workflow,
  FileSpreadsheet,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            🎯 Pure Business Intelligence SaaS Platform
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Platform OASIS BI PRO:
            <br />
            <span className="text-blue-600">Complete Business Intelligence Suite</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            Software analytics lengkap untuk menganalisis, memvisualisasikan, dan mengoptimalkan revenue bisnis Anda
            dengan AI-powered insights. <strong>Bukan payment processor</strong> - kami adalah{" "}
            <strong>pure SaaS analytics platform</strong>.
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🎯 Yang OASIS BI PRO Lakukan:</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
                <span>
                  <strong>Mengumpulkan & Mengintegrasikan Data</strong> dari berbagai sumber (Google Analytics, Shopee,
                  Tokopedia, Database, dll) ke dalam satu platform terpusat
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
                <span>
                  <strong>Memvisualisasikan Data</strong> dalam bentuk charts, graphs, dan dashboards interaktif yang
                  mudah dipahami
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
                <span>
                  <strong>Menganalisis dengan AI</strong> untuk mendeteksi anomali, forecast revenue, prediksi churn,
                  dan memberikan rekomendasi otomatis
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
                <span>
                  <strong>Menyediakan Insights Actionable</strong> yang membantu bisnis membuat keputusan lebih cerdas
                  berdasarkan data
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Platform Offerings */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎯 Apa Yang OASIS BI PRO Tawarkan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: <BarChart className="w-16 h-16 text-blue-600" />,
                title: "Real-time Analytics Dashboard",
                description:
                  "Dashboard interaktif dengan visualisasi data real-time untuk monitoring KPI, revenue, traffic, dan konversi bisnis Anda.",
                features: [
                  "Unlimited custom dashboards",
                  "50+ pre-built chart types",
                  "Drag-and-drop dashboard builder",
                  "Real-time data updates (< 1 second)",
                  "Mobile-responsive design",
                  "White-label branding (Enterprise)",
                ],
              },
              {
                icon: <Database className="w-16 h-16 text-green-600" />,
                title: "Multi-Source Data Integration",
                description: "Connect dan analisis data dari berbagai sumber dalam satu dashboard terpusat.",
                features: [
                  "Google Analytics integration",
                  "E-commerce: Shopee, Tokopedia, Lazada",
                  "Social Media: Facebook, Instagram, TikTok",
                  "Advertising: Google Ads, Facebook Ads",
                  "Database: PostgreSQL, MySQL, MongoDB",
                  "Custom API connections",
                ],
              },
              {
                icon: <Brain className="w-16 h-16 text-purple-600" />,
                title: "AI-Powered Insights",
                description:
                  "Machine learning algorithms yang otomatis detect anomalies, forecast revenue, dan prediksi churn.",
                features: [
                  "Anomaly detection (real-time alerts)",
                  "Revenue forecasting (ARIMA, Prophet)",
                  "Customer churn prediction (ML models)",
                  "Automated insights recommendations",
                  "Natural language insights",
                  "Predictive analytics",
                ],
              },
              {
                icon: <TrendingUp className="w-16 h-16 text-orange-600" />,
                title: "Advanced Attribution Models",
                description:
                  "Track customer journey dan attribution dengan 5+ model analytics untuk optimize marketing ROI.",
                features: [
                  "First-touch attribution",
                  "Last-touch attribution",
                  "Linear attribution",
                  "Time-decay attribution",
                  "Markov Chain attribution",
                  "Custom attribution rules",
                ],
              },
              {
                icon: <Users className="w-16 h-16 text-indigo-600" />,
                title: "Team Collaboration",
                description: "Multi-user access dengan role-based permissions untuk team collaboration.",
                features: [
                  "Unlimited team members (Enterprise)",
                  "Role-based access control (RBAC)",
                  "Dashboard sharing & comments",
                  "Activity logs & audit trails",
                  "Team workspaces",
                  "Collaboration annotations",
                ],
              },
              {
                icon: <Shield className="w-16 h-16 text-red-600" />,
                title: "Enterprise-Grade Security",
                description: "Data Anda terlindungi dengan security standards bank dan compliance certifications.",
                features: [
                  "TLS 1.3 encryption",
                  "AES-256 data encryption",
                  "Row-Level Security (RLS)",
                  "SOC 2 Type II ready",
                  "GDPR & CCPA compliant",
                  "Regular security audits",
                ],
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Capabilities */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">📊 Complete Analytics Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <LineChart className="w-10 h-10" />,
                title: "Trend Analysis",
                description: "Analyze trends over time with multiple timeframes",
              },
              {
                icon: <PieChart className="w-10 h-10" />,
                title: "Segmentation",
                description: "Segment customers by behavior, demographics, value",
              },
              {
                icon: <Activity className="w-10 h-10" />,
                title: "Funnel Analysis",
                description: "Optimize conversion funnels and identify drop-offs",
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: "Goal Tracking",
                description: "Set and monitor business goals and KPIs",
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Cohort Analysis",
                description: "Track user cohorts and retention over time",
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "Revenue Analytics",
                description: "Deep-dive into revenue metrics and growth",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "User Behavior",
                description: "Understand user actions and engagement patterns",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Real-time Events",
                description: "Track events as they happen in real-time",
              },
            ].map((capability, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <div className="mb-4">{capability.icon}</div>
                <h3 className="text-lg font-bold mb-2">{capability.title}</h3>
                <p className="text-sm opacity-90">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Features */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🔧 Technical Features for Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-12 h-12 text-blue-600" />,
                title: "REST API Access",
                description: "Full-featured REST API untuk integrasi custom",
                features: [
                  "RESTful API endpoints",
                  "JSON response format",
                  "API key authentication",
                  "Rate limiting: 10,000 req/hour",
                  "Comprehensive API docs",
                  "SDKs: JavaScript, Python, PHP",
                ],
              },
              {
                icon: <Zap className="w-12 h-12 text-yellow-600" />,
                title: "Real-time Webhooks",
                description: "Receive instant notifications via webhooks",
                features: [
                  "Event-driven architecture",
                  "Custom webhook endpoints",
                  "Retry mechanism",
                  "Webhook signature verification",
                  "Real-time data push",
                  "Multiple webhook destinations",
                ],
              },
              {
                icon: <FileSpreadsheet className="w-12 h-12 text-green-600" />,
                title: "Data Export",
                description: "Export data dalam berbagai format",
                features: [
                  "Export to CSV, Excel, JSON",
                  "Scheduled exports",
                  "Bulk data export API",
                  "Custom report templates",
                  "PDF report generation",
                  "Email delivery",
                ],
              },
              {
                icon: <CloudCog className="w-12 h-12 text-purple-600" />,
                title: "Cloud Infrastructure",
                description: "Deployed on enterprise-grade cloud",
                features: [
                  "Multi-region deployment",
                  "99.9% uptime SLA",
                  "Auto-scaling architecture",
                  "CDN for global performance",
                  "Disaster recovery",
                  "Daily automated backups",
                ],
              },
              {
                icon: <Boxes className="w-12 h-12 text-red-600" />,
                title: "Custom Integrations",
                description: "Build custom integrations dengan platform Anda",
                features: [
                  "Zapier integration",
                  "Custom OAuth apps",
                  "Plugin architecture",
                  "Embedded analytics (iframe)",
                  "SSO/SAML support (Enterprise)",
                  "Custom domain (Enterprise)",
                ],
              },
              {
                icon: <Workflow className="w-12 h-12 text-indigo-600" />,
                title: "Automation",
                description: "Automate reporting dan alerts",
                features: [
                  "Scheduled reports",
                  "Alert rules & triggers",
                  "Slack/Teams notifications",
                  "Email alerts",
                  "Custom automation workflows",
                  "No-code automation builder",
                ],
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            💼 Use Cases: Siapa Yang Menggunakan OASIS BI PRO?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🛒",
                title: "E-Commerce",
                description: "Monitor sales, revenue, conversion rates, dan customer behavior",
              },
              {
                emoji: "📱",
                title: "SaaS Companies",
                description: "Track MRR, churn, customer lifetime value, dan product usage",
              },
              {
                emoji: "📢",
                title: "Marketing Agencies",
                description: "Analyze campaign performance, ROI, and multi-channel attribution",
              },
              {
                emoji: "🏢",
                title: "Enterprises",
                description: "Centralized analytics untuk multiple business units dan regions",
              },
              {
                emoji: "🎯",
                title: "Digital Marketers",
                description: "Optimize ads spend, track conversions, dan measure marketing ROI",
              },
              {
                emoji: "📊",
                title: "Data Teams",
                description: "Build custom dashboards dan reports untuk stakeholders",
              },
              {
                emoji: "💰",
                title: "Finance Teams",
                description: "Revenue analytics, financial forecasting, dan budget tracking",
              },
              {
                emoji: "🎓",
                title: "Startups",
                description: "Growth metrics, product-market fit analysis, dan investor reporting",
              },
            ].map((useCase, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-center"
              >
                <div className="text-5xl mb-4">{useCase.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NOT PayFac Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ⚠️ KLARIFIKASI: OASIS BI PRO = Analytics Software, BUKAN Payment Processor
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-4">✅ KAMI ADALAH:</h3>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Business Intelligence Platform</strong> - Software untuk MENGANALISIS data bisnis
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Pure SaaS Analytics</strong> - Seperti Google Analytics, Mixpanel, Tableau, DataDog
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Subscription Service</strong> - User bayar KAMI untuk subscription software analytics
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Direct Merchant</strong> - OASIS BI PRO adalah merchant, USER adalah customer kami
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-4">❌ KAMI BUKAN:</h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Payment Facilitator (PayFac)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Payment Aggregator</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Payment Gateway/Processor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Multi-vendor Marketplace</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Processor untuk transaksi third-party</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-6 bg-white rounded-xl border-2 border-blue-200">
            <p className="text-gray-800 text-center">
              <strong className="text-blue-600">Penggunaan Duitku:</strong> OASIS BI PRO menggunakan Duitku Payment
              Gateway HANYA untuk menerima subscription payments dari customer kami. Tidak ada transaksi third-party,
              tidak ada uang customer lain yang melewati platform kami. <strong>Pure B2C SaaS model</strong>.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap Transform Data Bisnis Anda?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 10M+ businesses yang sudah trust OASIS BI PRO untuk analytics
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              Lihat Paket & Harga <ArrowRight size={20} />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Coba Dashboard Gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
