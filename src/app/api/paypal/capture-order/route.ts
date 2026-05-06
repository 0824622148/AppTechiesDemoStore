import { db } from "@/lib/db"
import { capturePayPalOrder } from "@/lib/paypal"
import { sendOrderConfirmationEmail } from "@/lib/email"
import { z } from "zod"

const BITDEFENDER_DOWNLOAD_URL = "https://www.bitdefender.com/downloads/"

const CaptureSchema = z.object({
  paypalOrderId: z.string(),
  orderId: z.string(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parse = CaptureSchema.safeParse(body)
  if (!parse.success) {
    return Response.json({ error: parse.error.flatten() }, { status: 400 })
  }

  const { paypalOrderId, orderId } = parse.data

  // Fetch order
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  })

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 })
  }

  // Idempotency: already delivered
  if (order.status === "DELIVERED") {
    return Response.json({ success: true, orderNumber: order.orderNumber })
  }

  if (order.status !== "PENDING") {
    return Response.json({ error: "Order cannot be captured" }, { status: 400 })
  }

  if (order.paypalOrderId !== paypalOrderId) {
    return Response.json({ error: "PayPal order ID mismatch" }, { status: 400 })
  }

  // Capture payment
  let payerId: string
  try {
    const result = await capturePayPalOrder(paypalOrderId)
    payerId = result.payerId
  } catch (err) {
    await db.order.update({ where: { id: orderId }, data: { status: "FAILED" } })
    console.error("PayPal capture error:", err)
    return Response.json({ error: "Payment capture failed" }, { status: 502 })
  }

  // Update order to PAID
  await db.order.update({
    where: { id: orderId },
    data: { status: "PAID", paypalPayerId: payerId },
  })

  // Assign license keys for each line item
  const emailItems: { productName: string; licenseKey: string; downloadUrl: string }[] = []

  for (const item of order.items) {
    for (let q = 0; q < item.quantity; q++) {
      const key = await db.licenseKey.findFirst({
        where: { productId: item.productId, isUsed: false },
      })

      if (key) {
        await db.licenseKey.update({
          where: { id: key.id },
          data: { isUsed: true, usedAt: new Date(), orderId },
        })
        emailItems.push({
          productName: item.productName,
          licenseKey: key.keyValue,
          downloadUrl: BITDEFENDER_DOWNLOAD_URL,
        })
      } else {
        // No key available — log for admin follow-up
        console.error(
          `No license key available for product ${item.productId} on order ${orderId}`
        )
        emailItems.push({
          productName: item.productName,
          licenseKey: "KEY PENDING — Our team will email you within 1 hour",
          downloadUrl: BITDEFENDER_DOWNLOAD_URL,
        })
      }
    }
  }

  // Send delivery email
  try {
    await sendOrderConfirmationEmail({
      to: order.customerEmail,
      customerName: order.customerName,
      orderNumber: order.orderNumber,
      total: order.total,
      items: emailItems,
    })

    await db.order.update({
      where: { id: orderId },
      data: { status: "DELIVERED", emailSentAt: new Date() },
    })
  } catch (err) {
    console.error("Email send error:", err)
    // Don't fail the payment — admin can resend
    await db.order.update({ where: { id: orderId }, data: { status: "PAID" } })
  }

  return Response.json({ success: true, orderNumber: order.orderNumber })
}
