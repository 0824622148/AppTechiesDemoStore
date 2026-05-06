import Link from "next/link"
import Image from "next/image"
import { Shield, Zap, Lock, RefreshCw, MessageCircle } from "lucide-react"

interface HeroProduct {
  tier: string
  label: string
  meta: string
  price: string
  imageFile: string
}

interface HeroSectionProps {
  products?: HeroProduct[]
}

const defaultProducts: HeroProduct[] = [
  { tier: "ANTIVIRUS", label: "Antivirus\nPlus", meta: "3 devices · 1 year", price: "R 299", imageFile: "Bitdefender-ESD-AV-3-12-EN.jpg" },
  { tier: "TOTAL", label: "Total\nSecurity", meta: "5 devices · 1 year", price: "R 599", imageFile: "Bitdefender-ESD-TS-5-12-EN.jpg" },
  { tier: "INTERNET", label: "Internet\nSecurity", meta: "3 devices · 1 year", price: "R 449", imageFile: "Bitdefender-ESD-IS-3-12-EN.jpg" },
]


export function HeroSection({ products = defaultProducts }: HeroSectionProps) {
  const [av, ts, is_] = products

  return (
    <section
      className="text-white overflow-hidden"
      style={{
        background: "radial-gradient(120% 80% at 80% 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 35%, rgba(0,0,0,0) 65%), radial-gradient(80% 60% at 0% 100%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0A0A0A 0%, #000000 100%)",
        position: "relative",
      }}
    >
      {/* Subtle star field */}
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{
        backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(1.5px 1.5px at 40% 80%, rgba(255,255,255,0.3), transparent 50%), radial-gradient(1px 1px at 85% 20%, rgba(255,255,255,0.4), transparent 50%)",
        backgroundSize: "600px 600px",
      }} />

      {/* Main hero content */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-[90px] pb-[80px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[60px] items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[12.5px] font-semibold tracking-[0.06em] uppercase text-white" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.20)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.6)" }} />
              Authorized Bitdefender Reseller · 2018
            </span>

            <h1 className="text-[58px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.025em] mt-5 mb-5 text-white" style={{ textWrap: "balance" } as React.CSSProperties}>
              Protect your digital life with{" "}
              <span style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #C8C8C8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                trusted Bitdefender security.
              </span>
            </h1>

            <p className="text-[18px] leading-[1.6] text-[#B6C4DE] max-w-[540px]">
              Genuine licenses for home, family, and small business — delivered instantly to your inbox. No subscriptions, no surprises.
            </p>

            <div className="flex gap-3.5 mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-14 px-7 text-[16px] rounded-[14px] font-semibold transition-colors bg-white text-[#0A0A0A] hover:bg-[#F0F0F0]"
                style={{ boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}
              >
                Shop now →
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-14 px-7 text-[16px] rounded-[14px] font-semibold backdrop-blur-sm transition-colors text-white"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                View products
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-9 mt-12">
              {[
                { num: "240k+", lbl: "Licenses delivered" },
                { num: "4.9 / 5", lbl: "Average rating" },
                { num: "< 60s", lbl: "Avg. delivery time" },
              ].map(({ num, lbl }) => (
                <div key={lbl}>
                  <div className="text-[26px] font-extrabold text-white tracking-[-0.02em] tabular-nums">{num}</div>
                  <div className="text-[13px] text-[#93A2C0] mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating boxshots */}
          <div className="relative h-[480px] hidden lg:block">
            {/* Orb glow */}
            <div className="absolute inset-0 m-auto w-[380px] h-[380px] rounded-full" style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.10), transparent 60%)",
              filter: "blur(20px)",
            }} />

            {/* Left card — Antivirus Plus */}
            <div className="absolute" style={{ left: "12%", top: 130, transform: "rotate(-14deg)", width: 180, height: 240, opacity: 0.85 }}>
              <BoxShot product={av} small />
            </div>

            {/* Center card — Total Security (main) */}
            <div className="absolute" style={{ left: "50%", transform: "translateX(-50%) rotate(-6deg)", top: 80, zIndex: 2, width: 240, height: 320 }}>
              <BoxShot product={ts} tag="Most popular" />
            </div>

            {/* Right card — Internet Security */}
            <div className="absolute" style={{ right: "6%", top: 140, transform: "rotate(10deg)", width: 200, height: 270, opacity: 0.9 }}>
              <BoxShot product={is_} />
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 flex items-center justify-around gap-6 px-12 py-5 text-[#B0B0B0] text-[13px]" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.6)" }}>
        {[
          { icon: <Zap className="w-4 h-4 text-white" />, label: "Instant email delivery" },
          { icon: <Shield className="w-4 h-4 text-white" />, label: "Genuine, activatable keys" },
          { icon: <Lock className="w-4 h-4 text-white" />, label: "PayPal checkout" },
          { icon: <RefreshCw className="w-4 h-4 text-white" />, label: "30-day money back" },
          { icon: <MessageCircle className="w-4 h-4 text-white" />, label: "Live chat 7 days a week" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 font-medium">
            {icon}
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}

function BoxShot({ product, tag, small = false }: { product: HeroProduct; tag?: string; small?: boolean }) {
  return (
    <div
      className="rounded-[22px] p-5 text-white flex flex-col justify-between h-full overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #1A1A1A 0%, #000000 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Product image — fills upper portion */}
      <div className="relative w-full flex-1 mb-3" style={{ minHeight: small ? 100 : 140 }}>
        <Image
          src={`/images/products/${product.imageFile}`}
          alt={product.label.replace("\n", " ")}
          fill
          className="object-contain drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
          sizes="280px"
        />
      </div>

      {/* Tag */}
      {tag && (
        <div className="absolute top-4 right-4 text-[10px] tracking-[0.12em] text-white uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
          {tag}
        </div>
      )}

      {/* Info */}
      <div>
        <div className="text-[10px] tracking-[0.14em] text-[#888888] uppercase font-bold mb-0.5">
          {product.tier}
        </div>
        <div className={`font-extrabold leading-[1.15] ${small ? "text-[15px]" : "text-[18px]"}`} style={{ whiteSpace: "pre-line" }}>
          {product.label}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className={`font-extrabold ${small ? "text-[14px]" : "text-[18px]"}`}>{product.price}</div>
          <div className="text-[11px] text-[#888888]">{product.meta}</div>
        </div>
      </div>
    </div>
  )
}
