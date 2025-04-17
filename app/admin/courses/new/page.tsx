"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { type Course, CourseAPI, type Week, WeekAPI, type Lesson } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"

export default function NewLessonPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCourseId = searchParams.get("courseId") || ""
  const initialWeekId = searchParams.get("weekId") ? Number.parseInt(searchParams.get("weekId")!) : 0

  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [weeks, setWeeks] = useState<Week[]>([])
  const [formData, setFormData] = useState<Partial<Lesson>>({
    courseId: initialCourseId,
    weekId: initialWeekId,
    lessonId: 1,
    title: "",
    content: "",
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseAPI.getCourses()
        setCourses(data)
        if (!initialCourseId && data.length > 0) {
          setFormData((prev) => ({ ...prev, courseId: data[0].courseId }))
        }
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
      if (!formData.courseId) return
      try {
        const data = await WeekAPI.getWeeks(formData.courseId)
        setWeeks(data)
        if (!initialWeekId && data.length > 0) {
          setFormData((prev) => ({ ...prev, weekId: data[0].weekId }))
        }
      } catch (error) {
        console.error("Failed to fetch weeks:", error)
        toast({
          title: "Error",
          description: "Failed to fetch weeks",
          variant: "destructive",
        })
      }
    }

    fetchCourses()
    fetchWeeks()
  }, [formData.courseId, initialCourseId, initialWeekId])

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
      await LessonAPI.createLesson(formData as Lesson)
      toast({
        title: "Lesson created",
        description: "The lesson has been created successfully.",
      })
      router.push("/admin/lessons")
    } catch (error) {
      console.error("Failed to create lesson:", error)
      toast({
        title: "Failed to create lesson",
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
        <Link href="/admin/lessons">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Lesson</h1>
          <p className="text-muted-foreground">Add a new lesson to a course week.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Lesson Information</CardTitle>
            <CardDescription>Enter the information for your new lesson.</CardDescription>
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
            <Link href="/admin/lessons">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>Creating...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Lesson
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}