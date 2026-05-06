"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { toast } from "sonner"

export function ResendEmailButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleResend() {
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${orderId}?action=resend-email`, { method: "POST" })
      if (res.ok) {
        toast.success("Email resent successfully")
      } else {
        toast.error("Failed to resend email")
      }
    } catch {
      toast.error("Failed to resend email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleResend}
      disabled={loading}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Mail className="w-4 h-4" />
      {loading ? "Sending..." : "Resend Email"}
    </Button>
  )
}
