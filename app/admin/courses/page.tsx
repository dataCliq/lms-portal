"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Course, CourseAPI } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Search, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await CourseAPI.getCourses();
      console.log("Fetched courses:", data);
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
    toast({
      title: "Data refreshed",
      description: "The courses data has been refreshed.",
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      console.log("Attempting to delete course:", courseToDelete);
      await CourseAPI.deleteCourse(courseToDelete);
      setCourses(courses.filter((course) => course.courseId !== courseToDelete));
      setCourseToDelete(null);
      setShowDeleteDialog(false);
      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast({
        title: "Failed to delete course",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const filteredCourses = courses.filter((course) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      course.title?.toLowerCase().includes(searchLower) ||
      course.slug.toLowerCase().includes(searchLower) ||
      course.courseId.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage your courses.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/admin/courses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="ml-4 text-lg text-gray-600">Loading courses...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">No courses found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm
                  ? "Try a different search term"
                  : "Get started by creating a new course"}
              </p>
              {!searchTerm && (
                <Link href="/admin/courses/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
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
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.slug}</TableCell>
                  <TableCell className="hidden md:table-cell">{course.rating || "N/A"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {course.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/courses/${encodeURIComponent(course.courseId)}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <AlertDialog open={showDeleteDialog && courseToDelete === course.courseId}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCourseToDelete(course.courseId);
                              setShowDeleteDialog(true);
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
                              This will permanently delete the course "{course.title}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => {
                                setCourseToDelete(null);
                                setShowDeleteDialog(false);
                              }}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteCourse}>Delete</AlertDialogAction>
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
  );
}