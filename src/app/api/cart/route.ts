import { db } from "@/lib/db"
import { z } from "zod"

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
})

const ValidateCartSchema = z.object({
  items: z.array(CartItemSchema),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parse = ValidateCartSchema.safeParse(body)
  if (!parse.success) {
    return Response.json({ error: parse.error.flatten() }, { status: 400 })
  }

  const { items } = parse.data

  const validatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await db.product.findUnique({
        where: { id: item.productId, isActive: true },
      })
      if (!product) return null
      return {
        productId: product.id,
        productName: product.name,
        imageFile: product.imageFile,
        slug: product.slug,
        unitPrice: product.price,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      }
    })
  )

  const filtered = validatedItems.filter(Boolean) as NonNullable<(typeof validatedItems)[0]>[]

  if (filtered.length !== items.length) {
    return Response.json({ error: "One or more products not found" }, { status: 400 })
  }

  const total = filtered.reduce((sum, item) => sum + item.lineTotal, 0)

  return Response.json({ valid: true, items: filtered, total })
}
