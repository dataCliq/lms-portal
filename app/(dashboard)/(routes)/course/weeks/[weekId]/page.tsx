"use client"

import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import {
  AlertCircle,
  Play,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  BookmarkIcon,
  Clock,
  Check,
  ExternalLink,
  FileText,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
  duration?: string
  interviewQuestions?: Array<{
    question: string
    answer: string
  }>
  resources?: Array<{
    title: string
    url: string
    type: "link" | "pdf" | "video"
  }>
}

interface InterviewQuestion {
  question: string
  answer: string
}

interface Resource {
  title: string
  url: string
  type: "link" | "pdf" | "video"
}

export default function WeekPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const weekId = params?.weekId as string
  const courseId = searchParams?.get("courseId") || "test"

  const [week, setWeek] = useState<Week | null>(null)
  const [weeks, setWeeks] = useState<Week[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [courseProgress, setProgress] = useState(65)
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({})
  const [courseTitle, setCourseTitle] = useState("Web Development Masterclass")

  // Mock data for weeks and lessons when API fails
  const mockWeeks = [
    {
      _id: "w1",
      weekId: 1,
      courseId: courseId,
      title: "HTML & CSS Basics",
      slug: "html-css-basics",
      lessonCount: 5,
      lessonList: [
        { id: "l1", title: "Intro to HTML" },
        { id: "l2", title: "HTML Elements" },
        { id: "l3", title: "CSS Basics" },
        { id: "l4", title: "CSS Selectors" },
        { id: "l5", title: "CSS Box Model" },
      ],
    },
    {
      _id: "w2",
      weekId: 2,
      courseId: courseId,
      title: "JavaScript Basics",
      slug: "javascript-basics",
      lessonCount: 4,
      lessonList: [
        { id: "l6", title: "Intro to JavaScript" },
        { id: "l7", title: "Variables & Data Types" },
        { id: "l8", title: "Functions" },
        { id: "l9", title: "Arrays & Objects" },
      ],
    },
    {
      _id: "w3",
      weekId: 3,
      courseId: courseId,
      title: "Frontend Frameworks",
      slug: "frontend-frameworks",
      lessonCount: 4,
      lessonList: [
        { id: "l10", title: "Intro to React" },
        { id: "l11", title: "Components" },
        { id: "l12", title: "State & Props" },
        { id: "l13", title: "Hooks" },
      ],
    },
    {
      _id: "w4",
      weekId: 4,
      courseId: courseId,
      title: "Backend Basics",
      slug: "backend-basics",
      lessonCount: 3,
      lessonList: [
        { id: "l14", title: "Intro to Node.js" },
        { id: "l15", title: "Express.js" },
        { id: "l16", title: "Databases" },
      ],
    },
  ]

  const mockLessons = [
    {
      _id: "l1",
      lessonId: "l1",
      title: "Intro to HTML",
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">What is HTML?</h2>
        <p class="mb-4 text-gray-700">
          HTML (Hypertext Markup Language) is the standard markup language for documents designed to
          be displayed in a web browser. It defines the structure and content of web pages.
        </p>

        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
          <p class="text-indigo-700 font-medium">
            HTML is not a programming language; it's a markup language that tells browsers how to
            structure web pages.
          </p>
        </div>

        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Basic Structure</h2>
        <p class="mb-4 text-gray-700">Every HTML document follows a basic structure:</p>

        <div class="code-block">
          <pre><code><span class="line-number">1</span> <span class="tag">&lt;!DOCTYPE html&gt;</span>
<span class="line-number">2</span> <span class="tag">&lt;html&gt;</span>
<span class="line-number">3</span>   <span class="tag">&lt;head&gt;</span>
<span class="line-number">4</span>     <span class="tag">&lt;title&gt;</span><span class="text">Page Title</span><span class="tag">&lt;/title&gt;</span>
<span class="line-number">5</span>   <span class="tag">&lt;/head&gt;</span>
<span class="line-number">6</span>   <span class="tag">&lt;body&gt;</span>
<span class="line-number">7</span>     <span class="tag">&lt;h1&gt;</span><span class="text">My First Heading</span><span class="tag">&lt;/h1&gt;</span>
<span class="line-number">8</span>     <span class="tag">&lt;p&gt;</span><span class="text">My first paragraph.</span><span class="tag">&lt;/p&gt;</span>
<span class="line-number">9</span>   <span class="tag">&lt;/body&gt;</span>
<span class="line-number">10</span> <span class="tag">&lt;/html&gt;</span></code></pre>
        </div>
      `,
      courseId: courseId,
      weekId: 1,
      slug: "intro-to-html",
      duration: "15 min",
      interviewQuestions: [
        {
          question: "What is the difference between HTML and HTML5?",
          answer:
            "HTML5 is the latest version of HTML with new elements, attributes, and behaviors. It includes semantic elements like <article>, <section>, and <nav>, as well as support for audio, video, and canvas elements without requiring plugins. HTML5 also has better support for web applications and mobile devices.",
        },
        {
          question: "What are semantic HTML elements?",
          answer:
            "Semantic HTML elements are tags that clearly describe their meaning to both the browser and the developer. Examples include <header>, <footer>, <article>, <section>, <nav>, <aside>, and <figure>. Using semantic elements makes your HTML more readable, improves accessibility, and helps with SEO.",
        },
      ],
      resources: [
        {
          title: "MDN Web Docs: HTML Reference",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          type: "link",
        },
        {
          title: "HTML Cheat Sheet (PDF)",
          url: "#",
          type: "pdf",
        },
        {
          title: "HTML Crash Course Video",
          url: "#",
          type: "video",
        },
      ],
    },
    {
      _id: "l2",
      lessonId: "l2",
      title: "HTML Elements",
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">HTML Elements</h2>
        <p class="mb-4 text-gray-700">
          HTML elements are the building blocks of HTML pages. Elements are represented by tags.
        </p>

        <h3 class="text-xl font-semibold text-gray-800 mb-3">Common HTML Elements</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings from most important to least important</li>
          <li><strong>&lt;p&gt;</strong> - Paragraph</li>
          <li><strong>&lt;a&gt;</strong> - Anchor (link)</li>
          <li><strong>&lt;img&gt;</strong> - Image</li>
          <li><strong>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</strong> - Lists (unordered, ordered, list item)</li>
          <li><strong>&lt;div&gt;</strong> - Division or section</li>
          <li><strong>&lt;span&gt;</strong> - Inline container</li>
        </ul>

        <div class="code-block">
          <pre><code><span class="tag">&lt;h1&gt;</span><span class="text">Main Heading</span><span class="tag">&lt;/h1&gt;</span>
<span class="tag">&lt;p&gt;</span><span class="text">This is a paragraph with a </span><span class="tag">&lt;a href="https://example.com"&gt;</span><span class="text">link</span><span class="tag">&lt;/a&gt;</span><span class="text">.</span><span class="tag">&lt;/p&gt;</span>
<span class="tag">&lt;img src="image.jpg" alt="Description" /&gt;</span></code></pre>
        </div>
      `,
      courseId: courseId,
      weekId: 1,
      slug: "html-elements",
      duration: "20 min",
    },
  ]

  // Default interview questions and resources (fallback if not in database)
  const defaultInterviewQuestions: InterviewQuestion[] = [
    {
      question: "What is the difference between ID and class selectors in CSS?",
      answer:
        "ID selectors (using #) target a single unique element as IDs should be unique in a document. They have higher specificity than class selectors. Class selectors (using .) can target multiple elements that share the same class attribute, making them more reusable and flexible for styling multiple elements consistently.",
    },
    {
      question: "Explain CSS selector specificity and how it's calculated.",
      answer:
        "CSS specificity determines which CSS rule applies when multiple rules target the same element. It's calculated as follows: Inline styles have the highest specificity (1,0,0,0), followed by ID selectors (0,1,0,0), then class selectors, attribute selectors, and pseudo-classes (0,0,1,0), and finally element selectors and pseudo-elements (0,0,0,1). When specificity is equal, the last rule defined wins.",
    },
    {
      question: "What are combinator selectors and when would you use them?",
      answer:
        "Combinator selectors express relationships between elements. The main types are: descendant selectors (space) for any nested elements, child selectors (>) for direct children only, adjacent sibling selectors (+) for elements immediately following another, and general sibling selectors (~) for all siblings after an element. They're useful when you need to style elements based on their position in the document structure without adding additional classes.",
    },
  ]

  const defaultResources: Resource[] = [
    {
      title: "MDN Web Docs: HTML Reference",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      type: "link",
    },
    {
      title: "W3Schools HTML Tutorial",
      url: "https://www.w3schools.com/html/",
      type: "link",
    },
    {
      title: "HTML Cheat Sheet (PDF)",
      url: "#",
      type: "pdf",
    },
    {
      title: "HTML Crash Course Video",
      url: "#",
      type: "video",
    },
  ]

  // Load completed lessons from localStorage
  useEffect(() => {
    const storedCompletedLessons = localStorage.getItem(`${courseId}-${weekId}-completed-lessons`)
    if (storedCompletedLessons) {
      setCompletedLessons(JSON.parse(storedCompletedLessons))
    }

    // Initialize expanded weeks
    setExpandedWeeks({ [weekId]: true })
  }, [courseId, weekId])

  // Save completed lessons to localStorage when updated
  useEffect(() => {
    if (completedLessons.length > 0) {
      localStorage.setItem(`${courseId}-${weekId}-completed-lessons`, JSON.stringify(completedLessons))
    }
  }, [completedLessons, courseId, weekId])

  // Handle scroll events to detect when user reaches bottom of content
  useEffect(() => {
    if (!contentRef.current || !activeLesson) return

    const handleScroll = () => {
      if (!contentRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      // Consider it scrolled to bottom if within 100px of the bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100

      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true)
      }
    }

    contentRef.current.addEventListener("scroll", handleScroll)
    return () => {
      contentRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [activeLesson, hasScrolledToBottom])

  // Mark lesson as completed when moving to next lesson after scrolling to bottom
  useEffect(() => {
    if (hasScrolledToBottom && activeLesson && !completedLessons.includes(activeLesson)) {
      setCompletedLessons((prev) => [...prev, activeLesson])
    }
  }, [hasScrolledToBottom, activeLesson, completedLessons])

  // Scroll to top when changing lessons
  useEffect(() => {
    if (contentRef.current && activeLesson) {
      contentRef.current.scrollTo(0, 0)
      setHasScrolledToBottom(false)
    }
  }, [activeLesson])

  // Fetch all weeks for the course
  useEffect(() => {
    if (!courseId) return

    const fetchAllWeeks = async () => {
      try {
        setLoading(true)
        const apiUrl = `/api/course-week?courseId=${courseId}`
        const res = await fetch(apiUrl)

        if (!res.ok) {
          throw new Error("Failed to fetch weeks data")
        }

        const result = await res.json()
        if (result.success && result.data.length > 0) {
          setWeeks(result.data)
        } else {
          console.log("Using mock weeks data")
          setWeeks(mockWeeks)
        }
      } catch (err) {
        console.error("Error fetching all weeks:", err)
        console.log("Using mock weeks data due to error")
        setWeeks(mockWeeks)
      } finally {
        setLoading(false)
      }
    }

    fetchAllWeeks()
  }, [courseId])

  // Fetch current week data
  useEffect(() => {
    if (!weekId || !courseId) {
      setError("Missing courseId or weekId.")
      setLoading(false)
      return
    }

    const fetchWeek = async () => {
      try {
        setLoading(true)
        const apiUrl = `/api/course-week?courseId=${courseId}&weekId=${weekId}`
        console.log("Fetching week data from:", apiUrl)
        const res = await fetch(apiUrl)

        if (!res.ok) {
          throw new Error("Failed to fetch week data")
        }

        const result = await res.json()

        if (result.success && result.data.length > 0) {
          setWeek(result.data[0])
        } else {
          console.log("Using mock week data")
          const mockWeek = mockWeeks.find((w) => w.weekId.toString() === weekId)
          if (mockWeek) {
            setWeek(mockWeek)
          } else {
            setError("Week not found.")
          }
        }
      } catch (err) {
        console.error("Fetch error:", err)
        console.log("Using mock week data due to error")
        const mockWeek = mockWeeks.find((w) => w.weekId.toString() === weekId)
        if (mockWeek) {
          setWeek(mockWeek)
          setError(null)
        } else {
          setError("Week not found.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeek()
  }, [weekId, courseId])

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
            duration: lesson.duration || `${Math.floor(Math.random() * 20) + 10} min`, // Random duration between 10-30 min
          }))
          setLessons(lessonsWithDuration)

          // Set the first lesson as active by default
          if (lessonsWithDuration.length > 0 && !activeLesson) {
            setActiveLesson(lessonsWithDuration[0].lessonId)
          }
        } else {
          console.warn("No lessons found or API returned unsuccessful response")
          console.log("Using mock lessons data")

          // Filter mock lessons for the current week
          const weekLessons = mockLessons.filter((lesson) => lesson.weekId.toString() === weekId)

          if (weekLessons.length > 0) {
            setLessons(weekLessons)
            if (!activeLesson) {
              setActiveLesson(weekLessons[0].lessonId)
            }
          } else {
            setLessons([])
          }
        }
      } catch (err) {
        console.error("Error fetching lessons:", err)
        console.log("Using mock lessons data due to error")

        // Filter mock lessons for the current week
        const weekLessons = mockLessons.filter((lesson) => lesson.weekId.toString() === weekId)

        if (weekLessons.length > 0) {
          setLessons(weekLessons)
          if (!activeLesson) {
            setActiveLesson(weekLessons[0].lessonId)
          }
        } else {
          setLessons([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [courseId, weekId, activeLesson])

  const handleGoBack = () => {
    router.push(`/courses`)
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
      // Mark current lesson as completed if scrolled to bottom
      if (hasScrolledToBottom && activeLesson && !completedLessons.includes(activeLesson)) {
        setCompletedLessons((prev) => [...prev, activeLesson])
      }
      setActiveLesson(lessons[currentIndex + 1].lessonId)
    }
  }

  const getActiveLesson = () => {
    if (!activeLesson) return null
    return lessons.find((lesson) => lesson.lessonId === activeLesson)
  }

  const getPreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex()
    if (currentIndex > 0) {
      return lessons[currentIndex - 1]
    }
    return null
  }

  const getNextLesson = () => {
    const currentIndex = getCurrentLessonIndex()
    if (currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1]
    }
    return null
  }

  const toggleWeekExpansion = (weekId: string) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }))
  }

  const getWeekProgress = (weekId: string) => {
    // This would ideally come from your API or state
    // For now, let's use some mock data
    const progressMap: Record<string, number> = {
      "1": 75,
      "2": 40,
      "3": 0,
      "4": 0,
    }

    return progressMap[weekId] || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back to Courses
          </button>
        </div>
      </div>
    )
  }

  const currentLesson = getActiveLesson()
  const previousLesson = getPreviousLesson()
  const nextLesson = getNextLesson()

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                  D
                </div>
              </div>
              <div className="ml-4 text-xl font-semibold text-gray-800">DATACLIQ</div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Courses
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Bootcamp
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Case Studies
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-indigo-600 border border-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-50 transition">
                Sign In
              </button>
              <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-full content-area">
        {/* Course Navigation Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Course Progress */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm font-medium text-indigo-600">{courseProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${courseProgress}%` }}></div>
            </div>
          </div>

          {/* Weeks List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Course Content</h3>

              {/* Generate weeks dynamically */}
              {weeks.length > 0 ? (
                weeks.map((weekItem) => {
                  const isActive = weekItem.weekId.toString() === weekId
                  const isExpanded = expandedWeeks[weekItem.weekId.toString()]
                  const progress = getWeekProgress(weekItem.weekId.toString())
                  const weekTitle = weekItem.title || `Week ${weekItem.weekId}`
                  const lessonCount = weekItem.lessonCount || (weekItem.lessonList ? weekItem.lessonList.length : 0)

                  return (
                    <div key={weekItem._id} className="mb-3">
                      <div
                        className={`week-item flex items-center justify-between cursor-pointer ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => toggleWeekExpansion(weekItem.weekId.toString())}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 week-circle">
                            {progress > 0 ? (
                              <svg width="32" height="32" viewBox="0 0 32 32">
                                <circle cx="16" cy="16" r="14" fill="#EEF2FF" />
                                <circle
                                  cx="16"
                                  cy="16"
                                  r="14"
                                  fill="none"
                                  stroke="#4F46E5"
                                  strokeWidth="3"
                                  strokeDasharray="88"
                                  strokeDashoffset={88 - (88 * progress) / 100}
                                  transform="rotate(-90 16 16)"
                                />
                              </svg>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                {weekItem.weekId}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">{weekTitle}</h4>
                            <p className="text-xs text-gray-500">
                              {lessonCount} lessons • {progress}% complete
                            </p>
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`chevron-icon h-5 w-5 ${
                            isExpanded ? "transform rotate-90 text-indigo-500" : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      {/* Lessons list */}
                      <div className={`lesson-list ${isExpanded ? "open" : ""}`}>
                        {isActive && weekItem.lessonList && weekItem.lessonList.length > 0 ? (
                          weekItem.lessonList.map((lesson, index) => (
                            <div
                              key={lesson.id}
                              className={`lesson-item flex items-center ${activeLesson === lesson.id ? "active" : ""}`}
                              onClick={() => handleLessonClick(lesson.id)}
                            >
                              {completedLessons.includes(lesson.id) ? (
                                <div className="lesson-status-circle completed">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              ) : activeLesson === lesson.id ? (
                                <div className="lesson-status-circle active">
                                  <Play className="h-3 w-3 text-indigo-600" />
                                </div>
                              ) : (
                                <div className="lesson-status-circle incomplete">
                                  <span className="text-xs text-gray-600">{index + 1}</span>
                                </div>
                              )}
                              <span className="text-sm text-gray-800 ml-2">{lesson.title || "Untitled Lesson"}</span>
                            </div>
                          ))
                        ) : isActive && lessons.length > 0 ? (
                          lessons.map((lesson, index) => (
                            <div
                              key={lesson.lessonId}
                              className={`lesson-item flex items-center ${
                                activeLesson === lesson.lessonId ? "active" : ""
                              }`}
                              onClick={() => handleLessonClick(lesson.lessonId)}
                            >
                              {completedLessons.includes(lesson.lessonId) ? (
                                <div className="lesson-status-circle completed">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              ) : activeLesson === lesson.lessonId ? (
                                <div className="lesson-status-circle active">
                                  <Play className="h-3 w-3 text-indigo-600" />
                                </div>
                              ) : (
                                <div className="lesson-status-circle incomplete">
                                  <span className="text-xs text-gray-600">{index + 1}</span>
                                </div>
                              )}
                              <span className="text-sm text-gray-800 ml-2">
                                {lesson.title || lesson.name || "Untitled Lesson"}
                              </span>
                            </div>
                          ))
                        ) : isExpanded ? (
                          <div className="text-sm text-gray-500 py-2">No lessons available</div>
                        ) : null}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-4 text-gray-500">No weeks available</div>
              )}
            </div>
          </div>
        </div>

        {/* Lesson Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Lesson Navigation */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button className="mr-4 text-gray-500 hover:text-indigo-600" onClick={handleGoBack}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                {currentLesson?.title || currentLesson?.name || "HTML Fundamentals"}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-500 hover:text-indigo-600">
                <BookmarkIcon className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-indigo-600">
                <HelpCircle className="h-5 w-5" />
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center"
                onClick={handleNextLesson}
                disabled={!nextLesson}
              >
                <span>Next Lesson</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Lesson Content with Promo Banner */}
          <div className="flex-1 overflow-y-auto custom-scrollbar lesson-content" ref={contentRef}>
            <div className="flex">
              {/* Main Lesson Content */}
              <div className="flex-1 p-6">
                <div className="max-w-5xl">
                  {currentLesson ? (
                    <>
                      <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                          {currentLesson.title || currentLesson.name || "HTML Fundamentals"}
                        </h1>
                      </div>

                      <div className="prose max-w-none">
                        {/* Lesson Content */}
                        {currentLesson.content ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                            className="tiptap-content custom-lesson-content"
                          />
                        ) : (
                          <div className="custom-lesson-content">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is HTML?</h2>
                            <p className="mb-4 text-gray-700">
                              HTML (Hypertext Markup Language) is the standard markup language for documents designed to
                              be displayed in a web browser. It defines the structure and content of web pages.
                            </p>

                            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
                              <p className="text-indigo-700 font-medium">
                                HTML is not a programming language; it's a markup language that tells browsers how to
                                structure web pages.
                              </p>
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Structure</h2>
                            <p className="mb-4 text-gray-700">Every HTML document follows a basic structure:</p>

                            <div className="code-block">
                              <pre>
                                <code>
                                  <span className="line-number">1</span>{" "}
                                  <span className="tag">&lt;!DOCTYPE html&gt;</span>
                                  <br />
                                  <span className="line-number">2</span> <span className="tag">&lt;html&gt;</span>
                                  <br />
                                  <span className="line-number">3</span> <span className="tag">&lt;head&gt;</span>
                                  <br />
                                  <span className="line-number">4</span> <span className="tag">&lt;title&gt;</span>
                                  <span className="text">Page Title</span>
                                  <span className="tag">&lt;/title&gt;</span>
                                  <br />
                                  <span className="line-number">5</span> <span className="tag">&lt;/head&gt;</span>
                                  <br />
                                  <span className="line-number">6</span> <span className="tag">&lt;body&gt;</span>
                                  <br />
                                  <span className="line-number">7</span> <span className="tag">&lt;h1&gt;</span>
                                  <span className="text">My First Heading</span>
                                  <span className="tag">&lt;/h1&gt;</span>
                                  <br />
                                  <span className="line-number">8</span> <span className="tag">&lt;p&gt;</span>
                                  <span className="text">My first paragraph.</span>
                                  <span className="tag">&lt;/p&gt;</span>
                                  <br />
                                  <span className="line-number">9</span> <span className="tag">&lt;/body&gt;</span>
                                  <br />
                                  <span className="line-number">10</span> <span className="tag">&lt;/html&gt;</span>
                                </code>
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Interview Questions - Only show if they exist in the lesson or use defaults */}
                        {(currentLesson.interviewQuestions && currentLesson.interviewQuestions.length > 0) ||
                        defaultInterviewQuestions ? (
                          <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interview Questions</h2>
                            <div className="space-y-4 mb-6">
                              {(currentLesson.interviewQuestions && currentLesson.interviewQuestions.length > 0
                                ? currentLesson.interviewQuestions
                                : defaultInterviewQuestions
                              ).map((q, index) => (
                                <div key={index} className="interview-question">
                                  <h3 className="font-semibold text-gray-800 mb-2">
                                    Q{index + 1}: {q.question}
                                  </h3>
                                  <p className="text-gray-700">{q.answer}</p>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : null}

                        {/* Resources - Only show if they exist in the lesson or use defaults */}
                        {(currentLesson.resources && currentLesson.resources.length > 0) || defaultResources ? (
                          <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Resources</h2>
                            <div className="resources-container">
                              <ul className="resources-list">
                                {(currentLesson.resources && currentLesson.resources.length > 0
                                  ? currentLesson.resources
                                  : defaultResources
                                ).map((resource, index) => (
                                  <li key={index} className="resource-item">
                                    {resource.type === "pdf" ? (
                                      <FileText className="resource-icon pdf" />
                                    ) : resource.type === "video" ? (
                                      <Video className="resource-icon video" />
                                    ) : (
                                      <ExternalLink className="resource-icon link" />
                                    )}
                                    <a href={resource.url} className="resource-link">
                                      {resource.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : null}
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                        <button
                          className="text-gray-500 hover:text-indigo-600 flex items-center"
                          onClick={handlePreviousLesson}
                          disabled={!previousLesson}
                        >
                          <ArrowLeft className="h-5 w-5 mr-1" />
                          Previous Lesson
                        </button>
                        <button
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center"
                          onClick={handleNextLesson}
                          disabled={!nextLesson}
                        >
                          Next Lesson: {nextLesson?.title || nextLesson?.name || "CSS Basics"}
                          <ArrowRight className="h-5 w-5 ml-1" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="text-indigo-500 mb-4">
                          <AlertCircle className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No lesson selected</h3>
                        <p className="text-gray-600 mb-4">
                          Please select a lesson from the sidebar to view its content.
                        </p>
                        {lessons.length > 0 && (
                          <Button
                            onClick={() => setActiveLesson(lessons[0].lessonId)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Start First Lesson
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="w-[23rem] p-4">
                <div className="sticky top-4">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg overflow-hidden shadow-lg pulse-animation">
                    <div className="p-5 text-white">
                      <div className="flex justify-center mb-3">
                        <Clock className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">1 Month Bootcamp</h3>
                      <h2 className="text-2xl font-extrabold text-center mb-4">FREE</h2>
                      <div className="bg-white bg-opacity-20 rounded-md p-3 mb-4">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2" />
                            <span className="text-sm">Live Coding Sessions</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2" />
                            <span className="text-sm">1-on-1 Mentoring</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2" />
                            <span className="text-sm">Real Project Work</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2" />
                            <span className="text-sm">Job Placement Help</span>
                          </li>
                        </ul>
                      </div>
                      <button className="w-full bg-white text-indigo-700 font-bold py-2 px-4 rounded-md hover:bg-indigo-50 transition transform hover:scale-105">
                        ENROLL NOW
                      </button>
                      <p className="text-xs text-center mt-3 text-indigo-100">
                        Limited time offer. Starts next Monday.
                      </p>
                    </div>
                    <div className="bg-indigo-800 p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold mr-2">
                            <span>24</span>
                          </div>
                          <span className="text-white text-sm">spots left</span>
                        </div>
                        <div className="text-white text-sm">
                          <span className="font-bold">4.9</span>/5.0 ⭐
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                        <span>MJ</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Michael Johnson</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "This bootcamp changed my life! I went from zero coding knowledge to landing a junior developer
                      job in just 3 months."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



// "use client"

// import { useRouter, useSearchParams, useParams } from "next/navigation"
// import { useEffect, useState, useRef } from "react"
// import {
//   AlertCircle,
//   Play,
//   Download,
//   Laptop,
//   HelpCircle,
//   Book,
//   ArrowLeft,
//   ArrowRight,
//   ChevronLeft,
//   CheckCircle,
// } from "lucide-react"
// import { Sidebar, SidebarContent, SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"
// import "./lesson-styles.css"

// interface LessonItem {
//   id: string
//   title: string
//   duration?: string
//   isCompleted?: boolean
// }

// interface Week {
//   _id?: string
//   courseId: string
//   weekId: number
//   slug: string
//   title?: string
//   description?: string
//   lessonCount?: number
//   lessonList?: LessonItem[]
//   createdAt?: string
//   updatedAt?: string
// }

// interface Lesson {
//   _id?: string
//   lessonId: string
//   title?: string
//   name?: string
//   content: string
//   courseId: string
//   weekId: number
//   slug: string
//   duration?: string
//   interviewQuestions?: Array<{
//     question: string
//     answer: string
//   }>
//   resources?: Array<{
//     title: string
//     url: string
//     type: "link" | "pdf" | "video"
//   }>
// }

// interface InterviewQuestion {
//   question: string
//   answer: string
// }

// interface Resource {
//   title: string
//   url: string
//   type: "link" | "pdf" | "video"
// }

// export default function WeekPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const params = useParams()
//   const weekId = params?.weekId as string
//   const courseId = searchParams?.get("courseId") || ""
//   const slug = searchParams?.get("slug") || ""

//   const [week, setWeek] = useState<Week | null>(null)
//   const [lessons, setLessons] = useState<Lesson[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [activeLesson, setActiveLesson] = useState<string | null>(null)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const [completedLessons, setCompletedLessons] = useState<string[]>([])
//   const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

//   // Default interview questions and resources (fallback if not in database)
//   const defaultInterviewQuestions: InterviewQuestion[] = [
//     {
//       question: "What is the difference between ID and class selectors in CSS?",
//       answer:
//         "ID selectors (using #) target a single unique element as IDs should be unique in a document. They have higher specificity than class selectors. Class selectors (using .) can target multiple elements that share the same class attribute, making them more reusable and flexible for styling multiple elements consistently.",
//     },
//     {
//       question: "Explain CSS selector specificity and how it's calculated.",
//       answer:
//         "CSS specificity determines which CSS rule applies when multiple rules target the same element. It's calculated as follows: Inline styles have the highest specificity (1,0,0,0), followed by ID selectors (0,1,0,0), then class selectors, attribute selectors, and pseudo-classes (0,0,1,0), and finally element selectors and pseudo-elements (0,0,0,1). When specificity is equal, the last rule defined wins.",
//     },
//     {
//       question: "What are combinator selectors and when would you use them?",
//       answer:
//         "Combinator selectors express relationships between elements. The main types are: descendant selectors (space) for any nested elements, child selectors (>) for direct children only, adjacent sibling selectors (+) for elements immediately following another, and general sibling selectors (~) for all siblings after an element. They're useful when you need to style elements based on their position in the document structure without adding additional classes.",
//     },
//   ]

//   const defaultResources: Resource[] = [
//     {
//       title: "MDN Web Docs: CSS Selectors Reference",
//       url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors",
//       type: "link",
//     },
//     {
//       title: "CSS Tricks: A Complete Guide to CSS Selectors",
//       url: "https://css-tricks.com/how-css-selectors-work/",
//       type: "link",
//     },
//     {
//       title: "CSS Selector Game: CSS Diner",
//       url: "https://flukeout.github.io/",
//       type: "link",
//     },
//     {
//       title: "CSS Selectors Cheat Sheet (PDF)",
//       url: "#",
//       type: "pdf",
//     },
//   ]

//   // Load completed lessons from localStorage
//   useEffect(() => {
//     const storedCompletedLessons = localStorage.getItem(`${courseId}-${weekId}-completed-lessons`)
//     if (storedCompletedLessons) {
//       setCompletedLessons(JSON.parse(storedCompletedLessons))
//     }
//   }, [courseId, weekId])

//   // Save completed lessons to localStorage when updated
//   useEffect(() => {
//     if (completedLessons.length > 0) {
//       localStorage.setItem(`${courseId}-${weekId}-completed-lessons`, JSON.stringify(completedLessons))
//     }
//   }, [completedLessons, courseId, weekId])

//   // Handle scroll events to detect when user reaches bottom of content
//   useEffect(() => {
//     if (!contentRef.current || !activeLesson) return

//     const handleScroll = () => {
//       if (!contentRef.current) return

//       const { scrollTop, scrollHeight, clientHeight } = contentRef.current
//       // Consider it scrolled to bottom if within 100px of the bottom
//       const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100

//       if (isAtBottom && !hasScrolledToBottom) {
//         setHasScrolledToBottom(true)
//       }
//     }

//     contentRef.current.addEventListener("scroll", handleScroll)
//     return () => {
//       contentRef.current?.removeEventListener("scroll", handleScroll)
//     }
//   }, [activeLesson, hasScrolledToBottom])

//   // Mark lesson as completed when moving to next lesson after scrolling to bottom
//   useEffect(() => {
//     if (hasScrolledToBottom && activeLesson && !completedLessons.includes(activeLesson)) {
//       setCompletedLessons((prev) => [...prev, activeLesson])
//     }
//   }, [hasScrolledToBottom, activeLesson, completedLessons])

//   // Scroll to top when changing lessons
//   useEffect(() => {
//     if (contentRef.current && activeLesson) {
//       contentRef.current.scrollTo(0, 0)
//       setHasScrolledToBottom(false)
//     }
//   }, [activeLesson])

//   // Fetch week data
//   useEffect(() => {
//     if (!weekId || !courseId) {
//       setError("Missing courseId or weekId.")
//       setLoading(false)
//       return
//     }

//     const fetchWeek = async () => {
//       try {
//         const apiUrl = `/api/course-week?courseId=${courseId}&weekId=${weekId}&slug=${slug}`
//         console.log("Fetching week data from:", apiUrl)
//         const res = await fetch(apiUrl)

//         if (!res.ok) {
//           throw new Error("Failed to fetch week data")
//         }

//         const result = await res.json()

//         if (result.success && result.data.length > 0) {
//           setWeek(result.data[0])
//         } else {
//           setError(result.message || "Week not found.")
//         }
//       } catch (err) {
//         console.error("Fetch error:", err)
//         setError(err instanceof Error ? err.message : "Error fetching week details. Please try again later.")
//       }
//     }

//     fetchWeek()
//   }, [weekId, courseId, slug])

//   // Fetch lessons for the week
//   useEffect(() => {
//     if (!courseId || !weekId) return

//     const fetchLessons = async () => {
//       try {
//         const apiUrl = `/api/lesson-content?courseId=${courseId}&weekId=${weekId}`
//         console.log("Fetching lessons from:", apiUrl)
//         const res = await fetch(apiUrl)

//         if (!res.ok) {
//           throw new Error(`API returned status ${res.status}`)
//         }

//         const result = await res.json()

//         if (result.success && result.data && result.data.length > 0) {
//           // Add mock durations for UI demonstration
//           const lessonsWithDuration = result.data.map((lesson: Lesson) => ({
//             ...lesson,
//             duration: lesson.duration || `${Math.floor(Math.random() * 20) + 10} min`, // Random duration between 10-30 min
//           }))
//           setLessons(lessonsWithDuration)

//           // Set the first lesson as active by default
//           if (lessonsWithDuration.length > 0 && !activeLesson) {
//             setActiveLesson(lessonsWithDuration[0].lessonId)
//           }
//         } else {
//           console.warn("No lessons found or API returned unsuccessful response")
//           setLessons([])
//         }
//       } catch (err) {
//         console.error("Error fetching lessons:", err)
//         setError("Failed to fetch lessons.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLessons()
//   }, [courseId, weekId, activeLesson])

//   const handleGoBack = () => {
//     router.push(`/course/weeks?courseId=${courseId}`)
//   }

//   const handleLessonClick = (lessonId: string) => {
//     setActiveLesson(lessonId)
//   }

//   const getCurrentLessonIndex = () => {
//     if (!activeLesson) return 0
//     return lessons.findIndex((lesson) => lesson.lessonId === activeLesson)
//   }

//   const handlePreviousLesson = () => {
//     const currentIndex = getCurrentLessonIndex()
//     if (currentIndex > 0) {
//       setActiveLesson(lessons[currentIndex - 1].lessonId)
//     }
//   }

//   const handleNextLesson = () => {
//     const currentIndex = getCurrentLessonIndex()
//     if (currentIndex < lessons.length - 1) {
//       // Mark current lesson as completed if scrolled to bottom
//       if (hasScrolledToBottom && activeLesson && !completedLessons.includes(activeLesson)) {
//         setCompletedLessons((prev) => [...prev, activeLesson])
//       }
//       setActiveLesson(lessons[currentIndex + 1].lessonId)
//     }
//   }

//   const getActiveLesson = () => {
//     if (!activeLesson) return null
//     return lessons.find((lesson) => lesson.lessonId === activeLesson)
//   }

//   const getPreviousLesson = () => {
//     const currentIndex = getCurrentLessonIndex()
//     if (currentIndex > 0) {
//       return lessons[currentIndex - 1]
//     }
//     return null
//   }

//   const getNextLesson = () => {
//     const currentIndex = getCurrentLessonIndex()
//     if (currentIndex < lessons.length - 1) {
//       return lessons[currentIndex + 1]
//     }
//     return null
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           <span className="mt-4 text-lg text-gray-700">Loading week content...</span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
//           <div className="text-red-500 mb-4">
//             <AlertCircle className="h-16 w-16 mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={handleGoBack}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Go Back to Weeks
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const currentLesson = getActiveLesson()
//   const previousLesson = getPreviousLesson()
//   const nextLesson = getNextLesson()

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen bg-gray-50 flex">
//         {/* Fixed Sidebar */}
//         <Sidebar className="border-r border-gray-200 bg-white mt-20">
//           <SidebarContent>
//             <div className="p-4">
//               <h3 className="text-sm font-medium text-gray-700 mb-3">Week {weekId} Lessons</h3>
//               <div className="h-[calc(100vh-120px)] overflow-y-auto pr-2">
//                 <ul className="space-y-1">
//                   {lessons.map((lesson, index) => (
//                     <li key={lesson._id || lesson.lessonId}>
//                       <button
//                         onClick={() => handleLessonClick(lesson.lessonId)}
//                         className={`w-full text-left px-3 py-2 flex items-center transition-all rounded-md ${
//                           activeLesson === lesson.lessonId
//                             ? "bg-blue-600 text-white"
//                             : "hover:bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         <div className="flex items-center w-full">
//                           {activeLesson === lesson.lessonId ? (
//                             <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//                               <Play className="h-3 w-3 text-blue-600" />
//                             </div>
//                           ) : completedLessons.includes(lesson.lessonId) ? (
//                             <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
//                               <CheckCircle className="h-3 w-3 text-green-600" />
//                             </div>
//                           ) : (
//                             <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-500 mr-2">
//                               {index + 1}
//                             </div>
//                           )}
//                           <span className="truncate text-sm">{lesson.title || lesson.name || "Untitled Lesson"}</span>
//                           {completedLessons.includes(lesson.lessonId) && activeLesson !== lesson.lessonId && (
//                             <span className="ml-auto text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
//                               Completed
//                             </span>
//                           )}
//                         </div>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="mt-4">
//                 <Button
//                   variant="outline"
//                   className="w-full flex items-center justify-center gap-2"
//                   onClick={() => window.open(`/api/download-materials?courseId=${courseId}&weekId=${weekId}`, "_blank")}
//                 >
//                   <Download className="h-4 w-4" />
//                   Download Materials
//                 </Button>
//               </div>
//             </div>
//           </SidebarContent>
//         </Sidebar>

//         {/* Main Content - Full Width */}
//         <SidebarInset className="flex-1 overflow-hidden mt-16 bg-[#F9FAFB]">
//           {/* Back Button Header */}
//           <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//               onClick={handleGoBack}
//             >
//               <ChevronLeft className="h-4 w-4" />
//               Back to Weeks
//             </Button>
//             <h1 className="text-lg font-semibold text-gray-800 ml-4">{week?.title || `Week ${weekId} Fundamentals`}</h1>
//           </div>

//           {/* Scrollable Content Area - Full Width */}
//           <div className="h-[calc(100vh-64px-80px)] overflow-y-auto px-6 py-4 " ref={contentRef}>
//             {currentLesson ? (
//               <>
//                 {/* Lesson Header Card */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <div className="col">
//                         <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm mr-3">
//                           Week {weekId}
//                         </span>
//                         <h2 className="text-2xl font-bold text-gray-900 mt-5">
//                           {currentLesson.title || currentLesson.name || "Untitled Lesson"}
//                         </h2>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {completedLessons.includes(currentLesson.lessonId) && (
//                         <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm flex items-center">
//                           <CheckCircle className="h-3 w-3 mr-1" />
//                           Completed
//                         </span>
//                       )}
//                       <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm">
//                         {currentLesson.duration || "25 min"}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-4">
//                     Learn how to effectively target HTML elements using various CSS selector types and understand
//                     selector specificity for better styling control.
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">CSS</span>
//                     <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">Selectors</span>
//                     <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">Specificity</span>
//                   </div>
//                 </div>

//                 {/* Lesson Content */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//                   {currentLesson.content ? (
//                     <div
//                       dangerouslySetInnerHTML={{ __html: currentLesson.content }}
//                       className="tiptap-content custom-lesson-content"
//                     />
//                   ) : (
//                     <div className="custom-lesson-content">
//                       <h3 className="text-xl font-semibold mb-4">1. Basic CSS Selectors</h3>
//                       <p className="text-gray-700 mb-4">
//                         CSS selectors are patterns used to select and style HTML elements. The most fundamental
//                         selectors include element, class, and ID selectors.
//                       </p>

//                       <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
//                         <pre className="text-gray-800">
//                           {`/* Element Selector - Targets all paragraphs */
// p {
//   color: navy;
//   line-height: 1.6;
// }

// /* Class Selector - Targets elements with class="highlight" */
// .highlight {
//   background-color: yellow;
//   padding: 2px 5px;
// }

// /* ID Selector - Targets the element with id="header" */
// #header {
//   font-size: 24px;
//   margin-bottom: 20px;
// }`}
//                         </pre>
//                       </div>

//                       <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500 mb-6">
//                         <h4 className="font-medium text-blue-700 mb-2">Note:</h4>
//                         <p className="text-gray-700">
//                           Element selectors have the lowest specificity, followed by class selectors, with ID selectors
//                           having the highest specificity among these three.
//                         </p>
//                       </div>

//                       <h3 className="text-xl font-semibold mb-4 mt-8">2. Combinatorial Selectors</h3>
//                       <p className="text-gray-700 mb-4">
//                         Combinatorial selectors allow you to target elements based on their relationship to other
//                         elements in the document tree.
//                       </p>

//                       <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
//                         <pre className="text-gray-800">
//                           {`/* Descendant Selector - Targets all <span> inside <p> */
// p span {
//   font-style: italic;
// }

// /* Child Selector - Targets direct children only */
// ul > li {
//   list-style-type: square;
// }

// /* Adjacent Sibling Selector - Targets element directly after */
// h2 + p {
//   font-weight: bold;
// }

// /* General Sibling Selector - Targets all siblings after */
// h2 ~ p {
//   margin-left: 20px;
// }`}
//                         </pre>
//                       </div>

//                       <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500 mb-6">
//                         <h4 className="font-medium text-yellow-700 mb-2">Warning:</h4>
//                         <p className="text-gray-700">
//                           Be careful with descendant selectors in large documents as they can create performance issues
//                           if overused.
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Interactive Exercise */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
//                   <h3 className="text-xl font-semibold mb-4 flex items-center">
//                     <Laptop className="text-blue-600 mr-2 h-5 w-5" />
//                     Interactive Exercise
//                   </h3>
//                   <p className="text-gray-700 mb-4">
//                     Practice your CSS selector skills with this interactive exercise. Try to select the correct elements
//                     based on the given requirements.
//                   </p>
//                   <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                     <Play className="h-4 w-4 mr-2" />
//                     Start Exercise
//                   </Button>
//                 </div>

//                 {/* Interview Questions */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
//                   <h3 className="text-xl font-semibold mb-4 flex items-center">
//                     <HelpCircle className="text-blue-600 mr-2 h-5 w-5" />
//                     Interview Questions on CSS Selectors
//                   </h3>

//                   <div className="space-y-4">
//                     {/* Use interview questions from database if available, otherwise use defaults */}
//                     {(currentLesson.interviewQuestions && currentLesson.interviewQuestions.length > 0
//                       ? currentLesson.interviewQuestions
//                       : defaultInterviewQuestions
//                     ).map((q, index) => (
//                       <div key={index} className="border border-gray-200 rounded-md p-4">
//                         <h4 className="font-medium text-gray-800 mb-2">
//                           Q{index + 1}: {q.question}
//                         </h4>
//                         <p className="text-gray-700">
//                           <strong>Answer:</strong> {q.answer}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Additional Resources */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50">
//                   <h3 className="text-xl font-semibold mb-4 flex items-center">
//                     <Book className="text-purple-600 mr-2 h-5 w-5" />
//                     Additional Resources
//                   </h3>
//                   <ul className="space-y-2">
//                     {/* Use resources from database if available, otherwise use defaults */}
//                     {(currentLesson.resources && currentLesson.resources.length > 0
//                       ? currentLesson.resources
//                       : defaultResources
//                     ).map((resource, index) => (
//                       <li key={index} className="flex items-start">
//                         {resource.type === "pdf" ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-purple-500 mt-1 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                             />
//                           </svg>
//                         ) : resource.type === "video" ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-purple-500 mt-1 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-purple-500 mt-1 mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
//                             />
//                           </svg>
//                         )}
//                         <a href={resource.url} className="text-purple-700 hover:text-purple-900">
//                           {resource.title}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </>
//             ) : (
//               <div className="h-full flex items-center justify-center">
//                 <div className="text-center p-6">
//                   <div className="text-blue-500 mb-4">
//                     <AlertCircle className="h-12 w-12 mx-auto" />
//                   </div>
//                   <h3 className="text-xl font-medium text-gray-800 mb-2">No lesson selected</h3>
//                   <p className="text-gray-600 mb-4">Please select a lesson from the sidebar to view its content.</p>
//                   {lessons.length > 0 && (
//                     <Button onClick={() => setActiveLesson(lessons[0].lessonId)} className="bg-blue-500 text-white">
//                       Start First Lesson
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sticky Navigation Buttons - Full Width */}
//           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between z-10 ml-[16rem]">
//             <Button
//               variant="outline"
//               onClick={handlePreviousLesson}
//               disabled={!previousLesson}
//               className={`flex items-center ${!previousLesson ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               {previousLesson ? `Previous: ${previousLesson.title || previousLesson.name}` : "Previous"}
//             </Button>
//             <Button
//               onClick={handleNextLesson}
//               disabled={!nextLesson}
//               className={`flex items-center ${!nextLesson ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""}`}
//             >
//               {nextLesson ? `Next: ${nextLesson.title || nextLesson.name}` : "Next"}
//               <ArrowRight className="h-4 w-4 ml-2" />
//             </Button>
//           </div>
//         </SidebarInset>
//       </div>
//     </SidebarProvider>
//   )
// }
