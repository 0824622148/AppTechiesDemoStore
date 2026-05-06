import Link from "next/link"
import { Shield, Globe, Lock, Users, Apple, Smartphone, Key, Building, Wifi } from "lucide-react"

const categories = [
  { label: "Antivirus", href: "/shop?category=ANTIVIRUS", icon: Shield },
  { label: "Internet Security", href: "/shop?category=INTERNET_SECURITY", icon: Globe },
  { label: "Total Security", href: "/shop?category=TOTAL_SECURITY", icon: Lock },
  { label: "Family Pack", href: "/shop?category=FAMILY_PACK", icon: Users },
  { label: "Mac Security", href: "/shop?category=MAC", icon: Apple },
  { label: "Mobile Security", href: "/shop?category=MOBILE_SECURITY", icon: Smartphone },
  { label: "Password Manager", href: "/shop?category=PASSWORD_MANAGER", icon: Key },
  { label: "Small Office", href: "/shop?category=SOHO", icon: Building },
  { label: "VPN", href: "/shop?category=VPN", icon: Wifi },
]

export function CategoryStrip() {
  return (
    <section className="border-y border-slate-200 bg-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide snap-x">
          {categories.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 min-w-[80px] snap-start group"
            >
              <div className="w-14 h-14 rounded-full border-2 border-slate-200 group-hover:border-[#1e6ef5] flex items-center justify-center bg-white transition-colors duration-200">
                <Icon className="w-6 h-6 text-slate-600 group-hover:text-[#1e6ef5] transition-colors" />
              </div>
              <span className="text-xs font-medium text-slate-700 text-center leading-tight whitespace-nowrap">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
