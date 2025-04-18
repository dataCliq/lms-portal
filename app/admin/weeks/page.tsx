"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Course, CourseAPI, type Week, WeekAPI } from "@/lib/api-client"
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
import { Plus, Pencil, Trash2, Search, FileText, RefreshCw } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
import { toast } from "@/hooks/use-toast"


export default function WeeksPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [weeks, setWeeks] = useState<Week[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [weekToDelete, setWeekToDelete] = useState<{ courseId: string; weekId: number } | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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

  const fetchWeeks = async () => {
    if (!selectedCourse) return

    setLoading(true)
    try {
      const data = await WeekAPI.getWeeks(selectedCourse)
      setWeeks(data)
    } catch (error) {
      console.error("Failed to fetch weeks:", error)
      toast({
        title: "Error",
        description: "Failed to fetch weeks for the selected course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchWeeks()
    setRefreshing(false)
    toast({
      title: "Data refreshed",
      description: "The weeks data has been refreshed.",
    })
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedCourse) {
      fetchWeeks()
    }
  }, [selectedCourse])

  const handleDeleteWeek = async () => {
    if (!weekToDelete) return

    try {
      console.log("Attempting to delete week:", weekToDelete)
      const response = await WeekAPI.deleteWeek(weekToDelete.courseId, weekToDelete.weekId)
      console.log("Delete response:", response)
      setWeeks(
        weeks.filter((week) => !(week.courseId === weekToDelete.courseId && week.weekId === weekToDelete.weekId)),
      )
      setWeekToDelete(null)
      setShowDeleteDialog(false)
      toast({
        title: "Week deleted",
        description: "The week has been deleted successfully.",
        duration: 5000,
      })
    } catch (error) {
      console.error("Failed to delete week:", error)
      toast({
        title: "Failed to delete week",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const filteredWeeks = weeks.filter((week) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      week.title?.toLowerCase().includes(searchLower) ||
      week.slug.toLowerCase().includes(searchLower) ||
      week.weekId.toString().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Weeks</h1>
          <p className="text-muted-foreground">Manage weeks for your courses.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/admin/weeks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Week
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
          <Input placeholder="Search weeks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="ml-4 text-lg text-gray-600">Loading weeks...</p>
        </div>
      ) : filteredWeeks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No weeks found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Get started by creating a new week for this course"}
              </p>
              {!searchTerm && (
                <Link href="/admin/weeks/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Week
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
                <TableHead>Week #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="hidden md:table-cell">Lessons</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWeeks.map((week) => (
                <TableRow key={`${week.courseId}-${week.weekId}`}>
                  <TableCell>{week.weekId}</TableCell>
                  <TableCell className="font-medium">{week.title || `Week ${week.weekId}`}</TableCell>
                  <TableCell>{week.slug}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                      {week.lessonCount || 0}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{week.createdAt || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/weeks/${encodeURIComponent(week.courseId)}/${week.weekId}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <AlertDialog open={showDeleteDialog && weekToDelete?.weekId === week.weekId}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setWeekToDelete({
                                courseId: week.courseId,
                                weekId: week.weekId,
                              })
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete Week {week.weekId} and all its lessons. This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => {
                                setWeekToDelete(null)
                                setShowDeleteDialog(false)
                              }}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteWeek}>Delete</AlertDialogAction>
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