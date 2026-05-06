import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { sendOrderConfirmationEmail } from "@/lib/email"
import { z } from "zod"

export async function GET(_req: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await ctx.params

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: true,
      licenseKeys: true,
    },
  })

  if (!order) return Response.json({ error: "Not found" }, { status: 404 })

  return Response.json(order)
}

const UpdateOrderSchema = z.object({
  status: z.enum(["PENDING", "PAID", "DELIVERED", "FAILED", "REFUNDED"]).optional(),
  notes: z.string().optional(),
})

export async function PATCH(request: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await ctx.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parse = UpdateOrderSchema.safeParse(body)
  if (!parse.success) return Response.json({ error: parse.error.flatten() }, { status: 400 })

  const order = await db.order.update({
    where: { id },
    data: parse.data,
  })

  return Response.json(order)
}

export async function POST(request: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await ctx.params
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action !== "resend-email") {
    return Response.json({ error: "Unknown action" }, { status: 400 })
  }

  const order = await db.order.findUnique({
    where: { id },
    include: { items: true, licenseKeys: true },
  })
  if (!order) return Response.json({ error: "Not found" }, { status: 404 })

  const emailItems = order.licenseKeys.map((key) => {
    const item = order.items.find((i) => i.productId === key.productId)
    return {
      productName: item?.productName ?? "Bitdefender License",
      licenseKey: key.keyValue,
      downloadUrl: "https://www.bitdefender.com/downloads/",
    }
  })

  await sendOrderConfirmationEmail({
    to: order.customerEmail,
    customerName: order.customerName,
    orderNumber: order.orderNumber,
    total: order.total,
    items: emailItems,
  })

  await db.order.update({
    where: { id },
    data: { emailSentAt: new Date(), status: "DELIVERED" },
  })

  return Response.json({ success: true })
}
