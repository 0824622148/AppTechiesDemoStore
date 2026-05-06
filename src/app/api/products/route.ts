import { db } from "@/lib/db"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const limit = searchParams.get("limit")

  const products = await db.product.findMany({
    where: {
      isActive: true,
      ...(category ? { category: category as never } : {}),
      ...(featured === "true" ? { isFeatured: true } : {}),
    },
    orderBy: { sortOrder: "asc" },
    ...(limit ? { take: parseInt(limit) } : {}),
  })

  const parsed = products.map((p) => ({
    ...p,
    features: JSON.parse(p.features) as string[],
    platforms: JSON.parse(p.platforms) as string[],
  }))

  return Response.json(parsed)
}
