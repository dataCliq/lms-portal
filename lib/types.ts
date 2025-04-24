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
    courseId: string;
    weekId: number;
    slug: string;
    lessonCount: number;
    lessonList?: { title: string; id: string }[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Lesson {
    _id?: string
    weekId: number
    courseId: string
    lessonId: string
    slug: string
    name: string
    content: string
    subtitle?: string
    videoUrl?: string | null
    attachments?: any | null
    createdAt?: string
    updatedAt?: string
  }
  