import Link from "next/link"
import Image from "next/image"
import { NewsletterForm } from "./NewsletterForm"

const productLinks = [
  ["Antivirus Plus", "/shop?category=ANTIVIRUS"],
  ["Internet Security", "/shop?category=INTERNET_SECURITY"],
  ["Total Security", "/shop?category=TOTAL_SECURITY"],
  ["Family Pack", "/shop?category=FAMILY_PACK"],
  ["Mac Security", "/shop?category=MAC"],
  ["Mobile Security", "/shop?category=MOBILE_SECURITY"],
  ["VPN", "/shop?category=VPN"],
  ["Password Manager", "/shop?category=PASSWORD_MANAGER"],
]

const supportLinks = [
  ["All Products", "/shop"],
  ["Installation Guides", "/support"],
  ["Contact Support", "mailto:support@apptechies.co.za"],
  ["Live Chat", "mailto:support@apptechies.co.za"],
]

const companyLinks = [
  ["About Us", "/about"],
  ["Blog", "/blog"],
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
  ["Refund Policy", "/refunds"],
]

export function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.8fr] gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex mb-5">
              <Image
                src="/images/logo/logo.png"
                alt="App Techies"
                width={130}
                height={48}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-[13.5px] text-[#888888] leading-[1.65] max-w-[280px]">
              Genuine Bitdefender licenses, delivered instantly to your inbox. Authorized reseller serving South Africa since 2018.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="text-[20px] text-white tracking-[2px]">★★★★★</div>
              <div>
                <div className="text-white text-[13px] font-semibold">4.9 / 5</div>
                <div className="text-[#666666] text-[11.5px]">12,847 reviews</div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[0.1em] mb-4">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[#888888] hover:text-white text-[13.5px] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[0.1em] mb-4">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[#888888] hover:text-white text-[13.5px] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[0.1em] mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[#888888] hover:text-white text-[13.5px] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[0.1em] mb-4">Stay in the loop</h4>
            <p className="text-[#888888] text-[13.5px] leading-[1.6] mb-4">
              Get notified about new products, limited-time offers, and security tips.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-[#555555]" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span>© {new Date().getFullYear()} App Techies. All rights reserved.</span>
          <span>Secure payments powered by PayPal · PCI-DSS compliant</span>
        </div>
      </div>
    </footer>
  )
}
