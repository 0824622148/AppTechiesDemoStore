import { Zap } from "lucide-react"

function Dot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-2.5 flex-shrink-0"
      style={{ boxShadow: "0 0 8px rgba(255,255,255,0.5)" }}
    />
  )
}

export function AnnouncementBar() {
  return (
    <div
      className="h-[38px] text-[#C8C8C8] text-[12.5px] tracking-[0.01em] overflow-hidden"
      style={{ background: "linear-gradient(90deg, #000000 0%, #1A1A1A 50%, #000000 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Mobile: single centred message */}
      <div className="flex md:hidden items-center justify-center h-full gap-1.5 px-4">
        <Zap className="w-3.5 h-3.5 text-white flex-shrink-0" />
        <span className="truncate">Instant delivery · Authorized reseller · 30-day guarantee</span>
      </div>

      {/* Desktop: full strip */}
      <div className="hidden md:flex items-center justify-center h-full gap-0">
        <Zap className="w-3.5 h-3.5 text-white mr-2" />
        Instant digital delivery
        <Dot />
        Authorized reseller
        <Dot />
        30-day money-back guarantee
        <Dot />
        <a href="mailto:support@apptechies.co.za" className="text-white font-medium hover:underline">
          Need help? Chat with us →
        </a>
      </div>
    </div>
  )
}
