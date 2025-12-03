# 🧪 DUITKU CHECKOUT TEST - OASIS BI PRO

## 🎯 Merchant Credentials
- **Merchant Code**: `DS26335`
- **API Key**: `78cb96d8cb9ea9dc40d1c77068a659f6`
- **Environment**: Sandbox
- **Callback URL**: https://www.oasis-bi-pro.web.id/api/duitku/callback
- **Return URL**: https://www.oasis-bi-pro.web.id/payment/success

## 📍 API Endpoint untuk Testing
```
POST https://www.oasis-bi-pro.web.id/api/duitku/checkout
```

## 🧪 Test Case 1: Professional Plan Checkout

### Request Body:
```json
{
  "planId": "professional",
  "customerName": "Test Customer Duitku",
  "email": "test@oasis-bi-pro.web.id",
  "phoneNumber": "081234567890",
  "userId": "test-user-123"
}
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://sandbox.duitku.com/payment/...",
    "reference": "REF-...",
    "merchantOrderId": "OASIS-PROFESSIONAL-...",
    "amount": 299000,
    "planName": "Professional Plan"
  }
}
```

## 🧪 Test Case 2: Starter Plan Checkout

### Request Body:
```json
{
  "planId": "starter",
  "customerName": "Ahmad Starter",
  "email": "ahmad@test.com",
  "phoneNumber": "082345678901",
  "userId": "starter-001"
}
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://sandbox.duitku.com/payment/...",
    "reference": "REF-...",
    "merchantOrderId": "OASIS-STARTER-...",
    "amount": 99000,
    "planName": "Starter Plan"
  }
}
```

## 🧪 Test Case 3: Enterprise Plan Checkout

### Request Body:
```json
{
  "planId": "enterprise",
  "customerName": "PT Enterprise Indonesia",
  "email": "contact@enterprise.co.id",
  "phoneNumber": "087654321098",
  "userId": "enterprise-001"
}
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://sandbox.duitku.com/payment/...",
    "reference": "REF-...",
    "merchantOrderId": "OASIS-ENTERPRISE-...",
    "amount": 999000,
    "planName": "Enterprise Plan"
  }
}
```

## 📝 Testing Steps

### 1. Using cURL:
```bash
# Test Professional Plan
curl -X POST https://www.oasis-bi-pro.web.id/api/duitku/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "professional",
    "customerName": "Test Customer",
    "email": "test@oasis-bi-pro.web.id",
    "phoneNumber": "081234567890",
    "userId": "test-001"
  }'
```

### 2. Using JavaScript (Browser Console):
```javascript
fetch('https://www.oasis-bi-pro.web.id/api/duitku/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    planId: 'professional',
    customerName: 'Test Customer',
    email: 'test@oasis-bi-pro.web.id',
    phoneNumber: '081234567890',
    userId: 'test-001'
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Success:', data);
  if (data.success && data.data.paymentUrl) {
    window.open(data.data.paymentUrl, '_blank');
  }
})
.catch(err => console.error('❌ Error:', err));
```

### 3. Using Postman:
1. Create new POST request
2. URL: `https://www.oasis-bi-pro.web.id/api/duitku/checkout`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON): Copy request body from test cases above
5. Send request
6. Copy `paymentUrl` from response
7. Open `paymentUrl` in browser to complete payment

## ✅ Success Criteria

1. **API Response**: 
   - `success: true`
   - `paymentUrl` returned (Duitku sandbox URL)
   - `reference` returned
   - `merchantOrderId` in format `OASIS-{PLAN}-{TIMESTAMP}-{RANDOM}`

2. **Duitku Sandbox Dashboard**:
   - Transaction appears in https://sandbox.duitku.com/merchant
   - Status: PENDING
   - Amount matches plan price
   - Merchant Order ID matches

3. **Payment Page**:
   - Can open payment URL
   - Shows correct amount
   - Shows merchant name "OASIS BI PRO"
   - Can select payment method

4. **Callback Handling**:
   - After payment, callback received at `/api/duitku/callback`
   - Signature verified correctly
   - Status updated in system

## 🔍 Troubleshooting

### Error: "Missing required fields"
- Ensure all fields are provided: `planId`, `customerName`, `email`, `phoneNumber`

### Error: "Invalid plan ID"
- Only valid plans: `starter`, `professional`, `enterprise`

### Error: "Duitku API Error"
- Check merchant code and API key
- Verify sandbox environment is active
- Check Duitku API status

### No transaction in Duitku dashboard
- Verify merchant credentials
- Check network connectivity
- Review Duitku API logs

## 📊 Subscription Plans

| Plan | Price (IDR) | Duration |
|------|-------------|----------|
| Starter | 99,000 | Monthly |
| Professional | 299,000 | Monthly |
| Enterprise | 999,000 | Monthly |

## 🔗 Useful Links

- **Duitku Sandbox Dashboard**: https://sandbox.duitku.com/merchant
- **Duitku API Docs**: https://docs.duitku.com/
- **Test Payment URL**: Will be generated after checkout
- **Callback Endpoint**: https://www.oasis-bi-pro.web.id/api/duitku/callback
- **Success Page**: https://www.oasis-bi-pro.web.id/payment/success
- **Pricing Page**: https://www.oasis-bi-pro.web.id/pricing

## 📌 Important Notes

1. **Sandbox Mode**: All transactions are test transactions
2. **Real Money**: NO real money will be charged
3. **Test Cards**: Use Duitku test payment methods
4. **Expiry**: Payment link expires in 60 minutes
5. **Callback**: Requires HTTPS for production

---

**Last Updated**: 2025-01-17
**Status**: ✅ Ready for Testing
