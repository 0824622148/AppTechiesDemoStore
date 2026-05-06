import { db } from "@/lib/db"
import { createPayPalOrder } from "@/lib/paypal"
import { generateOrderNumber } from "@/lib/utils"
import { z } from "zod"
import { headers } from "next/headers"

const CartItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  imageFile: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
})

const CreateOrderSchema = z.object({
  cartItems: z.array(CartItemSchema).min(1),
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parse = CreateOrderSchema.safeParse(body)
  if (!parse.success) {
    return Response.json({ error: parse.error.flatten() }, { status: 400 })
  }

  const { cartItems, customerEmail, customerName } = parse.data

  // Fetch prices from DB — never trust client-supplied prices
  const products = await db.product.findMany({
    where: {
      id: { in: cartItems.map((i) => i.productId) },
      isActive: true,
    },
  })

  if (products.length !== new Set(cartItems.map((i) => i.productId)).size) {
    return Response.json({ error: "One or more products unavailable" }, { status: 400 })
  }

  const productMap = new Map(products.map((p) => [p.id, p]))
  const lineItems = cartItems.map((item) => {
    const product = productMap.get(item.productId)!
    return {
      name: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
    }
  })

  const subtotal = lineItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
  const total = subtotal

  const headersList = await headers()
  const ipAddress = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? null
  const userAgent = headersList.get("user-agent") ?? null

  // Create internal order record (PENDING)
  const order = await db.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerEmail,
      customerName,
      subtotal,
      total,
      currency: "ZAR",
      ipAddress,
      userAgent,
      status: "PENDING",
      items: {
        create: cartItems.map((item) => {
          const product = productMap.get(item.productId)!
          return {
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            unitPrice: product.price,
            lineTotal: product.price * item.quantity,
          }
        }),
      },
    },
  })

  // Create PayPal order
  const paypalOrderId = await createPayPalOrder(lineItems, total)

  // Link PayPal order ID
  await db.order.update({
    where: { id: order.id },
    data: { paypalOrderId },
  })

  return Response.json({ paypalOrderId, orderId: order.id })
}
