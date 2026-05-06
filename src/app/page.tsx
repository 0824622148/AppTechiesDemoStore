import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnnouncementBar } from "@/components/home/AnnouncementBar"
import { HeroSection } from "@/components/home/HeroSection"
import { TrustBanner } from "@/components/home/TrustBanner"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { ProductCard } from "@/components/shop/ProductCard"
import { db } from "@/lib/db"
import type { ProductSummary } from "@/types"
import Link from "next/link"

function toSummary(p: {
  id: string
  slug: string
  name: string
  shortName: string
  category: ProductSummary["category"]
  devices: number | null
  months: number | null
  price: number
  comparePrice: number | null
  imageFile: string
  features: string
  platforms: string
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
  description: string
}): ProductSummary {
  return {
    ...p,
    features: JSON.parse(p.features) as string[],
    platforms: JSON.parse(p.platforms) as string[],
  }
}

export default async function HomePage() {
  const featuredRaw = await db.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 3,
  })

  const featured = featuredRaw.map(toSummary)
  const [primary, ...rest] = featured

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Featured products */}
        {featured.length > 0 && (
          <section className="py-24 px-6 lg:px-12 bg-white">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="inline-block px-3 py-1.5 rounded-full bg-[#0A0A0A] text-white text-[12px] font-bold tracking-[0.08em] uppercase mb-3.5">
                    Top picks
                  </span>
                  <h2 className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
                    Most popular plans.
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="text-[14px] font-semibold text-[#0A0A0A] hover:opacity-60 transition-opacity whitespace-nowrap"
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
                {primary && <ProductCard product={primary} primary />}
                {rest.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        <TrustBanner />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
