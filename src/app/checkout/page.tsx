import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Checkout" }

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0a1628] mb-8">Checkout</h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
