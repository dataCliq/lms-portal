"use client"

import { useState, useEffect } from "react"
import { Search, Filter, BookOpen, BarChart2, Database, ChevronRight, Users } from "lucide-react"
import CourseCard from "../../_components/CourseCard"
import Loader from "../../_components/loader"

interface Course {
  _id: string
  title: string
  rating: number
  weekCount: number
  courseId: string
  slug: string
  imageSrc: string
  description: string
  tags: string[]
  price: number
  createdAt: Date
  updatedAt: Date
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/mongo-test")

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const data = await response.json()
        if (data.success) {
          setCourses(data.data)
          setFilteredCourses(data.data)
          setError(null)
        } else {
          setError(data.message || "Failed to fetch courses")
        }
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Error fetching courses. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    let result = courses
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }
    if (selectedTag !== "All") {
      result = result.filter((course) => course.tags.includes(selectedTag))
    }
    setFilteredCourses(result)
  }, [searchQuery, selectedTag, courses])

  const uniqueTags = ["All", ...new Set(courses.flatMap((course) => course.tags))]

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
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
            onClick={() => window.location.reload()}
            className="bg-[#0293A6] text-white px-4 py-2 rounded-lg hover:bg-[#026d7d] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
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
      <header className="relative bg-gradient-to-r from-[#0F172A] to-[#0F172A]/90 text-white py-16 px-6 overflow-hidden mt-[65px]">
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

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold mb-4">Data Analytics Courses</h1>
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            Master the skills that drive business decisions. Our data analytics courses are designed by industry experts
            to help you excel in today's data-driven world.
          </p>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center">
              <Database className="h-5 w-5 mr-2 text-[#00A3B5]" />
              <div>
                <div className="text-sm text-white/70">Total Courses</div>
                <div className="text-xl font-bold">{courses.length}</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#00A3B5]" />
              <div>
                <div className="text-sm text-white/70">Active Students</div>
                <div className="text-xl font-bold">2,400+</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-[#68D391]" />
              <div>
                <div className="text-sm text-white/70">Satisfaction Rate</div>
                <div className="text-xl font-bold text-[#68D391]">96%</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* Search and Filter Section */}
        <div className="mb-10 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-[#0293A6]" />
            Find Your Perfect Course
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-[#F8FAFC] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0293A6] focus:border-transparent transition duration-200"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <label htmlFor="tag-filter" className="text-gray-600 font-medium whitespace-nowrap">
                Filter by:
              </label>
              <select
                id="tag-filter"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-200 rounded-lg bg-[#F8FAFC] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0293A6] focus:border-transparent appearance-none transition duration-200"
              >
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("SQL")}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedTag === "SQL" ? "bg-[#0293A6] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              SQL
            </button>
            <button
              onClick={() => setSelectedTag("Python")}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedTag === "Python" ? "bg-[#0293A6] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setSelectedTag("Visualization")}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedTag === "Visualization"
                  ? "bg-[#0293A6] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Data Visualization
            </button>
            <button
              onClick={() => setSelectedTag("Beginner")}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedTag === "Beginner" ? "bg-[#0293A6] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Beginner Friendly
            </button>
          </div>
        </div>

        {/* Course Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Popular Categories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "SQL Fundamentals",
                icon: Database,
                count: 3,
                color: "bg-[#0293A6]/10 text-[#0293A6]",
              },
              {
                title: "Data Visualization",
                icon: BarChart2,
                count: 4,
                color: "bg-[#68D391]/10 text-[#68D391]",
              },
              {
                title: "Python for Data",
                icon: BookOpen,
                count: 5,
                color: "bg-[#0293A6]/10 text-[#0293A6]",
              },
              {
                title: "Business Analytics",
                icon: BarChart2,
                count: 3,
                color: "bg-[#68D391]/10 text-[#68D391]",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">{category.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} Courses</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">All Courses</h2>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CourseCard courses={filteredCourses} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-700 text-lg mb-4">No courses match your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTag("All")
                }}
                className="px-4 py-2 bg-[#0293A6] text-white rounded-lg hover:bg-[#026d7d] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CoursesPage
