export interface Course {
  _id?: string
  courseId: string
  title: string
  rating?: number
  weekCount?: number
  slug?: string
  imageSrc?: string
  description?: string
  tags?: string[]
  price?: number | null
  createdAt?: string
  updatedAt?: string
}

export interface Week {
  _id: string
  courseId: string
  weekId: number
  title: string
  slug: string
  description?: string
  lessonCount: number
  lessonList?: { title: string; id: string }[]
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  _id?: string
  weekId: number
  courseId: string
  lessonId: string
  slug: string
  title: string
  name?: string // Optional to match database
  subtitle?: string
  content?: string
  videoUrl?: string | null
  attachments?: any | null
  createdAt?: string
  updatedAt?: string
}