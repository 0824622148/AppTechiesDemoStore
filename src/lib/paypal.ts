import { Client, Environment, OrdersController, CheckoutPaymentIntent, ItemCategory } from "@paypal/paypal-server-sdk"

function getPayPalClient() {
  const env =
    process.env.PAYPAL_MODE === "live" ? Environment.Production : Environment.Sandbox

  return new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
      oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    },
    environment: env,
  })
}

export async function createPayPalOrder(
  items: { name: string; quantity: number; unitPrice: number }[],
  total: number
): Promise<string> {
  const client = getPayPalClient()
  const ordersController = new OrdersController(client)

  const response = await ordersController.createOrder({
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "ZAR",
            value: total.toFixed(2),
            breakdown: {
              itemTotal: {
                currencyCode: "ZAR",
                value: total.toFixed(2),
              },
            },
          },
          items: items.map((item) => ({
            name: item.name.slice(0, 127),
            quantity: String(item.quantity),
            unitAmount: {
              currencyCode: "ZAR",
              value: item.unitPrice.toFixed(2),
            },
            category: ItemCategory.DigitalGoods,
          })),
        },
      ],
    },
  })

  if (!response.result?.id) {
    throw new Error("PayPal order creation failed")
  }

  return response.result.id
}

export async function capturePayPalOrder(
  paypalOrderId: string
): Promise<{ status: string; payerId: string }> {
  const client = getPayPalClient()
  const ordersController = new OrdersController(client)

  const response = await ordersController.captureOrder({
    id: paypalOrderId,
    body: {},
  })

  const status = response.result?.status ?? ""
  const payerId = response.result?.payer?.payerId ?? ""

  if (status !== "COMPLETED") {
    throw new Error(`PayPal capture returned status: ${status}`)
  }

  return { status, payerId }
}
