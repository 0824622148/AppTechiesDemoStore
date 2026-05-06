import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { z } from "zod"

export async function GET(request: Request) {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const productId = searchParams.get("productId")

  if (productId) {
    const total = await db.licenseKey.count({ where: { productId } })
    const used = await db.licenseKey.count({ where: { productId, isUsed: true } })
    const keys = await db.licenseKey.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: 200,
    })
    return Response.json({ total, used, available: total - used, keys })
  }

  const products = await db.product.findMany({ where: { isActive: true } })
  const stats = await Promise.all(
    products.map(async (p) => {
      const total = await db.licenseKey.count({ where: { productId: p.id } })
      const used = await db.licenseKey.count({ where: { productId: p.id, isUsed: true } })
      return { productId: p.id, productName: p.name, total, used, available: total - used }
    })
  )
  return Response.json(stats)
}

const UploadKeysSchema = z.object({
  productId: z.string(),
  keys: z.array(z.string().min(1)).min(1),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parse = UploadKeysSchema.safeParse(body)
  if (!parse.success) {
    return Response.json({ error: parse.error.flatten() }, { status: 400 })
  }

  const { productId, keys } = parse.data

  const product = await db.product.findUnique({ where: { id: productId } })
  if (!product) return Response.json({ error: "Product not found" }, { status: 404 })

  let inserted = 0
  let duplicates = 0

  for (const keyValue of keys) {
    const trimmed = keyValue.trim()
    if (!trimmed) continue
    try {
      await db.licenseKey.create({ data: { productId, keyValue: trimmed } })
      inserted++
    } catch {
      duplicates++
    }
  }

  return Response.json({ inserted, duplicates })
}
