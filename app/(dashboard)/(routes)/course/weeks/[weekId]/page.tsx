"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"

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

interface LessonContent {
  _id: string
  weekId: number
  courseId: string
  lessonId: string
  slug: string
  name: string
  content: string
  videoUrl: string | null
  attachments: string | null
  createdAt: string
  updatedAt: string
}

const WeekDetail = () => {
  const [week, setWeek] = useState<Week | null>(null)
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const weekId = params?.weekId as string

  const getSearchParams = useCallback(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      return {
        slug: searchParams.get("slug") || "",
        courseId: searchParams.get("courseId") || "",
      }
    }
    return { slug: "", courseId: "" }
  }, [])

  const fetchWeekData = useCallback(async () => {
    const { slug, courseId } = getSearchParams()
    if (!slug || !courseId || !weekId) {
      setError("Missing slug, courseId, or weekId")
      setLoading(false)
      return
    }

    try {
      console.log("Fetching data for:", { courseId, slug, weekId })
      const response = await fetch(`/api/course-week?courseId=${courseId}&slug=${slug.split("/")[0]}&weekId=${weekId}`)
      const result = await response.json()
      console.log("API response:", result)
      if (result.success && result.data) {
        setWeek(result.data)
        console.log("Week data set:", result.data)

        // Fetch the lesson content if a lesson slug is provided
        const lessonSlug = slug.split("/")[1]
        if (lessonSlug) {
          const lesson = result.data.lessonList.find((l: Lesson) => l.slug === lessonSlug)
          if (lesson) {
            await fetchLessonContent(lesson.id)
          }
        } else {
          setCurrentLesson(null)
        }
      } else {
        setError("Failed to fetch week data")
      }
    } catch (err) {
      setError("Error fetching week data")
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [weekId, getSearchParams])

  const fetchLessonContent = useCallback(
    async (lessonId: string) => {
      const { courseId } = getSearchParams()
      try {
        console.log("Fetching lesson content for:", { courseId, weekId, lessonId })
        const response = await fetch(`/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`)
        const result = await response.json()
        console.log("Lesson content API response:", result)
        if (result.success && result.data) {
          setCurrentLesson(result.data)
          console.log("Current lesson set:", result.data)

          // Update the URL with the new lesson slug
          const newSlug = `${week?.slug}/${result.data.slug}`
          router.push(`/course/weeks/${weekId}?courseId=${courseId}&slug=${newSlug}`, undefined)

          // Save the current lesson state to sessionStorage
          sessionStorage.setItem("currentLesson", JSON.stringify(result.data))
        } else {
          setError("Failed to fetch lesson content")
        }
      } catch (err) {
        setError("Error fetching lesson content")
        console.error("Fetch error:", err)
      }
    },
    [weekId, week, router, getSearchParams],
  )

  useEffect(() => {
    const initializePageState = async () => {
      // Try to load the lesson state from sessionStorage
      const savedLesson = sessionStorage.getItem("currentLesson")
      if (savedLesson) {
        setCurrentLesson(JSON.parse(savedLesson))
      }

      await fetchWeekData()
    }

    initializePageState()
  }, [fetchWeekData])

  useEffect(() => {
    const handlePopState = () => {
      // Clear the saved lesson state
      sessionStorage.removeItem("currentLesson")
      // Reload the page to fetch fresh data
      window.location.reload()
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  console.log("Current week state:", week)
  console.log("Current lesson state:", currentLesson)

  if (loading) return <p className="text-center text-lg text-blue-500">Loading...</p>
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>
  if (!week) return <p className="text-center text-lg text-red-500">No data found for this week</p>

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navigation Menu */}
      <nav className="w-64 bg-white shadow-md h-full overflow-y-auto">
        <div className="p-4 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Week {week.weekId} Lessons</h2>
        </div>
        <ul className="space-y-2 p-4">
          {week.lessonList && week.lessonList.length > 0 ? (
            week.lessonList.map((lesson) => (
              <li key={lesson.id}>
                <button
                  onClick={() => fetchLessonContent(lesson.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition duration-150 ease-in-out"
                >
                  {lesson.title}
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500 px-4 py-2">No lessons available</li>
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          {currentLesson ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{currentLesson.name}</h1>
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
              {currentLesson.videoUrl && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Video Content</h2>
                  <video src={currentLesson.videoUrl} controls className="w-full" />
                </div>
              )}
              {currentLesson.attachments && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Attachments</h2>
                  <a href={currentLesson.attachments} className="text-blue-600 hover:underline">
                    Download Attachment
                  </a>
                </div>
              )}
            </>
          ) : (
            <p className="text-xl text-gray-600">Select a lesson from the sidebar to view its content.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default WeekDetail

