import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Portal | Course Management",
  description: "Admin portal for managing courses, weeks, and lessons",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6" />
          <span className="hidden md:inline-block">Course Admin Portal</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/admin/courses" className="text-sm font-medium hover:underline underline-offset-4">
            Courses
          </Link>
          <Link href="/admin/weeks" className="text-sm font-medium hover:underline underline-offset-4">
            Weeks
          </Link>
          <Link href="/admin/lessons" className="text-sm font-medium hover:underline underline-offset-4">
            Lessons
          </Link>
        </nav>
      </header>
      <div className="flex-1">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </div>
      <footer className="border-t py-4 px-6">
        <div className="container mx-auto flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Course Admin Portal</p>
        </div>
      </footer>
    </div>
  )
}
