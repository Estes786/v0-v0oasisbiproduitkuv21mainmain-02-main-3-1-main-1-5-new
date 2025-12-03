'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantOrderId = searchParams.get('merchantOrderId');
  
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<any>(null);

  useEffect(() => {
    if (merchantOrderId) {
      checkPaymentStatus();
    }
  }, [merchantOrderId]);

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`/api/duitku/check-status?merchantOrderId=${merchantOrderId}`);
      if (response.data.success) {
        setTransactionData(response.data);
      }
    } catch (error) {
      console.error('Failed to check payment status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (transactionData?.order) {
      router.push(`/checkout?plan=${transactionData.order.planType}`);
    } else {
      router.push('/pricing');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-lg text-gray-600">Memeriksa status pembayaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Failed Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pembayaran Gagal
            </h1>
            <p className="text-lg text-gray-600">
              Maaf, transaksi Anda tidak dapat diproses
            </p>
          </div>

          {/* Transaction Details */}
          {transactionData && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Detail Transaksi</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">{transactionData.transaction.merchantOrderId}</span>
                </div>
                {transactionData.transaction.reference && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-semibold">{transactionData.transaction.reference}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Paket:</span>
                  <span className="font-semibold capitalize">
                    {transactionData.order?.planType || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span className="font-semibold">{transactionData.transaction.paymentMethodName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah:</span>
                  <span className="font-semibold text-primary-600">
                    Rp {transactionData.transaction.amount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                    Failed
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Common Reasons */}
          <div className="bg-red-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-bold text-lg mb-3">❌ Kemungkinan Penyebab</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Saldo atau limit kartu tidak mencukupi</li>
              <li>Informasi pembayaran tidak valid</li>
              <li>Transaksi dibatalkan oleh pengguna</li>
              <li>Koneksi internet terputus saat proses pembayaran</li>
              <li>Pembayaran melewati batas waktu expired</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Coba Lagi
            </button>
            <Link
              href="/pricing"
              className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Pricing
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Butuh bantuan? Hubungi kami di{' '}
              <a href="mailto:oasisbipro@gmail.com" className="text-primary-600 hover:text-primary-700">
                oasisbipro@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Butuh Bantuan?</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Jika Anda mengalami kesulitan dalam melakukan pembayaran, tim support kami siap membantu:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email: <a href="mailto:oasisbipro@gmail.com" className="text-primary-600 hover:text-primary-700">oasisbipro@gmail.com</a></li>
              <li>Response Time: 24 jam (hari kerja)</li>
              <li>Sertakan Order ID untuk penanganan lebih cepat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
