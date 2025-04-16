"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import WeekModal from "../../../../../components/ui/WeekModal";

interface Week {
  _id: string;
  courseId: string;
  weekId: number;
  slug: string;
  title: string;
  lessonCount: number;
  lessonList: { title: string; id: string }[];
}

export default function WeekManagement() {
  const { courseId } = useParams();
  const router = useRouter();
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWeek, setEditingWeek] = useState<Week | null>(null);

  useEffect(() => {
    fetchWeeks();
  }, [courseId]);

  const fetchWeeks = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching weeks for courseId:", courseId); // Debug log
      const res = await fetch(`/api/course-week?courseId=${courseId}`);
      const data = await res.json();
      console.log("Weeks API response:", data); // Debug log
      if (data.success && Array.isArray(data.data)) {
        setWeeks(data.data);
      } else {
        setWeeks([]);
        toast.error("No weeks data found or invalid response.");
      }
    } catch (error) {
      console.error("Error fetching weeks:", error);
      setWeeks([]);
      toast.error("Failed to load weeks. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWeek = async (weekId: number) => {
    if (!confirm("Delete week and all lessons?")) return;
    try {
      const res = await fetch(`/api/course-week?courseId=${courseId}&weekId=${weekId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setWeeks(weeks.filter((w) => w.weekId !== weekId));
        toast.success("Week deleted.");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete week.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting week.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Weeks for Course {courseId}</h1>
        <button
          onClick={() => {
            setEditingWeek(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Week
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      ) : weeks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No weeks found. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weeks.map((week) => (
            <div key={week._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Week {week.weekId}: {week.title || "Untitled"}</h2>
              <p className="text-sm text-gray-600 mt-2">Lessons: {week.lessonCount}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => {
                    setEditingWeek(week);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteWeek(week.weekId)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <WeekModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId as string}
        week={editingWeek}
        onSave={fetchWeeks}
      />
    </div>
  );
}