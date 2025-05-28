"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function WeeksRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const courseId = searchParams?.get("courseId")
    const slug = searchParams?.get("slug")

    // Redirect to the first week (week 1) of the course
    if (courseId) {
      router.replace(`/course/weeks/1?courseId=${courseId}&slug=${slug || ""}`)
    } else {
      // If no courseId, redirect to courses page
      router.replace("/courses")
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="mt-4 text-lg text-gray-700">Redirecting to course...</span>
      </div>
    </div>
  )
}

// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { useSearchParams, useRouter } from "next/navigation"
// import {
//   BarChart2,
//   Database,
//   ChevronRight,
//   CheckCircle,
//   Clock,
//   BookOpen,
//   LineChart,
//   FileText,
//   ArrowLeft,
// } from "lucide-react"
// import Loader from "@/app/(dashboard)/_components/loader"

// export default function WeekList() {
//   interface Lesson {
//     title: string
//     id: string
//     slug: string
//   }

//   interface Week {
//     _id: string
//     weekId: number
//     courseId: string
//     lessonCount: number
//     slug: string
//     lessonList: Lesson[]
//     createdAt: string
//     updatedAt: string
//   }

//   const [weeks, setWeeks] = useState<Week[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const courseId = searchParams?.get("courseId") || "power-bi"

//   useEffect(() => {
//     const fetchWeeks = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch(`/api/course-week?courseId=${courseId}`)

//         if (!response.ok) {
//           throw new Error(`API returned status ${response.status}`)
//         }

//         const result = await response.json()
//         if (result.success) {
//           setWeeks(result.data)
//           setError("")
//         } else {
//           setError(result.message || "Failed to fetch data")
//         }
//       } catch (err) {
//         console.error("Error fetching weeks:", err)
//         setError("Error fetching data. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (courseId) {
//       fetchWeeks()
//     }
//   }, [courseId])

//   const handleGoBack = () => {
//     router.push("/courses")
//   }

//   if (loading) return <Loader message="Loading weeks..." />

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
//           <div className="text-red-500 mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 mx-auto"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={handleGoBack}
//             className="bg-[#0293A6] text-white px-4 py-2 rounded-lg hover:bg-[#026d7d] transition-colors"
//           >
//             Go Back to Courses
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] relative">
//       {/* Data-themed background pattern */}
//       <div className="absolute inset-0 pointer-events-none opacity-5">
//         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="dataGrid" width="50" height="50" patternUnits="userSpaceOnUse">
//               <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0293A6" strokeWidth="0.5" />
//               <circle cx="0" cy="0" r="1" fill="#0293A6" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dataGrid)" />
//         </svg>
//       </div>

//       {/* Header with data visualization elements */}
//       <header className="relative bg-gradient-to-r from-[#0F172A] to-[#0F172A]/90 text-white py-12 px-6 overflow-hidden mt-[65px]">
//         <div className="absolute inset-0 opacity-10">
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="dataViz" width="100" height="100" patternUnits="userSpaceOnUse">
//                 <circle cx="50" cy="50" r="1.5" fill="#00A3B5" />
//                 <circle cx="25" cy="25" r="1" fill="#00A3B5" />
//                 <circle cx="75" cy="75" r="1" fill="#00A3B5" />
//                 <circle cx="25" cy="75" r="1" fill="#00A3B5" />
//                 <circle cx="75" cy="25" r="1" fill="#00A3B5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#dataViz)" />
//           </svg>
//         </div>

//         {/* Animated data elements */}
//         <div className="absolute right-10 top-10 opacity-20 hidden md:block">
//           <div className="w-32 h-32 rounded-full border-4 border-[#00A3B5] animate-pulse"></div>
//         </div>
//         <div className="absolute left-10 bottom-10 opacity-20 hidden md:flex space-x-4">
//           <div className="w-4 h-16 bg-[#68D391] rounded-t-lg"></div>
//           <div className="w-4 h-24 bg-[#00A3B5] rounded-t-lg"></div>
//           <div className="w-4 h-12 bg-[#68D391] rounded-t-lg"></div>
//           <div className="w-4 h-20 bg-[#00A3B5] rounded-t-lg"></div>
//         </div>

//         <div className="max-w-screen-xl mx-auto relative z-10">
//           <button
//             onClick={handleGoBack}
//             className="inline-flex items-center text-white/80 hover:text-white mb-6 transition duration-200"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Courses
//           </button>

//           <div className="flex items-center mb-4">
//             <Database className="h-5 w-5 mr-2 text-[#00A3B5]" />
//             <span className="text-sm font-medium text-white/70">{courseId.toUpperCase()} Course</span>
//           </div>
//           <h1 className="text-3xl font-bold mb-4">Course Curriculum</h1>
//           <p className="text-white/70 max-w-2xl">
//             Master data analytics with our structured curriculum. Each week builds on previous concepts to develop your
//             skills progressively.
//           </p>

//           <div className="mt-8 flex flex-wrap gap-4">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center">
//               <BookOpen className="h-5 w-5 mr-2 text-[#00A3B5]" />
//               <div>
//                 <div className="text-sm text-white/70">Total Weeks</div>
//                 <div className="text-xl font-bold">{weeks.length}</div>
//               </div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center">
//               <Clock className="h-5 w-5 mr-2 text-[#00A3B5]" />
//               <div>
//                 <div className="text-sm text-white/70">Est. Completion</div>
//                 <div className="text-xl font-bold">12 Weeks</div>
//               </div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center">
//               <BarChart2 className="h-5 w-5 mr-2 text-[#68D391]" />
//               <div>
//                 <div className="text-sm text-white/70">Your Progress</div>
//                 <div className="text-xl font-bold text-[#68D391]">42%</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Course Weeks</h2>
//           <p className="text-gray-600">
//             Each week focuses on specific data analytics concepts and skills. Complete the lessons in order for the best
//             learning experience.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {weeks.map((week) => (
//             <div
//               key={week._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
//             >
//               <div className="h-2 bg-gradient-to-r from-[#0293A6] to-[#68D391]"></div>
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-[#0293A6]/10 flex items-center justify-center text-[#0293A6] font-bold text-xl mr-3">
//                       {week.weekId}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-[#0F172A]">Week {week.weekId}</h3>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <FileText className="h-4 w-4 mr-1" />
//                         <span>{week.lessonCount} Lessons</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="h-10 w-10 rounded-full bg-[#68D391]/20 flex items-center justify-center">
//                     <span className="text-[#68D391] font-medium">75%</span>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-gray-600 mb-2">Topics Covered</h4>
//                   <ul className="space-y-2">
//                     {week.lessonList &&
//                       week.lessonList.slice(0, 3).map((lesson, index) => (
//                         <li key={index} className="flex items-start">
//                           <CheckCircle className="h-4 w-4 text-[#68D391] mt-0.5 mr-2 flex-shrink-0" />
//                           <span className="text-sm text-gray-700 line-clamp-1">{lesson.title}</span>
//                         </li>
//                       ))}
//                     {week.lessonList && week.lessonList.length > 3 && (
//                       <li className="text-sm text-gray-500 pl-6">+{week.lessonList.length - 3} more lessons</li>
//                     )}
//                   </ul>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Clock className="h-4 w-4 mr-1" />
//                     <span>~5 hours</span>
//                   </div>

//                   <Link
//                     href={`/course/weeks/${week.weekId}?courseId=${courseId}&slug=${week.slug}`}
//                   >
//                     <button className="flex items-center text-[#0293A6] font-medium hover:text-[#026d7d] transition-colors">
//                       <span>View Lessons</span>
//                       <ChevronRight className="h-4 w-4 ml-1" />
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Data visualization section */}
//         <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center">
//             <LineChart className="h-6 w-6 mr-2 text-[#0293A6]" />
//             Your Learning Journey
//           </h2>

//           <div className="h-64 bg-[#F8FAFC] rounded-lg p-4 flex items-end justify-between">
//             {Array.from({ length: 12 }).map((_, index) => {
//               const height = index < 5 ? 100 - Math.random() * 20 : Math.random() * 30 + 10
//               const color = index < 5 ? "#68D391" : "#E2E8F0"
//               return (
//                 <div key={index} className="flex flex-col items-center">
//                   <div
//                     className="w-8 rounded-t-md transition-all duration-500"
//                     style={{
//                       height: `${height}%`,
//                       backgroundColor: color,
//                     }}
//                   ></div>
//                   <div className="text-xs text-gray-500 mt-2">W{index + 1}</div>
//                 </div>
//               )
//             })}
//           </div>

//           <div className="mt-4 text-sm text-gray-500 text-center">
//             Track your progress through each week of the course
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }