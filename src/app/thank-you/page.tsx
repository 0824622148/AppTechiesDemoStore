import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CheckCircle, Mail, Download } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Order Confirmed!" }

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { order } = await searchParams

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4 bg-slate-50">
        <div className="max-w-lg w-full text-center">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-[#0a1628] mb-3">Order Confirmed!</h1>
          {order && (
            <p className="text-slate-500 mb-2">
              Order <span className="font-mono font-semibold text-[#0a1628]">#{order}</span>
            </p>
          )}
          <p className="text-slate-600 text-lg mb-8">
            Your payment was successful. Check your email — your license key is on its way!
          </p>

          {/* Steps */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-bold text-[#0a1628] mb-4">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#0a1628] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Check your inbox</p>
                  <p className="text-sm text-slate-500">
                    Your license key has been sent to your email address.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#1e6ef5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Download Bitdefender</p>
                  <p className="text-sm text-slate-500">
                    Use the download link in your email to install the software.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#1e6ef5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Enter your license key</p>
                  <p className="text-sm text-slate-500">
                    Activate Bitdefender with the key from your email and enjoy full protection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className={buttonVariants({ className: "bg-[#1e6ef5] hover:bg-[#1558c8] text-white" })}>
              Buy Another License
            </Link>
            <a href="mailto:support@apptechies.co.za" className={buttonVariants({ variant: "outline" })}>
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
