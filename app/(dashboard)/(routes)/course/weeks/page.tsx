"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function WeekList() {
  interface Lesson {
    title: string
    id: string
  }

  interface Week {
    _id: string
    weekId: number
    courseId: string
    lessonCount: number
    slug: string
    lessonList: Lesson[]
    createdAt: string
    updatedAt: string
  }

  const [weeks, setWeeks] = useState<Week[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const courseId = searchParams?.get("courseId") || "sql" // Default to "sql" if not provided

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const response = await fetch("/api/course-week")
        const result = await response.json()
        if (result.success) {
          console.log("Fetched weeks data:", result.data)
          setWeeks(result.data)
        } else {
          setError("Failed to fetch data")
        }
      } catch (err) {
        setError("Error fetching data")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeeks()
  }, [])

  if (loading) return <p className="text-center text-lg text-blue-500">Loading...</p>
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>

  const filteredWeeks = weeks.filter((week) => week.courseId === courseId)

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        Weeks for Course: {courseId.toUpperCase()}
      </h2>

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
            <div className="flex justify-between items-center mt-6">
              <Link href={`/course/weeks/${week.weekId}?courseId=${courseId}&slug=${week.slug}`}>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                  Start Now
                </button>
              </Link>

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
  )
}

