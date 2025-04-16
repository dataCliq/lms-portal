"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ContentEditor } from "./content-editor";

interface Lesson {
  _id: string;
  courseId: string;
  weekId: number;
  lessonId: string;
  slug: string;
  name: string;
  content: string;
  videoUrl?: string;
}

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  weekId: number;
  lesson?: Lesson | null;
  onSave: () => void;
}

export default function LessonModal({ isOpen, onClose, courseId, weekId, lesson, onSave }: LessonModalProps) {
  const [formData, setFormData] = useState({
    courseId,
    weekId,
    lessonId: "",
    slug: "",
    name: "",
    content: "",
    videoUrl: "",
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        courseId: lesson.courseId,
        weekId: lesson.weekId,
        lessonId: lesson.lessonId,
        slug: lesson.slug,
        name: lesson.name,
        content: lesson.content,
        videoUrl: lesson.videoUrl || "",
      });
    } else {
      setFormData({ courseId, weekId, lessonId: "", slug: "", name: "", content: "", videoUrl: "" });
    }
  }, [lesson, courseId, weekId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = lesson ? "PUT" : "POST";
    const url = lesson
      ? `/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lesson.lessonId}`
      : "/api/lesson-content";
    const body = {
      courseId,
      weekId,
      lessonId: formData.lessonId,
      slug: formData.slug,
      name: formData.name,
      content: formData.content,
      videoUrl: formData.videoUrl || null,
      createdAt: lesson?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lesson ? { ...body, oldLessonId: lesson.lessonId } : body),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Lesson ${lesson ? "updated" : "created"} successfully.`);
        onSave();
        onClose();
      } else {
        toast.error(data.message || "Failed to save lesson.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{lesson ? "Edit Lesson" : "Add New Lesson"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Lesson ID *</label>
            <input
              type="text"
              value={formData.lessonId}
              onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
              disabled={!!lesson}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content *</label>
            <ContentEditor
              initialContent={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Save Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}