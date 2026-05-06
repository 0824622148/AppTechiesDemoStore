import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "App Techies — Bitdefender Licenses",
    template: "%s | App Techies",
  },
  description:
    "Buy genuine Bitdefender antivirus and security software licenses. Instant digital delivery. Trusted cybersecurity for home and business.",
  keywords: ["Bitdefender", "antivirus", "internet security", "cybersecurity", "license"],
  openGraph: {
    siteName: "App Techies",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <CartProvider>
          {children}
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  )
}
