'use client';

import { useEffect, useState } from "react";

export default function WeekList() {
  interface Week {
    _id: string;
    weekId: number;
    courseId: string;
    lessonCount: number;
    slug: string;
    lessonList: string[];
  }

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("sql"); // Default selected course

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const response = await fetch("/api/course-week");
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
  }, []);

  if (loading) return <p className="text-center text-lg text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  // Filter weeks based on the selected courseId
  const filteredWeeks = weeks.filter((week) => week.courseId === selectedCourse);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Weeks for Course: {selectedCourse.toUpperCase()}</h2>

      {/* Course Selector */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setSelectedCourse("sql")}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 ${
            selectedCourse === "sql" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-blue-600"
          } hover:bg-blue-500`}
        >
          SQL
        </button>
        <button
          onClick={() => setSelectedCourse("power-bi")}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 ${
            selectedCourse === "power-bi" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-blue-600"
          } hover:bg-blue-500`}
        >
          Power BI
        </button>
      </div>

      {/* Week Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWeeks.map((week) => (
          <div
            key={week._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300 transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-gray-800">Week {week.weekId}</h3>
            <p className="text-gray-600">Lessons: {week.lessonCount}</p>
            <p className="text-gray-600">Slug: {week.slug}</p>
            <div className="my-4">
              <h4 className="font-medium text-gray-700">Lessons:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {week.lessonList.map((lesson, index) => (
                  <li key={index}>{lesson}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                Get Started
              </button>
              <div className="relative w-14 h-14">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  ></path>
                  <path
                    className="text-blue-500"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831"
                  ></path>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-sm font-bold text-white">
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
