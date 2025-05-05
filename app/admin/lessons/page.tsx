"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CourseAPI, LessonAPI, type Course, type Lesson } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"

export default function LessonsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  // Load courses on initial render
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await CourseAPI.getCourses()
        setCourses(coursesData)

        if (coursesData.length > 0) {
          setSelectedCourseId(coursesData[0].courseId)
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchCourses()
  }, [])

  // Load lessons when a course is selected
  useEffect(() => {
    const fetchLessons = async () => {
      if (!selectedCourseId) return

      setLoading(true)
      try {
        const lessonsData = await LessonAPI.getLessons(selectedCourseId)
        setLessons(lessonsData)
      } catch (error) {
        console.error("Failed to fetch lessons:", error)
        toast({
          title: "Error",
          description: "Failed to load lessons. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [selectedCourseId])

  // Handle course selection change
  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((lesson) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      lesson.title.toLowerCase().includes(searchLower) ||
      lesson.subtitle?.toLowerCase().includes(searchLower) ||
      lesson.lessonId.toLowerCase().includes(searchLower) ||
      lesson.slug.toLowerCase().includes(searchLower)
    )
  })

  // Handle lesson deletion
  const handleDeleteLesson = async (lesson: Lesson) => {
    if (!window.confirm(`Are you sure you want to delete the lesson "${lesson.title}"?`)) {
      return
    }

    setDeleting(lesson.lessonId)
    try {
      await LessonAPI.deleteLesson(lesson.courseId, lesson.weekId, lesson.lessonId)

      // Remove the deleted lesson from the state
      setLessons((prevLessons) =>
        prevLessons.filter(
          (l) => !(l.courseId === lesson.courseId && l.weekId === lesson.weekId && l.lessonId === lesson.lessonId),
        ),
      )

      toast({
        title: "Success",
        description: "Lesson deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete lesson:", error)
      toast({
        title: "Error",
        description: "Failed to delete lesson. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  // Get course title by ID
  const getCourseTitle = (courseId: string) => {
    const course = courses.find((c) => c.courseId === courseId)
    return course ? course.title : courseId
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
          <p className="text-muted-foreground">Manage course lessons</p>
        </div>
        <Link href="/admin/lessons/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>View and manage lessons across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-1/3">
              <Select value={selectedCourseId} onValueChange={handleCourseChange}>
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
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lessons..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-pulse text-center">
                <p className="text-muted-foreground">Loading lessons...</p>
              </div>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground">
                {lessons.length === 0
                  ? "No lessons found for this course. Add your first lesson!"
                  : "No lessons match your search criteria."}
              </p>
              {lessons.length === 0 && (
                <Link href="/admin/lessons/create">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lesson
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Week</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Lesson ID</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLessons.map((lesson) => (
                    <TableRow key={`${lesson.courseId}-${lesson.weekId}-${lesson.lessonId}`}>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>Week {lesson.weekId}</TableCell>
                      <TableCell>{lesson.slug}</TableCell>
                      <TableCell>{lesson.lessonId}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/admin/lessons/edit?courseId=${lesson.courseId}&weekId=${lesson.weekId}&lessonId=${lesson.lessonId}`,
                                )
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteLesson(lesson)}
                              disabled={deleting === lesson.lessonId}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              {deleting === lesson.lessonId ? "Deleting..." : "Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
