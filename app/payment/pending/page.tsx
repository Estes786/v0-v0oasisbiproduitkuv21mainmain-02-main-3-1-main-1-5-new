'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Clock, RefreshCw, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantOrderId = searchParams.get('merchantOrderId');
  
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (merchantOrderId) {
      checkPaymentStatus();
    }
  }, [merchantOrderId]);

  const checkPaymentStatus = async () => {
    setChecking(true);
    try {
      const response = await axios.get(`/api/duitku/check-status?merchantOrderId=${merchantOrderId}`);
      if (response.data.success) {
        setTransactionData(response.data);
        
        // If payment is successful, redirect to success page
        if (response.data.transaction.status === 'success') {
          router.push(`/payment/success?merchantOrderId=${merchantOrderId}`);
        }
        
        // If payment failed, redirect to failed page
        if (response.data.transaction.status === 'failed') {
          router.push(`/payment/failed?merchantOrderId=${merchantOrderId}`);
        }
      }
    } catch (error) {
      console.error('Failed to check payment status:', error);
    } finally {
      setLoading(false);
      setChecking(false);
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
        {/* Pending Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <Clock className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pembayaran Menunggu Konfirmasi
            </h1>
            <p className="text-lg text-gray-600">
              Transaksi Anda sedang dalam proses
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
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    Pending
                  </span>
                </div>
                {transactionData.transaction.expiredAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Berlaku Hingga:</span>
                    <span className="font-semibold text-red-600">
                      {new Date(transactionData.transaction.expiredAt).toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-bold text-lg mb-3">📝 Instruksi Pembayaran</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Selesaikan pembayaran sesuai metode yang dipilih</li>
              <li>Pembayaran akan otomatis terkonfirmasi dalam beberapa menit</li>
              <li>Anda akan menerima email konfirmasi setelah pembayaran berhasil</li>
              <li>Jangan tutup halaman ini sampai pembayaran selesai</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={checkPaymentStatus}
              disabled={checking}
              className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {checking ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Memeriksa...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh Status
                </>
              )}
            </button>
            {transactionData?.transaction?.paymentUrl && (
              <a
                href={transactionData.transaction.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Lanjut Bayar
              </a>
            )}
          </div>

          {/* Back Link */}
          <div className="mt-6">
            <Link
              href="/pricing"
              className="inline-flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
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

        {/* Auto Refresh Notice */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-sm text-gray-600">
            💡 Halaman ini akan otomatis refresh setiap 30 detik untuk memeriksa status pembayaran
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentPendingContent />
    </Suspense>
  );
}
