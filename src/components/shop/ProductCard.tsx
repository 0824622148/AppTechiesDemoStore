"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Monitor } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"
import { CATEGORY_LABELS } from "@/types"
import { toast } from "sonner"
import type { ProductSummary } from "@/types"

interface ProductCardProps {
  product: ProductSummary
  primary?: boolean
}

export function ProductCard({ product, primary = false }: ProductCardProps) {
  const { addItem } = useCart()

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
    })
    toast.success(`${product.shortName} added to cart`)
  }

  return (
    <div
      className="bg-white flex flex-col gap-3.5 transition-all duration-200 group"
      style={{
        border: "1px solid #E4E4E4",
        borderRadius: 20,
        padding: 22,
        boxShadow: primary ? "0 1px 2px rgba(10,19,48,0.04), 0 18px 50px rgba(10,19,48,0.10)" : "0 1px 2px rgba(10,19,48,0.04), 0 8px 24px rgba(10,19,48,0.06)",
      }}
    >
      {/* Visual */}
      <Link href={`/products/${product.slug}`} className="block" tabIndex={-1}>
        <div
          className="relative overflow-hidden"
          style={{
            height: 220,
            borderRadius: 14,
            background: "linear-gradient(160deg, #1A1A1A 0%, #0A0A0A 60%, #000000 100%)",
          }}
        >
          {/* Glow overlay */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10), transparent 60%)" }} />

          {/* Product image */}
          <Image
            src={`/images/products/${product.imageFile}`}
            alt={product.name}
            fill
            className="object-contain p-5 relative z-10 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge */}
          {primary && (
            <div className="absolute top-3.5 left-3.5 z-20 bg-[#0A0A0A] text-white text-[11px] font-bold tracking-[0.08em] px-2 py-1 rounded-full uppercase">
              Most popular
            </div>
          )}
          {!primary && product.comparePrice && (
            <div className="absolute top-3.5 left-3.5 z-20 bg-white text-[#0A0A0A] text-[11px] font-bold tracking-[0.08em] px-2 py-1 rounded-full uppercase border border-white/60">
              Sale
            </div>
          )}
        </div>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1.5 text-[12.5px] text-[#6B6B6B]">
        <span className="text-[#0A0A0A] tracking-[1px]">★★★★★</span>
        <span>4.9 · {(1200 + product.sortOrder * 300).toLocaleString()} reviews</span>
      </div>

      {/* Name + desc */}
      <div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#0A0A0A] hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
        </Link>
        <p className="text-[13.5px] text-[#6B6B6B] mt-0.5 leading-[1.5] line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Meta chips */}
      <div className="flex items-center gap-2.5 text-[12.5px] text-[#6B6B6B]">
        {product.devices && (
          <span className="bg-[#F0F0F0] rounded-full px-2.5 py-1 font-semibold text-[#2E2E2E] flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            {product.devices} {product.devices === 1 ? "device" : "devices"}
          </span>
        )}
        {product.months && (
          <span className="bg-[#F0F0F0] rounded-full px-2.5 py-1 font-semibold text-[#2E2E2E]">
            {product.months === 12 ? "1 year" : `${product.months} mo`}
          </span>
        )}
        <span className="bg-[#F0F0F0] rounded-full px-2.5 py-1 font-semibold text-[#2E2E2E]">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between mt-1">
        <div>
          <span className="text-[24px] font-extrabold tracking-[-0.02em] text-[#0A0A0A]">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-[14px] text-[#9A9A9A] line-through font-medium ml-1.5">
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <div className="text-[12px] text-[#6B6B6B] mt-0.5">/ year · digital license</div>
        </div>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-2 h-11 rounded-[12px] font-semibold text-[14px] text-white cursor-pointer transition-opacity hover:opacity-80 active:translate-y-px"
        style={{ background: "#0A0A0A" }}
      >
        <ShoppingCart className="w-4 h-4" />
        Add to cart
      </button>
    </div>
  )
}
