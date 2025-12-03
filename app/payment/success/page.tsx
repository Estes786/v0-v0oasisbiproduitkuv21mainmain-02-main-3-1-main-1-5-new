'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'failed'>('loading')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // Get order ID from URL parameters
    const orderId = searchParams.get('merchantOrderId') || searchParams.get('orderId')
    const resultCode = searchParams.get('resultCode')

    if (!orderId) {
      setStatus('failed')
      return
    }

    // Check payment status
    checkPaymentStatus(orderId, resultCode)
  }, [searchParams])

  const checkPaymentStatus = async (orderId: string, resultCode: string | null) => {
    try {
      // If we have resultCode from Duitku callback, use it directly
      if (resultCode === '00') {
        setStatus('success')
        setOrderDetails({ orderId })
        return
      }

      // Otherwise, check status via API
      const response = await fetch(`/api/duitku/status?orderId=${orderId}`)
      const result = await response.json()

      if (result.success) {
        const statusCode = result.data.status
        
        if (statusCode === '00' || statusCode === '01') {
          setStatus('success')
        } else if (statusCode === '02') {
          setStatus('failed')
        } else {
          setStatus('pending')
        }
        
        setOrderDetails(result.data)
      } else {
        setStatus('pending')
        setOrderDetails({ orderId })
      }
    } catch (error) {
      console.error('Status check error:', error)
      setStatus('pending')
      setOrderDetails({ orderId })
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">Memverifikasi pembayaran...</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Pembayaran Berhasil!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Terima kasih telah berlangganan OASIS BI PRO!
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Detail Pesanan</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm text-gray-900">{orderDetails?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">✅ Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal:</span>
                <span className="text-gray-900">{new Date().toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Langkah Selanjutnya:</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✉️ Kami telah mengirim konfirmasi ke email Anda</li>
              <li>🔑 Akun Anda telah diaktifkan dan siap digunakan</li>
              <li>📊 Mulai buat dashboard pertama Anda sekarang!</li>
              <li>💬 Butuh bantuan? Hubungi support kami 24/7</li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              🚀 Mulai Sekarang
            </Link>
            <Link
              href="/legal/contact"
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all"
            >
              💬 Hubungi Support
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-600 mt-8">
            Jika ada pertanyaan, hubungi kami di{' '}
            <a href="mailto:elfaress2425@gmail.com" className="text-blue-600 hover:underline">
              elfaress2425@gmail.com
            </a>
            {' '}atau WhatsApp{' '}
            <a href="https://wa.me/6285712658316" className="text-blue-600 hover:underline">
              +62 857-1265-8316
            </a>
          </p>
        </div>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <Loader2 className="w-24 h-24 text-yellow-500 animate-spin mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ⏳ Pembayaran Sedang Diproses
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Kami sedang menunggu konfirmasi dari bank/payment provider
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-yellow-900 mb-3">Informasi:</h3>
            <ul className="space-y-2 text-yellow-800">
              <li>⏰ Proses verifikasi biasanya memakan waktu 1-10 menit</li>
              <li>📧 Kami akan mengirim email konfirmasi setelah pembayaran verified</li>
              <li>🔄 Anda bisa refresh halaman ini untuk update status</li>
              <li>Order ID: <span className="font-mono text-sm">{orderDetails?.orderId}</span></li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              🔄 Refresh Status
            </button>
            <Link
              href="/legal/contact"
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all"
            >
              💬 Hubungi Support
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Failed status
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ❌ Pembayaran Gagal
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Maaf, pembayaran Anda tidak dapat diproses
        </p>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-red-900 mb-3">Kemungkinan Penyebab:</h3>
          <ul className="space-y-2 text-red-800">
            <li>💳 Saldo tidak mencukupi</li>
            <li>⏰ Pembayaran melewati batas waktu</li>
            <li>🚫 Transaksi dibatalkan</li>
            <li>🔒 Pembayaran ditolak oleh bank</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/pricing"
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
          >
            🔄 Coba Lagi
          </Link>
          <Link
            href="/legal/contact"
            className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all"
          >
            💬 Hubungi Support
            </Link>
        </div>

        <p className="text-sm text-gray-600 mt-8">
          Butuh bantuan? Hubungi support kami di{' '}
          <a href="mailto:elfaress2425@gmail.com" className="text-blue-600 hover:underline">
            elfaress2425@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
