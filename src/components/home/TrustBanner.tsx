import { Zap, Award, Lock, Sparkles } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant digital delivery",
    desc: "Your license key lands in your inbox the moment payment clears. Average delivery time: 47 seconds.",
  },
  {
    icon: Award,
    title: "Official licenses only",
    desc: "Every key is sourced through authorized partner channels. Activate directly with the vendor — never grey-market.",
  },
  {
    icon: Lock,
    title: "Secure checkout",
    desc: "PCI-DSS compliant payments, SSL throughout, and PayPal Buyer Protection on every transaction.",
  },
  {
    icon: Sparkles,
    title: "Easy installation",
    desc: "Step-by-step guides, one-click installers, and free help from real humans if anything snags.",
  },
]

export function TrustBanner() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F7F7]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <span className="inline-block px-3 py-1.5 rounded-full bg-[#0A0A0A] text-white text-[12px] font-bold tracking-[0.08em] uppercase">
            Why App Techies
          </span>
          <h2 className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3 text-[#0A0A0A]" style={{ textWrap: "balance" } as React.CSSProperties}>
            Premium software, without the friction.
          </h2>
          <p className="text-[17px] text-[#6B6B6B] leading-[1.6]">
            We&apos;re a small team obsessed with one thing: getting you protected in under five minutes — for less.
          </p>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative bg-white overflow-hidden"
              style={{ border: "1px solid #E4E4E4", borderRadius: 20, padding: 28 }}
            >
              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%)" }} />

              <div
                className="w-14 h-14 rounded-[16px] grid place-items-center text-white mb-[18px]"
                style={{ background: "#0A0A0A", border: "1px solid #0A0A0A" }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold tracking-[-0.01em] text-[#0A0A0A] mb-2">{title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-[1.55] m-0">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
