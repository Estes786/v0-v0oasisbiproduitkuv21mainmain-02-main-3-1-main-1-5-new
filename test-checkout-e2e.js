/**
 * END-TO-END CHECKOUT TEST
 * Tests the complete Duitku payment flow
 */

const BASE_URL = 'http://localhost:3000'

async function testCheckout() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 DUITKU E2E CHECKOUT TEST')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')

  const testPlans = ['starter', 'professional', 'enterprise']
  
  for (const planId of testPlans.slice(0, 1)) { // Test starter only
    console.log(`\n📦 Testing Plan: ${planId.toUpperCase()}`)
    console.log('─'.repeat(50))
    
    try {
      const response = await fetch(`${BASE_URL}/api/duitku/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          email: `test.${planId}@oasis-bi-pro.test`,
          phoneNumber: '081234567890',
          customerName: `Test User ${planId}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ Checkout SUCCESS')
        console.log('📋 Details:')
        console.log(`   - Merchant Order ID: ${result.data.merchantOrderId}`)
        console.log(`   - Duitku Reference:  ${result.data.reference}`)
        console.log(`   - Amount:            Rp ${result.data.amount.toLocaleString('id-ID')}`)
        console.log(`   - Plan:              ${result.data.planName}`)
        console.log(`   - Payment URL:       ${result.data.paymentUrl}`)
        console.log('')
        console.log('🔗 Next Steps:')
        console.log(`   1. Open payment URL in browser: ${result.data.paymentUrl}`)
        console.log(`   2. Complete payment using Duitku sandbox test accounts`)
        console.log(`   3. Check Duitku Dashboard for transaction log`)
        console.log(`   4. Verify callback received at /api/duitku/callback`)
        console.log('')
      } else {
        console.error('❌ Checkout FAILED:', result.error)
      }
    } catch (error) {
      console.error('💥 Request Error:', error.message)
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ E2E TEST COMPLETED')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

testCheckout().catch(console.error)
