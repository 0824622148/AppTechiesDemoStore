const testimonials = [
  {
    quote: "Ordered at 11pm, key in inbox by 11:01pm. Activated on three machines in five minutes flat. Worth every cent.",
    name: "Marcus R.",
    role: "Home user · Verified buyer",
    initials: "MR",
  },
  {
    quote: "We run a six-person accounting firm. App Techies got our whole office covered for less than what one big-box renewal costs. Real humans answered our chat at 8am.",
    name: "Priya S.",
    role: "Founder · Verified buyer",
    initials: "PS",
  },
  {
    quote: "I'm not technical at all. Their walkthrough video had me protected in under ten minutes. Renewing without a second thought.",
    name: "David L.",
    role: "Family plan · Verified buyer",
    initials: "DL",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F7F7]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-10">
          <span className="inline-block px-3 py-1.5 rounded-full bg-[#0A0A0A] text-white text-[12px] font-bold tracking-[0.08em] uppercase">
            Trusted by 240,000+
          </span>
          <h2 className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-0 text-[#0A0A0A]">
            Customers say it best.
          </h2>
        </div>

        {/* Score summary */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="text-[56px] font-extrabold tracking-[-0.03em] text-[#0A0A0A] tabular-nums leading-none">4.9</div>
          <div>
            <div className="text-[18px] text-[#0A0A0A] tracking-[2px]">★★★★★</div>
            <div className="text-[#6B6B6B] text-[13.5px] mt-1">Based on 12,847 verified reviews on Trustpilot</div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="bg-white flex flex-col gap-[18px]"
              style={{ border: "1px solid #E4E4E4", borderRadius: 20, padding: 28 }}
            >
              <div className="text-[16px] text-[#0A0A0A] tracking-[2px]">★★★★★</div>
              <blockquote className="m-0 text-[16px] leading-[1.6] text-[#0A0A0A]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-[42px] h-[42px] rounded-full grid place-items-center text-white font-bold text-[14px] flex-shrink-0"
                  style={{ background: "#0A0A0A" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-[14px] text-[#0A0A0A]">{t.name}</div>
                  <div className="text-[#6B6B6B] text-[12.5px]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
