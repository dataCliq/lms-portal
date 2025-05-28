// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter, useParams } from "next/navigation"
// import Link from "next/link"
// import {
//   ArrowLeft,
//   BookOpen,
//   CheckCircle,
//   Clock,
//   FileText,
//   ChevronRight,
//   ChevronLeft,
//   Menu,
//   X,
//   AlertCircle,
// } from "lucide-react"

// interface LessonItem {
//   id: string
//   title: string
// }

// interface Week {
//   _id?: string
//   courseId: string
//   weekId: number
//   slug: string
//   title: string
//   lessonList?: LessonItem[]
// }

// interface Lesson {
//   _id?: string
//   courseId: string
//   weekId: number
//   lessonId: string
//   slug: string
//   title?: string
//   name?: string
//   subtitle?: string
//   content?: string
//   videoUrl?: string | null
//   attachments?: { url: string; name: string; type: string }[] | null
// }

// export default function LessonDetail() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const params = useParams()
//   const courseId = searchParams.get("courseId") || ""
//   const weekId = searchParams.get("weekId") || ""
//   const lessonId = params.lessonId as string

//   const [lesson, setLesson] = useState<Lesson | null>(null)
//   const [week, setWeek] = useState<Week | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [sidebarOpen, setSidebarOpen] = useState(true)

//   // Fetch week data to get lessonList
//   useEffect(() => {
//     if (!courseId || !weekId) return

//     const fetchWeekData = async () => {
//       try {
//         console.log(`Fetching week data for courseId: ${courseId}, weekId: ${weekId}`)
//         const response = await fetch(
//           `/api/course-week?courseId=${encodeURIComponent(courseId)}&weekId=${encodeURIComponent(weekId)}`,
//         )

//         if (!response.ok) {
//           console.error(`Week API returned status ${response.status}`)
//           throw new Error(`Failed to fetch week data: ${response.status}`)
//         }

//         const result = await response.json()
//         console.log("Week API response:", result)

//         if (result.success && result.data && result.data.length > 0) {
//           setWeek(result.data[0])
//         } else {
//           console.warn("No week data found or API returned unsuccessful response")
//         }
//       } catch (err) {
//         console.error("Error fetching week data:", err)
//       }
//     }

//     fetchWeekData()
//   }, [courseId, weekId])

//   // Fetch current lesson
//   useEffect(() => {
//     const fetchLessonDetail = async () => {
//       try {
//         setLoading(true)
//         console.log(`Fetching lesson detail for lessonId: ${lessonId}`)
//         const response = await fetch(`/api/lesson-content?lessonId=${encodeURIComponent(lessonId)}`)

//         if (!response.ok) {
//           console.error(`API returned status ${response.status}`)
//           throw new Error(`Failed to fetch lesson: ${response.status}`)
//         }

//         const result = await response.json()
//         console.log("Lesson detail API response:", result)

//         if (result.success && result.data && result.data.length > 0) {
//           setLesson(result.data[0])
//           setError("")
//         } else {
//           setError(result.message || "Lesson not found")
//         }
//       } catch (err) {
//         console.error("Error fetching lesson:", err)
//         setError("Error fetching lesson. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (lessonId) fetchLessonDetail()
//   }, [lessonId])

//   const handleGoBack = () => {
//     router.push(`/course/weeks/${weekId}?courseId=${courseId}&slug=w${weekId}`)
//   }

//   const handlePrevious = () => {
//     if (!week || !week.lessonList) return

//     const currentIndex = week.lessonList.findIndex((l) => l.id === lessonId)
//     if (currentIndex > 0) {
//       const prevLesson = week.lessonList[currentIndex - 1]
//       router.push(`/course/lessons/${prevLesson.id}?courseId=${courseId}&weekId=${weekId}`)
//     }
//   }

//   const handleNext = () => {
//     if (!week || !week.lessonList) return

//     const currentIndex = week.lessonList.findIndex((l) => l.id === lessonId)
//     if (currentIndex < week.lessonList.length - 1) {
//       const nextLesson = week.lessonList[currentIndex + 1]
//       router.push(`/course/lessons/${nextLesson.id}?courseId=${courseId}&weekId=${weekId}`)
//     }
//   }

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-[65px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0293A6]"></div>
//         <span className="ml-3 text-lg text-gray-700">Loading lesson...</span>
//       </div>
//     )
//   }

//   if (error || !lesson) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC] pt-[65px]">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
//           <div className="text-red-500 mb-4">
//             <AlertCircle className="h-16 w-16 mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson not found</h2>
//           <p className="text-gray-600 mb-6">
//             {error || "The lesson you're looking for doesn't exist or has been removed."}
//           </p>
//           <button
//             onClick={handleGoBack}
//             className="bg-[#0293A6] text-white px-4 py-2 rounded-lg hover:bg-[#026d7d] transition-colors"
//           >
//             Go Back to Week
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const hasPrevious = week?.lessonList && week.lessonList.findIndex((l) => l.id === lessonId) > 0
//   const hasNext = week?.lessonList && week.lessonList.findIndex((l) => l.id === lessonId) < week.lessonList.length - 1

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
//       {/* Mobile Sidebar Toggle */}
//       <div className="md:hidden fixed top-20 left-0 z-30">
//         <button
//           onClick={toggleSidebar}
//           className="bg-white shadow-md rounded-r-lg p-2 flex items-center justify-center"
//         >
//           {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       <div className="flex flex-1 pt-[65px]">
//         {/* Left Sidebar for Lessons Menu */}
//         <aside
//           className={`${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } fixed md:static top-[65px] bottom-0 left-0 z-20 w-64 bg-white shadow-lg p-4 
//           md:h-[calc(100vh-65px)] md:overflow-y-auto transition-transform duration-300 md:translate-x-0`}
//         >
//           <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Lessons - Week {weekId}</h2>
//           {week?.lessonList && week.lessonList.length > 0 ? (
//             <ul className="space-y-2">
//               {week.lessonList.map((item) => (
//                 <li key={item.id}>
//                   <Link
//                     href={`/course/lessons/${item.id}?courseId=${courseId}&weekId=${weekId}`}
//                     className={`block w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors ${
//                       lessonId === item.id ? "bg-[#0293A6] text-white" : "text-gray-700"
//                     }`}
//                   >
//                     {item.title || "Untitled Lesson"}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 text-sm">No lessons available for this week.</p>
//           )}
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1 overflow-auto">
//           <div className="absolute inset-0 pointer-events-none opacity-5">
//             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="dataGrid" width="50" height="50" patternUnits="userSpaceOnUse">
//                   <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0293A6" strokeWidth="0.5" />
//                   <circle cx="0" cy="0" r="1" fill="#0293A6" />
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#dataGrid)" />
//             </svg>
//           </div>

//           <header className="bg-white shadow-md">
//             <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
//               <button
//                 onClick={handleGoBack}
//                 className="inline-flex items-center text-gray-600 hover:text-[#0293A6] transition duration-200"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Week {weekId}
//               </button>

//               <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <BookOpen className="h-5 w-5 mr-2 text-[#0293A6]" />
//                     <span className="text-sm font-medium text-gray-500">
//                       {courseId.toUpperCase()} • Week {weekId}
//                     </span>
//                   </div>
//                   <h1 className="text-2xl font-bold text-[#0F172A]">
//                     {lesson.title || lesson.name || "Untitled Lesson"}
//                   </h1>
//                   {lesson.subtitle && <p className="text-gray-600 mt-1">{lesson.subtitle}</p>}
//                 </div>

//                 <div className="mt-4 md:mt-0 flex items-center">
//                   <div className="flex items-center text-gray-500 mr-4">
//                     <Clock className="h-4 w-4 mr-1" />
//                     <span className="text-sm">25 min</span>
//                   </div>
//                   <div className="flex items-center text-[#68D391]">
//                     <CheckCircle className="h-4 w-4 mr-1" />
//                     <span className="text-sm">Completed</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={!hasPrevious}
//                   className={`inline-flex items-center px-3 py-1 rounded-md transition duration-200 ${
//                     hasPrevious
//                       ? "text-gray-600 hover:text-[#0293A6] hover:bg-gray-100"
//                       : "text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   <span>Previous Lesson</span>
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={!hasNext}
//                   className={`inline-flex items-center px-3 py-1 rounded-md transition duration-200 ${
//                     hasNext
//                       ? "text-gray-600 hover:text-[#0293A6] hover:bg-gray-100"
//                       : "text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <span>Next Lesson</span>
//                   <ChevronRight className="h-4 w-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           </header>

//           <main className={`max-w-screen-xl mx-auto px-4 sm:px-6 py-8 relative z-10 ${sidebarOpen ? "md:ml-0" : ""}`}>
//             <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
//               {/* Video section */}
//               {lesson.videoUrl && (
//                 <div className="mb-8">
//                   <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
//                     <iframe
//                       src={lesson.videoUrl}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                       className="w-full h-full"
//                     ></iframe>
//                   </div>
//                 </div>
//               )}

//               {/* Content section */}
//               <div className="prose prose-slate max-w-none">
//                 <div
//                   dangerouslySetInnerHTML={{ __html: lesson.content || "<p>No content available for this lesson.</p>" }}
//                 />
//               </div>

//               {/* Attachments section */}
//               {lesson.attachments && lesson.attachments.length > 0 && (
//                 <div className="mt-8 border-t pt-6">
//                   <h3 className="text-lg font-semibold mb-4">Attachments</h3>
//                   <ul className="space-y-2">
//                     {lesson.attachments.map((attachment, index) => (
//                       <li key={index}>
//                         <a
//                           href={attachment.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
//                         >
//                           <FileText className="h-5 w-5 mr-3 text-[#0293A6]" />
//                           <div>
//                             <p className="font-medium">{attachment.name}</p>
//                             <p className="text-sm text-gray-500">{attachment.type}</p>
//                           </div>
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={!hasPrevious}
//                   className={`inline-flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
//                     hasPrevious
//                       ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
//                       : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-2" />
//                   Previous Lesson
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={!hasNext}
//                   className={`inline-flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
//                     hasNext
//                       ? "bg-[#0293A6] hover:bg-[#026d7d] text-white"
//                       : "bg-[#0293A6] text-white/50 cursor-not-allowed"
//                   }`}
//                 >
//                   Next Lesson
//                   <ChevronRight className="h-4 w-4 ml-2" />
//                 </button>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   )
// }
