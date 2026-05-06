"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { ShoppingCart, Check } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import type { ProductSummary } from "@/types"

export function AddToCartButton({ product }: { product: ProductSummary }) {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = items.some((i) => i.productId === product.id)

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
    })
    toast.success("Added to cart")
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAdd}
      size="lg"
      className={`w-full sm:w-auto gap-2 text-base px-8 ${
        added
          ? "bg-green-600 hover:bg-green-700"
          : "bg-[#1e6ef5] hover:bg-[#1558c8]"
      } text-white transition-colors`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" /> Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          {inCart ? "Add Another" : "Add to Cart"}
        </>
      )}
    </Button>
  )
}
