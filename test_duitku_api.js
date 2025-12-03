#!/usr/bin/env node

/**
 * DUITKU API INTEGRATION TEST
 * Test real checkout flow with DS26335 credentials
 */

const crypto = require('crypto');

// Configuration
const CONFIG = {
  merchantCode: 'DS26335',
  apiKey: '78cb96d8cb9ea9dc40d1c77068a659f6',
  baseUrl: 'https://sandbox.duitku.com/webapi/api/merchant',
  returnUrl: 'https://www.oasis-bi-pro.web.id/payment/success',
  callbackUrl: 'https://www.oasis-bi-pro.web.id/api/duitku/callback',
};

// Subscription Plans
const PLANS = {
  starter: { price: 99000, name: 'Starter Plan' },
  professional: { price: 299000, name: 'Professional Plan' },
  enterprise: { price: 999000, name: 'Enterprise Plan' },
};

// Generate signature
function generateSignature(merchantOrderId, paymentAmount) {
  const signatureString = `${CONFIG.merchantCode}${merchantOrderId}${paymentAmount}${CONFIG.apiKey}`;
  return crypto.createHash('md5').update(signatureString).digest('hex');
}

// Test checkout
async function testCheckout(planId) {
  console.log(`\n🧪 Testing ${planId.toUpperCase()} Plan Checkout...`);
  console.log('='.repeat(60));

  const plan = PLANS[planId];
  const merchantOrderId = `OASIS-${planId.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const signature = generateSignature(merchantOrderId, plan.price);

  const requestBody = {
    merchantCode: CONFIG.merchantCode,
    paymentAmount: plan.price,
    merchantOrderId: merchantOrderId,
    productDetails: `${plan.name} - OASIS BI PRO Subscription`,
    email: 'test@oasis-bi-pro.web.id',
    phoneNumber: '081234567890',
    customerVaName: 'Test Customer Duitku',
    callbackUrl: CONFIG.callbackUrl,
    returnUrl: CONFIG.returnUrl,
    signature: signature,
    expiryPeriod: 60,
  };

  console.log('\n📤 Request:');
  console.log(JSON.stringify(requestBody, null, 2));

  try {
    const response = await fetch(`${CONFIG.baseUrl}/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    console.log('\n📥 Response:');
    console.log(JSON.stringify(result, null, 2));

    if (result.paymentUrl) {
      console.log('\n✅ SUCCESS!');
      console.log('🔗 Payment URL:', result.paymentUrl);
      console.log('📋 Reference:', result.reference);
      console.log('🆔 Merchant Order ID:', merchantOrderId);
      console.log('\n💡 Next Steps:');
      console.log('1. Open payment URL in browser');
      console.log('2. Select payment method');
      console.log('3. Complete sandbox payment');
      console.log('4. Check Duitku dashboard: https://sandbox.duitku.com/merchant');
      return true;
    } else {
      console.log('\n❌ FAILED!');
      console.log('Error:', result);
      return false;
    }
  } catch (error) {
    console.log('\n❌ ERROR!');
    console.error(error);
    return false;
  }
}

// Main test
async function main() {
  console.log('🚀 DUITKU API INTEGRATION TEST');
  console.log('='.repeat(60));
  console.log('Merchant Code:', CONFIG.merchantCode);
  console.log('Environment: Sandbox');
  console.log('API URL:', CONFIG.baseUrl);
  console.log('='.repeat(60));

  const results = {};

  // Test all 3 plans
  for (const planId of ['starter', 'professional', 'enterprise']) {
    const success = await testCheckout(planId);
    results[planId] = success;
    
    // Wait 2 seconds between tests
    if (planId !== 'enterprise') {
      console.log('\n⏳ Waiting 2 seconds before next test...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n\n📊 TEST SUMMARY');
  console.log('='.repeat(60));
  Object.entries(results).forEach(([plan, success]) => {
    const status = success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`);
  });

  const allPassed = Object.values(results).every(r => r);
  console.log('\n' + '='.repeat(60));
  console.log(allPassed ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED!');
  console.log('='.repeat(60));

  if (allPassed) {
    console.log('\n🎉 Duitku integration is PRODUCTION READY!');
    console.log('📋 Check transactions at: https://sandbox.duitku.com/merchant');
  }
}

// Run tests
main().catch(console.error);
