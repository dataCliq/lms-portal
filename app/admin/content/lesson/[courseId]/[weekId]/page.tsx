"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import WeekModal from "../../../../../../components/ui/WeekModal";

interface Lesson {
  _id: string;
  courseId: string;
  weekId: number;
  lessonId: string;
  slug: string;
  name: string;
  content: string;
}

export default function LessonManagement() {
  const { courseId, weekId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    fetchLessons();
  }, [courseId, weekId]);

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/lesson-content?courseId=${courseId}&type=all`);
      const data = await res.json();
      if (data.success) {
        setLessons(data.data.filter((l: Lesson) => l.weekId === Number(weekId)));
      }
    } catch (error) {
      toast.error("Failed to load lessons.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Delete lesson?")) return;
    try {
      const res = await fetch(`/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLessons(lessons.filter((l) => l.lessonId !== lessonId));
        toast.success("Lesson deleted.");
      }
    } catch (error) {
      toast.error("Failed to delete lesson.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Lessons for Week {weekId} (Course {courseId})</h1>
        <button
          onClick={() => {
            setEditingLesson(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Lesson
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No lessons found. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">{lesson.name}</h2>
              <p className="text-sm text-gray-600 mt-2">ID: {lesson.lessonId}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => {
                    setEditingLesson(lesson);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteLesson(lesson.lessonId)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <LessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId as string}
        weekId={Number(weekId)}
        lesson={editingLesson}
        onSave={fetchLessons}
      />
    </div>
  );
}