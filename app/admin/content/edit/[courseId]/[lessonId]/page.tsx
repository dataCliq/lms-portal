"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { fetchLesson, updateLesson } from "@/lib/api-client";
import { ContentEditor } from "../../../../../../components/ui/content-editor";
import React from "react";

export default function EditLesson({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const courseId = params.courseId;
  const weekId = params.weekId;
  const lessonId = params.lessonId;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    courseId,
    weekId: Number(weekId),
    lessonId,
    oldLessonId: lessonId, // Track original ID for updates
    slug: "",
    name: "",
    content: "",
  });

  useEffect(() => {
    async function loadLesson() {
      try {
        const lessonData = await fetchLesson(courseId, weekId, lessonId);
        if (lessonData?.success && lessonData.data) {
          const lesson = lessonData.data;
          setFormData({
            courseId: lesson.courseId,
            weekId: lesson.weekId,
            lessonId: lesson.lessonId,
            oldLessonId: lesson.lessonId,
            slug: lesson.slug,
            name: lesson.name,
            content: lesson.content,
          });
        } else {
          setError("Lesson not found.");
        }
      } catch (error) {
        console.error("Error loading lesson:", error);
        setError("Failed to fetch lesson. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    loadLesson();
  }, [courseId, weekId, lessonId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      const slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      setFormData((prev) => ({ ...prev, [name]: value, slug, lessonId: slug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateLesson(formData);
      router.push("/admin/content");
    } catch (error) {
      alert("Failed to update lesson.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-[calc(100vh-10rem)]"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (error) {
    return (
      <div className="grid gap-6 p-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/content" className="inline-flex items-center justify-center rounded-md w-8 h-8 text-gray-500 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Edit Lesson</h1>
        </div>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/content" className="inline-flex items-center justify-center rounded-md w-8 h-8 text-gray-500 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Edit Lesson</h1>
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

      <form id="lesson-form" onSubmit={handleSubmit}>
        <div className="rounded-lg border bg-white overflow-hidden">
          <div className="p-6 space-y-4">
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
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1">
                  Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50"
                  disabled={isSubmitting}
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
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-lg border bg-white overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium">Lesson Content <span className="text-red-500">*</span></h2>
              <p className="text-sm text-gray-500">Edit the lesson content below.</p>
            </div>
            <div className="p-0">
              <ContentEditor onChange={handleEditorChange} initialContent={formData.content} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}