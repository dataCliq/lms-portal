"use client"

import { useState, useEffect } from "react"
import HeroSection from "./HeroSection"
import Features from "./Features"
import CardSection from "./CardSection"
import CourseCard from "../../_components/CourseCard"
import Bootcamp from "../../_components/Bootcamp"
import SkillsSection from "./Skills"
import FAQ from "./FAQ"
import Pricing from "./Pricing"
import Testimonials from "./Testimonials"
import Footer from "../../_components/Footer"
import DataInsightsSection from "./DataInsightsSection"
// import CareerPathSection from "./CareerPathSection"

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

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([])
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
          // Only take the first 3 courses for the home page
          setCourses(data.data.slice(0, 3))
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


  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      {/* Hero Section */}
      <div className="w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
        <HeroSection />
      </div>

      {/* Tools Section */}
      <div className="w-full">
        <SkillsSection />
      </div>

      {/* Features Section with Data Visualizations */}
      <div className="w-full">
        <Features />
      </div>

      {/* Data Insights Section */}
      <div className="w-full">
        <DataInsightsSection />
      </div>

      {/* Core Offerings Section */}
      <div className="w-full">
        <CardSection />
      </div>

      {/* Dynamic Course Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 md:mt-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#28282B] mb-4">
            Featured Data Analysis Courses
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Start your data analysis journey with our most popular courses
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#00A3B5] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured courses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md mx-auto">
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 sm:h-16 sm:w-16 mx-auto"
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Failed to load courses</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#00A3B5] text-white rounded-lg hover:bg-[#026d7d] transition-colors text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12">
              <CourseCard courses={courses} />
            </div>

            {/* View All Courses Button */}
            <div className="text-center mt-8 sm:mt-12">
              <a
                href="/courses"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#00A3B5] text-white rounded-lg hover:bg-[#026d7d] transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base font-medium"
              >
                <span>View All Courses</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 sm:h-16 sm:w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">No courses available</h3>
              <p className="text-gray-600 text-sm sm:text-base">Check back later for new courses!</p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full py-10 sm:py-16 md:py-20"></div>

      {/* Bootcamp Section */}
      <div className="w-full py-4 sm:py-6 md:py-8 flex justify-center">
        <Bootcamp />
      </div>

      <div className="w-full py-10 sm:py-16 md:py-20"></div>

      {/* Pricing Section */}
      <div className="w-full">
        <Pricing />
      </div>

      <div className="w-full py-8 sm:py-12 md:py-16"></div>

      {/* Testimonials Section */}
      <div className="w-full">
        <Testimonials />
      </div>

      {/* FAQ Section */}
      <div className="w-full">
        <FAQ />
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
