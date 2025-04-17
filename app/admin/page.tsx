import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Layers, FileText } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the course management admin portal.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Courses</div>
            <p className="text-xs text-muted-foreground">Create, edit, and delete courses</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/courses" className="w-full">
              <Button className="w-full">View Courses</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weeks</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Weeks</div>
            <p className="text-xs text-muted-foreground">Organize course content by weeks</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/weeks" className="w-full">
              <Button className="w-full">View Weeks</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Lessons</div>
            <p className="text-xs text-muted-foreground">Create and edit lesson content</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/lessons" className="w-full">
              <Button className="w-full">View Lessons</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for course management</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/courses/new" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/weeks/new" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Layers className="mr-2 h-4 w-4" />
                  Add New Week
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/lessons/new" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Lesson
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Course management statistics</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Courses</span>
              </div>
              <span className="text-sm font-medium">Loading...</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Weeks</span>
              </div>
              <span className="text-sm font-medium">Loading...</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Lessons</span>
              </div>
              <span className="text-sm font-medium">Loading...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
