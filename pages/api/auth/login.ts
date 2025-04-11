import type { NextApiRequest, NextApiResponse } from "next"
import { createToken } from "@/lib/auth"
import { serialize } from "cookie"

// Mock user database - in a real app, you would use your database
const USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123", // In production, use hashed passwords
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user",
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { email, password } = req.body

    // Find user by email
    const user = USERS.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Create session token
    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "user" | "admin",
    })

    // Set cookie
    res.setHeader(
      "Set-Cookie",
      serialize("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 1 day
        path: "/",
      }),
    )

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = user
    return res.status(200).json(userWithoutPassword)
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
