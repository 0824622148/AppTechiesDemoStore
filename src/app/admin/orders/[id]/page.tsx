import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { ResendEmailButton } from "@/components/admin/ResendEmailButton"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Order Detail — Admin" }

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const order = await db.order.findUnique({
    where: { id },
    include: { items: true, licenseKeys: true },
  })

  if (!order) notFound()

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
    REFUNDED: "bg-slate-100 text-slate-700",
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/admin/orders" className="hover:text-[#1e6ef5]">Orders</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{order.orderNumber}</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Order {order.orderNumber}</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {new Date(order.createdAt).toLocaleString("en-ZA")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[order.status] ?? ""}`}>
            {order.status}
          </span>
          {(order.status === "PAID" || order.status === "DELIVERED") && (
            <ResendEmailButton orderId={order.id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-slate-800">{item.productName}</p>
                    <p className="text-slate-500">Qty: {item.quantity} × {formatPrice(item.unitPrice)}</p>
                  </div>
                  <p className="font-semibold text-slate-800">{formatPrice(item.lineTotal)}</p>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-slate-800">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* License keys */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4">License Keys ({order.licenseKeys.length})</h2>
            {order.licenseKeys.length > 0 ? (
              <div className="space-y-2">
                {order.licenseKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between text-sm bg-slate-50 rounded-lg p-3">
                    <code className="font-mono text-[#0a1628] text-xs">{key.keyValue}</code>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Used</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No license keys assigned yet.</p>
            )}
          </div>
        </div>

        {/* Customer + payment info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-3">Customer</h2>
            <p className="text-sm font-medium text-slate-800">{order.customerName}</p>
            <p className="text-sm text-slate-500">{order.customerEmail}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-3">Payment</h2>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">PayPal Order ID</span>
                <span className="font-mono text-xs text-slate-700">{order.paypalOrderId?.slice(0, 16)}...</span>
              </div>
              {order.paypalPayerId && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Payer ID</span>
                  <span className="font-mono text-xs text-slate-700">{order.paypalPayerId}</span>
                </div>
              )}
              {order.emailSentAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Email sent</span>
                  <span className="text-slate-700">{new Date(order.emailSentAt).toLocaleString("en-ZA")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
