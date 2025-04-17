"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { type Course, CourseAPI, type Week, WeekAPI, type Lesson, LessonAPI } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"

export default function EditLessonPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const weekId = Number.parseInt(params.weekId as string)
  const lessonId = Number.parseInt(params.lessonId as string)

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])
  const [weeks, setWeeks] = useState<Week[]>([])
  const [formData, setFormData] = useState<Partial<Lesson>>({
    courseId: "",
    weekId: 0,
    lessonId: 0,
    title: "",
    content: "",
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

    const fetchWeeks = async () => {
      if (!courseId) return
      try {
        const data = await WeekAPI.getWeeks(courseId)
        setWeeks(data)
      } catch (error) {
        console.error("Failed to fetch weeks:", error)
        toast({
          title: "Error",
          description: "Failed to fetch weeks",
          variant: "destructive",
        })
      }
    }

    const fetchLesson = async () => {
      try {
        const data = await LessonAPI.getLesson(courseId, weekId, lessonId)
        setFormData({
          courseId: data.courseId,
          weekId: data.weekId,
          lessonId: data.lessonId,
          title: data.title,
          content: data.content,
        })
      } catch (error) {
        console.error("Failed to fetch lesson:", error)
        toast({
          title: "Error",
          description: "Failed to fetch lesson data",
          variant: "destructive",
        })
        router.push("/admin/lessons")
      } finally {
        setFetching(false)
      }
    }

    fetchCourses()
    fetchWeeks()
    fetchLesson()
  }, [courseId, weekId, lessonId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "lessonId" ? Number.parseInt(value) : value,
    }))
  }

  const handleCourseChange = (courseId: string) => {
    setFormData((prev) => ({ ...prev, courseId, weekId: 0 }))
    setWeeks([])
    WeekAPI.getWeeks(courseId)
      .then((data) => {
        setWeeks(data)
      })
      .catch((error) => {
        console.error("Failed to fetch weeks for new course:", error)
        toast({
          title: "Error",
          description: "Failed to fetch weeks",
          variant: "destructive",
        })
      })
  }

  const handleWeekChange = (weekId: string) => {
    setFormData((prev) => ({ ...prev, weekId: Number.parseInt(weekId) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.courseId || !formData.weekId || !formData.lessonId || !formData.title) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await LessonAPI.updateLesson(formData as Lesson)
      toast({
        title: "Lesson updated",
        description: "The lesson has been updated successfully.",
      })
      router.push("/admin/lessons")
    } catch (error) {
      console.error("Failed to update lesson:", error)
      toast({
        title: "Failed to update lesson",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="ml-4 text-lg text-gray-600">Loading lesson...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/admin/lessons/${encodeURIComponent(courseId)}/${weekId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Lesson</h1>
          <p className="text-muted-foreground">Update lesson details for the course.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Lesson Information</CardTitle>
            <CardDescription>Update the information for this lesson.</CardDescription>
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

            <div className="space-y-2">
              <Label htmlFor="weekId">
                Week <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.weekId?.toString()}
                onValueChange={handleWeekChange}
                disabled={!formData.courseId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a week" />
                </SelectTrigger>
                <SelectContent>
                  {weeks.map((week) => (
                    <SelectItem key={week.weekId} value={week.weekId.toString()}>
                      Week {week.weekId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonId">
                Lesson Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lessonId"
                name="lessonId"
                type="number"
                min="1"
                value={formData.lessonId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Introduction to SQL"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Enter lesson content..."
                value={formData.content}
                onChange={handleChange}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">Optional content for the lesson.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/admin/lessons/${encodeURIComponent(courseId)}/${weekId}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>Updating...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Lesson
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}