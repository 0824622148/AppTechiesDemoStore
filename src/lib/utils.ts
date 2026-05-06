import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return `R ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function generateOrderNumber(): string {
  const date = new Date()
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `AT-${datePart}-${rand}`
}
