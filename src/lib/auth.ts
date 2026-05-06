import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const admin = await db.adminUser.findUnique({
          where: { email: credentials.email as string },
        })
        if (!admin) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        )
        if (!valid) return null

        return { id: admin.id, email: admin.email }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
})
