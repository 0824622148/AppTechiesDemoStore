"use client"

export function NewsletterForm() {
  return (
    <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="h-11 px-4 rounded-[10px] text-[13.5px] text-white placeholder-[#555555] outline-none focus:ring-1 focus:ring-white/30"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
      />
      <button
        type="submit"
        className="h-11 rounded-[10px] bg-white text-[#0A0A0A] text-[13.5px] font-semibold hover:bg-[#F0F0F0] transition-colors cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  )
}
