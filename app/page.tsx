"use client"

import Link from "next/link"
import { ArrowRight, BarChart, TrendingUp, Users, Shield, Zap, Brain, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            🎯 Pure Business Intelligence SaaS - Bukan Payment Processor
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Data Bisnis Anda
            <br />
            Menjadi <span className="text-blue-600">Revenue</span>
          </h1>

          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Platform Business Intelligence dengan AI-powered insights untuk menganalisis revenue, traffic, dan konversi
            secara real-time.
          </p>

          <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
            <strong>PENTING:</strong> OASIS BI PRO adalah analytics software untuk MENGANALISIS data bisnis Anda, bukan
            untuk memproses pembayaran. Kami menggunakan Midtrans hanya untuk subscription billing kami sendiri.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Mulai Gratis <ArrowRight size={20} />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Lihat Harga
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "10M+" },
            { label: "Events Tracked", value: "50B+" },
            { label: "Uptime SLA", value: "99.9%" },
            { label: "Data Sources", value: "25+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Are (Critical Duitku Section) */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">✅ Apa Itu OASIS BI PRO?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-4">✅ KAMI ADALAH:</h3>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                      <span>
                        <strong>Business Intelligence Platform</strong> - Software analytics untuk menganalisis data
                        bisnis
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                      <span>
                        <strong>Pure SaaS Analytics</strong> - Seperti Google Analytics, Mixpanel, DataDog
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                      <span>
                        <strong>Subscription Service</strong> - User bayar kami untuk akses software analytics
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-4">❌ KAMI BUKAN:</h3>
                  <ul className="space-y-3 text-red-800">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                      <span>Payment Facilitator (PayFac)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                      <span>Payment Aggregator</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                      <span>Payment Gateway/Processor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                      <span>Multi-vendor Marketplace</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-xl border-2 border-blue-200">
                <p className="text-gray-800 text-center">
                  <strong className="text-blue-600">Business Model Kami:</strong> User membayar OASIS BI PRO untuk
                  subscription software analytics → Kami adalah merchant, user adalah customer → Tidak ada transaksi
                  antar user atau pihak ketiga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
            <p className="text-xl text-gray-600">Analytics platform lengkap untuk growing businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart className="w-12 h-12 text-blue-600" />,
                title: "Real-time Analytics",
                description:
                  "Dashboard interaktif dengan data real-time untuk monitoring revenue, traffic, dan konversi",
              },
              {
                icon: <Brain className="w-12 h-12 text-purple-600" />,
                title: "AI-Powered Insights",
                description: "Anomaly detection, revenue forecasting, dan churn prediction otomatis dengan AI",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-green-600" />,
                title: "Multi-Touch Attribution",
                description: "5 model attribution (First-touch, Last-touch, Linear, Time-decay, Markov Chain)",
              },
              {
                icon: <Users className="w-12 h-12 text-orange-600" />,
                title: "Team Collaboration",
                description: "Multi-user access dengan role-based permissions untuk team Anda",
              },
              {
                icon: <Shield className="w-12 h-12 text-red-600" />,
                title: "Enterprise Security",
                description: "TLS 1.3, AES-256 encryption, Row-Level Security, SOC2-ready architecture",
              },
              {
                icon: <Zap className="w-12 h-12 text-yellow-600" />,
                title: "Data Integration",
                description: "Connect dengan Google Analytics, Shopee, Tokopedia, dan 20+ data sources lainnya",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Transform Data Jadi Revenue?</h2>
          <p className="text-xl mb-8 opacity-90">
            Bergabung dengan 10M+ businesses yang sudah menggunakan OASIS BI PRO
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Mulai Free Trial
            </Link>
            <Link
              href="/legal/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Hubungi Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
