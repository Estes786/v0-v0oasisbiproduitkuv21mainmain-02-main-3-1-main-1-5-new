/**
 * Test Script for Payment Method Display Fix
 * Verifies that paymentMethod parameter is removed to show ALL payment options
 */

const crypto = require('crypto')

// Test credentials
const TEST_CONFIG = {
  merchantCode: 'DS26557',
  apiKey: '68e1d64813c7f21a1ffc3839064ab6b3',
  baseUrl: 'https://sandbox.duitku.com/webapi/api/merchant',
}

/**
 * Generate MD5 signature
 */
function generateSignature(merchantOrderId, paymentAmount) {
  const { merchantCode, apiKey } = TEST_CONFIG
  const signatureString = `${merchantCode}${merchantOrderId}${paymentAmount}${apiKey}`
  
  console.log('\n🔐 Signature Generation:')
  console.log('   merchantCode:', merchantCode)
  console.log('   merchantOrderId:', merchantOrderId)
  console.log('   paymentAmount:', paymentAmount)
  console.log('   Signature String:', signatureString)
  
  const signature = crypto.createHash('md5').update(signatureString).digest('hex')
  console.log('   MD5 Signature:', signature)
  
  return signature
}

/**
 * Test WITHOUT paymentMethod parameter (should show ALL payment options)
 */
async function testWithoutPaymentMethod() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TEST: WITHOUT paymentMethod Parameter')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const merchantOrderId = `OASIS-TEST-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const paymentAmount = 99000
  
  const signature = generateSignature(merchantOrderId, paymentAmount)
  
  // Request body WITHOUT paymentMethod
  const requestBody = {
    merchantCode: TEST_CONFIG.merchantCode,
    paymentAmount: paymentAmount,
    // paymentMethod: NOT INCLUDED - to show ALL payment methods
    merchantOrderId: merchantOrderId,
    productDetails: 'OASIS BI PRO - Starter Plan (Test)',
    email: 'john.doe@example.com',
    phoneNumber: '08123456789',
    customerVaName: 'John Doe Test',
    callbackUrl: 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
    returnUrl: 'https://www.oasis-bi-pro.web.id/payment/success',
    signature: signature,
    expiryPeriod: 60,
  }
  
  console.log('\n📤 Request Details:')
  console.log('   URL:', `${TEST_CONFIG.baseUrl}/v2/inquiry`)
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
    console.log('   Response Body:', JSON.stringify(result, null, 2))
    
    if (response.status === 200) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('✅ SUCCESS! Payment URL Generated')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n✅ Payment Details:')
      console.log('   reference:', result.reference)
      console.log('   paymentUrl:', result.paymentUrl)
      console.log('   amount:', result.amount)
      
      // Verify URL does NOT contain TopUpCreditCardPayment.aspx
      const url = result.paymentUrl || ''
      const isCreditCardOnly = url.includes('TopUpCreditCardPayment.aspx')
      const isGenericPage = url.includes('transaction/v2/Payment') || url.includes('transaction/Payment')
      
      console.log('\n🔍 URL Analysis:')
      console.log('   Contains TopUpCreditCardPayment.aspx:', isCreditCardOnly ? '❌ YES (BAD)' : '✅ NO (GOOD)')
      console.log('   Contains generic Payment page:', isGenericPage ? '✅ YES (GOOD)' : '⚠️  NO')
      
      if (!isCreditCardOnly) {
        console.log('\n🎉 SUCCESS! URL shows generic payment selection page!')
        console.log('✅ All payment methods (VA, E-Wallet, Credit Card) should be available')
      } else {
        console.log('\n⚠️  WARNING! URL still points to Credit Card only page')
      }
      
      return {
        success: true,
        statusCode: response.status,
        result: result,
        urlVerification: {
          isCreditCardOnly,
          isGenericPage,
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
 * Test WITH paymentMethod parameter (for comparison)
 */
async function testWithPaymentMethod() {
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TEST: WITH paymentMethod Parameter (For Comparison)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const merchantOrderId = `OASIS-TEST-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const paymentAmount = 99000
  
  const signature = generateSignature(merchantOrderId, paymentAmount)
  
  // Request body WITH paymentMethod = VC
  const requestBody = {
    merchantCode: TEST_CONFIG.merchantCode,
    paymentAmount: paymentAmount,
    paymentMethod: 'VC',  // Credit Card
    merchantOrderId: merchantOrderId,
    productDetails: 'OASIS BI PRO - Starter Plan (Test)',
    email: 'john.doe@example.com',
    phoneNumber: '08123456789',
    customerVaName: 'John Doe Test',
    callbackUrl: 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
    returnUrl: 'https://www.oasis-bi-pro.web.id/payment/success',
    signature: signature,
    expiryPeriod: 60,
  }
  
  console.log('\n📤 Request Details:')
  console.log('   paymentMethod: VC (Credit Card)')
  
  try {
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
    
    if (response.status === 200) {
      const url = result.paymentUrl || ''
      const isCreditCardOnly = url.includes('TopUpCreditCardPayment.aspx')
      
      console.log('\n🔍 URL Analysis:')
      console.log('   paymentUrl:', url)
      console.log('   Contains TopUpCreditCardPayment.aspx:', isCreditCardOnly ? '✅ YES (Expected)' : '❌ NO')
      
      return {
        success: true,
        statusCode: response.status,
        result: result,
        urlVerification: {
          isCreditCardOnly,
          url: url
        }
      }
    } else {
      console.log('   Status:', response.status)
      return {
        success: false,
        statusCode: response.status,
        error: result
      }
    }
  } catch (error) {
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
  console.log('║   PAYMENT METHOD DISPLAY FIX - VERIFICATION TEST      ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  // Test 1: WITHOUT paymentMethod (NEW behavior - should show ALL methods)
  const resultWithout = await testWithoutPaymentMethod()
  
  // Test 2: WITH paymentMethod (OLD behavior - for comparison)
  const resultWith = await testWithPaymentMethod()
  
  // Summary
  console.log('\n\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║                    TEST SUMMARY                       ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  console.log('📊 Test Results:')
  console.log('\n1️⃣  WITHOUT paymentMethod Parameter (NEW):')
  if (resultWithout.success) {
    console.log('   ✅ Status: SUCCESS (HTTP 200)')
    console.log('   ✅ URL Type:', resultWithout.urlVerification?.isCreditCardOnly ? 'Credit Card Only ❌' : 'Generic Payment Page ✅')
    console.log('   ✅ URL:', resultWithout.urlVerification?.url || 'N/A')
  } else {
    console.log('   ❌ Status: FAILED')
  }
  
  console.log('\n2️⃣  WITH paymentMethod=VC Parameter (OLD):')
  if (resultWith.success) {
    console.log('   ✅ Status: SUCCESS (HTTP 200)')
    console.log('   ✅ URL Type:', resultWith.urlVerification?.isCreditCardOnly ? 'Credit Card Only (Expected)' : 'Generic Page')
    console.log('   ✅ URL:', resultWith.urlVerification?.url || 'N/A')
  } else {
    console.log('   ❌ Status: FAILED')
  }
  
  console.log('\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎯 FINAL VERDICT:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const fixWorked = resultWithout.success && 
                   !resultWithout.urlVerification?.isCreditCardOnly
  
  if (fixWorked) {
    console.log('✅ FIX VERIFIED: Payment page now shows ALL payment methods!')
    console.log('✅ Ready for deployment: YES')
    console.log('\n🎉 The fix is working correctly!')
  } else if (resultWithout.success && resultWithout.urlVerification?.isCreditCardOnly) {
    console.log('⚠️  FIX PARTIAL: API call successful but still showing Credit Card only')
    console.log('⚠️  May need additional investigation')
  } else {
    console.log('❌ FIX INCOMPLETE: Test failed')
    console.log('❌ Ready for deployment: NO')
  }
  
  console.log('\n')
  
  return {
    success: fixWorked,
    testResults: {
      without: resultWithout,
      with: resultWith
    }
  }
}

// Run tests
main().then(result => {
  process.exit(result.success ? 0 : 1)
}).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
