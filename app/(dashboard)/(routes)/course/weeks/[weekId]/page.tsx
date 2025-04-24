"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, CheckCircle, BarChart2, Database, FileText, Clock, ChevronRight } from "lucide-react"
import Loader from "@/app/(dashboard)/_components/loader"

export default function WeekDetail({ params }) {
  interface Lesson {
    title: string
    id: string
    slug: string
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

  const [week, setWeek] = useState<Week | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams?.get("courseId") || "sql"
  const slug = searchParams?.get("slug") || ""
  const weekId = params.weekId

  useEffect(() => {
    const fetchWeekDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/course-week/${weekId}?courseId=${courseId}`)

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const result = await response.json()
        if (result.success) {
          setWeek(result.data)
          setError("")
        } else {
          setError(result.message || "Failed to fetch week details")
        }
      } catch (err) {
        console.error("Error fetching week details:", err)
        setError("Error fetching week details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (courseId && weekId) {
      fetchWeekDetail()
    }
  }, [weekId, courseId])

  const handleGoBack = () => {
    router.push(`/course/weeks?courseId=${courseId}`)
  }

  if (loading) return <Loader message="Loading week details..." />

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoBack}
            className="bg-[#0293A6] text-white px-4 py-2 rounded-lg hover:bg-[#026d7d] transition-colors"
          >
            Go Back to Weeks
          </button>
        </div>
      </div>
    )
  }

  if (!week) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-yellow-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Week not found</h2>
          <p className="text-gray-600 mb-6">The week you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={handleGoBack}
            className="bg-[#0293A6] text-white px-4 py-2 rounded-lg hover:bg-[#026d7d] transition-colors"
          >
            Go Back to Weeks
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Data-themed background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dataGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0293A6" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1" fill="#0293A6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dataGrid)" />
        </svg>
      </div>

      {/* Header with data visualization elements */}
      <header className="relative bg-gradient-to-r from-[#0F172A] to-[#0F172A]/90 text-white py-12 px-6 overflow-hidden mt-[65px]">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dataViz" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1.5" fill="#00A3B5" />
                <circle cx="25" cy="25" r="1" fill="#00A3B5" />
                <circle cx="75" cy="75" r="1" fill="#00A3B5" />
                <circle cx="25" cy="75" r="1" fill="#00A3B5" />
                <circle cx="75" cy="25" r="1" fill="#00A3B5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dataViz)" />
          </svg>
        </div>

        {/* Animated data elements */}
        <div className="absolute right-10 top-10 opacity-20 hidden md:block">
          <div className="w-32 h-32 rounded-full border-4 border-[#00A3B5] animate-pulse"></div>
        </div>
        <div className="absolute left-10 bottom-10 opacity-20 hidden md:flex space-x-4">
          <div className="w-4 h-16 bg-[#68D391] rounded-t-lg"></div>
          <div className="w-4 h-24 bg-[#00A3B5] rounded-t-lg"></div>
          <div className="w-4 h-12 bg-[#68D391] rounded-t-lg"></div>
          <div className="w-4 h-20 bg-[#00A3B5] rounded-t-lg"></div>
        </div>

        <div className="max-w-screen-xl mx-auto relative z-10">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Weeks
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Database className="h-5 w-5 mr-2 text-[#00A3B5]" />
                <span className="text-sm font-medium text-white/70">{courseId.toUpperCase()} Course</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Week {week.weekId}</h1>
              <div className="flex items-center text-white/70 flex-wrap">
                <div className="flex items-center mr-4 mb-2 md:mb-0">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="text-sm">{week.lessonCount} Lessons</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Approx. 5 hours</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 inline-flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#68D391]/20 flex items-center justify-center mr-3">
                  <BarChart2 className="h-5 w-5 text-[#68D391]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Your Progress</div>
                  <div className="text-2xl font-bold text-[#68D391]">75%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-[#00A3B5]" />
            Lessons in this Week
          </h2>

          <div className="space-y-4">
            {week.lessonList && week.lessonList.length > 0 ? (
              week.lessonList.map((lesson, index) => (
                <Link key={lesson.id} href={`/course/lessons/${lesson.id}?courseId=${courseId}&weekId=${week.weekId}`}>
                  <div className="flex items-center p-4 rounded-lg border border-gray-100 hover:bg-[#F1F5F9] transition-colors duration-200 group">
                    <div className="h-10 w-10 rounded-full bg-[#00A3B5]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-[#00A3B5] font-medium">{index + 1}</span>
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-[#0F172A] group-hover:text-[#00A3B5] transition-colors duration-200 truncate">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap">
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>25 min</span>
                        </div>

                        {/* Conditionally show completed status */}
                        {index < 3 && (
                          <div className="flex items-center text-[#68D391]">
                            <CheckCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      {index < 3 ? (
                        <div className="h-8 w-8 rounded-full bg-[#68D391]/20 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-[#68D391]" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#00A3B5]/20 transition-colors duration-200">
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#00A3B5] transition-colors duration-200" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No lessons available for this week</div>
            )}
          </div>
        </div>

        {/* Data visualization section */}
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-[#00A3B5]" />
            Your Learning Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#F8FAFC] rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Time Spent</div>
              <div className="text-2xl font-bold text-[#0F172A]">3.5 hours</div>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-[#00A3B5] rounded-full" style={{ width: "70%" }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">70% of expected time</div>
            </div>

            <div className="bg-[#F8FAFC] rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Completion Rate</div>
              <div className="text-2xl font-bold text-[#0F172A]">75%</div>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-[#68D391] rounded-full" style={{ width: "75%" }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">3 of 4 lessons completed</div>
            </div>

            <div className="bg-[#F8FAFC] rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Quiz Performance</div>
              <div className="text-2xl font-bold text-[#0F172A]">92%</div>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-[#00A3B5] rounded-full" style={{ width: "92%" }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Excellent progress</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
