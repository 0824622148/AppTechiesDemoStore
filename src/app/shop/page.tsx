import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/shop/ProductCard"
import { db } from "@/lib/db"
import { CATEGORY_LABELS } from "@/types"
import type { ProductSummary, Category } from "@/types"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Bitdefender Licenses",
  description: "Browse all Bitdefender antivirus and security software licenses.",
}

async function getProducts(category?: string): Promise<ProductSummary[]> {
  const products = await db.product.findMany({
    where: {
      isActive: true,
      ...(category ? { category: category as never } : {}),
    },
    orderBy: { sortOrder: "asc" },
  })
  return products.map((p) => ({
    ...p,
    features: JSON.parse(p.features) as string[],
    platforms: JSON.parse(p.platforms) as string[],
  }))
}

const categoryKeys = Object.keys(CATEGORY_LABELS) as Category[]

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams
  const validCategory = category && categoryKeys.includes(category as Category) ? category : undefined
  const products = await getProducts(validCategory)

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0a1628] mb-2">
              {validCategory ? CATEGORY_LABELS[validCategory as Category] : "All Products"}
            </h1>
            <p className="text-slate-500">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/shop"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !validCategory
                  ? "bg-[#0a1628] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All
            </Link>
            {categoryKeys.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  validCategory === cat
                    ? "bg-[#1e6ef5] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>

          {/* Product grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg">No products found in this category.</p>
              <Link href="/shop" className="text-[#1e6ef5] mt-2 block hover:underline">
                View all products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
