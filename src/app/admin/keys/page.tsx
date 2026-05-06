import { db } from "@/lib/db"
import { KeyUploader } from "@/components/admin/KeyUploader"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "License Keys — Admin" }

export default async function AdminKeysPage() {
  const products = await db.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  const keyStats = await Promise.all(
    products.map(async (p) => {
      const total = await db.licenseKey.count({ where: { productId: p.id } })
      const used = await db.licenseKey.count({ where: { productId: p.id, isUsed: true } })
      return { ...p, total, used, available: total - used }
    })
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">License Keys</h1>

      {/* Upload form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <h2 className="font-bold text-slate-800 mb-4">Upload License Keys</h2>
        <KeyUploader products={products.map((p) => ({ id: p.id, name: p.name }))} />
      </div>

      {/* Inventory table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Key Inventory</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Product</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Total</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Used</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Available</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {keyStats.map((p) => (
              <tr key={p.id} className={p.available < 5 ? "bg-amber-50" : ""}>
                <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                <td className="px-4 py-3 text-right text-slate-600">{p.total}</td>
                <td className="px-4 py-3 text-right text-slate-600">{p.used}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`font-semibold ${p.available < 5 ? "text-amber-700" : "text-green-700"}`}
                  >
                    {p.available}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {p.available < 5 && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      Low Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
