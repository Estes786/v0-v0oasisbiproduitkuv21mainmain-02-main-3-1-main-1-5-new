/**
 * DUITKU Payment Gateway Integration
 * Official Documentation: https://docs.duitku.com/
 * 
 * IMPORTANT: This is for SUBSCRIPTION BILLING ONLY
 * We are NOT a payment facilitator/aggregator
 * We use Duitku to collect OUR subscription fees from OUR customers
 */

import crypto from 'crypto'

// Duitku Configuration
export const DUITKU_CONFIG = {
  merchantCode: process.env.NEXT_PUBLIC_DUITKU_MERCHANT_CODE || 'DS26335',
  apiKey: process.env.DUITKU_API_KEY || '78cb96d8cb9ea9dc40d1c77068a659f6',
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
 * Generate signature for Duitku API request
 * Formula: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
 */
export function generateDuitkuSignature(
  merchantOrderId: string,
  paymentAmount: number
): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  const signatureString = `${merchantCode}${merchantOrderId}${paymentAmount}${apiKey}`
  return crypto.createHash('md5').update(signatureString).digest('hex')
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
  const { merchantCode, baseUrl, returnUrl, callbackUrl } = DUITKU_CONFIG
  const signature = generateDuitkuSignature(data.merchantOrderId, data.paymentAmount)
  
  const requestBody = {
    merchantCode,
    paymentAmount: data.paymentAmount,
    merchantOrderId: data.merchantOrderId,
    productDetails: data.productDetails,
    email: data.email,
    phoneNumber: data.phoneNumber,
    customerVaName: data.customerName,
    callbackUrl,
    returnUrl,
    signature,
    expiryPeriod: 60, // 60 minutes expiry
  }

  try {
    const response = await fetch(`${baseUrl}/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Duitku API Error: ${error.message || response.statusText}`)
    }

    const result = await response.json()
    return {
      success: true,
      data: result,
      paymentUrl: result.paymentUrl,
      reference: result.reference,
    }
  } catch (error) {
    console.error('Duitku payment creation error:', error)
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
  const { merchantCode, baseUrl, apiKey } = DUITKU_CONFIG
  const signature = crypto
    .createHash('md5')
    .update(`${merchantCode}${merchantOrderId}${apiKey}`)
    .digest('hex')

  try {
    const response = await fetch(`${baseUrl}/transactionStatus`, {
      method: 'POST',
      headers: {
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
 */
export const DUITKU_STATUS = {
  PENDING: '00', // Payment pending
  SUCCESS: '01', // Payment success
  EXPIRED: '02', // Payment expired
  CANCELLED: '03', // Payment cancelled
} as const

export type DuitkuStatus = typeof DUITKU_STATUS[keyof typeof DUITKU_STATUS]
