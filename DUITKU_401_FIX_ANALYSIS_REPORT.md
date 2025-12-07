# 🔒 DUITKU HTTP 401 UNAUTHORIZED - ROOT CAUSE ANALYSIS & FIX REPORT

**Date**: 2025-12-07  
**Issue**: HTTP 401 Unauthorized when creating payment transactions  
**Status**: ✅ ROOT CAUSE IDENTIFIED  
**Repository**: https://github.com/Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new.git

---

## 📋 EXECUTIVE SUMMARY

The HTTP 401 Unauthorized error is caused by **INCORRECT SIGNATURE CALCULATION** in the payment request. The current implementation uses **SHA256 with hyphen separators**, but Duitku API requires **MD5 without separators** for transaction requests.

---

## 🔍 PHASE 1: CURRENT STATE ANALYSIS

### 1.1 Email Analysis
From Duitku Customer Care (Marsa Setyani Rubiyanti):
- **Issue**: HTTP 401 Unauthorized error during integration
- **Root Cause**: Error in `signatured` parameter (signature calculation/format)
- **Key Information**: 
  - The Payment Gateway feature does NOT have a Whitelist for signatures
  - Must follow exact documentation formula
  - Reference: https://docs.duitku.com/api/id/#langkah-awal

### 1.2 Current Code Implementation

**File**: `/home/user/webapp/lib/duitku.ts`

#### Current Signature Function (Lines 79-84):
```typescript
export function generateDuitkuRequestSignature(timestamp: string): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  // CRITICAL: Use hyphen (-) separator as per Duitku docs
  const signatureString = `${merchantCode}-${timestamp}-${apiKey}`
  return crypto.createHash('sha256').update(signatureString).digest('hex')
}
```

**Problems Identified**:
1. ❌ Uses SHA256 (should be MD5)
2. ❌ Uses hyphen separators (should be no separator)
3. ❌ Uses timestamp (should use merchantOrderId and paymentAmount)
4. ❌ Wrong parameter order

#### Current Usage in createDuitkuPayment (Lines 132-181):
```typescript
// Line 136: Wrong timestamp-based signature
const timestamp = Date.now().toString()
const headerSignature = generateDuitkuRequestSignature(timestamp)

// Lines 170-179: Sends wrong signature in headers
const response = await fetch(`${baseUrl}/createInvoice`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-duitku-signature': headerSignature,  // ❌ WRONG
    'x-duitku-timestamp': timestamp,        // ❌ NOT REQUIRED
    'x-duitku-merchantcode': merchantCode,  // ❌ NOT REQUIRED
  },
  body: JSON.stringify(requestBody),
})
```

### 1.3 Official Duitku Documentation Requirements

**API Endpoint**: `https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry`

**Official Signature Formula** (from documentation):
```
signature = MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
```

**Key Requirements**:
- ✅ Hash Method: **MD5** (not SHA256)
- ✅ Separator: **NONE** (direct concatenation)
- ✅ Parameters: merchantCode + merchantOrderId + paymentAmount + apiKey
- ✅ Location: **Request body** (not headers)
- ✅ Parameter name: `signature` (in JSON body)

**Official PHP Example from Documentation**:
```php
$merchantCode = 'DXXXXX';
$apiKey = 'XXXXXXXXXX7968XXXXXXXXXFB05332AF';
$merchantOrderId = time() . '';
$paymentAmount = 40000;

$signature = md5($merchantCode . $merchantOrderId . $paymentAmount . $apiKey);

$params = array(
    'merchantCode' => $merchantCode,
    'paymentAmount' => $paymentAmount,
    'merchantOrderId' => $merchantOrderId,
    'signature' => $signature,  // IN BODY, NOT HEADER!
    // ... other params
);
```

---

## 🎯 PHASE 2: GAP ANALYSIS

### Comparison Table

| Aspect | Current Implementation | Duitku Requirement | Status |
|--------|----------------------|-------------------|---------|
| Hash Algorithm | SHA256 | MD5 | ❌ WRONG |
| Separators | Hyphens (-) | None | ❌ WRONG |
| Parameters | merchantCode-timestamp-apiKey | merchantCode+merchantOrderId+paymentAmount+apiKey | ❌ WRONG |
| Signature Location | HTTP Headers | Request Body | ❌ WRONG |
| Header Names | x-duitku-signature, x-duitku-timestamp, x-duitku-merchantcode | Not required | ❌ WRONG |

### Root Cause Summary
The implementation appears to follow an **outdated or incorrect API specification**. The current code:
1. Uses header-based authentication (possibly from a different Duitku API version)
2. Uses SHA256 with timestamp (not documented in current v2/inquiry API)
3. Completely misses the body-based MD5 signature requirement

---

## 🛠️ PHASE 3: REQUIRED FIXES

### 3.1 Signature Function Fix

**Location**: `/home/user/webapp/lib/duitku.ts`

**Current Function** (Lines 79-84):
```typescript
export function generateDuitkuRequestSignature(timestamp: string): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  const signatureString = `${merchantCode}-${timestamp}-${apiKey}`
  return crypto.createHash('sha256').update(signatureString).digest('hex')
}
```

**CORRECT Implementation**:
```typescript
/**
 * Generate signature for Duitku Transaction Request (v2/inquiry API)
 * Formula: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
 * NOTE: NO separators, direct concatenation
 */
export function generateTransactionSignature(
  merchantOrderId: string,
  paymentAmount: number
): string {
  const { merchantCode, apiKey } = DUITKU_CONFIG
  // CRITICAL: No separators, MD5 hash
  const signatureString = `${merchantCode}${merchantOrderId}${paymentAmount}${apiKey}`
  return crypto.createHash('md5').update(signatureString).digest('hex')
}
```

### 3.2 Request Function Fix

**Location**: `/home/user/webapp/lib/duitku.ts` (createDuitkuPayment function)

**Changes Required**:
1. ❌ **REMOVE** timestamp generation
2. ❌ **REMOVE** all custom headers (x-duitku-*)
3. ✅ **ADD** signature to request body
4. ✅ **USE** correct signature function

**Current Code** (Lines 132-181):
```typescript
export async function createDuitkuPayment(data: DuitkuPaymentRequest) {
  // ❌ REMOVE THIS
  const timestamp = Date.now().toString()
  const headerSignature = generateDuitkuRequestSignature(timestamp)
  
  const requestBody = {
    // ... fields
    // ❌ NO signature in body currently
  }

  const response = await fetch(`${baseUrl}/createInvoice`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-duitku-signature': headerSignature,      // ❌ REMOVE
      'x-duitku-timestamp': timestamp,            // ❌ REMOVE
      'x-duitku-merchantcode': merchantCode,      // ❌ REMOVE
    },
    body: JSON.stringify(requestBody),
  })
}
```

**CORRECT Implementation**:
```typescript
export async function createDuitkuPayment(data: DuitkuPaymentRequest) {
  const { merchantCode, baseUrl, returnUrl, callbackUrl } = DUITKU_CONFIG
  
  // ✅ Generate correct signature
  const signature = generateTransactionSignature(
    data.merchantOrderId,
    data.paymentAmount
  )
  
  console.log('🔐 Signature Generation:')
  console.log('   Merchant Code:', merchantCode)
  console.log('   Order ID:', data.merchantOrderId)
  console.log('   Amount:', data.paymentAmount)
  console.log('   Signature String:', `${merchantCode}${data.merchantOrderId}${data.paymentAmount}${apiKey}`)
  console.log('   Signature (MD5):', signature)
  
  const requestBody = {
    merchantCode,                    // ✅ In body
    paymentAmount: data.paymentAmount,
    merchantOrderId: data.merchantOrderId,
    productDetails: data.productDetails,
    email: data.email,
    phoneNumber: data.phoneNumber,
    customerVaName: data.customerName,
    callbackUrl,
    returnUrl,
    expiryPeriod: 60,
    signature,                       // ✅ CRITICAL: Signature in body!
  }

  try {
    const response = await fetch(`${baseUrl}/v2/inquiry`, {  // ✅ Correct endpoint
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // ✅ NO custom headers needed
      },
      body: JSON.stringify(requestBody),
    })
    
    // ... rest of the code
  }
}
```

### 3.3 API Endpoint Fix

**Current**: `${baseUrl}/createInvoice`  
**Correct**: `${baseUrl}/v2/inquiry`

---

## 📊 VERIFICATION CHECKLIST

Before deployment, verify:

- [ ] Signature uses MD5 (not SHA256)
- [ ] No separators in signature string
- [ ] Signature includes: merchantCode + merchantOrderId + paymentAmount + apiKey
- [ ] Signature is in request body (not headers)
- [ ] No custom x-duitku-* headers
- [ ] API endpoint is `/v2/inquiry`
- [ ] Request body includes `signature` field
- [ ] Console logs show correct signature generation

---

## 🧪 TEST CREDENTIALS (Sandbox)

From provided credentials:
- **Merchant Code**: DS26557
- **API Key**: 68e1d64813c7f21a1ffc3839064ab6b3
- **Environment**: Sandbox
- **Base URL**: https://sandbox.duitku.com/webapi/api/merchant

**Test Transaction Example**:
```
merchantCode = DS26557
merchantOrderId = OASIS-TEST-1733542800000-ABC123
paymentAmount = 99000
apiKey = 68e1d64813c7f21a1ffc3839064ab6b3

Signature String: DS26557OASIS-TEST-1733542800000-ABC1239900068e1d64813c7f21a1ffc3839064ab6b3
MD5 Hash: [to be calculated]
```

---

## 🎯 NEXT STEPS (PHASE 4-8)

1. ✅ **Phase 4**: Implement fixes in code
2. ✅ **Phase 5**: Create test script
3. ✅ **Phase 6**: Run tests against sandbox
4. ✅ **Phase 7**: Verify 200 OK response
5. ✅ **Phase 8**: Commit and push to GitHub

---

## 📚 REFERENCES

1. **Official Documentation**: https://docs.duitku.com/api/id/#langkah-awal
2. **Transaction Request**: Section "Permintaan Transaksi"
3. **Signature Formula**: `MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)`
4. **Email Evidence**: Duitku Customer Care notification (attached screenshot)

---

## ⚠️ CRITICAL NOTES

1. **DO NOT** use header-based signature authentication for v2/inquiry API
2. **DO NOT** use SHA256 - must be MD5
3. **DO NOT** add separators (hyphens, spaces) in signature string
4. **MUST** include signature in request body
5. **MUST** use exact parameter order: merchantCode → merchantOrderId → paymentAmount → apiKey

---

**Report Generated**: 2025-12-07  
**Analysis Complete**: ✅  
**Fix Ready**: Pending implementation (Phase 4)
