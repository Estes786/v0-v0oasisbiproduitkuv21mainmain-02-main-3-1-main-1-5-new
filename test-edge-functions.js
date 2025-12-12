#!/usr/bin/env node
/**
 * Test script for Duitku Edge Functions
 * Tests both checkout and callback endpoints
 */

const axios = require('axios');

// Edge function URLs
const BASE_URL = 'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1';
const CHECKOUT_URL = `${BASE_URL}/duitku-checkout`;
const CALLBACK_URL = `${BASE_URL}/duitku-callback`;

console.log('🧪 Testing Duitku Edge Functions');
console.log('=====================================\n');

async function testHealthCheck(url, name) {
  console.log(`\n🔍 Testing ${name} GET (Health Check)...`);
  console.log(`   URL: ${url}`);
  
  try {
    const response = await axios.get(url);
    console.log(`✅ Status: ${response.status}`);
    console.log(`📋 Response:`, JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    if (error.response) {
      console.log(`❌ Status: ${error.response.status}`);
      console.log(`📋 Response:`, JSON.stringify(error.response.data, null, 2));
    } else {
      console.log(`❌ Error:`, error.message);
    }
    return false;
  }
}

async function testCheckoutPOST() {
  console.log(`\n🛒 Testing Checkout POST (Create Payment)...`);
  console.log(`   URL: ${CHECKOUT_URL}`);
  
  const testData = {
    planId: 'starter',
    email: 'test@example.com',
    phoneNumber: '081234567890',
    customerName: 'Test User'
  };
  
  console.log(`📤 Payload:`, JSON.stringify(testData, null, 2));
  
  try {
    const response = await axios.post(CHECKOUT_URL, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Status: ${response.status}`);
    console.log(`📋 Response:`, JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(`❌ Status: ${error.response.status}`);
      console.log(`📋 Response:`, JSON.stringify(error.response.data, null, 2));
    } else {
      console.log(`❌ Error:`, error.message);
    }
    return null;
  }
}

async function runTests() {
  console.log('⏳ Starting tests...\n');
  
  // Test 1: Checkout Health Check (GET)
  const checkoutHealth = await testHealthCheck(CHECKOUT_URL, 'Checkout');
  
  // Test 2: Callback Health Check (GET)
  const callbackHealth = await testHealthCheck(CALLBACK_URL, 'Callback');
  
  // Test 3: Checkout POST (actual payment creation)
  console.log('\n⚠️  Note: This will create a REAL payment invoice in PRODUCTION mode!');
  console.log('   If you want to test, make sure ENVIRONMENT=sandbox in edge function');
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\n❓ Do you want to test POST checkout? (yes/no): ', async (answer) => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      const checkoutResult = await testCheckoutPOST();
      
      if (checkoutResult && checkoutResult.success) {
        console.log('\n🎉 Payment invoice created successfully!');
        console.log(`   Reference: ${checkoutResult.data.reference}`);
        console.log(`   Payment URL: ${checkoutResult.data.paymentUrl}`);
        console.log(`   Order ID: ${checkoutResult.data.orderId}`);
      }
    } else {
      console.log('\n⏭️  Skipping POST checkout test');
    }
    
    console.log('\n=====================================');
    console.log('✅ Tests completed!');
    console.log('\nSummary:');
    console.log(`  - Checkout health: ${checkoutHealth ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  - Callback health: ${callbackHealth ? '✅ PASS' : '❌ FAIL'}`);
    
    rl.close();
  });
}

runTests().catch(console.error);
