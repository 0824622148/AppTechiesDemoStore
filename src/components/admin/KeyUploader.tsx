"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface KeyUploaderProps {
  products: { id: string; name: string }[]
}

export function KeyUploader({ products }: KeyUploaderProps) {
  const [productId, setProductId] = useState("")
  const [keysText, setKeysText] = useState("")
  const [loading, setLoading] = useState(false)

  const keyCount = keysText
    .split("\n")
    .map((k) => k.trim())
    .filter(Boolean).length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!productId) {
      toast.error("Select a product first")
      return
    }
    if (keyCount === 0) {
      toast.error("Enter at least one license key")
      return
    }

    setLoading(true)
    const keys = keysText
      .split("\n")
      .map((k) => k.trim())
      .filter(Boolean)

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, keys }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Uploaded ${data.inserted} keys. ${data.duplicates} duplicates skipped.`)
        setKeysText("")
        setProductId("")
      } else {
        toast.error("Upload failed")
      }
    } catch {
      toast.error("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <Label htmlFor="product" className="text-slate-700 mb-1.5">
          Select Product
        </Label>
        <select
          id="product"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1e6ef5]"
        >
          <option value="">Choose a product...</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="keys" className="text-slate-700 mb-1.5">
          License Keys (one per line)
        </Label>
        <Textarea
          id="keys"
          value={keysText}
          onChange={(e) => setKeysText(e.target.value)}
          placeholder={"XXXX-XXXX-XXXX-XXXX\nYYYY-YYYY-YYYY-YYYY\n..."}
          rows={8}
          className="font-mono text-xs"
        />
        {keyCount > 0 && (
          <p className="text-xs text-slate-500 mt-1">{keyCount} key{keyCount !== 1 ? "s" : ""} ready to upload</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading || keyCount === 0 || !productId}
        className="bg-[#1e6ef5] hover:bg-[#1558c8] text-white"
      >
        {loading ? "Uploading..." : `Upload ${keyCount > 0 ? keyCount + " " : ""}Keys`}
      </Button>
    </form>
  )
}
