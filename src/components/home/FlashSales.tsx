import Link from "next/link"
import { CountdownTimer } from "./CountdownTimer"
import { ProductCard } from "@/components/shop/ProductCard"
import type { ProductSummary } from "@/types"

interface FlashSalesProps {
  products: ProductSummary[]
}

export function FlashSales({ products }: FlashSalesProps) {
  if (products.length === 0) return null

  return (
    <section className="py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8 pb-5 border-b border-slate-200">
          <div className="flex-1">
            <p className="text-[#1e6ef5] text-sm font-semibold mb-1">Today&apos;s</p>
            <h2 className="text-2xl font-bold text-[#0a1628]">Flash Sales</h2>
          </div>
          <CountdownTimer />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#1e6ef5] hover:bg-[#1558c8] text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
