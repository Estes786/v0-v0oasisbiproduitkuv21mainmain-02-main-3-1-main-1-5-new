#!/usr/bin/env node
const https = require('https');

console.log('🛒 Testing Real Checkout Flow (POST)');
console.log('=====================================\n');

const testData = JSON.stringify({
  planId: 'starter',
  email: 'test@oasis-bi-pro.com',
  phoneNumber: '081234567890',
  customerName: 'Test User Sandbox'
});

const options = {
  hostname: 'qjzdzkdwtsszqjvxeiqv.supabase.co',
  port: 443,
  path: '/functions/v1/duitku-checkout',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': testData.length
  }
};

console.log('📤 Sending POST request to create payment invoice...');
console.log('URL:', `https://${options.hostname}${options.path}`);
console.log('Data:', JSON.parse(testData));
console.log('');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📥 Response received:');
    console.log('Status:', res.statusCode);
    console.log('');
    
    try {
      const json = JSON.parse(data);
      console.log('Response Data:', JSON.stringify(json, null, 2));
      console.log('');
      
      if (res.statusCode === 200 && json.success) {
        console.log('✅ Checkout SUCCESS!');
        console.log('');
        console.log('📋 Payment Details:');
        console.log(`   Order ID: ${json.data.orderId}`);
        console.log(`   Reference: ${json.data.reference}`);
        console.log(`   Amount: Rp ${json.data.amount}`);
        console.log(`   Payment URL: ${json.data.paymentUrl}`);
        console.log('');
        console.log('🎉 Real transaction created successfully!');
        console.log('⚠️  This is a PRODUCTION transaction!');
      } else {
        console.log('❌ Checkout failed');
        console.log('Error:', json.error || json.statusMessage);
      }
    } catch (e) {
      console.log('Raw response:', data);
      console.log('Parse error:', e.message);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.write(testData);
req.end();
