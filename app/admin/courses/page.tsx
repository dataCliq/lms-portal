"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Course, CourseAPI, type Week, WeekAPI, type Lesson, LessonAPI } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LessonsPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [weeks, setWeeks] = useState<Week[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [lessonToDelete, setLessonToDelete] = useState<{ courseId: string; weekId: number; lessonId: number } | null>(null)

  const fetchCourses = async () => {
    try {
      const data = await CourseAPI.getCourses()
      setCourses(data)
      if (data.length > 0 && !selectedCourse) {
        setSelectedCourse(data[0].courseId)
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error)
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchWeeksAndLessons = async () => {
    if (!selectedCourse) return

    setLoading(true)
    try {
      const [weeksData, lessonsData] = await Promise.all([
        WeekAPI.getWeeks(selectedCourse),
        LessonAPI.getLessons(selectedCourse),
      ])
      setWeeks(Array.isArray(weeksData) ? weeksData : [])
      setLessons(Array.isArray(lessonsData) ? lessonsData : [])
    } catch (error) {
      console.error("Failed to fetch weeks or lessons:", error)
      toast({
        title: "Error",
        description: "Failed to fetch weeks or lessons. Please try again.",
        variant: "destructive",
      })
      setWeeks([])
      setLessons([])
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchWeeksAndLessons()
    setRefreshing(false)
    toast({
      title: "Data refreshed",
      description: "The lessons data has been refreshed.",
    })
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedCourse) {
      fetchWeeksAndLessons()
    }
  }, [selectedCourse])

  const handleDeleteLesson = async () => {
    if (!lessonToDelete) return

    try {
      await LessonAPI.deleteLesson(lessonToDelete.courseId, lessonToDelete.weekId, lessonToDelete.lessonId)
      setLessons(
        lessons.filter(
          (lesson) =>
            !(
              lesson.courseId === lessonToDelete.courseId &&
              lesson.weekId === lessonToDelete.weekId &&
              lesson.lessonId === lessonToDelete.lessonId
            )
        )
      )
      setLessonToDelete(null)
      toast({
        title: "Lesson deleted",
        description: "The lesson has been deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete lesson:", error)
      toast({
        title: "Failed to delete lesson",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const filteredLessons = lessons.filter((lesson) => {
    const searchLower = searchTerm.toLowerCase()
    return lesson.title?.toLowerCase().includes(searchLower) || lesson.lessonId.toString().includes(searchLower)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Lessons</h1>
          <p className="text-muted-foreground">Manage lessons for your courses.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href={`/admin/lessons/new?courseId=${encodeURIComponent(selectedCourse)}`}>
            <Button disabled={!selectedCourse}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="w-full md:w-1/3">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
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
          <p className="ml-4 text-lg text-gray-600">Loading lessons...</p>
        </div>
      ) : weeks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No weeks found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Select a course with weeks or add a new week.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        weeks.map((week) => {
          const weekLessons = filteredLessons.filter((lesson) => lesson.weekId === week.weekId)
          return (
            <div key={`${week.courseId}-${week.weekId}`} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Week {week.weekId} ({weekLessons.length} of {week.lessonCount || 0} Lessons)
                </h2>
                <Link
                  href={`/admin/lessons/new?courseId=${encodeURIComponent(selectedCourse)}&weekId=${week.weekId}`}
                >
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lesson to Week {week.weekId}
                  </Button>
                </Link>
              </div>
              {weekLessons.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <h3 className="mt-2 text-lg font-semibold">No lessons found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchTerm ? "Try a different search term" : "Add a new lesson to this week."}
                      </p>
                      {!searchTerm && (
                        <Link
                          href={`/admin/lessons/new?courseId=${encodeURIComponent(selectedCourse)}&weekId=${week.weekId}`}
                        >
                          <Button className="mt-4">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Lesson
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lesson #</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Content Preview</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weekLessons.map((lesson) => (
                        <TableRow key={`${lesson.courseId}-${lesson.weekId}-${lesson.lessonId}`}>
                          <TableCell>{lesson.lessonId}</TableCell>
                          <TableCell className="font-medium">{lesson.title || `Lesson ${lesson.lessonId}`}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {lesson.content?.substring(0, 50) || "N/A"}
                            {lesson.content?.length > 50 ? "..." : ""}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {lesson.createdAt
                              ? new Date(lesson.createdAt).toLocaleDateString()
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/admin/lessons/edit/${encodeURIComponent(lesson.courseId)}/${lesson.weekId}/${lesson.lessonId}`}
                              >
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setLessonToDelete({
                                        courseId: lesson.courseId,
                                        weekId: lesson.weekId,
                                        lessonId: lesson.lessonId,
                                      })
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete Lesson {lesson.lessonId} from Week {lesson.weekId}.
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      onClick={() => setLessonToDelete(null)}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteLesson}>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}