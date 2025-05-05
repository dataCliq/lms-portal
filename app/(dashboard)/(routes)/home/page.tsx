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
        const response = await fetch("/api/mongo-test")
        const data = await response.json()
        if (data.success) {
          setCourses(data.data.slice(0, 3)) // Show only 3 courses
        } else {
          setError("Failed to fetch courses")
        }
      } catch (err) {
        setError("Error fetching courses")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      {/* Hero Section */}
      <div className="w-full pt-10">
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

      {/* Data Insights Section - New */}
      <div className="w-full">
        <DataInsightsSection />
      </div>

      
      {/* Core Offerings Section */}
      <div className="w-full">
        <CardSection />
      </div>

      {/* Career Path Section - New */}
      {/* <div className="w-full">
        <CareerPathSection />
      </div> */}

      {/* Dynamic Course Cards */}
      <div className="mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16 text-[#28282B]">Our Data Analysis Courses</h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A3B5] mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <CourseCard courses={courses} />
          </div>
        )}
      </div>

      <div className="w-full py-20"></div>

      {/* Bootcamp Section */}
      <div className="w-full py-8 flex justify-center">
        <Bootcamp />
      </div>
      <div className="w-full py-20"></div>
      {/* Pricing Section */}
      <div className="w-full">
        <Pricing />
      </div>

      

      <div className="w-full py-16"></div>

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
