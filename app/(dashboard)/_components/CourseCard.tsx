"use client"

import Link from "next/link"
import type React from "react"
import { Clock, Users, Star, ChevronRight } from "lucide-react"

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

interface CourseCardProps {
  courses?: Course[]
}

const CourseCard: React.FC<CourseCardProps> = ({ courses = [] }) => {
  if (!Array.isArray(courses) || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No courses available</p>
      </div>
    )
  }

  return (
    <>
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] flex flex-col"
        >
          <div className="relative">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${course.imageSrc})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent"></div>
            </div>

            <div className="absolute top-4 left-4 bg-[#0293A6] text-white text-xs font-medium px-2 py-1 rounded-md">
              Featured
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center text-white text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.weekCount * 5} hours</span>
                <span className="mx-2">•</span>
                <Users className="h-4 w-4 mr-1" />
                <span>240+ enrolled</span>
              </div>
            </div>
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <div className="bg-[#F8FAFC] text-[#0F172A] text-xs font-medium px-2 py-1 rounded-full">Self-paced</div>
              <div className="flex items-center text-[#F59E0B]">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="font-medium">{course.rating.toFixed(1)}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#0F172A] mb-2 line-clamp-2 flex-grow">{course.title}</h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {course.description || "Master essential data analytics skills with this comprehensive course."}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-[#0293A6]/10 text-[#0293A6] px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="text-[#0F172A] font-bold">{course.price ? `$${course.price.toFixed(2)}` : "Free"}</div>

              <Link href={`/course/weeks?courseId=${course.courseId}`}>
                <button className="flex items-center bg-[#0293A6] hover:bg-[#026d7d] text-white px-4 py-2 rounded-lg transition-colors">
                  <span>Start Learning</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CourseCard
