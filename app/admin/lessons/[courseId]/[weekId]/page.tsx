"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { type Lesson, LessonAPI } from "@/lib/api-client"
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
import { Plus, Pencil, Trash2, Search, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function WeekLessonsPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const weekId = Number.parseInt(params.weekId as string)

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [lessonToDelete, setLessonToDelete] = useState<{ courseId: string; weekId: number; lessonId: number } | null>(null)

  const fetchLessons = async () => {
    setLoading(true)
    try {
      const data = await LessonAPI.getLessons(courseId)
      setLessons(data.filter((lesson) => lesson.weekId === weekId))
    } catch (error) {
      console.error("Failed to fetch lessons:", error)
      toast({
        title: "Error",
        description: "Failed to fetch lessons. Please try again.",
        variant: "destructive",
      })
      setLessons([])
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchLessons()
    setRefreshing(false)
    toast({
      title: "Data refreshed",
      description: "The lessons data has been refreshed.",
    })
  }

  useEffect(() => {
    fetchLessons()
  }, [courseId, weekId])

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
          <h1 className="text-3xl font-bold tracking-tight">Week {weekId} Lessons</h1>
          <p className="text-muted-foreground">Manage lessons for Week {weekId} of {courseId}.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href={`/admin/lessons/${encodeURIComponent(courseId)}/${weekId}/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search lessons..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="ml-4 text-lg text-gray-600">Loading lessons...</p>
        </div>
      ) : filteredLessons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No lessons found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Add a new lesson to this week."}
              </p>
              {!searchTerm && (
                <Link href={`/admin/lessons/${encodeURIComponent(courseId)}/${weekId}/new`}>
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
              {filteredLessons.map((lesson) => (
                <TableRow key={`${lesson.courseId}-${lesson.weekId}-${lesson.lessonId}`}>
                  <TableCell>{lesson.lessonId}</TableCell>
                  <TableCell className="font-medium">{lesson.title || `Lesson ${lesson.lessonId}`}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lesson.content?.substring(0, 50) || "N/A"}
                    {lesson.content?.length > 50 ? "..." : ""}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/lessons/${encodeURIComponent(lesson.courseId)}/${lesson.weekId}/${lesson.lessonId}`}
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
                            <AlertDialogCancel onClick={() => setLessonToDelete(null)}>Cancel</AlertDialogCancel>
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
}