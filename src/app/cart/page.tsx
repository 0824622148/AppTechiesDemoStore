import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CartContent } from "@/components/cart/CartContent"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Your Cart" }

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0a1628] mb-8">Your Cart</h1>
          <CartContent />
        </div>
      </main>
      <Footer />
    </>
  )
}
