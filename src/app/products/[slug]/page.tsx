import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import type { ProductSummary } from "@/types"
import { CATEGORY_LABELS } from "@/types"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { AddToCartButton } from "@/components/product/AddToCartButton"
import { Check, Monitor, Clock, Shield } from "lucide-react"
import type { Metadata } from "next"

async function getProduct(slug: string): Promise<ProductSummary | null> {
  const product = await db.product.findUnique({ where: { slug, isActive: true } })
  if (!product) return null
  return {
    ...product,
    features: JSON.parse(product.features) as string[],
    platforms: JSON.parse(product.platforms) as string[],
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

const PLATFORM_LABELS: Record<string, string> = {
  windows: "Windows",
  mac: "macOS",
  android: "Android",
  ios: "iOS",
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Product image */}
            <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center aspect-square">
              <Image
                src={`/images/products/${product.imageFile}`}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain max-h-72"
                priority
              />
            </div>

            {/* Product details */}
            <div>
              <div className="text-sm text-[#1e6ef5] font-medium mb-2">
                {CATEGORY_LABELS[product.category]}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-4">
                {product.name}
              </h1>

              {/* Key specs */}
              <div className="flex flex-wrap gap-3 mb-5">
                {product.devices && (
                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1.5 text-sm text-slate-700">
                    <Monitor className="w-3.5 h-3.5" />
                    {product.devices} {product.devices === 1 ? "Device" : "Devices"}
                  </div>
                )}
                {product.months && (
                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1.5 text-sm text-slate-700">
                    <Clock className="w-3.5 h-3.5" />
                    {product.months === 12 ? "1 Year" : `${product.months} Months`}
                  </div>
                )}
                {product.platforms.map((p) => (
                  <div key={p} className="flex items-center gap-1.5 bg-blue-50 rounded-full px-3 py-1.5 text-sm text-[#1e6ef5]">
                    {PLATFORM_LABELS[p] ?? p}
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[#0a1628]">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-xl text-slate-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                {product.comparePrice && (
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Save {formatPrice(product.comparePrice - product.price)}
                  </span>
                )}
              </div>

              {/* Add to cart */}
              <AddToCartButton product={product} />

              {/* Trust signals */}
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-green-500" />
                Secure payment · Instant key delivery by email
              </div>
            </div>
          </div>

          {/* Description + Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-[#0a1628] mb-3">About this product</h2>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0a1628] mb-3">Key features</h2>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-[#1e6ef5] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
