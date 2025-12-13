#!/bin/bash

echo "🛒 Testing Real Payment Checkout Flow"
echo "========================================"
echo ""

# Test POST checkout request
curl -X POST https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1/duitku-checkout \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "starter",
    "email": "test@oasis-bi-pro.web.id",
    "phoneNumber": "081234567890",
    "customerName": "Test User GYSS"
  }' | jq .

echo ""
echo "✅ If you see paymentUrl and reference above, checkout is working!"
