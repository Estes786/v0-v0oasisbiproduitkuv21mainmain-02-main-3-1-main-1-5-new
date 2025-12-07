/**
 * DUITKU Payment Gateway Integration
 * Official Documentation: https://docs.duitku.com/
 * 
 * IMPORTANT: This is for SUBSCRIPTION BILLING ONLY
 * We are NOT a payment facilitator/aggregator
 * We use Duitku to collect OUR subscription fees from OUR customers
 */

import crypto from 'crypto'

// Duitku Configuration (UPDATED WITH NEW CREDENTIALS - DS26557)
export const DUITKU_CONFIG = {
  merchantCode: process.env.NEXT_PUBLIC_DUITKU_MERCHANT_CODE || 'DS26557',
  apiKey: process.env.DUITKU_API_KEY || '68e1d64813c7f21a1ffc3839064ab6b3',
  environment: process.env.NEXT_PUBLIC_DUITKU_ENV || 'sandbox',
  baseUrl: process.env.NEXT_PUBLIC_DUITKU_API_URL || 'https://sandbox.duitku.com/webapi/api/merchant',
  returnUrl: process.env.NEXT_PUBLIC_DUITKU_RETURN_URL || 'https://www.oasis-bi-pro.web.id/payment/success',
  callbackUrl: process.env.NEXT_PUBLIC_DUITKU_CALLBACK_URL || 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
}

// Subscription Plans (matching pricing page)
export const SUBSCRIPTION_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    price: 99000,
    currency: 'IDR',
    duration: 'monthly',
    features: [
      '5 dashboard interaktif',
      '10 data source connections',
      'Basic analytics & reporting',
      'Email support (24 jam)',
      '1 user account'
    ]
  },
  professional: {
    id: 'professional',
    name: 'Professional Plan',
    price: 299000,
    currency: 'IDR',
    duration: 'monthly',
    features: [
      '50 dashboard interaktif',
      'Unlimited data sources',
      'Advanced AI analytics',
      'Priority support (12 jam)',
      'Custom branding',
      '5 user accounts',
      'API access'
    ]
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 999000,
    currency: 'IDR',
    duration: 'monthly',
    features: [
      'Unlimited dashboards',
      'Unlimited data sources',
      'AI-powered insights',
      'Dedicated support (24/7)',
      'White-label solution',
      'Unlimited users',
      'Full API access',
      'Custom integrations',
      'SLA guarantee'
    ]
  }
}

/**
 * Generate signature for Duitku Transaction Request (v2/inquiry API)
 * Formula: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
 * NOTE: NO separators, direct concatenation, used in REQUEST BODY
 * Official Docs: https://docs.duitku.com/api/id/#permintaan-transaksi
 */
export function generateTransactionSignature(
  merchantOrderId: string,
  paymentAmount: number
): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  // CRITICAL: No separators, MD5 hash (NOT SHA256)
  const signatureString = `${merchantCode}${merchantOrderId}${paymentAmount}${apiKey}`
  return crypto.createHash('md5').update(signatureString).digest('hex')
}

/**
 * DEPRECATED: Old function name - use generateTransactionSignature instead
 * Keeping for backward compatibility
 */
export function generateDuitkuSignature(
  merchantOrderId: string,
  paymentAmount: number
): string {
  return generateTransactionSignature(merchantOrderId, paymentAmount)
}

/**
 * Verify callback signature from Duitku
 * Formula: MD5(merchantCode + amount + merchantOrderId + apiKey)
 */
export function verifyDuitkuCallback(
  merchantOrderId: string,
  amount: string,
  signature: string
): boolean {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  const expectedSignature = crypto
    .createHash('md5')
    .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
    .digest('hex')
  
  return signature.toLowerCase() === expectedSignature.toLowerCase()
}

/**
 * Create Duitku payment request
 */
export interface DuitkuPaymentRequest {
  merchantOrderId: string
  paymentAmount: number
  productDetails: string
  email: string
  phoneNumber: string
  customerName: string
  planId: keyof typeof SUBSCRIPTION_PLANS
  userId?: string
}

export async function createDuitkuPayment(data: DuitkuPaymentRequest) {
  const { merchantCode, apiKey, baseUrl, returnUrl, callbackUrl } = DUITKU_CONFIG
  
  // CRITICAL: Generate MD5 signature for REQUEST BODY (v2/inquiry API)
  const signature = generateTransactionSignature(
    data.merchantOrderId,
    data.paymentAmount
  )
  
  console.log('🔐 Signature Generation (MD5 - v2/inquiry API):')
  console.log('   Merchant Code:', merchantCode)
  console.log('   API Key:', apiKey ? (apiKey.substring(0, 10) + '...') : '❌ MISSING')
  console.log('   Order ID:', data.merchantOrderId)
  console.log('   Amount:', data.paymentAmount)
  console.log('   Signature String:', `${merchantCode}${data.merchantOrderId}${data.paymentAmount}${apiKey}`)
  console.log('   Signature (MD5):', signature)
  
  const requestBody = {
    merchantCode,  // Include in body
    paymentAmount: data.paymentAmount,
    paymentMethod: 'VC',  // VC = Credit Card
    // NOTE: To show ALL payment methods, need to switch to Duitku Pop API
    // See PAYMENT_METHOD_FIX_FINDINGS.md for detailed solution
    merchantOrderId: data.merchantOrderId,
    productDetails: data.productDetails,
    email: data.email,
    phoneNumber: data.phoneNumber,
    customerVaName: data.customerName,
    callbackUrl,
    returnUrl,
    signature,  // CRITICAL: Signature in body!
    expiryPeriod: 60, // 60 minutes expiry
  }

  try {
    console.log('📤 Sending request to:', `${baseUrl}/v2/inquiry`)
    console.log('📤 Request headers:', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
    console.log('📤 Request body:', requestBody)
    
    const response = await fetch(`${baseUrl}/v2/inquiry`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // NO custom headers needed for v2/inquiry API
      },
      body: JSON.stringify(requestBody),
    })

    const result = await response.json()
    
    console.log('📥 Duitku Response:', result)
    
    if (!response.ok) {
      console.error('❌ Duitku API Error Response:', result)
      throw new Error(`Duitku API Error (${response.status}): ${result.message || result.statusMessage || response.statusText}`)
    }
    
    // Check if response has expected fields
    if (!result.paymentUrl && !result.reference) {
      console.error('❌ Invalid Duitku response format:', result)
      throw new Error('Invalid response from Duitku: missing paymentUrl or reference')
    }

    console.log('✅ Payment URL:', result.paymentUrl)
    console.log('✅ Reference:', result.reference)
    
    return {
      success: true,
      data: result,
      paymentUrl: result.paymentUrl,
      reference: result.reference,
    }
  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('💥 DUITKU PAYMENT CREATION ERROR')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('Error details:', error)
    if (error instanceof Error) {
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Check payment status from Duitku
 */
export async function checkDuitkuPaymentStatus(merchantOrderId: string) {
  const { merchantCode, apiKey, baseUrl } = DUITKU_CONFIG
  
  // Generate MD5 signature for status check
  const signature = crypto
    .createHash('md5')
    .update(`${merchantCode}${merchantOrderId}${apiKey}`)
    .digest('hex')

  try {
    const response = await fetch(`${baseUrl}/transactionStatus`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantCode,
        merchantOrderId,
        signature,
      }),
    })

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`)
    }

    const result = await response.json()
    return {
      success: true,
      data: result,
      statusCode: result.statusCode,
      statusMessage: result.statusMessage,
    }
  } catch (error) {
    console.error('Duitku status check error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Generate unique merchant order ID
 * Format: OASIS-{PLAN}-{TIMESTAMP}-{RANDOM}
 */
export function generateMerchantOrderId(planId: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `OASIS-${planId.toUpperCase()}-${timestamp}-${random}`
}

/**
 * Payment status codes from Duitku
 * CRITICAL: These are the CORRECT codes from official documentation
 */
export const DUITKU_STATUS = {
  SUCCESS: '00', // Payment SUCCESS (CORRECT!)
  PENDING: '01', // Payment PENDING (was wrongly '00')
  EXPIRED: '02', // Payment expired/failed
  CANCELLED: '03', // Payment cancelled
} as const

export type DuitkuStatus = typeof DUITKU_STATUS[keyof typeof DUITKU_STATUS]
