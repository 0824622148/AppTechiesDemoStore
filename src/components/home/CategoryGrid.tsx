import Link from "next/link"
import { Shield, Globe, Lock, Users, Apple, Smartphone, Key, Building, Wifi } from "lucide-react"

const categories = [
  { label: "Antivirus", href: "/shop?category=ANTIVIRUS", icon: Shield, desc: "Essential PC protection" },
  { label: "Internet Security", href: "/shop?category=INTERNET_SECURITY", icon: Globe, desc: "Firewall + parental controls" },
  { label: "Total Security", href: "/shop?category=TOTAL_SECURITY", icon: Lock, desc: "Multi-device, all platforms" },
  { label: "Family Pack", href: "/shop?category=FAMILY_PACK", icon: Users, desc: "Up to 15 devices" },
  { label: "Mac Security", href: "/shop?category=MAC", icon: Apple, desc: "Optimised for macOS" },
  { label: "Mobile Security", href: "/shop?category=MOBILE_SECURITY", icon: Smartphone, desc: "Android & iOS protection" },
  { label: "Password Manager", href: "/shop?category=PASSWORD_MANAGER", icon: Key, desc: "Secure your passwords" },
  { label: "Small Office", href: "/shop?category=SOHO", icon: Building, desc: "Business-grade security" },
  { label: "VPN", href: "/shop?category=VPN", icon: Wifi, desc: "Private, encrypted browsing" },
]

export function CategoryGrid() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0a1628] text-center mb-2">
          Browse by Category
        </h2>
        <p className="text-slate-500 text-center mb-8">
          Find the right protection for every device and every need
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {categories.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#1e6ef5] hover:shadow-md transition-all duration-200 group text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0a1628] flex items-center justify-center group-hover:bg-[#1e6ef5] transition-colors">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-sm text-slate-800">{label}</span>
              <span className="text-xs text-slate-500">{desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
