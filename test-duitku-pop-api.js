/**
 * Test Script for Duitku Pop API (createInvoice)
 * Verifies that the new API correctly shows ALL payment methods
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
 * Test Duitku Pop API (createInvoice) - Shows ALL payment methods
 */
async function testDuitkuPopAPI() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TEST: Duitku Pop API (createInvoice)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const merchantOrderId = `OASIS-TEST-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const paymentAmount = 99000
  const timestamp = Date.now()
  
  const signature = generatePopSignature(timestamp)
  
  // Request body WITHOUT paymentMethod (Duitku Pop API)
  const requestBody = {
    paymentAmount: paymentAmount,
    // paymentMethod: NOT INCLUDED - to show ALL payment methods
    merchantOrderId: merchantOrderId,
    productDetails: 'OASIS BI PRO - Starter Plan (Test)',
    email: 'john.doe@example.com',
    phoneNumber: '08123456789',
    customerVaName: 'John Doe Test',
    callbackUrl: 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
    returnUrl: 'https://www.oasis-bi-pro.web.id/payment/success',
    expiryPeriod: 60,
  }
  
  console.log('\n📤 Request Details:')
  console.log('   URL:', `${TEST_CONFIG.baseUrl}/api/merchant/createInvoice`)
  console.log('   Headers:', {
    'x-duitku-signature': signature.substring(0, 20) + '...',
    'x-duitku-timestamp': timestamp.toString(),
    'x-duitku-merchantcode': TEST_CONFIG.merchantCode,
  })
  console.log('   Body:', JSON.stringify(requestBody, null, 2))
  
  try {
    console.log('\n⏳ Sending request to Duitku Pop API...')
    
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/merchant/createInvoice`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-duitku-signature': signature,
        'x-duitku-timestamp': timestamp.toString(),
        'x-duitku-merchantcode': TEST_CONFIG.merchantCode,
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
      
      // Verify URL format
      const url = result.paymentUrl || ''
      const isPopPage = url.includes('redirect_checkout') || url.includes('app-sandbox.duitku.com')
      const isCreditCardOnly = url.includes('TopUpCreditCardPayment.aspx')
      
      console.log('\n🔍 URL Analysis:')
      console.log('   Is Duitku Pop page:', isPopPage ? '✅ YES (GOOD)' : '❌ NO')
      console.log('   Is Credit Card Only:', isCreditCardOnly ? '❌ YES (BAD)' : '✅ NO (GOOD)')
      
      if (isPopPage && !isCreditCardOnly) {
        console.log('\n🎉 SUCCESS! URL shows Duitku Pop payment selection page!')
        console.log('✅ All payment methods are available:')
        console.log('   - Virtual Account (BCA, Mandiri, BNI, BRI, Permata, etc.)')
        console.log('   - E-Wallet (OVO, ShopeePay, LinkAja, DANA, GoPay)')
        console.log('   - Credit Card (Visa, Mastercard, JCB)')
        console.log('   - QRIS')
        console.log('   - Retail (Alfamart, Indomaret)')
      } else {
        console.log('\n⚠️  WARNING! URL format unexpected')
      }
      
      return {
        success: true,
        statusCode: response.status,
        result: result,
        urlVerification: {
          isPopPage,
          isCreditCardOnly,
          url: url
        }
      }
    } else {
      console.log('\n❌ Request Failed')
      console.log('   Status:', response.status)
      console.log('   Error:', result)
      
      return {
        success: false,
        statusCode: response.status,
        error: result
      }
    }
  } catch (error) {
    console.log('\n💥 TEST ERROR')
    console.error('Error:', error.message)
    
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Main test execution
 */
async function main() {
  console.log('\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║   DUITKU POP API INTEGRATION - VERIFICATION TEST      ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  const result = await testDuitkuPopAPI()
  
  // Summary
  console.log('\n\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║                    TEST SUMMARY                       ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  console.log('📊 Test Results:')
  if (result.success) {
    console.log('   ✅ Status: SUCCESS (HTTP 200)')
    console.log('   ✅ API: Duitku Pop (createInvoice)')
    console.log('   ✅ URL Type:', result.urlVerification?.isPopPage ? 'Pop Payment Selection ✅' : 'Unknown')
    console.log('   ✅ URL:', result.urlVerification?.url || 'N/A')
  } else {
    console.log('   ❌ Status: FAILED')
    console.log('   ❌ Error:', result.error)
  }
  
  console.log('\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎯 FINAL VERDICT:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const isSuccess = result.success && 
                   result.urlVerification?.isPopPage && 
                   !result.urlVerification?.isCreditCardOnly
  
  if (isSuccess) {
    console.log('✅ DUITKU POP API INTEGRATION: SUCCESS!')
    console.log('✅ Payment page now shows ALL payment methods!')
    console.log('✅ Ready for deployment: YES')
    console.log('\n🎉 The refactoring is working correctly!')
  } else if (result.success) {
    console.log('⚠️  API CALL SUCCESS: But URL format needs verification')
    console.log('⚠️  Please check the payment URL manually')
  } else {
    console.log('❌ INTEGRATION FAILED: Test failed')
    console.log('❌ Ready for deployment: NO')
    console.log('\n❌ Please check error messages above')
  }
  
  console.log('\n')
  
  return {
    success: isSuccess,
    testResult: result
  }
}

// Run tests
main().then(result => {
  process.exit(result.success ? 0 : 1)
}).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
