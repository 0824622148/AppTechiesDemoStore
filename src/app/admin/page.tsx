import { db } from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import { ShoppingBag, DollarSign, Key, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Admin Dashboard" }

async function getStats() {
  const [totalOrders, paidOrders, totalKeys, usedKeys, products] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { status: "DELIVERED" } }),
    db.licenseKey.count(),
    db.licenseKey.count({ where: { isUsed: true } }),
    db.product.findMany({ where: { isActive: true } }),
  ])

  const revenue = await db.order.aggregate({
    _sum: { total: true },
    where: { status: { in: ["PAID", "DELIVERED"] } },
  })

  const recentOrders = await db.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { items: true },
  })

  // Low stock alert: products with < 5 keys
  const lowStock = await Promise.all(
    products.map(async (p) => {
      const available = await db.licenseKey.count({ where: { productId: p.id, isUsed: false } })
      return { ...p, available }
    })
  )

  return {
    totalOrders,
    paidOrders,
    revenue: revenue._sum.total ?? 0,
    totalKeys,
    usedKeys,
    availableKeys: totalKeys - usedKeys,
    recentOrders,
    lowStock: lowStock.filter((p) => p.available < 5),
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ShoppingBag} label="Total Orders" value={String(stats.totalOrders)} color="bg-[#0a1628]" />
        <StatCard icon={DollarSign} label="Revenue" value={formatPrice(stats.revenue)} color="bg-green-600" />
        <StatCard icon={Key} label="Keys in Stock" value={String(stats.availableKeys)} color="bg-[#1e6ef5]" />
        <StatCard icon={ShoppingBag} label="Delivered" value={String(stats.paidOrders)} color="bg-purple-600" />
      </div>

      {/* Low stock warning */}
      {stats.lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" />
            Low Stock Warning
          </h2>
          <ul className="text-sm text-amber-700 space-y-1">
            {stats.lowStock.map((p) => (
              <li key={p.id}>
                <Link href="/admin/keys" className="hover:underline">
                  {p.name}
                </Link>{" "}
                — {p.available} key{p.available !== 1 ? "s" : ""} remaining
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-[#1e6ef5] hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.recentOrders.map((order) => (
            <div key={order.id} className="px-5 py-3 flex justify-between items-center text-sm">
              <div>
                <Link href={`/admin/orders/${order.id}`} className="font-medium text-slate-800 hover:text-[#1e6ef5]">
                  #{order.orderNumber}
                </Link>
                <p className="text-slate-500 text-xs">{order.customerEmail}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800">{formatPrice(order.total)}</p>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
          {stats.recentOrders.length === 0 && (
            <p className="px-5 py-8 text-center text-slate-400">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-slate-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
    REFUNDED: "bg-slate-100 text-slate-700",
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  )
}
