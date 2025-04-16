"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import CourseModal from "../../../components/ui/CourseModal";

interface Course {
  _id: string;
  courseId: string;
  title: string;
  slug: string;
  description?: string;
  weekCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Week {
  _id: string;
  courseId: string;
  weekId: number;
  slug: string;
  title: string;
  lessonCount: number;
  lessonList: { title: string; id: string }[];
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [weeks, setWeeks] = useState<Record<string, Week[]>>({}); // Store weeks by course _id

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data.success) setCourses(data.data);
    } catch (error) {
      toast.error("Failed to load courses.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeeksForCourse = async (courseId: string) => {
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) {
        toast.error("Course not found.");
        return;
      }
      const res = await fetch(`/api/course-week?courseId=${course.courseId}`);
      const data = await res.json();
      console.log("Weeks API response:", data); // Debug log
      if (data.success && Array.isArray(data.data)) {
        setWeeks((prev) => ({ ...prev, [courseId]: data.data }));
      } else {
        setWeeks((prev) => ({ ...prev, [courseId]: [] }));
        toast.error("No weeks data found for this course.");
      }
    } catch (error) {
      console.error("Error fetching weeks:", error);
      setWeeks((prev) => ({ ...prev, [courseId]: [] }));
      toast.error("Failed to load weeks. Check console for details.");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Delete course and all related weeks/lessons?")) return;
    try {
      const res = await fetch(`/api/courses?courseId=${courseId}`, { method: "DELETE" });
      if (res.ok) {
        setCourses(courses.filter((c) => c._id !== courseId));
        setWeeks((prev) => {
          const newWeeks = { ...prev };
          delete newWeeks[courseId];
          return newWeeks;
        });
        toast.success("Course deleted.");
      }
    } catch (error) {
      toast.error("Failed to delete course.");
    }
  };

  const toggleExpansion = (courseId: string) => {
    setExpandedCourses((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(courseId)) {
        fetchWeeksForCourse(courseId); // Fetch weeks when expanding
      }
      if (newSet.has(courseId)) newSet.delete(courseId);
      else newSet.add(courseId);
      return newSet;
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        </div>
        <button
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Course
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No courses found. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{course.description || "No description"}</p>
                <button
                  onClick={() => toggleExpansion(course._id)}
                  className="mt-4 w-full flex justify-between items-center text-gray-700 hover:text-gray-900"
                >
                  Weeks ({course.weekCount})
                  {expandedCourses.has(course._id) ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedCourses.has(course._id) && (
                  <div className="mt-4 space-y-2">
                    {weeks[course._id] && weeks[course._id].length > 0 ? (
                      weeks[course._id].map((week) => (
                        <div key={week._id} className="text-sm text-gray-500">
                          Week {week.weekId}: {week.title || "Untitled"} (Lessons: {week.lessonCount})
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-red-500">No weeks available.</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end p-4 bg-gray-50 border-t">
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={editingCourse}
        onSave={fetchCourses}
      />
    </div>
  );
}