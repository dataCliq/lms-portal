import type React from "react"
import Link from "next/link"
import { BookOpen, FileEdit, Plus, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the DataCliq admin portal.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Course Content"
          description="Manage your course lessons and materials"
          icon={<BookOpen className="h-5 w-5" />}
          href="/admin/content"
          cta="Manage Content"
        />
        <DashboardCard
          title="Users"
          description="View and manage user accounts"
          icon={<Users className="h-5 w-5" />}
          href="/admin/users"
          cta="Manage Users"
        />
        <DashboardCard
          title="Create New Lesson"
          description="Add a new lesson to your courses"
          icon={<Plus className="h-5 w-5" />}
          href="/admin/content/new"
          cta="Create Lesson"
          primary
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="rounded-lg border bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2">
                <FileEdit className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">SQL Course - Week 2 updated</p>
                <p className="text-sm text-gray-500">Updated 2 hours ago</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-2">
                <Plus className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Python Course - Week 3 added</p>
                <p className="text-sm text-gray-500">Created 1 day ago</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2">
                <FileEdit className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Data Visualization - Week 1 updated</p>
                <p className="text-sm text-gray-500">Updated 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  href,
  cta,
  primary = false,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  cta: string
  primary?: boolean
}) {
  return (
    <div className="rounded-lg border bg-white">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className={`rounded-full p-2 ${primary ? "bg-blue-100" : "bg-gray-100"}`}>{icon}</div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <Link
          href={href}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors 
            ${
              primary
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100"
            }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  )
}
