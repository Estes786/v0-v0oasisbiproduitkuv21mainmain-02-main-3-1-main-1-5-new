/**
 * Test Script for Duitku HTTP 401 Fix
 * Tests the corrected signature implementation
 */

const crypto = require('crypto')

// Test credentials from user
const TEST_CONFIG = {
  merchantCode: 'DS26557',
  apiKey: '68e1d64813c7f21a1ffc3839064ab6b3',
  baseUrl: 'https://sandbox.duitku.com/webapi/api/merchant',
}

/**
 * Generate MD5 signature (CORRECT implementation)
 */
function generateCorrectSignature(merchantOrderId, paymentAmount) {
  const { merchantCode, apiKey } = TEST_CONFIG
  const signatureString = `${merchantCode}${merchantOrderId}${paymentAmount}${apiKey}`
  
  console.log('\n🔐 Signature Generation:')
  console.log('   merchantCode:', merchantCode)
  console.log('   merchantOrderId:', merchantOrderId)
  console.log('   paymentAmount:', paymentAmount)
  console.log('   apiKey:', apiKey.substring(0, 10) + '...')
  console.log('   Signature String:', signatureString)
  
  const signature = crypto.createHash('md5').update(signatureString).digest('hex')
  console.log('   MD5 Signature:', signature)
  
  return signature
}

/**
 * Test Duitku payment creation with CORRECT signature
 */
async function testDuitkuPayment() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TESTING DUITKU PAYMENT API WITH FIX')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const merchantOrderId = `OASIS-TEST-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const paymentAmount = 99000
  
  // Generate CORRECT signature
  const signature = generateCorrectSignature(merchantOrderId, paymentAmount)
  
  const requestBody = {
    merchantCode: TEST_CONFIG.merchantCode,
    paymentAmount: paymentAmount,
    paymentMethod: 'VC',  // VC = Credit Card (required parameter)
    merchantOrderId: merchantOrderId,
    productDetails: 'OASIS BI PRO - Starter Plan (Test)',
    email: 'john.doe@example.com',
    phoneNumber: '08123456789',
    customerVaName: 'John Doe Test',
    callbackUrl: 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
    returnUrl: 'https://www.oasis-bi-pro.web.id/payment/success',
    signature: signature,  // CRITICAL: Signature in body!
    expiryPeriod: 60,
  }
  
  console.log('\n📤 Request Details:')
  console.log('   URL:', `${TEST_CONFIG.baseUrl}/v2/inquiry`)
  console.log('   Method: POST')
  console.log('   Headers: Content-Type: application/json')
  console.log('   Body:', JSON.stringify(requestBody, null, 2))
  
  try {
    console.log('\n⏳ Sending request to Duitku...')
    
    const response = await fetch(`${TEST_CONFIG.baseUrl}/v2/inquiry`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    
    const result = await response.json()
    
    console.log('\n📥 Response:')
    console.log('   Status Code:', response.status)
    console.log('   Status Text:', response.statusText)
    console.log('   Response Body:', JSON.stringify(result, null, 2))
    
    if (response.status === 200) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('✅ SUCCESS! HTTP 401 FIX VERIFIED!')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n✅ Payment Details:')
      console.log('   merchantCode:', result.merchantCode)
      console.log('   reference:', result.reference)
      console.log('   paymentUrl:', result.paymentUrl)
      console.log('   vaNumber:', result.vaNumber || 'N/A')
      console.log('   amount:', result.amount)
      console.log('   statusCode:', result.statusCode)
      console.log('   statusMessage:', result.statusMessage)
      
      return {
        success: true,
        statusCode: response.status,
        result: result
      }
    } else if (response.status === 401) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('❌ STILL GETTING HTTP 401 - FIX INCOMPLETE')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n❌ Error Details:', result)
      
      return {
        success: false,
        statusCode: response.status,
        error: result
      }
    } else {
      console.log('\n⚠️  Unexpected Status Code:', response.status)
      console.log('   Response:', result)
      
      return {
        success: false,
        statusCode: response.status,
        error: result
      }
    }
  } catch (error) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('💥 TEST ERROR')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)
    
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Compare OLD vs NEW signature
 */
function compareSignatures() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 SIGNATURE COMPARISON (OLD vs NEW)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const merchantOrderId = 'OASIS-TEST-1733542800000-ABC123'
  const paymentAmount = 99000
  const timestamp = '1733542800000'
  
  // OLD (WRONG) Implementation
  const oldSignatureString = `${TEST_CONFIG.merchantCode}-${timestamp}-${TEST_CONFIG.apiKey}`
  const oldSignature = crypto.createHash('sha256').update(oldSignatureString).digest('hex')
  
  console.log('\n❌ OLD (WRONG) Implementation:')
  console.log('   Algorithm: SHA256')
  console.log('   String:', oldSignatureString)
  console.log('   Signature:', oldSignature)
  
  // NEW (CORRECT) Implementation
  const newSignatureString = `${TEST_CONFIG.merchantCode}${merchantOrderId}${paymentAmount}${TEST_CONFIG.apiKey}`
  const newSignature = crypto.createHash('md5').update(newSignatureString).digest('hex')
  
  console.log('\n✅ NEW (CORRECT) Implementation:')
  console.log('   Algorithm: MD5')
  console.log('   String:', newSignatureString)
  console.log('   Signature:', newSignature)
  
  console.log('\n📝 Key Differences:')
  console.log('   1. Hash: SHA256 → MD5')
  console.log('   2. Separators: Hyphens (-) → None')
  console.log('   3. Parameters: timestamp → merchantOrderId + paymentAmount')
  console.log('   4. Location: Headers → Body')
}

/**
 * Main test execution
 */
async function main() {
  console.log('\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║   DUITKU HTTP 401 FIX - VERIFICATION TEST SUITE      ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  // Step 1: Compare signatures
  compareSignatures()
  
  // Step 2: Test actual API call
  const result = await testDuitkuPayment()
  
  // Step 3: Summary
  console.log('\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║                    TEST SUMMARY                       ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  if (result.success) {
    console.log('✅ TEST RESULT: PASSED')
    console.log('✅ HTTP 401 Error: RESOLVED')
    console.log('✅ Status Code:', result.statusCode)
    console.log('✅ Ready for deployment: YES')
    console.log('\n🎉 The fix is working correctly!')
  } else {
    console.log('❌ TEST RESULT: FAILED')
    console.log('❌ Status Code:', result.statusCode || 'Unknown')
    console.log('❌ Ready for deployment: NO')
    console.log('\n⚠️  Additional debugging required')
  }
  
  console.log('\n')
  
  return result
}

// Run tests
main().then(result => {
  process.exit(result.success ? 0 : 1)
}).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
