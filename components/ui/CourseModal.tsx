"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course | null;
  onSave: () => void;
}

export default function CourseModal({ isOpen, onClose, course, onSave }: CourseModalProps) {
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        courseId: course.courseId,
        title: course.title,
        slug: course.slug,
        description: course.description || "",
      });
    } else {
      setFormData({ courseId: "", title: "", slug: "", description: "" });
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = course ? "PUT" : "POST";
    const url = course ? `/api/courses?courseId=${course.courseId}` : "/api/courses";
    const body = {
      ...formData,
      createdAt: course?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Course ${course ? "updated" : "created"} successfully.`);
        onSave();
        onClose();
      } else {
        toast.error(data.message || "Failed to save course.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{course ? "Edit Course" : "Add New Course"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course ID *</label>
            <input
              type="text"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
              disabled={!!course}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              rows={4}
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
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}