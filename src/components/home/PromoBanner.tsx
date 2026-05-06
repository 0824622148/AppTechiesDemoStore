import Link from "next/link"
import Image from "next/image"

export function PromoBanner() {
  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-[#0a1628] min-h-[240px] flex items-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0f2040] to-[#1e3a6e]" />

          {/* Product image on right */}
          <div className="absolute right-8 bottom-0 h-full w-64 hidden md:block">
            <Image
              src="/images/products/Bitdefender-ESD-TS-3-12-EN (1).jpg"
              alt="Bitdefender Total Security"
              fill
              className="object-contain object-bottom"
              sizes="256px"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-12 py-10 max-w-xl">
            <p className="text-[#3b82f6] text-sm font-semibold mb-2 uppercase tracking-wider">Categories</p>
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              Enhance Your<br />
              <span className="text-[#3b82f6]">Digital Security</span>
            </h2>

            {/* Mini countdown decoration */}
            <div className="flex items-center gap-3 mb-6">
              {["03", "23", "59"].map((val, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white text-[#0a1628] font-bold text-sm rounded px-2.5 py-1 min-w-[2.5rem] text-center">
                    {val}
                  </div>
                  {i < 2 && <span className="text-white font-bold">:</span>}
                </div>
              ))}
            </div>

            <Link
              href="/shop?category=TOTAL_SECURITY"
              className="inline-flex items-center gap-2 bg-[#1e6ef5] hover:bg-[#1558c8] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Buy Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
