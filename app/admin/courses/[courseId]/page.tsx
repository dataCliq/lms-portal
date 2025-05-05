"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CourseAPI, WeekAPI, LessonAPI, type Course, type Week, type Lesson } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react"

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { courseId } = params

  const [course, setCourse] = useState<Course | null>(null)
  const [weeks, setWeeks] = useState<Week[]>([])
  const [lessons, setLessons] = useState<Record<number, Lesson[]>>({})
  const [loading, setLoading] = useState(true)
  const [addingWeek, setAddingWeek] = useState(false)
  const [newWeekData, setNewWeekData] = useState({ weekId: "", title: "", slug: "" })
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([])

  // Load course data
  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true)
      try {
        console.log("Fetching course data for courseId:", courseId)

        // Fetch course details
        const coursesData = await CourseAPI.getCourses(courseId)
        console.log("Fetched course data:", coursesData)

        if (coursesData.length === 0) {
          toast({
            title: "Course not found",
            description: `No course found with ID: ${courseId}`,
            variant: "destructive",
          })
          router.push("/admin/courses")
          return
        }
        setCourse(coursesData[0])

        // Fetch weeks for this course
        console.log("Fetching weeks for courseId:", courseId)
        const weeksData = await WeekAPI.getWeeks(courseId)
        console.log("Fetched weeks data:", weeksData)
        setWeeks(weeksData)

        // Set the first week as expanded by default if there are weeks
        if (weeksData.length > 0) {
          setExpandedWeeks([`week-${weeksData[0].weekId}`])
        }

        // Fetch lessons for each week
        const lessonsMap: Record<number, Lesson[]> = {}
        for (const week of weeksData) {
          console.log(`Fetching lessons for courseId: ${courseId}, weekId: ${week.weekId}`)
          try {
            const weekLessons = await LessonAPI.getLessons(courseId, week.weekId)
            console.log(`Fetched lessons for week ${week.weekId}:`, weekLessons)
            lessonsMap[week.weekId] = weekLessons
          } catch (error) {
            console.error(`Error fetching lessons for week ${week.weekId}:`, error)
            lessonsMap[week.weekId] = []
            toast({
              title: "Warning",
              description: `Failed to load lessons for Week ${week.weekId}. Please try refreshing.`,
              variant: "destructive",
            })
          }
        }
        setLessons(lessonsMap)
      } catch (error) {
        console.error("Failed to fetch course data:", error)
        toast({
          title: "Error",
          description: "Failed to load course data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId, router])

  // Handle adding a new week
  const handleAddWeek = async () => {
    if (!newWeekData.weekId || !newWeekData.title || !newWeekData.slug) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setAddingWeek(true)
    try {
      const weekId = Number.parseInt(newWeekData.weekId)
      const newWeek = await WeekAPI.createWeek({
        courseId,
        weekId,
        title: newWeekData.title,
        slug: newWeekData.slug,
        lessonCount: 0,
      })

      // Update weeks list
      setWeeks((prevWeeks) => [...prevWeeks, newWeek])

      // Initialize empty lessons array for this week
      setLessons((prevLessons) => ({
        ...prevLessons,
        [weekId]: [],
      }))

      // Reset form
      setNewWeekData({ weekId: "", title: "", slug: "" })

      toast({
        title: "Week added",
        description: "The week has been added successfully.",
      })
    } catch (error) {
      console.error("Failed to add week:", error)
      toast({
        title: "Error",
        description: "Failed to add week. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingWeek(false)
    }
  }

  // Handle deleting a week
  const handleDeleteWeek = async (week: Week) => {
    if (
      !window.confirm(
        `Are you sure you want to delete Week ${week.weekId}: ${week.title}? This will also delete all lessons in this week.`,
      )
    ) {
      return
    }

    try {
      await WeekAPI.deleteWeek(courseId, week.weekId)

      // Update weeks list
      setWeeks((prevWeeks) => prevWeeks.filter((w) => w.weekId !== week.weekId))

      // Remove lessons for this week
      setLessons((prevLessons) => {
        const newLessons = { ...prevLessons }
        delete newLessons[week.weekId]
        return newLessons
      })

      toast({
        title: "Week deleted",
        description: "The week and its lessons have been deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete week:", error)
      toast({
        title: "Error",
        description: "Failed to delete week. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle deleting a lesson
  const handleDeleteLesson = async (lesson: Lesson) => {
    if (!window.confirm(`Are you sure you want to delete the lesson "${lesson.title}"?`)) {
      return
    }

    try {
      await LessonAPI.deleteLesson(courseId, lesson.weekId, lesson.lessonId)

      // Update lessons list
      setLessons((prevLessons) => ({
        ...prevLessons,
        [lesson.weekId]: prevLessons[lesson.weekId].filter((l) => l.lessonId !== lesson.lessonId),
      }))

      toast({
        title: "Lesson deleted",
        description: "The lesson has been deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete lesson:", error)
      toast({
        title: "Error",
        description: "Failed to delete lesson. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle accordion state change
  const handleAccordionChange = (value: string[]) => {
    setExpandedWeeks(value)
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (newWeekData.title && !newWeekData.slug) {
      const slug = newWeekData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      setNewWeekData((prev) => ({ ...prev, slug }))
    }
  }, [newWeekData.title])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Course not found</p>
          <Link href="/admin/courses">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/courses">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground">Manage weeks and lessons for this course</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/courses/edit/${courseId}`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>Basic information about this course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Course ID</h3>
                <p className="text-sm text-muted-foreground">{course.courseId}</p>
              </div>
              <div>
                <h3 className="font-medium">Slug</h3>
                <p className="text-sm text-muted-foreground">{course.slug}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{course.description || "No description provided"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Rating</h3>
                <p className="text-sm text-muted-foreground">{course.rating} / 5</p>
              </div>
              <div>
                <h3 className="font-medium">Week Count</h3>
                <p className="text-sm text-muted-foreground">{weeks.length}</p>
              </div>
            </div>
            {course.tags && course.tags.length > 0 && (
              <div>
                <h3 className="font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Add Week</CardTitle>
              <CardDescription>Create a new week for this course</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weekId">Week Number</Label>
              <Input
                id="weekId"
                type="number"
                min="1"
                placeholder="Enter week number"
                value={newWeekData.weekId}
                onChange={(e) => setNewWeekData({ ...newWeekData, weekId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekTitle">Week Title</Label>
              <Input
                id="weekTitle"
                placeholder="Enter week title"
                value={newWeekData.title}
                onChange={(e) => setNewWeekData({ ...newWeekData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekSlug">Week Slug</Label>
              <Input
                id="weekSlug"
                placeholder="Enter week slug"
                value={newWeekData.slug}
                onChange={(e) => setNewWeekData({ ...newWeekData, slug: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">URL-friendly version of the title (auto-generated)</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddWeek} disabled={addingWeek} className="w-full">
              {addingWeek ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></span>
                  Adding...
                </span>
              ) : (
                <span className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Week
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
          <CardDescription>Manage weeks and lessons for this course</CardDescription>
        </CardHeader>
        <CardContent>
          {weeks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No weeks added to this course yet.</p>
              <p className="text-sm text-muted-foreground mt-1">Add your first week using the form above.</p>
            </div>
          ) : (
            <Accordion
              type="multiple"
              value={expandedWeeks}
              onValueChange={handleAccordionChange}
              className="space-y-4"
            >
              {weeks
                .sort((a, b) => a.weekId - b.weekId)
                .map((week) => (
                  <AccordionItem key={week.weekId} value={`week-${week.weekId}`} className="border rounded-lg px-6">
                    <div className="flex items-center justify-between py-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <span className="font-semibold">Week {week.weekId}:</span>
                          <span className="ml-2">{week.title}</span>
                        </div>
                      </AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteWeek(week)
                          }}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete Week</span>
                        </Button>
                      </div>
                    </div>
                    <AccordionContent>
                      <div className="space-y-4 pt-2 pb-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Lessons</h4>
                          <Link href={`/admin/lessons/create?courseId=${courseId}&weekId=${week.weekId}`}>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-3 w-3" />
                              Add Lesson
                            </Button>
                          </Link>
                        </div>
                        {!lessons[week.weekId] || lessons[week.weekId].length === 0 ? (
                          <div className="text-center py-4 border rounded-md">
                            <p className="text-sm text-muted-foreground">No lessons added to this week yet.</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {lessons[week.weekId].map((lesson) => (
                              <div
                                key={lesson.lessonId}
                                className="flex items-center justify-between p-3 border rounded-md"
                              >
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    ID: {lesson.lessonId} | Slug: {lesson.slug}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Link
                                    href={`/admin/lessons/edit?courseId=${courseId}&weekId=${week.weekId}&lessonId=${lesson.lessonId}`}
                                  >
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit Lesson</span>
                                    </Button>
                                  </Link>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteLesson(lesson)}>
                                    <Trash className="h-4 w-4 text-red-500" />
                                    <span className="sr-only">Delete Lesson</span>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
