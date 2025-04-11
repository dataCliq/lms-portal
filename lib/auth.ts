import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// Secret key for JWT signing - in production, use environment variables
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-chars-long")

export type UserRole = "user" | "admin"

export interface UserSession {
  id: string
  email: string
  name: string
  role: UserRole
}

// Create a JWT token
export async function createToken(user: UserSession): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d") // Token expires in 1 day
    .sign(JWT_SECRET)
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as UserSession
  } catch (error) {
    return null
  }
}

// Get the current user session
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

// Check if the current user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

// Check if the current user is an admin
export async function isAdmin(): Promise<boolean> {
  const session = await getSession()
  return session?.role === "admin"
}

// Middleware to protect admin routes
export async function adminMiddleware(request: NextRequest) {
  const session = await getSession()

  if (!session || session.role !== "admin") {
    const url = request.nextUrl.clone()
    url.pathname = "/signin"
    url.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
