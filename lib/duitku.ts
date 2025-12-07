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
// IMPORTANT: Using Duitku Pop API for payment method selection
export const DUITKU_CONFIG = {
  merchantCode: process.env.NEXT_PUBLIC_DUITKU_MERCHANT_CODE || 'DS26557',
  apiKey: process.env.DUITKU_API_KEY || '68e1d64813c7f21a1ffc3839064ab6b3',
  environment: process.env.NEXT_PUBLIC_DUITKU_ENV || 'sandbox',
  // Duitku Pop API base URL (different from v2/inquiry)
  baseUrl: process.env.NEXT_PUBLIC_DUITKU_API_URL || 'https://api-sandbox.duitku.com',
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
 * Generate signature for Duitku Pop API (createInvoice)
 * Formula: SHA256(merchantCode + timestamp + apiKey)
 * NOTE: Used in REQUEST HEADERS (x-duitku-signature), timestamp in milliseconds
 * Official Docs: https://docs.duitku.com/pop/en/
 */
export function generatePopSignature(timestamp: number): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  // CRITICAL: SHA256 hash with timestamp (milliseconds)
  const signatureString = `${merchantCode}${timestamp}${apiKey}`
  return crypto.createHash('sha256').update(signatureString).digest('hex')
}

/**
 * DEPRECATED: Old v2/inquiry signature function - kept for reference
 * Generate signature for Duitku Transaction Request (v2/inquiry API)
 * Formula: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
 */
export function generateTransactionSignature(
  merchantOrderId: string,
  paymentAmount: number
): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
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
  
  // Generate timestamp in milliseconds (UNIX timestamp)
  const timestamp = Date.now()
  
  // CRITICAL: Generate SHA256 signature for HEADERS (Duitku Pop API)
  const signature = generatePopSignature(timestamp)
  
  console.log('🔐 Signature Generation (SHA256 - Duitku Pop API):')
  console.log('   Merchant Code:', merchantCode)
  console.log('   API Key:', apiKey ? (apiKey.substring(0, 10) + '...') : '❌ MISSING')
  console.log('   Timestamp:', timestamp)
  console.log('   Signature String:', `${merchantCode}${timestamp}${apiKey}`)
  console.log('   Signature (SHA256):', signature)
  
  // Request body for Duitku Pop API (createInvoice)
  // IMPORTANT: NO paymentMethod parameter - this allows ALL payment methods to be displayed
  const requestBody = {
    paymentAmount: data.paymentAmount,
    // paymentMethod: NOT INCLUDED - to show ALL payment methods
    merchantOrderId: data.merchantOrderId,
    productDetails: data.productDetails,
    email: data.email,
    phoneNumber: data.phoneNumber,
    customerVaName: data.customerName,
    callbackUrl,
    returnUrl,
    expiryPeriod: 60, // 60 minutes expiry
  }

  try {
    const endpoint = `${baseUrl}/api/merchant/createInvoice`
    console.log('📤 Sending request to:', endpoint)
    console.log('📤 Request headers:', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Duitku-Signature': signature.substring(0, 20) + '...',
      'X-Duitku-Timestamp': timestamp.toString(),
      'X-Duitku-Merchantcode': merchantCode,
      'X-Duitku-Client': 'sdk-node',
    })
    console.log('📤 Request body:', requestBody)
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Duitku-Signature': signature,
        'X-Duitku-Timestamp': timestamp.toString(),
        'X-Duitku-Merchantcode': merchantCode,
        'X-Duitku-Client': 'sdk-node', // CRITICAL: Required by Duitku Pop API
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
    console.log('✅ Expected URL format: https://app-sandbox.duitku.com/redirect_checkout?reference=...')
    console.log('✅ This URL will show ALL payment methods (VA, E-Wallet, Credit Card, QRIS, Retail)')
    
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
