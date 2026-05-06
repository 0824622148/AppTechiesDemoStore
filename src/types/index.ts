import type { Category, OrderStatus } from "@/generated/prisma/enums"

export type { Category, OrderStatus }

export interface CartItem {
  productId: string
  slug: string
  name: string
  imageFile: string
  price: number
  quantity: number
}

export interface ProductSummary {
  id: string
  slug: string
  name: string
  shortName: string
  category: Category
  devices: number | null
  months: number | null
  price: number
  comparePrice: number | null
  imageFile: string
  features: string[]
  platforms: string[]
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
  description: string
}

export interface OrderSummaryItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface CreateOrderPayload {
  cartItems: CartItem[]
  customerEmail: string
  customerName: string
}

export interface CaptureOrderPayload {
  paypalOrderId: string
  orderId: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  ANTIVIRUS: "Antivirus",
  INTERNET_SECURITY: "Internet Security",
  TOTAL_SECURITY: "Total Security",
  FAMILY_PACK: "Family Pack",
  MAC: "Mac Security",
  MOBILE_SECURITY: "Mobile Security",
  PASSWORD_MANAGER: "Password Manager",
  SOHO: "Small Office",
  VPN: "VPN",
}
