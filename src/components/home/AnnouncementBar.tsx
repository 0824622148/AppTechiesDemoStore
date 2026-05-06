import { Zap } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div
      className="flex items-center justify-center gap-0 h-[38px] text-[#C8C8C8] text-[12.5px] tracking-[0.01em]"
      style={{ background: "linear-gradient(90deg, #000000 0%, #1A1A1A 50%, #000000 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
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
  )
}

function Dot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-2.5"
      style={{ boxShadow: "0 0 8px rgba(255,255,255,0.5)" }}
    />
  )
}
