import { PrismaClient } from "@/generated/prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import path from "path"
import fs from "fs"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function getDbPath(): string {
  if (process.env.NODE_ENV === "production") {
    // Vercel: /var/task is read-only; copy bundled db to writable /tmp once
    const src = path.join(process.cwd(), "dev.db")
    const dest = "/tmp/app.db"
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest)
    }
    return `file:${dest}`
  }
  return "file:./dev.db"
}

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: getDbPath() })
  return new PrismaClient({ adapter })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
