"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, CheckCircle, Clock, FileText, ChevronRight, ChevronLeft } from "lucide-react"
import Loader from "@/app/(dashboard)/_components/loader"

export default function LessonDetail({ params }) {
  interface Lesson {
    _id: string
    courseId: string
    weekId: number
    lessonId: string
    slug: string
    title: string
    name: string
    subtitle: string
    content: string
    videoUrl: string | null
    attachments: any[] | null
    createdAt: string
    updatedAt: string
  }

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams?.get("courseId") || "sql"
  const weekId = searchParams?.get("weekId") || "1"
  const lessonId = params.lessonId

  useEffect(() => {
    const fetchLessonDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`)

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const result = await response.json()
        if (result.success && result.data && result.data.length > 0) {
          setLesson(result.data[0])
          setError("")
        } else {
          setError(result.message || "Lesson not found")
        }
      } catch (err) {
        console.error("Error fetching lesson:", err)
        setError("Error fetching lesson. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (courseId && weekId && lessonId) {
      fetchLessonDetail()
    }
  }, [courseId, weekId, lessonId])

  const handleGoBack = () => {
    router.push(`/course/weeks/${weekId}?courseId=${courseId}`)
  }

  if (loading) return <Loader message="Loading lesson..." />

  if (error || !lesson) {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson not found</h2>
          <p className="text-gray-600 mb-6">
            {error || "The lesson you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={handleGoBack}
            className="bg-[#0293A6] text-white px-4 py-2 rounded-lg hover:bg-[#026d7d] transition-colors"
          >
            Go Back to Week
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

      {/* Header */}
      <header className="bg-white shadow-md pt-[65px]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-gray-600 hover:text-[#0293A6] transition duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Week {weekId}
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
            <div>
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 mr-2 text-[#0293A6]" />
                <span className="text-sm font-medium text-gray-500">
                  {courseId.toUpperCase()} • Week {weekId}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#0F172A]">{lesson.title}</h1>
              {lesson.subtitle && <p className="text-gray-600 mt-1">{lesson.subtitle}</p>}
            </div>

            <div className="mt-4 md:mt-0 flex items-center">
              <div className="flex items-center text-gray-500 mr-4">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">25 min</span>
              </div>
              <div className="flex items-center text-[#68D391]">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Completed</span>
              </div>
            </div>
          </div>

          {/* Lesson navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <button className="inline-flex items-center text-gray-600 hover:text-[#0293A6] transition duration-200 px-3 py-1 rounded-md hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Previous Lesson</span>
            </button>
            <button className="inline-flex items-center text-gray-600 hover:text-[#0293A6] transition duration-200 px-3 py-1 rounded-md hover:bg-gray-100">
              <span>Next Lesson</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
          {/* Video section */}
          {lesson.videoUrl && (
            <div className="mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={lesson.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Content section */}
          <div className="prose prose-slate max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: lesson.content || "<p>No content available for this lesson.</p>" }}
            />
          </div>

          {/* Attachments section */}
          {lesson.attachments && lesson.attachments.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#0293A6]" />
                Attachments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-[#0293A6] mr-3" />
                    <div>
                      <p className="font-medium text-[#0F172A]">{attachment.name}</p>
                      <p className="text-sm text-gray-500">{attachment.type}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
            <button className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </button>
            <button className="inline-flex items-center justify-center bg-[#0293A6] hover:bg-[#026d7d] text-white px-4 py-2 rounded-lg transition-colors">
              Next Lesson
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
