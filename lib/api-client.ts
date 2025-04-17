export type Lesson = {
  _id?: string
  courseId: string
  weekId: number
  lessonId: number | string
  title: string
  content?: string
  createdAt?: string
  updatedAt?: string
}

export type Week = {
  _id?: string
  courseId: string
  weekId: number
  slug: string
  lessonCount: number
  lessonList?: { title: string; id: string }[]
  createdAt?: string
  updatedAt?: string
}

export type Course = {
  _id?: string
  title: string
  rating?: number
  weekCount?: number
  courseId: string
  slug: string
  imageSrc?: string
  description?: string
  tags?: string[]
  price?: number | null
  createdAt?: string
  updatedAt?: string
}

export const CourseAPI = {
  async getCourses() {
    const response = await fetch("/api/courses")
    if (!response.ok) {
      throw new Error("Failed to fetch courses")
    }
    const { data } = await response.json()
    return data.map(course => ({
      ...course,
      courseId: course.courseId || course._id
    }))
  },
}

export const WeekAPI = {
  async getWeeks(courseId: string) {
    const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}`)
    if (!response.ok) {
      throw new Error("Failed to fetch weeks")
    }
    const { data } = await response.json()
    return data.map(week => ({
      ...week,
      weekId: Number(week.weekId),
      lessonCount: Number(week.lessonCount)
    }))
  },
  async getWeek(courseId: string, weekId: number) {
    const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch week")
    }
    const { data } = await response.json()
    return data.map(week => ({
      ...week,
      weekId: Number(week.weekId),
      lessonCount: Number(week.lessonCount)
    }))[0]
  },
  async createWeek(week: Week) {
    const response = await fetch("/api/course-week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(week),
    })
    if (!response.ok) {
      throw new Error("Failed to create week")
    }
    return response.json()
  },
  async updateWeek(week: Week) {
    const response = await fetch("/api/course-week", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(week),
    })
    if (!response.ok) {
      throw new Error("Failed to update week")
    }
    return response.json()
  },
  async deleteWeek(courseId: string, weekId: number) {
    const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete week")
    }
    return response.json()
  },
}

export const LessonAPI = {
  async getLessons(courseId: string) {
    const response = await fetch(`/api/lesson-content?courseId=${encodeURIComponent(courseId)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch lessons: ${response.statusText}`)
    }
    const { data } = await response.json()
    return data.map(lesson => ({
      ...lesson,
      weekId: Number(lesson.weekId),
      lessonId: Number(lesson.lessonId) || lesson.lessonId
    }))
  },
  async getLesson(courseId: string, weekId: number, lessonId: number) {
    const response = await fetch(
      `/api/lesson-content?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}&lessonId=${lessonId}`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch lesson: ${response.statusText}`)
    }
    const { data } = await response.json()
    return data.map(lesson => ({
      ...lesson,
      weekId: Number(lesson.weekId),
      lessonId: Number(lesson.lessonId) || lesson.lessonId
    }))[0]
  },
  async createLesson(lesson: Lesson) {
    const response = await fetch("/api/lesson-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lesson),
    })
    if (!response.ok) {
      throw new Error(`Failed to create lesson: ${response.statusText}`)
    }
    return response.json()
  },
  async updateLesson(lesson: Lesson) {
    const response = await fetch("/api/lesson-content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lesson),
    })
    if (!response.ok) {
      throw new Error(`Failed to update lesson: ${response.statusText}`)
    }
    return response.json()
  },
  async deleteLesson(courseId: string, weekId: number, lessonId: number) {
    const response = await fetch(
      `/api/lesson-content?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}&lessonId=${lessonId}`,
      {
        method: "DELETE",
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to delete lesson: ${response.statusText}`)
    }
    return response.json()
  },
}