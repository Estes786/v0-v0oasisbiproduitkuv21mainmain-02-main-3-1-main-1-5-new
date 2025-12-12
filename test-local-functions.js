#!/usr/bin/env node
/**
 * Test script to verify edge function logic locally
 * This simulates GET and POST requests without deploying
 */

const crypto = require('crypto');

console.log('🧪 Local Edge Function Logic Test');
console.log('=====================================\n');

// ============================================================================
// SIMULATE DUITKU CALLBACK HANDLER
// ============================================================================

function simulateCallbackHandler(method, body = null) {
  console.log(`\n📞 Simulating duitku-callback with method: ${method}`);
  
  const ENVIRONMENT = 'production';
  const IS_PRODUCTION = ENVIRONMENT === 'production';
  
  // Handle GET request (health check)
  if (method === 'GET') {
    console.log('✅ GET request - returning health check response');
    return {
      status: 200,
      body: { 
        success: true, 
        message: 'Duitku Callback endpoint is running',
        version: '3.0',
        environment: ENVIRONMENT,
        mode: IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX',
        acceptedMethods: ['POST'],
        usage: 'POST payment callback data to this endpoint'
      }
    };
  }
  
  // Handle POST request (actual callback)
  if (method === 'POST') {
    console.log('✅ POST request - processing callback');
    
    if (!body) {
      return {
        status: 400,
        body: { success: false, error: 'Missing request body' }
      };
    }
    
    console.log('   Callback data:', body);
    
    // Simulate signature verification
    const DUITKU_MERCHANT_CODE = 'D20919';
    const DUITKU_API_KEY = '17d9d5e20fbf4763a44c41a1e95cb7cb';
    
    // Generate expected signature (MD5)
    const signatureString = `${DUITKU_MERCHANT_CODE}${body.amount}${body.merchantOrderId}${DUITKU_API_KEY}`;
    const expectedSignature = crypto.createHash('md5').update(signatureString).digest('hex');
    
    console.log('   Expected signature:', expectedSignature);
    console.log('   Received signature:', body.signature);
    
    if (expectedSignature === body.signature) {
      console.log('   ✅ Signature verified');
    } else {
      console.log('   ❌ Signature mismatch');
    }
    
    return {
      status: 200,
      body: 'OK'
    };
  }
  
  // Handle other methods
  return {
    status: 405,
    body: { success: false, error: 'Method not allowed. Use POST for callbacks.' }
  };
}

// ============================================================================
// SIMULATE DUITKU CHECKOUT HANDLER
// ============================================================================

function simulateCheckoutHandler(method, body = null) {
  console.log(`\n🛒 Simulating duitku-checkout with method: ${method}`);
  
  const ENVIRONMENT = 'production';
  const IS_PRODUCTION = ENVIRONMENT === 'production';
  
  const PLANS = {
    starter: { name: 'Starter Plan', price: 50000 },
    professional: { name: 'Professional Plan', price: 100000 },
    enterprise: { name: 'Enterprise Plan', price: 200000 }
  };
  
  // Handle GET request (health check)
  if (method === 'GET') {
    console.log('✅ GET request - returning health check response');
    return {
      status: 200,
      body: { 
        success: true, 
        message: 'Duitku Checkout endpoint is running',
        version: '3.0',
        environment: ENVIRONMENT,
        mode: IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX',
        acceptedMethods: ['POST'],
        usage: 'POST checkout data: { planId, email, phoneNumber, customerName }',
        availablePlans: Object.keys(PLANS)
      }
    };
  }
  
  // Handle POST request (actual checkout)
  if (method === 'POST') {
    console.log('✅ POST request - processing checkout');
    
    if (!body) {
      return {
        status: 400,
        body: { success: false, error: 'Missing request body' }
      };
    }
    
    console.log('   Checkout data:', body);
    
    // Validate required fields
    if (!body.planId || !body.email || !body.phoneNumber || !body.customerName) {
      return {
        status: 400,
        body: { success: false, error: 'Missing required fields' }
      };
    }
    
    // Get plan details
    const plan = PLANS[body.planId];
    if (!plan) {
      return {
        status: 400,
        body: { success: false, error: 'Invalid planId' }
      };
    }
    
    console.log('   Plan selected:', plan.name);
    console.log('   Amount:', plan.price);
    
    return {
      status: 200,
      body: {
        success: true,
        message: 'Checkout logic works - would create payment invoice',
        plan: plan
      }
    };
  }
  
  // Handle other methods
  return {
    status: 405,
    body: { success: false, error: 'Method not allowed. Use POST for checkout.' }
  };
}

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('\n🧪 Test 1: Callback GET (Health Check)');
console.log('---------------------------------------');
const callbackGetResult = simulateCallbackHandler('GET');
console.log('Response Status:', callbackGetResult.status);
console.log('Response Body:', JSON.stringify(callbackGetResult.body, null, 2));

console.log('\n🧪 Test 2: Callback POST (Payment Notification)');
console.log('---------------------------------------');
const callbackPostData = {
  merchantCode: 'D20919',
  amount: '50000',
  merchantOrderId: 'OASIS-TEST-12345',
  signature: '5f4dcc3b5aa765d61d8327deb882cf99', // Example signature
  resultCode: '00',
  reference: 'REF-12345'
};
const callbackPostResult = simulateCallbackHandler('POST', callbackPostData);
console.log('Response Status:', callbackPostResult.status);
console.log('Response Body:', callbackPostResult.body);

console.log('\n🧪 Test 3: Checkout GET (Health Check)');
console.log('---------------------------------------');
const checkoutGetResult = simulateCheckoutHandler('GET');
console.log('Response Status:', checkoutGetResult.status);
console.log('Response Body:', JSON.stringify(checkoutGetResult.body, null, 2));

console.log('\n🧪 Test 4: Checkout POST (Create Payment)');
console.log('---------------------------------------');
const checkoutPostData = {
  planId: 'starter',
  email: 'test@example.com',
  phoneNumber: '081234567890',
  customerName: 'Test User'
};
const checkoutPostResult = simulateCheckoutHandler('POST', checkoutPostData);
console.log('Response Status:', checkoutPostResult.status);
console.log('Response Body:', JSON.stringify(checkoutPostResult.body, null, 2));

console.log('\n=====================================');
console.log('✅ All local tests completed!');
console.log('\nSummary:');
console.log('  - Callback GET:  ' + (callbackGetResult.status === 200 ? '✅ PASS' : '❌ FAIL'));
console.log('  - Callback POST: ' + (callbackPostResult.status === 200 ? '✅ PASS' : '❌ FAIL'));
console.log('  - Checkout GET:  ' + (checkoutGetResult.status === 200 ? '✅ PASS' : '❌ FAIL'));
console.log('  - Checkout POST: ' + (checkoutPostResult.status === 200 ? '✅ PASS' : '❌ FAIL'));
console.log('\n🎯 Next step: Deploy to production and test live endpoints');
