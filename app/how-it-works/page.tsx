"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, CreditCard, ShieldCheck, Zap, Users, TrendingUp, BarChart } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Cara Kerja OASIS BI PRO</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dari pendaftaran hingga mendapatkan insights bisnis yang powerful - semua dalam 4 langkah mudah
          </p>
        </div>

        {/* Payment Flow Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🔄 Alur Pembayaran & Aktivasi Member</h2>

          <div className="relative">
            {/* Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  icon: <Users className="w-12 h-12 text-blue-600" />,
                  title: "Pilih Paket",
                  description: "Pilih paket subscription yang sesuai dengan kebutuhan bisnis Anda",
                  details: [
                    "Starter: Rp 99,000/bulan",
                    "Professional: Rp 299,000/bulan",
                    "Enterprise: Rp 999,000/bulan",
                  ],
                  color: "blue",
                },
                {
                  step: "2",
                  icon: <CreditCard className="w-12 h-12 text-green-600" />,
                  title: "Proses Pembayaran",
                  description: "Bayar dengan aman melalui Duitku Payment Gateway",
                  details: [
                    "Bank Transfer (BCA, Mandiri, BNI, BRI)",
                    "E-Wallet (GoPay, OVO, DANA, ShopeePay)",
                    "Credit Card (Visa, Mastercard)",
                  ],
                  color: "green",
                },
                {
                  step: "3",
                  icon: <ShieldCheck className="w-12 h-12 text-purple-600" />,
                  title: "Verifikasi Otomatis",
                  description: "Sistem kami otomatis verifikasi pembayaran Anda",
                  details: ["Pembayaran terverifikasi real-time", "Email konfirmasi dikirim", "Akun member diaktifkan"],
                  color: "purple",
                },
                {
                  step: "4",
                  icon: <Zap className="w-12 h-12 text-orange-600" />,
                  title: "Akses Langsung",
                  description: "Langsung akses dashboard analytics Anda",
                  details: ["Connect data sources", "Create custom dashboards", "Get AI-powered insights"],
                  color: "orange",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Connector Line */}
                  {idx < 3 && (
                    <div
                      className="hidden md:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-blue-300 to-green-300 -z-10"
                      style={{ width: "100%" }}
                    ></div>
                  )}

                  <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                    <div
                      className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center text-2xl font-bold text-${item.color}-600 mb-4`}
                    >
                      {item.step}
                    </div>
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Flow Diagram */}
          <div className="mt-12 p-8 bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📊 Technical Payment Flow (Powered by Duitku)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              {[
                { label: "User Submit Form", emoji: "👤" },
                { label: "OASIS BI PRO API", emoji: "🔧" },
                { label: "Duitku Payment Gateway", emoji: "💳" },
                { label: "Payment Success", emoji: "✅" },
                { label: "Member Dashboard Active", emoji: "🎉" },
              ].map((step, idx) => (
                <div key={idx}>
                  <div className="bg-white p-6 rounded-lg shadow border-2 border-blue-200">
                    <div className="text-4xl mb-2">{step.emoji}</div>
                    <p className="text-sm font-semibold text-gray-700">{step.label}</p>
                  </div>
                  {idx < 4 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What You Get Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">✨ Apa Yang Anda Dapatkan Sebagai Member?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart className="w-12 h-12" />,
                title: "Real-time Analytics Dashboard",
                features: [
                  "50+ custom dashboards",
                  "Interactive visualizations",
                  "AI-powered insights",
                  "Export to PDF/Excel",
                ],
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Data Integration",
                features: [
                  "Connect unlimited data sources",
                  "Google Analytics, Shopee, Tokopedia",
                  "Custom API connections",
                  "Real-time data sync",
                ],
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Advanced Analytics",
                features: ["Revenue forecasting", "Churn prediction", "Anomaly detection", "Multi-touch attribution"],
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Security Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🔒 Keamanan Pembayaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Duitku Certified",
                description: "Payment gateway resmi terdaftar Bank Indonesia",
              },
              {
                icon: "🔐",
                title: "SSL/TLS Encryption",
                description: "Data pembayaran terenkripsi dengan standar bank",
              },
              {
                icon: "✅",
                title: "PCI DSS Compliant",
                description: "Memenuhi standar keamanan kartu kredit internasional",
              },
              {
                icon: "💼",
                title: "Escrow Protection",
                description: "Dana Anda terlindungi selama proses pembayaran",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NOT PayFac Clarification */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">⚠️ PENTING: Klarifikasi Business Model</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-4">✅ OASIS BI PRO ADALAH:</h3>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Pure SaaS Analytics Platform</strong> - Software untuk menganalisis data bisnis Anda
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Subscription Service</strong> - User bayar KAMI untuk akses software analytics
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Direct Merchant</strong> - KAMI adalah merchant, USER adalah customer
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-4">❌ OASIS BI PRO BUKAN:</h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Payment Facilitator (PayFac) - Kami TIDAK memproses pembayaran untuk pihak ketiga</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Payment Aggregator - Kami TIDAK menghubungkan merchant dengan payment gateway</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 text-xl">✗</span>
                  <span>Marketplace - Kami TIDAK ada transaksi antar user atau multi-vendor</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-6 bg-white rounded-xl border-2 border-blue-200">
            <p className="text-gray-800 text-center">
              <strong className="text-blue-600">Penggunaan Duitku:</strong> Kami menggunakan Duitku HANYA untuk menerima
              pembayaran subscription software analytics dari customer kami. Tidak ada uang customer lain yang melewati
              sistem kami. Model bisnis: <strong>B2C SaaS - Software as a Service</strong>.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Berapa lama proses aktivasi setelah pembayaran?",
                answer:
                  "Akun Anda akan aktif secara OTOMATIS dalam 1-5 menit setelah pembayaran dikonfirmasi oleh Duitku. Anda akan menerima email konfirmasi dan bisa langsung login ke dashboard.",
              },
              {
                question: "Metode pembayaran apa saja yang tersedia?",
                answer:
                  "Kami support semua metode pembayaran melalui Duitku: Bank Transfer (BCA, Mandiri, BNI, BRI, dll), E-Wallet (GoPay, OVO, DANA, ShopeePay, LinkAja), Credit Card (Visa, Mastercard, JCB), dan Retail (Indomaret, Alfamart).",
              },
              {
                question: "Apakah data pembayaran saya aman?",
                answer:
                  "Ya, sangat aman. Semua transaksi diproses melalui Duitku Payment Gateway yang sudah tersertifikasi dan terdaftar di Bank Indonesia. Data Anda dienkripsi dengan SSL/TLS dan memenuhi standar PCI DSS.",
              },
              {
                question: "Apakah bisa cancel subscription?",
                answer:
                  "Ya, Anda bisa cancel kapan saja dari dashboard member Anda. Tidak ada biaya pembatalan. Akses Anda akan tetap aktif sampai akhir periode billing yang sudah dibayar.",
              },
              {
                question: "Bagaimana jika pembayaran saya gagal?",
                answer:
                  "Jika pembayaran gagal, Anda bisa mencoba lagi dengan metode pembayaran lain. Order ID akan expire dalam 24 jam. Jika ada masalah, hubungi support kami di support@oasis-bi-pro.web.id.",
              },
              {
                question: "Apakah OASIS BI PRO memproses pembayaran customer saya?",
                answer:
                  "TIDAK. OASIS BI PRO adalah analytics software untuk MENGANALISIS data bisnis Anda saja. Kami BUKAN payment gateway/processor. Kami hanya menggunakan Duitku untuk subscription billing kami sendiri.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap Mulai Transform Data Jadi Revenue?</h2>
          <p className="text-xl text-gray-600 mb-8">Join 10M+ businesses yang sudah menggunakan OASIS BI PRO</p>
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
