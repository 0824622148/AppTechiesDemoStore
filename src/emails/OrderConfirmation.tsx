import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Preview,
} from "@react-email/components"
import { formatPrice } from "@/lib/utils"

interface OrderItem {
  productName: string
  licenseKey: string
  downloadUrl: string
}

interface OrderConfirmationEmailProps {
  customerName: string
  orderNumber: string
  total: number
  items: OrderItem[]
}

export function OrderConfirmationEmail({
  customerName,
  orderNumber,
  total,
  items,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your App Techies order #{orderNumber} — license key inside</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandName}>App Techies</Text>
            <Text style={tagline}>Powered by Bitdefender</Text>
          </Section>

          {/* Greeting */}
          <Section style={contentSection}>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Thank you for your purchase! Your payment was successful and your license
              key(s) are ready below.
            </Text>
            <Text style={orderRef}>Order #{orderNumber}</Text>
          </Section>

          <Hr style={divider} />

          {/* License Keys */}
          <Section style={contentSection}>
            <Text style={sectionTitle}>🔑 Your License Key(s)</Text>
            {items.map((item, i) => (
              <Section key={i} style={keyCard}>
                <Text style={productName}>{item.productName}</Text>
                <Text style={keyLabel}>License Key:</Text>
                <Text style={keyValue}>{item.licenseKey}</Text>
                <Link href={item.downloadUrl} style={downloadButton}>
                  Download Bitdefender →
                </Link>
              </Section>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Installation Steps */}
          <Section style={contentSection}>
            <Text style={sectionTitle}>📋 How to Activate</Text>
            <Text style={step}>1. Click the download link above to get Bitdefender</Text>
            <Text style={step}>2. Install the software on your device</Text>
            <Text style={step}>3. Open the app and click "Enter License Key"</Text>
            <Text style={step}>4. Copy and paste your license key from above</Text>
            <Text style={step}>5. Click Activate — you're protected!</Text>
          </Section>

          <Hr style={divider} />

          {/* Order Summary */}
          <Section style={contentSection}>
            <Text style={sectionTitle}>📄 Order Summary</Text>
            {items.map((item, i) => (
              <Text key={i} style={summaryRow}>
                {item.productName}
              </Text>
            ))}
            <Hr style={thinDivider} />
            <Text style={totalRow}>Total Charged: {formatPrice(total)}</Text>
          </Section>

          <Hr style={divider} />

          {/* Support */}
          <Section style={footerSection}>
            <Text style={supportText}>
              Questions? Email us at{" "}
              <Link href="mailto:support@apptechies.co.za" style={link}>
                support@apptechies.co.za
              </Link>
            </Text>
            <Text style={footerNote}>
              © {new Date().getFullYear()} App Techies. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: "#f0f4f8",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
}

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
}

const header: React.CSSProperties = {
  backgroundColor: "#0a1628",
  padding: "24px 32px",
  textAlign: "center",
}

const brandName: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
}

const tagline: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "13px",
  margin: "4px 0 0",
}

const contentSection: React.CSSProperties = {
  padding: "24px 32px",
}

const greeting: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#0a1628",
  margin: "0 0 8px",
}

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  color: "#475569",
  lineHeight: "1.6",
  margin: "0 0 12px",
}

const orderRef: React.CSSProperties = {
  fontSize: "13px",
  color: "#94a3b8",
  margin: "0",
}

const sectionTitle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#0a1628",
  margin: "0 0 16px",
}

const keyCard: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "12px",
}

const productName: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#0a1628",
  margin: "0 0 8px",
}

const keyLabel: React.CSSProperties = {
  fontSize: "12px",
  color: "#64748b",
  margin: "0 0 4px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}

const keyValue: React.CSSProperties = {
  fontSize: "16px",
  fontFamily: "monospace",
  color: "#1e6ef5",
  fontWeight: "700",
  letterSpacing: "0.1em",
  backgroundColor: "#eff6ff",
  padding: "8px 12px",
  borderRadius: "4px",
  margin: "0 0 12px",
  display: "inline-block",
}

const downloadButton: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#1e6ef5",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
}

const step: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  margin: "0 0 8px",
  lineHeight: "1.5",
}

const summaryRow: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  margin: "0 0 4px",
}

const totalRow: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#0a1628",
  margin: "8px 0 0",
}

const divider: React.CSSProperties = {
  borderColor: "#e2e8f0",
  margin: "0",
}

const thinDivider: React.CSSProperties = {
  borderColor: "#f1f5f9",
  margin: "8px 0",
}

const footerSection: React.CSSProperties = {
  padding: "16px 32px 24px",
  textAlign: "center",
}

const supportText: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  margin: "0 0 8px",
}

const link: React.CSSProperties = {
  color: "#1e6ef5",
}

const footerNote: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "0",
}
