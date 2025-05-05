"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CourseAPI, WeekAPI, LessonAPI, type Course, type Week, type Lesson } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

export default function LessonPage({
  params,
}: {
  params: { courseId: string; weekId: string; lessonSlug: string }
}) {
  const router = useRouter()
  const { courseId, weekId, lessonSlug } = params

  const [course, setCourse] = useState<Course | null>(null)
  const [week, setWeek] = useState<Week | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [allLessons, setAllLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch course details
        const coursesData = await CourseAPI.getCourses(courseId)
        if (coursesData.length === 0) {
          toast({
            title: "Course not found",
            description: "The requested course could not be found.",
            variant: "destructive",
          })
          router.push("/courses")
          return
        }
        setCourse(coursesData[0])

        // Fetch week details
        const weeksData = await WeekAPI.getWeeks(courseId, Number.parseInt(weekId))
        if (weeksData.length === 0) {
          toast({
            title: "Week not found",
            description: "The requested week could not be found.",
            variant: "destructive",
          })
          router.push(`/courses/${courseId}`)
          return
        }
        setWeek(weeksData[0])

        // Fetch all lessons for this week (for navigation)
        const lessonsData = await LessonAPI.getLessons(courseId, Number.parseInt(weekId))
        setAllLessons(lessonsData)

        // Find the current lesson by slug
        const currentLesson = lessonsData.find((l) => l.slug === lessonSlug)
        if (!currentLesson) {
          toast({
            title: "Lesson not found",
            description: "The requested lesson could not be found.",
            variant: "destructive",
          })
          router.push(`/courses/${courseId}/${weekId}`)
          return
        }
        setLesson(currentLesson)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          title: "Error",
          description: "Failed to load lesson content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId, weekId, lessonSlug, router])

  // Get previous and next lessons for navigation
  const currentIndex = allLessons.findIndex((l) => l.slug === lessonSlug)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!course || !week || !lesson) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-muted-foreground">Lesson content not found</p>
        <Link href="/courses">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/courses/${courseId}/${weekId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="text-muted-foreground">
            {course.title} • Week {week.weekId}: {week.title}
          </p>
        </div>
      </div>

      {lesson.subtitle && <p className="text-lg text-muted-foreground mb-6">{lesson.subtitle}</p>}

      {lesson.videoUrl && (
        <div className="mb-8 aspect-video overflow-hidden rounded-lg border bg-muted">
          <iframe
            src={lesson.videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Card className="mb-8">
        <CardContent className="p-6">
          {lesson.content ? (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
          ) : (
            <p className="text-muted-foreground text-center py-12">No content available for this lesson.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-8">
        {prevLesson ? (
          <Link href={`/courses/${courseId}/${weekId}/${prevLesson.slug}`}>
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
          </Link>
        ) : (
          <div></div>
        )}

        {nextLesson ? (
          <Link href={`/courses/${courseId}/${weekId}/${nextLesson.slug}`}>
            <Button>
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href={`/courses/${courseId}/${weekId}`}>
            <Button>
              Complete Week
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
