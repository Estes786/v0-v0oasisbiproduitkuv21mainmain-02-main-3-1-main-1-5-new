#!/bin/bash

# ============================================================================
# TEST PRODUCTION EDGE FUNCTIONS
# ============================================================================
# This script tests the deployed edge functions in production
# ============================================================================

echo "🧪 Testing Production Edge Functions"
echo "======================================"
echo ""

BASE_URL="https://qjzdzkdwtsszqjvxeiqv.supabase.co/functions/v1"
CHECKOUT_URL="$BASE_URL/duitku-checkout"
CALLBACK_URL="$BASE_URL/duitku-callback"

# ============================================================================
# Test 1: Checkout Health Check (GET)
# ============================================================================
echo "🔍 Test 1: Checkout GET (Health Check)"
echo "--------------------------------------"
echo "URL: $CHECKOUT_URL"
echo ""

checkout_response=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$CHECKOUT_URL")
checkout_http_code=$(echo "$checkout_response" | grep "HTTP_CODE:" | cut -d: -f2)
checkout_body=$(echo "$checkout_response" | sed '/HTTP_CODE:/d')

echo "Response Code: $checkout_http_code"
echo "Response Body:"
echo "$checkout_body" | jq . 2>/dev/null || echo "$checkout_body"
echo ""

if [ "$checkout_http_code" = "200" ]; then
    echo "✅ Test 1 PASSED: Checkout health check returns 200"
else
    echo "❌ Test 1 FAILED: Expected 200, got $checkout_http_code"
fi

echo ""
echo ""

# ============================================================================
# Test 2: Callback Health Check (GET)
# ============================================================================
echo "🔍 Test 2: Callback GET (Health Check)"
echo "--------------------------------------"
echo "URL: $CALLBACK_URL"
echo ""

callback_response=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$CALLBACK_URL")
callback_http_code=$(echo "$callback_response" | grep "HTTP_CODE:" | cut -d: -f2)
callback_body=$(echo "$callback_response" | sed '/HTTP_CODE:/d')

echo "Response Code: $callback_http_code"
echo "Response Body:"
echo "$callback_body" | jq . 2>/dev/null || echo "$callback_body"
echo ""

if [ "$callback_http_code" = "200" ]; then
    echo "✅ Test 2 PASSED: Callback health check returns 200"
else
    echo "❌ Test 2 FAILED: Expected 200, got $callback_http_code"
fi

echo ""
echo ""

# ============================================================================
# Summary
# ============================================================================
echo "======================================"
echo "📊 Test Summary"
echo "======================================"
echo ""

total_tests=2
passed_tests=0

if [ "$checkout_http_code" = "200" ]; then
    passed_tests=$((passed_tests + 1))
fi

if [ "$callback_http_code" = "200" ]; then
    passed_tests=$((passed_tests + 1))
fi

echo "Total Tests: $total_tests"
echo "Passed: $passed_tests"
echo "Failed: $((total_tests - passed_tests))"
echo ""

if [ $passed_tests -eq $total_tests ]; then
    echo "🎉 ALL TESTS PASSED!"
    echo ""
    echo "✅ The HTTP 405 issue is FIXED!"
    echo "✅ Both endpoints now properly respond to GET requests"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Test actual payment creation (POST to checkout)"
    echo "   2. Complete a real transaction"
    echo "   3. Verify callback is received"
    echo ""
    exit 0
else
    echo "⚠️  SOME TESTS FAILED"
    echo ""
    echo "Possible reasons:"
    echo "   1. Functions not deployed yet"
    echo "   2. Deployment still propagating (wait 1-2 minutes)"
    echo "   3. Different code version deployed"
    echo ""
    echo "📝 To fix:"
    echo "   1. Deploy functions using deploy-now.sh"
    echo "   2. Or use Supabase Dashboard to upload new versions"
    echo "   3. Wait 1-2 minutes and run this test again"
    echo ""
    exit 1
fi
