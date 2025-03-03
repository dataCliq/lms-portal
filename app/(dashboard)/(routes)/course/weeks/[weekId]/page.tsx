"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface Lesson {
  title: string;
  id: string;
  slug: string;
}

interface Week {
  _id: string;
  weekId: number;
  courseId: string;
  lessonCount: number;
  slug: string;
  lessonList: Lesson[];
  createdAt: string;
  updatedAt: string;
}

interface LessonContent {
  _id: string;
  weekId: number;
  courseId: string;
  lessonId: string;
  slug: string;
  name: string;
  content: string;
  videoUrl: string | null;
  attachments: string | null;
  createdAt: string;
  updatedAt: string;
}

const WeekDetail = () => {
  const [week, setWeek] = useState<Week | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const weekId = params?.weekId as string;

  const getSearchParams = useCallback(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        slug: searchParams.get("slug") || "",
        courseId: searchParams.get("courseId") || "",
      };
    }
    return { slug: "", courseId: "" };
  }, []);

  const fetchWeekData = useCallback(async () => {
    const { slug, courseId } = getSearchParams();
    if (!slug || !courseId || !weekId) {
      setError("Missing slug, courseId, or weekId");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching data for:", { courseId, slug, weekId });
      const response = await fetch(`/api/course-week?courseId=${courseId}&slug=${slug.split("/")[0]}&weekId=${weekId}`);
      const result = await response.json();
      console.log("API response:", result);
      if (result.success && result.data) {
        setWeek(result.data);
        console.log("Week data set:", result.data);

        const lessonSlug = slug.split("/")[1] || "";
        if (lessonSlug) {
          const lesson = result.data.lessonList.find((l: Lesson) => l.slug === lessonSlug);
          if (lesson) {
            await fetchLessonContent(lesson.id);
          } else {
            setCurrentLesson(null);
          }
        } else {
          setCurrentLesson(null);
        }
      } else {
        setError("Failed to fetch week data");
      }
    } catch (err) {
      setError("Error fetching week data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [weekId, getSearchParams]);

  const fetchLessonContent = useCallback(
    async (lessonId: string) => {
      const { courseId } = getSearchParams();
      try {
        console.log("Fetching lesson content for:", { courseId, weekId, lessonId });
        const response = await fetch(
          `/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`
        );
        const result = await response.json();
        console.log("Lesson content API response:", result);
        if (result.success && result.data) {
          setCurrentLesson(result.data);
          console.log("Current lesson set:", result.data);

          const newSlug = `${week?.slug}/${result.data.slug}`;
          router.push(`/course/weeks/${weekId}?courseId=${courseId}&slug=${newSlug}`, undefined);
          sessionStorage.setItem("currentLesson", JSON.stringify(result.data));
        } else {
          setError("Failed to fetch lesson content");
        }
      } catch (err) {
        setError("Error fetching lesson content");
        console.error("Fetch error:", err);
      }
    },
    [weekId, week, router, getSearchParams]
  );

  useEffect(() => {
    const initializePageState = async () => {
      const savedLesson = sessionStorage.getItem("currentLesson");
      if (savedLesson) {
        setCurrentLesson(JSON.parse(savedLesson));
      }
      await fetchWeekData();
    };
    initializePageState();
  }, [fetchWeekData]);

  useEffect(() => {
    const handlePopState = () => {
      sessionStorage.removeItem("currentLesson");
      window.location.reload();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (loading) return <p className="text-center text-lg text-[#804000]">Loading...</p>;
  if (error) return <p className="text-center text-lg text-[#804000]">Error: {error}</p>;
  if (!week) return <p className="text-center text-lg text-[#804000]">No data found for this week</p>;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Side Menu (Left Navigation) - Adjusted to start below top navbar */}
      <nav className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.05)] border-r border-[#f5f5f5] h-screen fixed top-16 left-0 overflow-y-auto z-10">
        <div className="p-4 border-b border-[#f5f5f5] text-[#170F00]">
          <h2 className="text-lg font-bold">Week {week.weekId} Lessons</h2>
        </div>
        <ul className="p-2 space-y-2">
          {week.lessonList && week.lessonList.length > 0 ? (
            week.lessonList.map((lesson) => (
              <li key={lesson.id} className="hover:bg-[#f5f5f5] transition duration-200">
                <button
                  onClick={() => fetchLessonContent(lesson.id)}
                  className="w-full text-left px-3 py-2 text-sm text-[#666] hover:text-[#804000] rounded-md hover:bg-[#f5f5f5] transition duration-200 ease-in-out"
                >
                  {lesson.title}
                </button>
              </li>
            ))
          ) : (
            <li className="text-[#666] px-4 py-2 text-sm">No lessons available</li>
          )}
        </ul>
      </nav>

      {/* Main Content Area - Adjusted for top navbar height */}
      <main className="flex-1 ml-64 pt-16 p-8 overflow-y-auto">
        <div className="lesson-content">
          {currentLesson ? (
            <>
              <div
                className="prose prose-lg text-[#666] mb-6"
                dangerouslySetInnerHTML={{ __html: currentLesson.content }}
              />
            </>
          ) : (
            <p className="text-xl text-[#666] text-center">Select a lesson from the sidebar to view its content.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default WeekDetail;