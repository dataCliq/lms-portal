"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { fetchCourses, fetchWeeks, saveLesson } from "@/lib/api-client";
import { ContentEditor } from "../../../../components/ui/content-editor";

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
}

export default function NewLesson() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    courseId: "",
    weekId: "",
    lessonId: "",
    slug: "",
    name: "",
    content: "",
  });

  useEffect(() => {
    async function loadCourses() {
      try {
        const coursesData = await fetchCourses();
        if (Array.isArray(coursesData) && coursesData.length > 0) {
          setCourses(coursesData);
        } else {
          setCourses([]);
          setError("No courses available. Please create a course first.");
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        setCourses([]);
        setError("Failed to load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCourses();
  }, []);

  useEffect(() => {
    async function loadWeeks() {
      if (!formData.courseId) {
        setWeeks([]);
        return;
      }

      try {
        const weeksData = await fetchWeeks(formData.courseId);
        console.log("loadWeeks received:", weeksData); // Debug log
        if (Array.isArray(weeksData)) {
          setWeeks(weeksData);
        } else {
          console.error("weeksData is not an array:", weeksData);
          setWeeks([]);
        }
      } catch (error) {
        console.error("Error loading weeks:", error);
        setWeeks([]);
      }
    }

    loadWeeks();
  }, [formData.courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug,
        lessonId: slug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.courseId || !formData.weekId || !formData.name || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const lessonData = {
        weekId: Number.parseInt(formData.weekId),
        courseId: formData.courseId,
        lessonId: formData.lessonId,
        slug: formData.slug,
        name: formData.name,
        content: formData.content,
        videoUrl: null,
        attachments: null,
      };

      await saveLesson(lessonData);
      router.push("/admin/content");
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert("Failed to create lesson. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/content"
            className="inline-flex items-center justify-center rounded-md w-8 h-8 text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Create New Lesson</h1>
        </div>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/content"
            className="inline-flex items-center justify-center rounded-md w-8 h-8 text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Create New Lesson</h1>
        </div>
        <button
          type="submit"
          form="lesson-form"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Lesson
            </>
          )}
        </button>
      </div>

      <div className="grid gap-6">
        <form id="lesson-form" onSubmit={handleSubmit}>
          <div className="rounded-lg border bg-white overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="courseId" className="block text-sm font-medium mb-1">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="courseId"
                    name="courseId"
                    required
                    value={formData.courseId}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    disabled={isLoading}
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course.courseId}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="weekId" className="block text-sm font-medium mb-1">
                    Week <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="weekId"
                    name="weekId"
                    required
                    value={formData.weekId}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    disabled={!formData.courseId || weeks.length === 0}
                  >
                    <option value="">Select a week</option>
                    {weeks.map((week) => ( // Line 387
                      <option key={week._id} value={week.weekId}>
                        Week {week.weekId} ({week.slug})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Lesson Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter lesson title"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium mb-1">
                    Slug (URL-friendly name)
                  </label>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="auto-generated-from-title"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="lessonId" className="block text-sm font-medium mb-1">
                    Lesson ID
                  </label>
                  <input
                    id="lessonId"
                    name="lessonId"
                    type="text"
                    value={formData.lessonId}
                    onChange={handleChange}
                    placeholder="auto-generated-from-title"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-medium">
                  Lesson Content <span className="text-red-500">*</span>
                </h2>
                <p className="text-sm text-gray-500">Use the editor below to create your lesson content.</p>
              </div>
              <div className="p-0">
                <ContentEditor onChange={handleEditorChange} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}