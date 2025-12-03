import { Check, CreditCard, Smartphone, QrCode, Building2, Shield, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Metode Pembayaran yang Aman & Mudah
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by Midtrans - Payment Gateway Terpercaya di Indonesia dengan PCI DSS Level 1 Certification
          </p>
        </div>

        {/* Security Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mb-12 text-white">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">PCI DSS Level 1</div>
                <div className="text-sm text-blue-100">Highest Security Standard</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Lock className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">256-bit SSL Encryption</div>
                <div className="text-sm text-blue-100">Bank-Level Security</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">Instant Verification</div>
                <div className="text-sm text-blue-100">Real-time Processing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Credit/Debit Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-blue-100 rounded-lg p-4 mb-6 inline-block">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Credit & Debit Card</h2>
            <p className="text-gray-600 mb-6">
              Instant approval dengan kartu kredit atau debit Anda
            </p>
            <div className="space-y-3 mb-6">
              <PaymentOption logo="💳" name="Visa" />
              <PaymentOption logo="💳" name="Mastercard" />
              <PaymentOption logo="💳" name="JCB" />
              <PaymentOption logo="💳" name="American Express" />
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800">
              <Check className="w-4 h-4 inline mr-2" />
              Instant Approval
            </div>
          </div>

          {/* E-Wallet */}
          <div className="bg-white rounded-xl shadow-lg p-8 ring-4 ring-primary-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                PALING POPULER
              </span>
            </div>
            <div className="bg-green-100 rounded-lg p-4 mb-6 inline-block">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">E-Wallet</h2>
            <p className="text-gray-600 mb-6">
              Bayar langsung dari e-wallet favorit Anda
            </p>
            <div className="space-y-3 mb-6">
              <PaymentOption logo="🟢" name="GoPay" />
              <PaymentOption logo="🔵" name="DANA" />
              <PaymentOption logo="🟣" name="OVO" />
              <PaymentOption logo="🟠" name="ShopeePay" />
              <PaymentOption logo="🔴" name="LinkAja" />
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800">
              <Check className="w-4 h-4 inline mr-2" />
              Cashback & Promo Available
            </div>
          </div>

          {/* QRIS */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-purple-100 rounded-lg p-4 mb-6 inline-block">
              <QrCode className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">QRIS</h2>
            <p className="text-gray-600 mb-6">
              Satu QR code untuk semua bank & e-wallet
            </p>
            <div className="space-y-3 mb-6">
              <PaymentOption logo="📱" name="Scan dengan aplikasi bank" />
              <PaymentOption logo="📱" name="Scan dengan e-wallet" />
              <PaymentOption logo="📱" name="Support 100+ bank" />
              <PaymentOption logo="📱" name="Universal payment" />
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800">
              <Check className="w-4 h-4 inline mr-2" />
              Zero Additional Fees
            </div>
          </div>
        </div>

        {/* Virtual Account Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-orange-100 rounded-lg p-4 mr-4">
              <Building2 className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Virtual Account</h2>
              <p className="text-gray-600">Transfer dari bank manapun ke virtual account Anda</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            <BankCard name="BCA" color="bg-blue-600" />
            <BankCard name="Mandiri" color="bg-yellow-500" />
            <BankCard name="BNI" color="bg-orange-600" />
            <BankCard name="BRI" color="bg-blue-700" />
            <BankCard name="Permata" color="bg-green-600" />
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">✅ No Admin Fee</h4>
              <p className="text-sm text-blue-700">Transfer tanpa biaya admin tambahan</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">⏱️ 24/7 Available</h4>
              <p className="text-sm text-blue-700">Bayar kapan saja, verifikasi otomatis</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🔒 Secure</h4>
              <p className="text-sm text-blue-700">Protected by Midtrans security</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Cara Pembayaran - Mudah & Cepat
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              step="1"
              title="Pilih Paket"
              description="Pilih paket yang sesuai kebutuhan Anda (Starter, Professional, atau Business)"
            />
            <StepCard
              step="2"
              title="Pilih Metode Bayar"
              description="Pilih dari 20+ metode pembayaran: kartu kredit, e-wallet, VA, atau QRIS"
            />
            <StepCard
              step="3"
              title="Bayar dengan Aman"
              description="Lakukan pembayaran melalui Midtrans payment gateway yang secure"
            />
            <StepCard
              step="4"
              title="Langsung Aktif"
              description="Akun Anda langsung aktif setelah pembayaran terverifikasi (instant)"
            />
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-12 mb-16 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Keamanan Pembayaran Terjamin</h2>
            <p className="text-xl text-gray-300">
              Powered by Midtrans - Trusted by 50,000+ businesses in Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <SecurityFeature
              icon={<Shield className="w-12 h-12" />}
              title="PCI DSS Level 1"
              description="Highest level of payment security certification. Your payment data is never stored on our servers."
            />
            <SecurityFeature
              icon={<Lock className="w-12 h-12" />}
              title="End-to-End Encryption"
              description="All transactions are encrypted with bank-grade TLS 1.3 and AES-256 encryption."
            />
            <SecurityFeature
              icon={<Check className="w-12 h-12" />}
              title="Real-time Fraud Detection"
              description="Advanced AI-powered fraud detection monitors every transaction for suspicious activity."
            />
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 mb-16">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="bg-yellow-100 rounded-lg p-3">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">
                7-Day Money-Back Guarantee
              </h3>
              <p className="text-lg text-yellow-800 mb-4">
                Tidak satisfied dengan layanan kami? Dapatkan 100% refund dalam 7 hari pertama. No questions asked.
              </p>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Refund diproses dalam 5-7 hari kerja</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Refund ke metode pembayaran yang sama</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>No penalty atau hidden fees</span>
                </li>
              </ul>
              <Link href="/legal/refund" className="inline-block mt-4 text-yellow-900 font-semibold hover:underline">
                Baca Refund Policy Lengkap →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="Apakah pembayaran aman?"
              answer="Sangat aman! Kami menggunakan Midtrans sebagai payment gateway dengan sertifikasi PCI DSS Level 1 (standar keamanan tertinggi). Semua data pembayaran dienkripsi dengan TLS 1.3 dan AES-256. Data kartu Anda tidak pernah disimpan di server kami."
            />
            <FAQItem
              question="Apakah ada biaya admin?"
              answer="TIDAK ada biaya admin tambahan. Harga yang tertera di pricing page adalah harga final yang Anda bayar. Midtrans fee sudah kami cover untuk Anda."
            />
            <FAQItem
              question="Berapa lama verifikasi pembayaran?"
              answer="Untuk Credit Card, E-wallet, dan QRIS: INSTANT (real-time). Untuk Virtual Account: 5-15 menit setelah transfer. Anda akan menerima email confirmation setelah pembayaran terverifikasi."
            />
            <FAQItem
              question="Apakah bisa recurring payment otomatis?"
              answer="Ya! Untuk langganan bulanan, kami support auto-debit dari kartu kredit atau e-wallet Anda. Anda akan menerima reminder 3 hari sebelum billing cycle berikutnya."
            />
            <FAQItem
              question="Bagaimana cara refund?"
              answer="Submit refund request via email ke support@oasisbipro.com atau Contact page. Refund akan diproses dalam 5-7 hari kerja ke metode pembayaran yang sama. 100% money-back guarantee dalam 7 hari pertama."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Siap untuk Meningkatkan Revenue Bisnis Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Mulai gratis 7 hari. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing"
              className="inline-block bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Lihat Pricing
            </Link>
            <Link 
              href="/legal/contact"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Hubungi Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentOption({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg">
      <span className="text-2xl mr-3">{logo}</span>
      <span className="text-gray-700 font-medium">{name}</span>
      <Check className="w-5 h-5 ml-auto text-green-600" />
    </div>
  );
}

function BankCard({ name, color }: { name: string; color: string }) {
  return (
    <div className={`${color} text-white rounded-lg p-6 text-center shadow-lg`}>
      <div className="text-2xl font-bold mb-2">{name}</div>
      <div className="text-sm opacity-90">Virtual Account</div>
    </div>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4 text-blue-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}
