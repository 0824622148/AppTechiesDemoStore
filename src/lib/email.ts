import { Resend } from "resend"
import { render } from "@react-email/render"
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "placeholder")
}

export interface OrderEmailItem {
  productName: string
  licenseKey: string
  downloadUrl: string
}

export async function sendOrderConfirmationEmail(params: {
  to: string
  customerName: string
  orderNumber: string
  total: number
  items: OrderEmailItem[]
}): Promise<void> {
  const html = await render(
    OrderConfirmationEmail({
      customerName: params.customerName,
      orderNumber: params.orderNumber,
      total: params.total,
      items: params.items,
    })
  )

  const { error } = await getResend().emails.send({
    from: process.env.EMAIL_FROM ?? "App Techies <orders@apptechies.co.za>",
    replyTo: process.env.EMAIL_REPLY_TO ?? "support@apptechies.co.za",
    to: params.to,
    subject: `Your App Techies Order #${params.orderNumber} — License Key Inside`,
    html,
  })

  if (error) {
    throw new Error(`Email send failed: ${error.message}`)
  }
}
