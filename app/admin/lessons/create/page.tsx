"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { CourseAPI } from "../../../../lib/api-client"
import { WeekAPI } from "../../../../lib/api-client"
import { LessonAPI } from "../../../../lib/api-client"

const CreateLessonPage = () => {
  const router = useRouter()
  const [lessonData, setLessonData] = useState({
    lessonId: "",
    slug: "",
    title: "",
    subtitle: "",
    content: "",
  })
  const [courses, setCourses] = useState([])
  const [weeks, setWeeks] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await CourseAPI.getCourses()
        setCourses(coursesData)
      } catch (error) {
        console.error("Error fetching courses:", error)
        toast({
          title: "Error",
          description: "Failed to fetch courses. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchCourses()
  }, [])

  const handleCourseChange = async (courseId: string) => {
    setSelectedCourseId(courseId)
    setSelectedWeekId(null) // Reset selected week when course changes
    try {
      const weeksData = await WeekAPI.getWeeksByCourseId(courseId)
      setWeeks(weeksData)
    } catch (error) {
      console.error("Error fetching weeks:", error)
      toast({
        title: "Error",
        description: "Failed to fetch weeks. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleWeekChange = (weekId: string) => {
    setSelectedWeekId(weekId)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

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
      console.log("Submitting lesson data:", {
        courseId: selectedCourseId,
        weekId: Number.parseInt(selectedWeekId),
        ...lessonData,
      })

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
        throw new Error("Failed to create lesson - no result returned")
      }
    } catch (error) {
      console.error("Error creating lesson:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create lesson. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Create New Lesson</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="course">Course</Label>
            <Select onValueChange={handleCourseChange}>
              <SelectTrigger className="w-[180px]">
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
          <div>
            <Label htmlFor="week">Week</Label>
            <Select onValueChange={handleWeekChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a week" />
              </SelectTrigger>
              <SelectContent>
                {weeks.map((week) => (
                  <SelectItem key={week.weekId} value={week.weekId.toString()}>
                    {week.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lessonId">Lesson ID</Label>
            <Input type="text" id="lessonId" name="lessonId" value={lessonData.lessonId} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input type="text" id="slug" name="slug" value={lessonData.slug} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" value={lessonData.title} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input type="text" id="subtitle" name="subtitle" value={lessonData.subtitle} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" value={lessonData.content} onChange={handleChange} />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Lesson"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateLessonPage
