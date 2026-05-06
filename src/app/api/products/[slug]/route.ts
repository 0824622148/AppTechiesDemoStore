import { db } from "@/lib/db"

export async function GET(_req: Request, ctx: RouteContext<"/api/products/[slug]">) {
  const { slug } = await ctx.params

  const product = await db.product.findUnique({ where: { slug } })

  if (!product) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  return Response.json({
    ...product,
    features: JSON.parse(product.features) as string[],
    platforms: JSON.parse(product.platforms) as string[],
  })
}
