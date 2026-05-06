"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import Image from "next/image"
import Link from "next/link"
import { Shield, Lock } from "lucide-react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  emailConfirm: string
}

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [form, setForm] = useState<FormData>({ name: "", email: "", emailConfirm: "" })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [formReady, setFormReady] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  function validate(): boolean {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = "Name is required"
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address"
    }
    if (form.email !== form.emailConfirm) {
      newErrors.emailConfirm = "Emails do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFormReady(false)
  }

  function handleFormReady() {
    if (validate()) setFormReady(true)
  }

  async function createPayPalOrder() {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: items,
        customerEmail: form.email,
        customerName: form.name,
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error ?? "Failed to create order")
    }
    const data = await res.json()
    setOrderId(data.orderId)
    return data.paypalOrderId
  }

  async function onApprove(data: { orderID: string }) {
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paypalOrderId: data.orderID, orderId }),
      })
      if (!res.ok) throw new Error("Capture failed")
      const result = await res.json()
      clearCart()
      router.push(`/thank-you?order=${result.orderNumber}`)
    } catch (err) {
      console.error(err)
      toast.error("Payment processing error. Please contact support.")
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 mb-4">Your cart is empty.</p>
        <Link href="/shop" className={buttonVariants({ className: "bg-[#1e6ef5] hover:bg-[#1558c8] text-white" })}>
          Go to Shop
        </Link>
      </div>
    )
  }

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ""

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Customer details */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-[#0a1628] text-lg mb-5 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1e6ef5]" />
            Delivery Details
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? "border-red-400" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? "border-red-400" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              <p className="text-xs text-slate-400 mt-1">
                Your license key will be sent to this email address.
              </p>
            </div>

            <div>
              <Label htmlFor="emailConfirm" className="text-slate-700 mb-1.5">
                Confirm Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emailConfirm"
                name="emailConfirm"
                type="email"
                value={form.emailConfirm}
                onChange={handleChange}
                placeholder="Confirm your email"
                className={errors.emailConfirm ? "border-red-400" : ""}
              />
              {errors.emailConfirm && (
                <p className="text-red-500 text-xs mt-1">{errors.emailConfirm}</p>
              )}
            </div>
          </div>

          {!formReady ? (
            <Button
              onClick={handleFormReady}
              className="mt-5 w-full bg-[#1e6ef5] hover:bg-[#1558c8] text-white"
            >
              Continue to Payment
            </Button>
          ) : (
            <div className="mt-5">
              <p className="text-xs text-slate-500 mb-3 text-center">
                <Shield className="w-3.5 h-3.5 inline mr-1 text-green-500" />
                Secure payment via PayPal
              </p>
              <PayPalScriptProvider
                options={{
                  clientId,
                  currency: "ZAR",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect", label: "pay" }}
                  createOrder={createPayPalOrder}
                  onApprove={onApprove}
                  onError={() => toast.error("PayPal encountered an error. Please try again.")}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </div>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24">
          <h2 className="font-bold text-[#0a1628] text-lg mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <Image
                    src={`/images/products/${item.imageFile}`}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 line-clamp-2 leading-tight">{item.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-[#0a1628] flex-shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between font-bold text-[#0a1628] text-lg">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">ZAR · Incl. VAT</p>
          </div>
        </div>
      </div>
    </div>
  )
}
