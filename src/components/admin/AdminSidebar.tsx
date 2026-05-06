"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Package, Key, ShoppingBag, LogOut, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
  { href: "/admin/products", label: "Products", icon: Package, exact: false },
  { href: "/admin/keys", label: "License Keys", icon: Key, exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-[#0a1628] min-h-screen flex flex-col">
      {/* Brand */}
      <div className="p-5 border-b border-[#1a3256]">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#1e6ef5]" />
          <span className="text-white font-bold">App Techies</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#1e6ef5] text-white"
                  : "text-slate-400 hover:text-white hover:bg-[#1a3256]"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-[#1a3256]">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-[#1a3256] w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
