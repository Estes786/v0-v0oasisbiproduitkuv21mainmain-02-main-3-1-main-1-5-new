'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, ArrowLeft, ArrowRight, CreditCard, Building2, Wallet, QrCode } from 'lucide-react';
import { PRICING_PLANS, getPlanBySlug } from '@/lib/pricing';
import axios from 'axios';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planParam = searchParams.get('plan') || 'starter';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(planParam);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMethods, setLoadingMethods] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const plan = getPlanBySlug(selectedPlan);

  // Load payment methods when reaching step 3
  useEffect(() => {
    if (currentStep === 3 && paymentMethods.length === 0) {
      loadPaymentMethods();
    }
  }, [currentStep]);

  const loadPaymentMethods = async () => {
    if (!plan) return;
    
    setLoadingMethods(true);
    try {
      const response = await axios.get(`/api/duitku/payment-methods?amount=${plan.price}`);
      setPaymentMethods(response.data.paymentMethods || []);
    } catch (error) {
      console.error('Failed to load payment methods:', error);
      alert('Gagal memuat metode pembayaran. Silakan coba lagi.');
    } finally {
      setLoadingMethods(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = () => {
    if (currentStep === 1) {
      return selectedPlan !== '';
    }
    if (currentStep === 2) {
      return (
        formData.customerName.trim() !== '' &&
        formData.customerEmail.trim() !== '' &&
        formData.customerPhone.trim() !== ''
      );
    }
    if (currentStep === 3) {
      return selectedPaymentMethod !== '';
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Mohon lengkapi semua field yang diperlukan');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep() || !plan) {
      alert('Mohon lengkapi semua informasi');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/duitku/create-payment', {
        planType: selectedPlan,
        amount: plan.price,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        paymentMethod: selectedPaymentMethod,
      });

      if (response.data.success && response.data.paymentUrl) {
        // Redirect to Duitku payment page
        window.location.href = response.data.paymentUrl;
      } else {
        alert('Gagal membuat pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan tidak ditemukan</h1>
          <button
            onClick={() => router.push('/pricing')}
            className="text-primary-600 hover:text-primary-700"
          >
            Kembali ke halaman pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-lg text-gray-600">Lengkapi pembayaran untuk paket {plan.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">Pilih Paket</span>
            <span className="text-sm font-medium">Info Customer</span>
            <span className="text-sm font-medium">Metode Bayar</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Step 1: Plan Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Paket Anda</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(PRICING_PLANS).map(([key, planData]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedPlan === key
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {planData.popular && (
                      <span className="inline-block bg-primary-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                        POPULER
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{planData.name}</h3>
                    {planData.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">Rp {planData.displayOriginalPrice}</p>
                    )}
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      Rp {planData.displayPrice}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">per {planData.period}</p>
                    <ul className="space-y-2">
                      {planData.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Customer Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Customer</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="08123456789"
                    required
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mt-8">
                  <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Paket {plan.name}</span>
                      <span className="font-semibold">Rp {plan.displayPrice}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary-600">Rp {plan.displayPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Metode Pembayaran</h2>
              
              {loadingMethods ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Memuat metode pembayaran...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Group payment methods by type */}
                  {['Virtual Account', 'E-Wallet', 'Credit Card', 'QRIS'].map((group) => {
                    const methods = paymentMethods.filter((method) => {
                      if (group === 'Virtual Account') return method.paymentMethod.includes('V');
                      if (group === 'E-Wallet') return ['OV', 'DA', 'SP', 'LF'].includes(method.paymentMethod);
                      if (group === 'Credit Card') return method.paymentMethod === 'CC';
                      if (group === 'QRIS') return method.paymentMethod === 'NQ';
                      return false;
                    });

                    if (methods.length === 0) return null;

                    return (
                      <div key={group}>
                        <h3 className="font-semibold text-lg mb-3 flex items-center">
                          {group === 'Virtual Account' && <Building2 className="w-5 h-5 mr-2" />}
                          {group === 'E-Wallet' && <Wallet className="w-5 h-5 mr-2" />}
                          {group === 'Credit Card' && <CreditCard className="w-5 h-5 mr-2" />}
                          {group === 'QRIS' && <QrCode className="w-5 h-5 mr-2" />}
                          {group}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {methods.map((method) => (
                            <div
                              key={method.paymentMethod}
                              onClick={() => setSelectedPaymentMethod(method.paymentMethod)}
                              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                selectedPaymentMethod === method.paymentMethod
                                  ? 'border-primary-600 bg-primary-50'
                                  : 'border-gray-200 hover:border-primary-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">{method.paymentName}</p>
                                  <p className="text-sm text-gray-600">
                                    {method.paymentFee > 0 && `Biaya: Rp ${method.paymentFee.toLocaleString('id-ID')}`}
                                    {method.paymentFee === 0 && 'Gratis'}
                                  </p>
                                </div>
                                {selectedPaymentMethod === method.paymentMethod && (
                                  <Check className="w-6 h-6 text-primary-600" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="font-bold text-lg mb-4">Ringkasan Pembayaran</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Paket {plan.name}</span>
                    <span>Rp {plan.displayPrice}</span>
                  </div>
                  {selectedPaymentMethod && paymentMethods.find(m => m.paymentMethod === selectedPaymentMethod)?.paymentFee > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Biaya Admin</span>
                      <span>
                        Rp {paymentMethods.find(m => m.paymentMethod === selectedPaymentMethod)?.paymentFee.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total Pembayaran</span>
                    <span className="text-primary-600">
                      Rp {(plan.price + (paymentMethods.find(m => m.paymentMethod === selectedPaymentMethod)?.paymentFee || 0)).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </button>
          ) : (
            <button
              onClick={() => router.push('/pricing')}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Ke Pricing
            </button>
          )}

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!validateStep()}
              className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Lanjut
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !validateStep()}
              className="flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                'Bayar Sekarang'
              )}
            </button>
          )}
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🔒 Pembayaran aman dan terenkripsi dengan Duitku</p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-lg text-gray-600">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
