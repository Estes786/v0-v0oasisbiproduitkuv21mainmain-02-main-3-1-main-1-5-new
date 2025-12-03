// Midtrans Payment Integration
// Server-side functions only - keep sensitive keys secure

export interface PaymentRequest {
  orderId: string
  amount: number
  customerDetails: {
    firstName: string
    lastName?: string
    email: string
    phone: string
  }
  itemDetails: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export interface PaymentResponse {
  token: string
  redirectUrl: string
}

// Get Midtrans configuration (server-side only)
function getMidtransConfig() {
  const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_ENV === "production"

  return {
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    isProduction,
  }
}

// Create payment transaction
export async function createPaymentTransaction(request: PaymentRequest): Promise<PaymentResponse> {
  const config = getMidtransConfig()
  const baseUrl = config.isProduction ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com"

  const response = await fetch(`${baseUrl}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(config.serverKey + ":").toString("base64")}`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: request.orderId,
        gross_amount: request.amount,
      },
      customer_details: request.customerDetails,
      item_details: request.itemDetails,
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/payment/error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Midtrans API error: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    token: data.token,
    redirectUrl: data.redirect_url,
  }
}

// Verify payment notification
export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string,
): boolean {
  const config = getMidtransConfig()
  const crypto = require("crypto")

  const hash = crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${config.serverKey}`)
    .digest("hex")

  return hash === signatureKey
}

// Get Snap.js URL for client-side integration
export function getSnapJsUrl(): string {
  const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_ENV === "production"

  return isProduction ? "https://app.midtrans.com/snap/snap.js" : "https://app.sandbox.midtrans.com/snap/snap.js"
}
