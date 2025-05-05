"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CourseAPI, WeekAPI, LessonAPI, type Course, type Week, type Lesson } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, BookOpen, Video } from "lucide-react"

export default function CourseWeekPage({ params }: { params: { courseId: string; weekId: string } }) {
  const router = useRouter()
  const { courseId, weekId } = params

  const [course, setCourse] = useState<Course | null>(null)
  const [week, setWeek] = useState<Week | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
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

        // Fetch lessons for this week
        const lessonsData = await LessonAPI.getLessons(courseId, Number.parseInt(weekId))
        setLessons(lessonsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          title: "Error",
          description: "Failed to load course content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId, weekId, router])

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
        <div className="grid gap-6">
          <Skeleton className="h-12 w-full" />
          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!course || !week) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-muted-foreground">Course content not found</p>
        <Link href="/courses">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/courses/${courseId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">
            Week {week.weekId}: {week.title}
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Week Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{week.title}</p>
          <p className="text-sm text-muted-foreground mt-2">This week contains {week.lessonCount} lessons.</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Lessons</h2>

        {lessons.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">No lessons available for this week yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {lessons.map((lesson, index) => (
              <Link key={lesson.lessonId} href={`/courses/${courseId}/${weekId}/${lesson.slug}`}>
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        {lesson.videoUrl ? (
                          <Video className="h-5 w-5 text-primary" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <span className="text-sm text-muted-foreground">Lesson {index + 1}</span>
                        </div>
                        {lesson.subtitle && <p className="text-sm text-muted-foreground mt-1">{lesson.subtitle}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
