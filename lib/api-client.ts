export interface Lesson {
  _id: string
  courseId: string
  weekId: number
  lessonId: string
  slug: string
  title: string
  name?: string
  subtitle?: string
  content?: string
  videoUrl?: string | null
  attachments?: any | null
  createdAt: string
  updatedAt: string
}

export interface Week {
  _id: string
  courseId: string
  weekId: number
  title: string
  slug: string
  description?: string
  lessonCount: number
  lessonList?: { id: string; title: string }[]
  createdAt: string
  updatedAt: string
}

export type Course = {
  _id?: string;
  title: string;
  rating?: number;
  weekCount?: number;
  courseId: string;
  slug: string;
  imageSrc?: string;
  description?: string;
  tags?: string[];
  price?: number | null;
  createdAt?: string;
  updatedAt?: string;
};




export const CourseAPI = {
  async getCourses() {
    const response = await fetch("/api/courses");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const { data } = await response.json();
    return data.map((course: Course) => ({
      ...course,
      courseId: course.courseId || course._id,
    }));
  },
};

// API client for weeks
export const WeekAPI = {
  async getWeeks(courseId: string): Promise<Week[]> {
    try {
      const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}`)
      const data = await response.json()

      if (!data.success) {
        console.error("Failed to fetch weeks:", data.message)
        return []
      }

      return data.data
    } catch (error) {
      console.error("Error fetching weeks:", error)
      return []
    }
  },

  async getWeek(courseId: string, weekId: number): Promise<Week | null> {
    try {
      const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}`)
      const data = await response.json()

      if (!data.success || !data.data.length) {
        console.error("Failed to fetch week:", data.message)
        return null
      }

      return data.data[0]
    } catch (error) {
      console.error("Error fetching week:", error)
      return null
    }
  },
}

// API client for lessons
export const LessonAPI = {
  async getLessons(courseId: string, weekId: number): Promise<Lesson[]> {
    try {
      const response = await fetch(`/api/lesson-content?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}`)
      const data = await response.json()

      if (!data.success) {
        console.error("Failed to fetch lessons:", data.message)
        return []
      }

      return data.data.map((lesson: any) => ({
        ...lesson,
        title: lesson.title || lesson.name || "Untitled Lesson",
      }))
    } catch (error) {
      console.error("Error fetching lessons:", error)
      return []
    }
  },

  async createLesson(lessonData: Partial<Lesson>): Promise<Lesson | null> {
    try {
      const response = await fetch("/api/lesson-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      })

      const data = await response.json()

      if (!data.success) {
        console.error("Failed to create lesson:", data.message)
        return null
      }

      return data.data
    } catch (error) {
      console.error("Error creating lesson:", error)
      return null
    }
  },
}

// export const LessonAPI = {
//   async getLessons(courseId: string) {
//     console.log(`Fetching lessons for courseId: ${courseId}`);
//     const response = await fetch(`/api/lesson-content?courseId=${encodeURIComponent(courseId)}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch lessons: ${response.statusText}`);
//     }
//     const { data } = await response.json();
//     console.log(`Lessons fetched for courseId ${courseId}:`, data);
//     return data.map((lesson: Lesson) => ({
//       ...lesson,
//       weekId: Number(lesson.weekId),
//       lessonId: Number(lesson.lessonId) || lesson.lessonId,
//     }));
//   },
//   async getLesson(courseId: string, weekId: number, lessonId: number) {
//     console.log(`Fetching lesson for courseId: ${courseId}, weekId: ${weekId}, lessonId: ${lessonId}`);
//     const response = await fetch(
//       `/api/lesson-content?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}&lessonId=${lessonId}`
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch lesson: ${response.statusText}`);
//     }
//     const { data } = await response.json();
//     console.log(`Lesson fetched for courseId ${courseId}, weekId ${weekId}, lessonId ${lessonId}:`, data);
//     return {
//       ...data,
//       weekId: Number(data.weekId),
//       lessonId: Number(data.lessonId) || data.lessonId,
//     };
//   },
//   async createLesson(lesson: Lesson) {
//     console.log("Creating lesson:", lesson);
//     const response = await fetch("/api/lesson-content", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(lesson),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to create lesson: ${response.statusText}`);
//     }
//     const result = await response.json();
//     console.log("Lesson created:", result);
//     return result;
//   },
//   async updateLesson(lesson: Lesson) {
//     console.log("Updating lesson:", lesson);
//     const response = await fetch("/api/lesson-content", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(lesson),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to update lesson: ${response.statusText}`);
//     }
//     const result = await response.json();
//     console.log("Lesson updated:", result);
//     return result;
//   },
//   async deleteLesson(courseId: string, weekId: number, lessonId: number) {
//     console.log(`Deleting lesson for courseId: ${courseId}, weekId: ${weekId}, lessonId: ${lessonId}`);
//     const response = await fetch(
//       `/api/lesson-content?courseId=${encodeURIComponent(courseId)}&weekId=${weekId}&lessonId=${lessonId}`,
//       {
//         method: "DELETE",
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to delete lesson: ${response.statusText}`);
//     }
//     const result = await response.json();
//     console.log("Lesson deleted:", result);
//     return result;
//   },
// };