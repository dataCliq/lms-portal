"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CourseAPI, WeekAPI, LessonAPI, type Course, type Week } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"

export default function CreateLessonPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [weeks, setWeeks] = useState<Week[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Form state
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")
  const [selectedWeekId, setSelectedWeekId] = useState<string>("")
  const [lessonData, setLessonData] = useState({
    lessonId: "",
    slug: "",
    title: "",
    subtitle: "",
    content: "",
  })

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      try {
        // Fetch courses
        const coursesData = await CourseAPI.getCourses()
        setCourses(coursesData)

        // Get courseId from URL if available
        const courseIdFromUrl = searchParams.get("courseId")
        if (courseIdFromUrl && coursesData.some((course) => course.courseId === courseIdFromUrl)) {
          setSelectedCourseId(courseIdFromUrl)

          // Fetch weeks for this course
          const weeksData = await WeekAPI.getWeeks(courseIdFromUrl)
          setWeeks(weeksData)

          // Get weekId from URL if available
          const weekIdFromUrl = searchParams.get("weekId")
          if (weekIdFromUrl && weeksData.some((week) => week.weekId.toString() === weekIdFromUrl)) {
            setSelectedWeekId(weekIdFromUrl)
          } else if (weeksData.length > 0) {
            setSelectedWeekId(weeksData[0].weekId.toString())
          }
        } else if (coursesData.length > 0) {
          setSelectedCourseId(coursesData[0].courseId)

          // Fetch weeks for the first course
          const weeksData = await WeekAPI.getWeeks(coursesData[0].courseId)
          setWeeks(weeksData)

          if (weeksData.length > 0) {
            setSelectedWeekId(weeksData[0].weekId.toString())
          }
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error)
        toast({
          title: "Error",
          description: "Failed to load courses and weeks. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [searchParams])

  // Handle course selection change
  const handleCourseChange = async (courseId: string) => {
    setSelectedCourseId(courseId)
    setSelectedWeekId("")
    setLoading(true)

    try {
      const weeksData = await WeekAPI.getWeeks(courseId)
      setWeeks(weeksData)

      if (weeksData.length > 0) {
        setSelectedWeekId(weeksData[0].weekId.toString())
      }
    } catch (error) {
      console.error("Failed to fetch weeks:", error)
      toast({
        title: "Error",
        description: "Failed to load weeks for the selected course.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLessonData((prev) => ({ ...prev, [name]: value }))
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (lessonData.title && !lessonData.slug) {
      const slug = lessonData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      setLessonData((prev) => ({ ...prev, slug }))
    }
  }, [lessonData.title])

  // Auto-generate lessonId from slug
  useEffect(() => {
    if (lessonData.slug && !lessonData.lessonId) {
      setLessonData((prev) => ({ ...prev, lessonId: prev.slug }))
    }
  }, [lessonData.slug])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCourseId || !selectedWeekId) {
      toast({
        title: "Validation Error",
        description: "Please select a course and week.",
        variant: "destructive",
      })
      return
    }

    if (!lessonData.lessonId || !lessonData.slug || !lessonData.title) {
      toast({
        title: "Validation Error",
        description: "Lesson ID, slug, and title are required.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const result = await LessonAPI.createLesson({
        courseId: selectedCourseId,
        weekId: Number.parseInt(selectedWeekId),
        lessonId: lessonData.lessonId,
        slug: lessonData.slug,
        title: lessonData.title,
        subtitle: lessonData.subtitle,
        content: lessonData.content,
      })

      if (result) {
        toast({
          title: "Success",
          description: "Lesson created successfully!",
        })

        // Reset form
        setLessonData({
          lessonId: "",
          slug: "",
          title: "",
          subtitle: "",
          content: "",
        })

        // Redirect to lessons page
        router.push("/admin/lessons")
      } else {
        throw new Error("Failed to create lesson")
      }
    } catch (error) {
      console.error("Error creating lesson:", error)
      toast({
        title: "Error",
        description: "Failed to create lesson. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Lesson</h1>
          <p className="text-muted-foreground">Add a new lesson to a course week</p>
        </div>
        <Link href="/admin/lessons">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="courseId">Course</Label>
                <Select value={selectedCourseId} onValueChange={handleCourseChange} disabled={loading || submitting}>
                  <SelectTrigger id="courseId">
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
                <Label htmlFor="weekId">Week</Label>
                <Select
                  value={selectedWeekId}
                  onValueChange={setSelectedWeekId}
                  disabled={!selectedCourseId || loading || submitting}
                >
                  <SelectTrigger id="weekId">
                    <SelectValue placeholder="Select a week" />
                  </SelectTrigger>
                  <SelectContent>
                    {weeks.map((week) => (
                      <SelectItem key={week.weekId} value={week.weekId.toString()}>
                        Week {week.weekId}: {week.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                name="title"
                value={lessonData.title}
                onChange={handleInputChange}
                placeholder="Enter lesson title"
                disabled={submitting}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lessonId">Lesson ID</Label>
                <Input
                  id="lessonId"
                  name="lessonId"
                  value={lessonData.lessonId}
                  onChange={handleInputChange}
                  placeholder="Enter lesson ID"
                  disabled={submitting}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Unique identifier for this lesson (auto-generated from slug)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={lessonData.slug}
                  onChange={handleInputChange}
                  placeholder="Enter lesson slug"
                  disabled={submitting}
                  required
                />
                <p className="text-xs text-muted-foreground">URL-friendly version of the title (auto-generated)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle (Optional)</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={lessonData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter lesson subtitle"
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (HTML)</Label>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="mb-2">
                  <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                    Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Textarea
                    id="content"
                    name="content"
                    value={lessonData.content}
                    onChange={handleInputChange}
                    placeholder="Enter lesson content (HTML supported)"
                    className="min-h-[300px] font-mono"
                    disabled={submitting}
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-4 min-h-[300px] bg-white">
                    {lessonData.content ? (
                      <div dangerouslySetInnerHTML={{ __html: lessonData.content }} />
                    ) : (
                      <p className="text-muted-foreground italic">No content to preview</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <p className="text-xs text-muted-foreground">
                You can use HTML tags to format your content. Use the preview tab to see how it will look.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/lessons")}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></span>
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Create Lesson
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
