"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CourseAPI, type Course } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Plus, BookOpen, Calendar, FileText, ArrowRight } from "lucide-react"

export default function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const coursesData = await CourseAPI.getCourses()
        setCourses(coursesData)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses, weeks, and lessons</p>
        </div>
        <Link href="/admin/lessons/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Lesson
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="ml-4 text-lg text-gray-600">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No courses found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Create a course first before adding lessons.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.courseId} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>
                  {course.weekCount} {course.weekCount === 1 ? "Week" : "Weeks"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Course ID: {course.courseId}</span>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {course.description || "No description available"}
                </p>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-3">
                <Link href={`/admin/lessons/create?courseId=${encodeURIComponent(course.courseId)}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lesson to this Course
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Create Lesson
              </CardTitle>
              <CardDescription>Add a new lesson to any course</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create a new lesson with HTML content that will be displayed to students.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/lessons/create" className="w-full">
                <Button className="w-full">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Manage Weeks
              </CardTitle>
              <CardDescription>Organize your course weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create and manage weeks for your courses to organize your lessons.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/weeks" className="w-full">
                <Button variant="outline" className="w-full">
                  View Weeks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                View All Lessons
              </CardTitle>
              <CardDescription>See all lessons across courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse and manage all lessons from all courses in one place.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/lessons" className="w-full">
                <Button variant="outline" className="w-full">
                  View Lessons
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
