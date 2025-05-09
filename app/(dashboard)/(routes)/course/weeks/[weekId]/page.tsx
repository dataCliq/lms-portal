"use client"

import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle, BookOpen, ChevronRight, ChevronLeft, AlertCircle, Play } from "lucide-react"

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
      <div className="min-h-screen ">
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
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={handleGoBack} className="mr-4 text-gray-600 hover:text-[#00A3B5] transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center text-sm text-gray-500">
                <Link href={`/course/weeks?courseId=${courseId}`} className="hover:text-[#00A3B5] transition-colors">
                  Back to Weeks
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">5 hours</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">In Progress</span>
            </div>
          </div>
        </div>
      </header>

      {/* Course Info */}
      <div className="bg-white border-b mt-5">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>
              {courseId.toUpperCase()} • Week {weekId}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Week {weekId}</h1>
        </div>
      </div>

      <div className="flex  w-full">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r hidden md:block">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-800">Lessons</h2>
          </div>
          <div className="overflow-auto h-[calc(100vh-12rem)]">
            <ul>
              {lessons.map((lesson) => (
                <li key={lesson._id || lesson.lessonId}>
                  <button
                    onClick={() => handleLessonClick(lesson.lessonId)}
                    className={`w-full text-left px-4 py-3 flex items-center border-l-4 hover:bg-gray-50 transition-colors ${
                      activeLesson === lesson.lessonId ? "border-[#00A3B5] bg-[#E6F7F9]" : "border-transparent"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium truncate ${
                          activeLesson === lesson.lessonId ? "text-[#00A3B5]" : "text-gray-700"
                        }`}
                      >
                        {lesson.title || lesson.name || "Untitled Lesson"}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{lesson.duration || "25 min"}</span>
                      </div>
                    </div>
                    {activeLesson === lesson.lessonId && <Play className="h-4 w-4 text-[#00A3B5] ml-2 flex-shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} className="flex-1 overflow-auto bg-white">
          {currentLesson ? (
            <div className="h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentLesson.title || currentLesson.name || "Untitled Lesson"}
                  </h2>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">25 min read</span>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="prose max-w-none">
                  {currentLesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  ) : (
                    <div>
                      <p>jbjejkrngj</p>
                      <p>njnjgvnjegrn</p>
                      <p>kvnrjbvjernjvnejnvenkvernr;eg;bb</p>
                      <p>reberbnrknb</p>

                      <table className="min-w-full border-collapse mt-6 mb-6">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">hefhrbj</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">njvjbnj</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">fbejbj</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">benfjenjfn</td>
                            <td className="border border-gray-300 px-4 py-2">nejnjenrk</td>
                            <td className="border border-gray-300 px-4 py-2">bndwebfjnwj</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">njenfkenk</td>
                            <td className="border border-gray-300 px-4 py-2">nkenk</td>
                            <td className="border border-gray-300 px-4 py-2">fcjnwjk</td>
                          </tr>
                        </tbody>
                      </table>

                      <p>jner;jgne1jg</p>
                      <p>kfnkre</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson Navigation */}
              <div className="border-t p-4 flex justify-between items-center mt-auto">
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
      <div className="md:hidden bg-white border-t p-4 sticky bottom-0">
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