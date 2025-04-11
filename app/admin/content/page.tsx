"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { fetchCourses, fetchWeeks, deleteLesson } from "@/lib/api-client";

interface Course {
  _id: string;
  courseId: string;
  title: string;
}

interface Week {
  _id: string;
  weekId: number;
  courseId: string;
  slug: string;
  lessonList: { title: string; id: string }[];
}

export default function ContentManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [weeks, setWeeks] = useState<{ [courseId: string]: Week[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const coursesData = await fetchCourses();
        if (Array.isArray(coursesData) && coursesData.length > 0) {
          setCourses(coursesData);

          const weeksData: { [courseId: string]: Week[] } = {};
          for (const course of coursesData) {
            const weekResponse = await fetchWeeks(course.courseId);
            weeksData[course.courseId] = weekResponse.data || [];
          }
          setWeeks(weeksData);
        } else {
          setCourses([]);
          setError("No courses available. Please create a course first.");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (courseId: string, weekId: number, lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      try {
        await deleteLesson(courseId, weekId, lessonId);
        setWeeks((prev) => ({
          ...prev,
          [courseId]: prev[courseId].map((week) =>
            week.weekId === weekId
              ? { ...week, lessonList: week.lessonList.filter((lesson) => lesson.id !== lessonId) }
              : week
          ),
        }));
      } catch (error) {
        alert("Failed to delete lesson.");
      }
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-[calc(100vh-10rem)]"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (error) {
    return (
      <div className="grid gap-6 p-6">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="inline-flex items-center justify-center rounded-md w-8 h-8 text-gray-500 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        </div>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="inline-flex items-center justify-center rounded-md w-8 h-8 text-gray-500 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        </div>
        <Link href="/admin/content/new" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Lesson
        </Link>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        {courses.map((course) => (
          <div key={course._id} className="border-b last:border-b-0">
            <h2 className="p-4 bg-gray-50 text-lg font-semibold">{course.title}</h2>
            {(weeks[course.courseId] || []).map((week) => (
              <div key={week._id} className="p-4">
                <h3 className="text-md font-medium">Week {week.weekId} ({week.slug})</h3>
                <table className="w-full mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left text-sm font-medium">Lesson Title</th>
                      <th className="p-2 text-left text-sm font-medium">Lesson ID</th>
                      <th className="p-2 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {week.lessonList.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-2 text-center text-gray-500">No lessons available.</td>
                      </tr>
                    ) : (
                      week.lessonList.map((lesson) => (
                        <tr key={lesson.id} className="border-t">
                          <td className="p-2">{lesson.title}</td>
                          <td className="p-2">{lesson.id}</td>
                          <td className="p-2 flex gap-2">
                            <Link
                              href={`/admin/content/edit/${course.courseId}/${week.weekId}/${lesson.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(course.courseId, week.weekId, lesson.id)}
                              className="text-red-600 hover:underline"
                            >
                              <Trash2 className="h-4 w-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}