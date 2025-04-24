"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CourseAPI, WeekAPI, LessonAPI, type Course, type Week, type Lesson } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Plus, Search, RefreshCw, FileText, ArrowRight } from "lucide-react"

export default function LessonsPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [weeks, setWeeks] = useState<{ [courseId: string]: Week[] }>({})
  const [lessons, setLessons] = useState<{ [courseId: string]: { [weekId: number]: Lesson[] } }>({})
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      console.log("Fetching courses...")
      const coursesData = await CourseAPI.getCourses()
      console.log("Courses fetched:", coursesData)
      setCourses(coursesData)

      const initialCourseId = coursesData.length > 0 ? coursesData[0].courseId : null
      setSelectedCourse(initialCourseId)

      if (initialCourseId) {
        const weeksData: { [courseId: string]: Week[] } = {}
        const lessonsData: { [courseId: string]: { [weekId: number]: Lesson[] } } = {}

        console.log(`Fetching weeks for courseId: ${initialCourseId}`)
        const courseWeeks = await WeekAPI.getWeeks(initialCourseId)
        console.log(`Weeks fetched for courseId ${initialCourseId}:`, courseWeeks)
        weeksData[initialCourseId] = courseWeeks

        lessonsData[initialCourseId] = {}
        for (const week of courseWeeks) {
          console.log(`Fetching lessons for courseId ${initialCourseId}, weekId ${week.weekId}`)
          const weekLessons = await LessonAPI.getLessons(initialCourseId, week.weekId)
          console.log(`Lessons fetched for courseId ${initialCourseId}, weekId ${week.weekId}:`, weekLessons)
          lessonsData[initialCourseId][week.weekId] = weekLessons
        }

        setWeeks(weeksData)
        setLessons(lessonsData)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch courses, weeks, or lessons. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
    toast({
      title: "Data refreshed",
      description: "The lessons data has been refreshed.",
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCourseChange = async (courseId: string) => {
    setSelectedCourse(courseId)

    if (!weeks[courseId]) {
      setLoading(true)
      try {
        const weeksData = { ...weeks }
        const lessonsData = { ...lessons }

        const courseWeeks = await WeekAPI.getWeeks(courseId)
        weeksData[courseId] = courseWeeks

        lessonsData[courseId] = {}
        for (const week of courseWeeks) {
          const weekLessons = await LessonAPI.getLessons(courseId, week.weekId)
          lessonsData[courseId][week.weekId] = weekLessons
        }

        setWeeks(weeksData)
        setLessons(lessonsData)
      } catch (error) {
        console.error("Failed to fetch data for course:", error)
        toast({
          title: "Error",
          description: "Failed to fetch weeks or lessons for this course.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const filteredWeeks =
    selectedCourse && weeks[selectedCourse]
      ? weeks[selectedCourse].filter((week) => {
          if (!searchTerm) return true
          const searchLower = searchTerm.toLowerCase()
          return (
            week.title.toLowerCase().includes(searchLower) ||
            week.weekId.toString().includes(searchLower) ||
            (week.lessonList || []).some(
              (lesson) =>
                lesson.title.toLowerCase().includes(searchLower) || lesson.id.toLowerCase().includes(searchLower),
            )
          )
        })
      : []

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Lessons</h1>
          <p className="text-muted-foreground">Manage lessons for your courses</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/admin/lessons/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="w-full md:w-1/3">
          <Select value={selectedCourse || ""} onValueChange={handleCourseChange}>
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
        <div className="flex items-center space-x-2 w-full md:w-2/3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search lessons..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="ml-4 text-lg text-gray-600">Loading lessons...</p>
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
      ) : !selectedCourse || !weeks[selectedCourse] || weeks[selectedCourse].length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No weeks found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Create a week first before adding lessons.</p>
            </div>
          </CardContent>
        </Card>
      ) : filteredWeeks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No matching weeks found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try a different search term.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredWeeks.map((week) => {
            const weekLessons =
              selectedCourse && lessons[selectedCourse] && lessons[selectedCourse][week.weekId]
                ? lessons[selectedCourse][week.weekId]
                : []

            return (
              <Card key={`${week.courseId}-${week.weekId}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl">
                      Week {week.weekId}: {week.title}
                    </CardTitle>
                    <CardDescription>
                      {weekLessons.length} {weekLessons.length === 1 ? "Lesson" : "Lessons"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {weekLessons.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No lessons found for this week.</p>
                      <Link
                        href={`/admin/lessons/create?courseId=${encodeURIComponent(week.courseId)}&weekId=${week.weekId}`}
                      >
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Lesson
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {weekLessons.map((lesson) => (
                        <div
                          key={`${lesson.courseId}-${lesson.weekId}-${lesson.lessonId}`}
                          className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">{lesson.subtitle || "No subtitle"}</p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/admin/lessons/create?courseId=${encodeURIComponent(week.courseId)}&weekId=${week.weekId}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson to Week {week.weekId}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

