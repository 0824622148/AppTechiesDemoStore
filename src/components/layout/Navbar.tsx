"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Search, User, Menu, X } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=ANTIVIRUS", label: "Home Use" },
  { href: "/shop?category=FAMILY_PACK", label: "Family" },
  { href: "/shop?category=SOHO", label: "Small Business" },
  { href: "mailto:support@apptechies.co.za", label: "Support" },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/shop?q=${encodeURIComponent(q)}`)
  }

  return (
    <nav className="bg-white border-b border-[#E4E4E4] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
        {/* Left: brand + nav links */}
        <div className="flex items-center gap-7 flex-1">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="App Techies"
              width={140}
              height={52}
              className="object-contain"
              priority
            />
          </Link>
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2E2E2E] hover:text-[#0A0A0A] text-[14.5px] font-medium transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: search + icons */}
        <div className="hidden md:flex items-center gap-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2 h-[42px] px-3.5 bg-[#F0F0F0] border border-[#E4E4E4] rounded-full w-72 text-[#6B6B6B] text-sm">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, plans, devices…"
              className="bg-transparent flex-1 outline-none text-[#0A0A0A] placeholder-[#9A9A9A]"
            />
          </form>

          <button className="w-[42px] h-[42px] rounded-full grid place-items-center bg-[#F0F0F0] border border-[#E4E4E4] text-[#2E2E2E] hover:bg-[#E6E6E6] transition-colors" aria-label="Account">
            <User className="w-[18px] h-[18px]" />
          </button>

          <Link href="/cart" className="w-[42px] h-[42px] rounded-full grid place-items-center bg-[#F0F0F0] border border-[#E4E4E4] text-[#2E2E2E] hover:bg-[#E6E6E6] transition-colors relative" aria-label="Cart">
            <ShoppingCart className="w-[18px] h-[18px]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0A0A0A] text-white text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/cart" className="relative p-2 text-[#2E2E2E]">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#2E2E2E]" aria-label="Menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E4E4E4] bg-white">
          <form onSubmit={handleSearch} className="px-4 py-3">
            <div className="flex items-center gap-2 h-10 px-3 bg-[#F0F0F0] border border-[#E4E4E4] rounded-full text-sm">
              <Search className="w-4 h-4 text-[#9A9A9A]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="bg-transparent flex-1 outline-none text-[#0A0A0A] placeholder-[#9A9A9A]"
              />
            </div>
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3 text-[#2E2E2E] hover:bg-[#F7F7F7] text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
