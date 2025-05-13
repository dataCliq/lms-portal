"use client"

import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle, BookOpen, ChevronRight, ChevronLeft, AlertCircle, Play } from "lucide-react"
import "./lesson-styles.css"

interface LessonItem {
  id: string
  title: string
  duration?: string
  isCompleted?: boolean
}

interface Week {
  _id?: string
  courseId: string
  weekId: number
  slug: string
  title?: string
  description?: string
  lessonCount?: number
  lessonList?: LessonItem[]
  createdAt?: string
  updatedAt?: string
}

interface Lesson {
  _id?: string
  lessonId: string
  title?: string
  name?: string
  content: string
  courseId: string
  weekId: number
  slug: string
}

export default function WeekPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const weekId = params?.weekId as string
  const courseId = searchParams?.get("courseId") || ""
  const slug = searchParams?.get("slug") || ""

  const [week, setWeek] = useState<Week | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const [progress, setProgress] = useState(42) // Mock progress percentage
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll to top when changing lessons
  useEffect(() => {
    if (contentRef.current && activeLesson) {
      contentRef.current.scrollTo(0, 0)
    }
  }, [activeLesson])

  // Fetch week data
  useEffect(() => {
    if (!weekId || !courseId) {
      setError("Missing courseId or weekId.")
      setLoading(false)
      return
    }

    const fetchWeek = async () => {
      try {
        const apiUrl = `/api/course-week?courseId=${courseId}&weekId=${weekId}&slug=${slug}`
        console.log("Fetching week data from:", apiUrl)
        const res = await fetch(apiUrl)

        if (!res.ok) {
          throw new Error("Failed to fetch week data")
        }

        const result = await res.json()

        if (result.success && result.data.length > 0) {
          setWeek(result.data[0])
        } else {
          setError(result.message || "Week not found.")
        }
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err instanceof Error ? err.message : "Error fetching week details. Please try again later.")
      }
    }

    fetchWeek()
  }, [weekId, courseId, slug])

  // Fetch lessons for the week
  useEffect(() => {
    if (!courseId || !weekId) return

    const fetchLessons = async () => {
      try {
        const apiUrl = `/api/lesson-content?courseId=${courseId}&weekId=${weekId}`
        console.log("Fetching lessons from:", apiUrl)
        const res = await fetch(apiUrl)

        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`)
        }

        const result = await res.json()

        if (result.success && result.data && result.data.length > 0) {
          // Add mock durations for UI demonstration
          const lessonsWithDuration = result.data.map((lesson: Lesson) => ({
            ...lesson,
            duration: `${Math.floor(Math.random() * 20) + 10} min`, // Random duration between 10-30 min
          }))
          setLessons(lessonsWithDuration)

          // Set the first lesson as active by default
          if (lessonsWithDuration.length > 0 && !activeLesson) {
            setActiveLesson(lessonsWithDuration[0].lessonId)
          }
        } else {
          console.warn("No lessons found or API returned unsuccessful response")
          setLessons([])
        }
      } catch (err) {
        console.error("Error fetching lessons:", err)
        setError("Failed to fetch lessons.")
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [courseId, weekId, activeLesson])

  const handleGoBack = () => {
    router.push(`/course/weeks?courseId=${courseId}`)
  }

  const handleLessonClick = (lessonId: string) => {
    setActiveLesson(lessonId)
  }

  const getCurrentLessonIndex = () => {
    if (!activeLesson) return 0
    return lessons.findIndex((lesson) => lesson.lessonId === activeLesson)
  }

  const handlePreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex()
    if (currentIndex > 0) {
      setActiveLesson(lessons[currentIndex - 1].lessonId)
    }
  }

  const handleNextLesson = () => {
    const currentIndex = getCurrentLessonIndex()
    if (currentIndex < lessons.length - 1) {
      setActiveLesson(lessons[currentIndex + 1].lessonId)
    }
  }

  const getActiveLesson = () => {
    if (!activeLesson) return null
    return lessons.find((lesson) => lesson.lessonId === activeLesson)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A3B5]"></div>
          <span className="mt-4 text-lg text-gray-700">Loading week content...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoBack}
            className="bg-[#00A3B5] text-white px-4 py-2 rounded-lg hover:bg-[#008999] transition-colors"
          >
            Go Back to Weeks
          </button>
        </div>
      </div>
    )
  }

  const currentLesson = getActiveLesson()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Course Info with Back Button */}
      <div className="bg-white border-b mt-16 sticky top-16 z-10 shadow-sm">
        <div className="w-full px-4 py-4 flex items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-[#00A3B5]/10 text-[#00A3B5] hover:bg-[#00A3B5]/20 transition-colors mr-3"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>
                {courseId.toUpperCase()} • Week {weekId}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Week {weekId}</h1>
          </div>
          <div className="hidden md:block">
            <div className="bg-[#F8FAFC] rounded-full h-8 w-32 flex items-center">
              <div
                className="bg-gradient-to-r from-[#00A3B5] to-[#68D391] h-8 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="absolute text-xs font-medium ml-3">{progress}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mx-auto w-full h-[calc(100vh-8rem)] mb-16">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 hidden md:block shadow-sm h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Lessons</h2>
          </div>
          <div className="overflow-auto h-[calc(100vh-12rem)]">
            <ul className="space-y-1">
              {lessons.map((lesson) => (
                <li key={lesson._id || lesson.lessonId}>
                  <button
                    onClick={() => handleLessonClick(lesson.lessonId)}
                    className={`w-full text-left px-4 py-3 flex items-center rounded-xl transition-all ${
                      activeLesson === lesson.lessonId
                        ? "bg-gradient-to-r from-[#00A3B5]/10 to-[#68D391]/10 border border-[#00A3B5]/20 text-[#00A3B5]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm ${
                            activeLesson === lesson.lessonId ? "text-gray-900 font-medium" : "text-gray-700"
                          }`}
                        >
                          {lesson.title || lesson.name || "Untitled Lesson"}
                        </p>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>{lesson.duration || "25 min"}</span>
                      </div>
                    </div>
                    {activeLesson === lesson.lessonId && <Play className="h-4 w-4 text-gray-600 ml-2 flex-shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} className="flex-1 overflow-auto bg-[#F8FAFC] h-full">
          {currentLesson ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 w-full">
                <div className="bg-white w-full h-full overflow-auto">
                  <div className="p-4 md:p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {currentLesson.title || currentLesson.name || "Untitled Lesson"}
                    </h2>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">25 min read</span>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  <div className="prose max-w-none p-4 md:p-6 pt-0 lesson-content">
                    {currentLesson.content ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        className="tiptap-content custom-lesson-content"
                      />
                    ) : (
                      <div className="custom-lesson-content">
                        <p className="para-t">No content available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lesson Navigation */}
              <div className="bg-white border-t p-4 flex justify-between items-center fixed bottom-0 left-0 right-0 shadow-md z-10 w-full">
                <button
                  onClick={handlePreviousLesson}
                  disabled={getCurrentLessonIndex() === 0}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    getCurrentLessonIndex() > 0 ? "text-gray-600 hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous Lesson
                </button>
                <div className="text-sm text-gray-500">
                  {getCurrentLessonIndex() + 1} of {lessons.length}
                </div>
                <button
                  onClick={handleNextLesson}
                  disabled={getCurrentLessonIndex() === lessons.length - 1}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    getCurrentLessonIndex() < lessons.length - 1
                      ? "bg-[#00A3B5] text-white hover:bg-[#008999]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next Lesson
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-[#00A3B5] mb-4">
                  <AlertCircle className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">No lesson selected</h3>
                <p className="text-gray-600 mb-4">Please select a lesson from the sidebar to view its content.</p>
                {lessons.length > 0 && (
                  <button
                    onClick={() => setActiveLesson(lessons[0].lessonId)}
                    className="bg-[#00A3B5] text-white px-4 py-2 rounded-md hover:bg-[#008999] transition-colors"
                  >
                    Start First Lesson
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Lesson Navigation */}
      <div className="md:hidden bg-white border-t p-4 fixed bottom-0 left-0 right-0 shadow-lg z-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">Lessons</h3>
          <span className="text-sm text-gray-500">
            {getCurrentLessonIndex() + 1} of {lessons.length}
          </span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {lessons.map((lesson, index) => (
            <button
              key={lesson._id || lesson.lessonId}
              onClick={() => handleLessonClick(lesson.lessonId)}
              className={`flex-shrink-0 px-3 py-2 rounded-md text-sm ${
                activeLesson === lesson.lessonId
                  ? "bg-[#00A3B5] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}. {lesson.title || lesson.name || "Lesson"}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
