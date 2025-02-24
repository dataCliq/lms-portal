"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/(dashboard)/_components/loader";

export default function WeekList() {
  interface Lesson {
    title: string;
    id: string;
    slug: string; // Add this line
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
          console.log("Fetched weeks data:", result.data);
          setWeeks(result.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeks();
  }, [courseId]);

  // if (loading) return <p className="text-center text-lg text-[#804000]">Loading...</p>;
  if (loading) return <Loader message="Loading weeks..." />;
  if (error) return <p className="text-center text-lg text-[#804000]">Error: {error}</p>;

  return (
    <div className="min-h-screen p-6 max-w-screen-xl mx-auto pt-24">
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#804000]">
        Weeks for Course: {courseId.toUpperCase()}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto">
        {weeks.map((week) => (
          <div
            key={week._id}
            className="bg-white rounded-2xl shadow-[0px_0px_20px_rgba(0,0,0,0.1)] hover:shadow-[0px_0px_25px_rgba(0,0,0,0.15)] p-6 transition duration-300 transform hover:scale-102 max-h-[500px] overflow-y-auto border border-[#f5f5f5] flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-[#170F00] mb-3">Week {week.weekId}</h3>
              <p className="text-[#666] text-sm mb-4">Lessons: {week.lessonCount}</p>
              <div className="my-4">
                <h4 className="font-medium text-[#666] text-sm mb-2">Lessons:</h4>
                <ul className="list-disc pl-5 text-[#666] text-sm max-h-[200px] overflow-y-auto">
                  {week.lessonList && week.lessonList.length > 0 ? (
                    week.lessonList.map((lesson, index) => (
                      <li key={index} className="mb-2">
                        {lesson.title}
                      </li>
                    ))
                  ) : (
                    <li className="mb-2">No lessons available</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link
                href={`/course/weeks/${week.weekId}?courseId=${courseId}&slug=${week.slug}/${week.lessonList[0]?.slug || ""}`}
              >
                <button className="px-6 py-3 bg-[#804000] text-white rounded-lg hover:bg-[#6a3400] transition duration-200 text-sm font-medium">
                  Start Now
                </button>
              </Link>

              <div className="relative w-14 h-14">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-[#f5f5f5]"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  ></path>
                  <path
                    className="text-[#ffbd30]"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831"
                  ></path>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-[#170F00]">
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