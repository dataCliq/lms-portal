"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Week {
  _id: string;
  courseId: string;
  weekId: number;
  slug: string;
  title: string;
  lessonCount: number;
  lessonList: { title: string; id: string }[];
}

interface WeekModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  week?: Week | null;
  onSave: () => void;
}

export default function WeekModal({ isOpen, onClose, courseId, week, onSave }: WeekModalProps) {
  const [formData, setFormData] = useState({
    courseId,
    weekId: 0,
    slug: "",
    title: "",
    lessonCount: 0,
    lessonList: [] as { title: string; id: string }[],
  });

  useEffect(() => {
    if (week) {
      setFormData({
        courseId: week.courseId,
        weekId: week.weekId,
        slug: week.slug,
        title: week.title,
        lessonCount: week.lessonCount,
        lessonList: week.lessonList || [],
      });
    } else {
      setFormData((prev) => ({ ...prev, weekId: 0, slug: "", title: "", lessonCount: 0, lessonList: [] }));
    }
  }, [week]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = week ? "PUT" : "POST";
    const url = week
      ? `/api/course-week?courseId=${courseId}&weekId=${week.weekId}`
      : "/api/course-week";
    const body = {
      courseId,
      weekId: formData.weekId,
      slug: formData.slug,
      title: formData.title,
      lessonCount: formData.lessonCount,
      lessonList: formData.lessonList,
      createdAt: week?.createdAt || new Date().toISOString().split("T")[0],
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
        toast.success(`Week ${week ? "updated" : "created"} successfully.`);
        onSave();
        onClose();
      } else {
        toast.error(data.message || "Failed to save week.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{week ? "Edit Week" : "Add New Week"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Week ID *</label>
            <input
              type="number"
              value={formData.weekId}
              onChange={(e) => setFormData({ ...formData, weekId: Number(e.target.value) })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
              disabled={!!week}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">Lesson Count</label>
            <input
              type="number"
              value={formData.lessonCount}
              onChange={(e) => setFormData({ ...formData, lessonCount: Number(e.target.value) })}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lesson List (JSON)</label>
            <textarea
              value={JSON.stringify(formData.lessonList, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setFormData({ ...formData, lessonList: Array.isArray(parsed) ? parsed : [] });
                } catch {
                  setFormData({ ...formData, lessonList: [] });
                }
              }}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder='[{"title": "Lesson 1", "id": "lesson1"}, ...]'
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
              Save Week
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}