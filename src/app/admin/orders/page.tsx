import { db } from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Orders — Admin" }

interface OrdersPageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-slate-100 text-slate-700",
}

export default async function AdminOrdersPage({ searchParams }: OrdersPageProps) {
  const { status, page: pageStr } = await searchParams
  const page = parseInt(pageStr ?? "1")
  const limit = 25

  const where = status ? { status: status as never } : {}
  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.order.count({ where }),
  ])

  const statuses = ["PENDING", "PAID", "DELIVERED", "FAILED", "REFUNDED"]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Orders</h1>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/admin/orders"
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !status ? "bg-[#0a1628] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All ({total})
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              status === s ? "bg-[#1e6ef5] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Order #</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Customer</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Items</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Total</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-[#1e6ef5] hover:underline font-medium">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <p className="text-slate-800">{order.customerName}</p>
                  <p className="text-slate-500 text-xs">{order.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(order.createdAt).toLocaleDateString("en-ZA")}
                </td>
                <td className="px-4 py-3 text-slate-600">{order.items.length}</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-800">
                  {formatPrice(order.total)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status] ?? ""}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="mt-4 flex gap-2 justify-end">
          {page > 1 && (
            <Link href={`/admin/orders?page=${page - 1}${status ? `&status=${status}` : ""}`}
              className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              Previous
            </Link>
          )}
          {page * limit < total && (
            <Link href={`/admin/orders?page=${page + 1}${status ? `&status=${status}` : ""}`}
              className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
