import type { NextApiRequest, NextApiResponse } from "next"
import { createToken } from "@/lib/auth"
import { serialize } from "cookie"

// Mock user database - in a real app, you would use your database
const USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
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
    const { email, password, name } = req.body

    // Check if user already exists
    if (USERS.some((u) => u.email === email)) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Create new user (always as regular user)
    const newUser = {
      id: String(USERS.length + 1),
      email,
      password,
      name,
      role: "user",
    }

    // In a real app, you would save to database
    USERS.push(newUser)

    // Create session token
    const token = await createToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role as "user" | "admin",
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
    const { password: _, ...userWithoutPassword } = newUser
    return res.status(201).json(userWithoutPassword)
  } catch (error) {
    console.error("Registration error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
