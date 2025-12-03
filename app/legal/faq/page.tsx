export default function FAQPage() {
  const faqs = [
    {
      category: '⚠️ Important: What OASIS BI PRO Is (and Is NOT)',
      questions: [
        {
          q: 'Apakah OASIS BI PRO adalah payment gateway atau payment facilitator (PayFac)?',
          a: 'TIDAK. Kami adalah PURE BUSINESS INTELLIGENCE SAAS PLATFORM. Kami menyediakan software analytics untuk membantu Anda MENGANALISIS data bisnis, bukan untuk memproses pembayaran. Kami menggunakan Midtrans HANYA untuk mengumpulkan biaya subscription software kami sendiri (kami adalah merchant, Anda adalah customer).'
        },
        {
          q: 'Bisakah saya menerima pembayaran dari customer saya melalui OASIS BI PRO?',
          a: 'TIDAK. OASIS BI PRO adalah analytics tool untuk MELIHAT dan MENGANALISIS data bisnis Anda (revenue, traffic, conversions), bukan untuk memproses pembayaran customer Anda. Untuk menerima pembayaran dari customer, gunakan payment gateway terpisah seperti Midtrans, Xendit, atau Stripe secara langsung.'
        },
        {
          q: 'Apakah OASIS BI PRO seperti marketplace atau multi-vendor platform?',
          a: 'TIDAK. Kami BUKAN marketplace, BUKAN multi-vendor platform, dan TIDAK memfasilitasi transaksi antar user. Kami adalah software analytics seperti Google Analytics, Mixpanel, DataDog, atau Amplitude. User membayar KAMI untuk mengakses analytics software, bukan untuk bertransaksi dengan user lain.'
        },
        {
          q: 'Jadi, apa yang saya dapatkan dengan berlangganan OASIS BI PRO?',
          a: 'Anda mendapatkan akses ke software Business Intelligence kami: Real-time analytics dashboards, AI-powered insights (anomaly detection, forecasting, churn prediction), Data visualization, Multi-touch attribution, Team collaboration, dan Custom reports. Ini adalah PURE SAAS - Anda membayar untuk software, bukan untuk payment processing.'
        },
        {
          q: 'Kenapa ini penting untuk dijelaskan?',
          a: 'Karena payment gateway seperti Midtrans memiliki kebijakan ketat terhadap payment facilitators dan aggregators. Kami ingin 100% transparan bahwa kami adalah ANALYTICS SOFTWARE COMPANY, bukan payment processor. Ini memastikan compliance dan trust dengan semua pihak (users, payment partners, regulators).'
        }
      ]
    },
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'Bagaimana cara memulai menggunakan OASIS BI PRO?',
          a: 'Sangat mudah! 1) Daftar akun gratis, 2) Connect data sources Anda (Google Analytics, Shopee, dll), 3) Dashboard otomatis ter-populate dengan insights. Total waktu setup: 5-10 menit.'
        },
        {
          q: 'Apakah perlu kartu kredit untuk trial?',
          a: 'Tidak! Anda bisa start 14-day free trial tanpa memasukkan informasi pembayaran. Upgrade kapan saja jika Anda suka service kami.'
        },
        {
          q: 'Berapa lama waktu untuk data muncul di dashboard?',
          a: 'Real-time! Setelah connect data source, data akan muncul dalam hitungan detik. Analytics updates setiap sub-second.'
        }
      ]
    },
    {
      category: 'Pricing & Billing',
      questions: [
        {
          q: 'Apa perbedaan antara Starter, Professional, dan Enterprise?',
          a: 'Starter (Rp 299K): Untuk solo founders dengan basic analytics. Professional (Rp 999K): Untuk growing businesses dengan AI insights + attribution. Enterprise (Rp 3.999K): Unlimited everything + white-label + dedicated support.'
        },
        {
          q: 'Bisakah saya upgrade/downgrade kapan saja?',
          a: 'Ya! Upgrade langsung aktif, downgrade efektif di billing cycle berikutnya. Billing di-adjust secara prorated.'
        },
        {
          q: 'Apa saja metode pembayaran yang diterima?',
          a: 'Semua metode Indonesia via Midtrans: Credit/Debit Cards (Visa, Mastercard), Virtual Account (BCA, Mandiri, BNI, BRI, Permata), E-wallets (GoPay, DANA, OVO, ShopeePay), dan QRIS.'
        },
        {
          q: 'Apakah ada diskon untuk annual billing?',
          a: 'Ya! Save 15% dengan annual payment. Essentially dapat 2 bulan gratis.'
        }
      ]
    },
    {
      category: 'Features & Capabilities',
      questions: [
        {
          q: 'Data sources mana yang bisa diintegrasikan?',
          a: 'Saat ini support: Google Analytics, Facebook Ads, Google Ads, Shopee, Tokopedia, Manual CSV upload, dan Custom API webhooks. Lebih banyak integrations coming soon!'
        },
        {
          q: 'Apa itu AI-powered insights?',
          a: 'AI kami otomatis detect anomalies (sudden spikes/drops), forecast revenue, segment customers, predict churn, dan generate actionable recommendations - semua secara real-time.'
        },
        {
          q: 'Apa itu multi-touch attribution?',
          a: 'Attribution tracking credit ke marketing channels yang berkontribusi pada conversion. Kami support 5 models: First-touch, Last-touch, Linear, Time-decay, dan Markov Chain.'
        },
        {
          q: 'Apakah bisa customize dashboard?',
          a: 'Ya! Drag-drop widgets, filter metrics, create custom KPIs, save multiple dashboard views, dan share dengan team.'
        }
      ]
    },
    {
      category: 'Data & Security',
      questions: [
        {
          q: 'Apakah data saya aman?',
          a: 'Absolutely! Enterprise-grade security: TLS 1.3 encryption (in-transit), AES-256 (at-rest), Row-Level Security, SOC2-ready architecture, daily backups. Data center di Singapore (Supabase AWS).'
        },
        {
          q: 'Berapa lama data retention?',
          a: 'Tergantung plan: Starter (7 days), Professional (90 days), Enterprise (unlimited). Semua plan bisa export data kapan saja.'
        },
        {
          q: 'Bisakah saya export data saya?',
          a: 'Ya! Export anytime dalam format CSV, JSON, atau Excel. Full data portability - Anda punya data Anda.'
        },
        {
          q: 'Apakah GDPR compliant?',
          a: 'Ya! Kami fully compliant dengan GDPR dan Indonesian Data Protection Law (UU ITE, PP 71/2019). Privacy by design.'
        }
      ]
    },
    {
      category: 'Support & Help',
      questions: [
        {
          q: 'Bagaimana cara mendapat support?',
          a: 'Starter: Email support (48-72h). Professional: Priority email (24h). Enterprise: Dedicated support + phone (4h response).'
        },
        {
          q: 'Apakah ada documentation atau tutorials?',
          a: 'Ya! Comprehensive knowledge base, video tutorials, dan step-by-step guides tersedia di Help Center.'
        },
        {
          q: 'Bisakah request custom features?',
          a: 'Ya, khususnya untuk Enterprise customers. Submit feature request dan kami akan evaluate untuk roadmap kami.'
        },
        {
          q: 'Apakah ada training untuk team?',
          a: 'Professional plan: Self-service onboarding. Enterprise: Dedicated onboarding session + training untuk team (up to 10 orang).'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'Apa technology stack yang digunakan?',
          a: 'Next.js 15 (frontend), Supabase (database + backend), Vercel (hosting), Midtrans (payment). Modern, fast, scalable.'
        },
        {
          q: 'Apakah ada API untuk custom integrations?',
          a: 'Ya! Professional+ plans dapat access REST API untuk custom integrations. Full API docs tersedia.'
        },
        {
          q: 'Berapa SLA uptime guarantee?',
          a: 'Professional: 99% uptime. Enterprise: 99.9% dengan SLA credits jika breach.'
        },
        {
          q: 'Apakah support SSO untuk Enterprise?',
          a: 'Ya! Enterprise plan support SSO (SAML, OAuth2) untuk seamless team authentication.'
        }
      ]
    },
    {
      category: 'Refund & Cancellation',
      questions: [
        {
          q: 'Apa itu 14-day money-back guarantee?',
          a: 'Jika tidak puas dalam 14 hari pertama, refund 100% tanpa pertanyaan. Simple as that.'
        },
        {
          q: 'Bagaimana cara cancel subscription?',
          a: 'Go to Account Settings → Billing → Cancel Subscription. Access continues until period end, data retained 30 days.'
        },
        {
          q: 'Apakah bisa refund setelah 14 hari?',
          a: 'Tidak, kecuali ada technical issue di sisi kami (service outage >24h) atau billing error.'
        },
        {
          q: 'Berapa lama proses refund?',
          a: 'Approval: 24 jam. Processing: 5-10 business days ke original payment method (tergantung bank/provider).'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about OASIS BI PRO
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-lg"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((item, qIndex) => (
                  <details key={qIndex} className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex-shrink-0 mt-1">
                          <svg
                            className="w-6 h-6 text-blue-600 transform group-open:rotate-90 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {item.q}
                        </h3>
                      </div>
                    </summary>
                    <div className="mt-4 ml-10 p-4 text-gray-700 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 bg-blue-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is here to help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/legal/contact"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Support
            </a>
            <a
              href="mailto:elfaress2425@gmail.com"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
