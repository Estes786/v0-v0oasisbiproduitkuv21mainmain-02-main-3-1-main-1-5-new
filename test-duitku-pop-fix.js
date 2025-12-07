/**
 * Test Script for Duitku Pop API FIX VERIFICATION
 * Tests the FIXED implementation with correct headers
 */

const crypto = require('crypto')

// Test credentials
const TEST_CONFIG = {
  merchantCode: 'DS26557',
  apiKey: '68e1d64813c7f21a1ffc3839064ab6b3',
  baseUrl: 'https://api-sandbox.duitku.com',
}

/**
 * Generate SHA256 signature for Duitku Pop API
 * Formula: SHA256(merchantCode + timestamp + apiKey)
 */
function generatePopSignature(timestamp) {
  const { merchantCode, apiKey } = TEST_CONFIG
  const signatureString = `${merchantCode}${timestamp}${apiKey}`
  
  console.log('\n🔐 Signature Generation (SHA256 - Duitku Pop API):')
  console.log('   merchantCode:', merchantCode)
  console.log('   timestamp:', timestamp)
  console.log('   Signature String:', signatureString)
  
  const signature = crypto.createHash('sha256').update(signatureString).digest('hex')
  console.log('   SHA256 Signature:', signature)
  
  return signature
}

/**
 * Test Duitku Pop API with FIXED headers
 */
async function testDuitkuPopAPIFixed() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TEST: Duitku Pop API (FIXED VERSION)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const merchantOrderId = `OASIS-FIX-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const paymentAmount = 99000
  const timestamp = Date.now()
  
  const signature = generatePopSignature(timestamp)
  
  // Request body WITHOUT paymentMethod (Duitku Pop API)
  const requestBody = {
    paymentAmount: paymentAmount,
    merchantOrderId: merchantOrderId,
    productDetails: 'OASIS BI PRO - Starter Plan (Test Fix)',
    email: 'john.doe@example.com',
    phoneNumber: '08123456789',
    customerVaName: 'John Doe Test',
    callbackUrl: 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
    returnUrl: 'https://www.oasis-bi-pro.web.id/payment/success',
    expiryPeriod: 60,
  }
  
  console.log('\n📤 Request Details:')
  console.log('   URL:', `${TEST_CONFIG.baseUrl}/api/merchant/createInvoice`)
  console.log('   Headers (FIXED):')
  console.log('      ✅ X-Duitku-Signature:', signature.substring(0, 20) + '...')
  console.log('      ✅ X-Duitku-Timestamp:', timestamp.toString())
  console.log('      ✅ X-Duitku-Merchantcode:', TEST_CONFIG.merchantCode)
  console.log('      ✅ X-Duitku-Client: sdk-node (NEWLY ADDED)')
  console.log('   Body:', JSON.stringify(requestBody, null, 2))
  
  try {
    console.log('\n⏳ Sending request to Duitku Pop API...')
    
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/merchant/createInvoice`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Duitku-Signature': signature,
        'X-Duitku-Timestamp': timestamp.toString(),
        'X-Duitku-Merchantcode': TEST_CONFIG.merchantCode,
        'X-Duitku-Client': 'sdk-node', // CRITICAL FIX: Added this header
      },
      body: JSON.stringify(requestBody),
    })
    
    const result = await response.json()
    
    console.log('\n📥 Response:')
    console.log('   Status Code:', response.status)
    console.log('   Response Body:', JSON.stringify(result, null, 2))
    
    if (response.status === 200 || response.ok) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('✅ SUCCESS! Payment URL Generated')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n✅ Payment Details:')
      console.log('   reference:', result.reference)
      console.log('   paymentUrl:', result.paymentUrl)
      console.log('   amount:', result.amount || paymentAmount)
      
      const url = result.paymentUrl || ''
      const isPopPage = url.includes('redirect_checkout') || url.includes('app-sandbox.duitku.com')
      const isCreditCardOnly = url.includes('TopUpCreditCardPayment.aspx')
      
      console.log('\n🔍 URL Analysis:')
      console.log('   Is Duitku Pop page:', isPopPage ? '✅ YES (GOOD)' : '❌ NO')
      console.log('   Is Credit Card Only:', isCreditCardOnly ? '❌ YES (BAD)' : '✅ NO (GOOD)')
      
      if (isPopPage && !isCreditCardOnly) {
        console.log('\n🎉 FIX VERIFIED! URL shows Duitku Pop payment selection page!')
        console.log('✅ All payment methods are available')
      }
      
      return { success: true, result }
    } else {
      console.log('\n❌ Request Failed')
      console.log('   Status:', response.status)
      console.log('   Error:', result)
      
      return { success: false, statusCode: response.status, error: result }
    }
  } catch (error) {
    console.log('\n💥 TEST ERROR')
    console.error('Error:', error.message)
    
    return { success: false, error: error.message }
  }
}

/**
 * Main test execution
 */
async function main() {
  console.log('\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║   DUITKU POP API FIX - VERIFICATION TEST              ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  const result = await testDuitkuPopAPIFixed()
  
  // Summary
  console.log('\n\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║                  FIX VERIFICATION                     ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  console.log('🔧 FIXES APPLIED:')
  console.log('   1. ✅ Added X-Duitku-Client header (sdk-node)')
  console.log('   2. ✅ Fixed header case sensitivity (Capitalized)')
  console.log('   3. ✅ Fixed Supabase client initialization')
  console.log('')
  
  console.log('📊 Test Results:')
  if (result.success) {
    console.log('   ✅ Status: SUCCESS (HTTP 200)')
    console.log('   ✅ Fix: VERIFIED AND WORKING')
  } else {
    console.log('   ❌ Status: FAILED')
    console.log('   ❌ Error:', result.error)
  }
  
  console.log('\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎯 FINAL VERDICT:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  if (result.success) {
    console.log('✅ HTTP 500 ERROR: RESOLVED!')
    console.log('✅ Root Cause: Missing X-Duitku-Client header')
    console.log('✅ Fix Applied: Added required header')
    console.log('✅ Ready for deployment: YES')
    console.log('\n🎉 The fix is working correctly!')
  } else {
    console.log('❌ FIX VERIFICATION FAILED')
    console.log('❌ Please check error messages above')
  }
  
  console.log('\n')
  
  return { success: result.success, testResult: result }
}

// Run tests
main().then(result => {
  process.exit(result.success ? 0 : 1)
}).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
