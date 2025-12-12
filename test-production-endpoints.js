#!/usr/bin/env node
const https = require('https');

console.log('🧪 Testing Production Endpoints');
console.log('=====================================\n');

function testEndpoint(url, name) {
  return new Promise((resolve) => {
    console.log(`Testing ${name}...`);
    console.log(`URL: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log('Response:', JSON.stringify(json, null, 2));
            console.log('✅ PASS\n');
            resolve(true);
          } catch (e) {
            console.log('Response:', data);
            console.log('✅ PASS\n');
            resolve(true);
          }
        } else {
          console.log('Response:', data);
          console.log('❌ FAIL\n');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('❌ Error:', err.message);
      console.log('❌ FAIL\n');
      resolve(false);
    });
  });
}

async function runTests() {
  const checkoutResult = await testEndpoint(
    'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout',
    'duitku-checkout'
  );
  
  const callbackResult = await testEndpoint(
    'https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-callback',
    'duitku-callback'
  );
  
  console.log('=====================================');
  console.log('📊 Test Results:');
  console.log(`  - duitku-checkout: ${checkoutResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  - duitku-callback: ${callbackResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  
  if (checkoutResult && callbackResult) {
    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ HTTP 405 error is FIXED!');
    console.log('✅ Both endpoints are now working!');
  } else {
    console.log('❌ Some tests failed');
  }
}

runTests().catch(console.error);
