"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"

export function CartContent() {
  const { items, subtotal, removeItem, updateQty } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add some Bitdefender licenses to get started.</p>
        <Link href="/shop" className={buttonVariants({ className: "bg-[#1e6ef5] hover:bg-[#1558c8] text-white" })}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart items */}
      <div className="lg:col-span-2 space-y-3">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl">
            <div className="w-20 h-20 bg-slate-50 rounded-lg flex-shrink-0 relative overflow-hidden">
              <Image
                src={`/images/products/${item.imageFile}`}
                alt={item.name}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-semibold text-[#0a1628] text-sm hover:text-[#1e6ef5] transition-colors line-clamp-2">
                {item.name}
              </Link>
              <p className="text-[#1e6ef5] font-bold text-lg mt-1">{formatPrice(item.price)}</p>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(item.productId, item.quantity - 1)}
                    className="p-1.5 hover:bg-slate-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                  <span className="px-3 text-sm font-medium text-slate-800 min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.productId, item.quantity + 1)}
                    className="p-1.5 hover:bg-slate-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#0a1628]">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-24">
          <h2 className="font-bold text-[#0a1628] text-lg mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm text-slate-600">
                <span className="truncate mr-2">{item.name} ×{item.quantity}</span>
                <span className="flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3 mb-5">
            <div className="flex justify-between font-bold text-[#0a1628] text-lg">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <Link href="/checkout" className={buttonVariants({ size: "lg", className: "w-full bg-[#1e6ef5] hover:bg-[#1558c8] text-white" })}>
            Proceed to Checkout
          </Link>

          <Link href="/shop" className="block text-center text-sm text-slate-500 hover:text-[#1e6ef5] mt-3 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
