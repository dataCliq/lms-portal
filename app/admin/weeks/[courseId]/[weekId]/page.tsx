"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { type Course, CourseAPI, type Week, WeekAPI } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"

export default function EditWeekPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const weekId = Number.parseInt(params.weekId as string)

  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [formData, setFormData] = useState<Partial<Week>>({
    courseId: "",
    weekId: 0,
    slug: "",
    lessonCount: 0,
    lessonList: [],
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseAPI.getCourses()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        toast({
          title: "Error",
          description: "Failed to fetch courses",
          variant: "destructive",
        })
      }
    }

    const fetchWeek = async () => {
      try {
        const data = await WeekAPI.getWeek(courseId, weekId)
        setFormData({
          courseId: data.courseId,
          weekId: data.weekId,
          slug: data.slug,
          lessonCount: data.lessonCount || 0,
          lessonList: data.lessonList || [],
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      } catch (error) {
        console.error("Failed to fetch week:", error)
        toast({
          title: "Error",
          description: "Failed to fetch week data",
          variant: "destructive",
        })
        router.push("/admin/weeks")
      }
    }

    fetchCourses()
    fetchWeek()
  }, [courseId, weekId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "lessonCount" || name === "weekId" ? Number.parseInt(value) : value,
    }))
  }

  const handleCourseChange = (courseId: string) => {
    setFormData((prev) => ({ ...prev, courseId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.courseId || !formData.weekId || !formData.slug) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await WeekAPI.updateWeek(formData as Week)
      toast({
        title: "Week updated",
        description: `Week ${formData.weekId} has been updated successfully.`,
      })
      router.push(`/admin/weeks?courseId=${encodeURIComponent(formData.courseId!)}`)
    } catch (error) {
      console.error("Failed to update week:", error)
      toast({
        title: "Failed to update week",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/weeks">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Week</h1>
          <p className="text-muted-foreground">Update week details for the course.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Week Information</CardTitle>
            <CardDescription>Update the information for this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseId">
                Course <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.courseId} onValueChange={handleCourseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weekId">
                  Week Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="weekId"
                  name="weekId"
                  type="number"
                  min="1"
                  value={formData.weekId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="e.g., w1"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">URL-friendly identifier for the week.</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonCount">
                Lesson Count <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lessonCount"
                name="lessonCount"
                type="number"
                min="0"
                value={formData.lessonCount}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">Number of lessons in this week.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/weeks">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>Updating...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Week
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}