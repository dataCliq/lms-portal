"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/(dashboard)/_components/loader";

export default function WeekList() {
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

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const courseId = searchParams?.get("courseId") || "sql";

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const response = await fetch(`/api/course-week?courseId=${courseId}`);
        const result = await response.json();
        if (result.success) {
          setWeeks(result.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeks();
  }, [courseId]);

  if (loading) return <Loader message="Loading weeks..." />;
  if (error) return <p className="text-center text-[#0F172A] text-lg">{error}</p>;

  return (
    <div className="min-h-screen p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-medium text-[#0F172A] mb-8 text-center">
        {courseId.toUpperCase()} Weeks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeks.map((week) => (
          <div
            key={week._id}
            className="card w-full max-w-sm h-[300px] bg-[#0F172A] rounded-2xl overflow-hidden relative transition-all duration-300"
          >
            <div className="card-content p-4 relative z-10 h-full flex flex-col justify-between">
              {/* Header Section: Week Title and Lesson Count */}
              <div className="flex items-center mb-4">
                {/* <div className="w-12 h-12 rounded-xl mr-3 border-2 border-white/20 bg-[#00A3B5] flex items-center justify-center text-white font-bold text-[1rem] leading-tight">
                  <div className="text-center">{week.weekId}</div>
                </div> */}
                <div>
                  <h2
                    title={`Week ${week.weekId}`}
                    className="text-lg font-bold text-white/90 truncate"
                  >
                    Week {week.weekId}
                  </h2>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block bg-[#68D391]/20 text-[#68D391]">
                    {week.lessonCount} Lessons
                  </span>
                </div>
              </div>

              {/* Lessons List Section */}
              <div className="mb-4 flex-1 overflow-y-auto">
                <h3 className="text-xs font-semibold text-white/80 mb-2">Lessons</h3>
                <ul className="text-xs text-white/60 grid grid-cols-1 gap-1">
                  {week.lessonList && week.lessonList.length > 0 ? (
                    week.lessonList.map((lesson, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          fill="none"
                          className="w-3 h-3 mr-1 text-[#00A3B5]"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span title={lesson.title} className="truncate">
                          {lesson.title}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-center">
                      <span>No lessons available</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Action Section: Start Button and Progress */}
              <div className="flex justify-between items-center space-x-2">
                <Link
                  href={`/course/weeks/${week.weekId}?courseId=${courseId}&slug=${week.slug}/${week.lessonList[0]?.slug || ""}`}
                  className="flex-1"
                >
                  <button className="w-full bg-[#00A3B5]/20 text-white rounded-lg px-3 py-2 text-xs font-medium transition duration-300 ease-in-out hover:bg-[#00A3B5]/30 flex items-center justify-center border border-white/20">
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                    Start
                  </button>
                </Link>
                <div className="flex-1 text-center text-[#68D391] text-xs font-medium rounded-lg px-3 py-2 bg-[#68D391]/10 border border-white/20">
                  75%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}