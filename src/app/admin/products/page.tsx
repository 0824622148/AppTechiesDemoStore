import { db } from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import { CATEGORY_LABELS } from "@/types"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Products — Admin" }

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { sortOrder: "asc" },
  })

  const keyCounts = await Promise.all(
    products.map(async (p) => {
      const available = await db.licenseKey.count({ where: { productId: p.id, isUsed: false } })
      return { id: p.id, available }
    })
  )
  const keyCountMap = new Map(keyCounts.map((k) => [k.id, k.available]))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-[#1e6ef5] hover:bg-[#1558c8] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Product</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Category</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Price</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Keys</th>
              <th className="text-center px-4 py-3 font-semibold text-slate-600">Active</th>
              <th className="text-center px-4 py-3 font-semibold text-slate-600">Featured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image
                        src={`/images/products/${p.imageFile}`}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <span className="font-medium text-slate-800 text-xs leading-tight max-w-48">
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {CATEGORY_LABELS[p.category]}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-800">
                  {formatPrice(p.price)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-semibold ${(keyCountMap.get(p.id) ?? 0) < 5 ? "text-amber-600" : "text-green-700"}`}>
                    {keyCountMap.get(p.id) ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {p.isActive ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.isFeatured ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                    {p.isFeatured ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
