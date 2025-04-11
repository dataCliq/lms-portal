export async function fetchCourses(): Promise<any[]> {
    try {
      const response = await fetch("/api/mongo-test");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const result = await response.json();
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  }
  
  export async function fetchWeeks(courseId: string): Promise<any> {
    try {
      const response = await fetch(`/api/course-week?courseId=${courseId}`);
      if (!response.ok) throw new Error("Failed to fetch weeks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching weeks:", error);
      return { data: [] };
    }
  }
  
  export async function fetchLesson(courseId: string, weekId: string | number, lessonId: string) {
    try {
      const response = await fetch(`/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`);
      if (!response.ok) throw new Error("Failed to fetch lesson");
      return await response.json();
    } catch (error) {
      console.error("Error fetching lesson:", error);
      throw error;
    }
  }
  
  export async function saveLesson(lessonData: any) {
    try {
      const response = await fetch("/api/lesson-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save lesson");
      return result;
    } catch (error) {
      console.error("Error saving lesson:", error);
      throw error;
    }
  }
  
  export async function updateLesson(lessonData: any) {
    try {
      const response = await fetch("/api/lesson-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update lesson");
      return result;
    } catch (error) {
      console.error("Error updating lesson:", error);
      throw error;
    }
  }
  
  export async function deleteLesson(courseId: string, weekId: string | number, lessonId: string) {
    try {
      const response = await fetch(`/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to delete lesson");
      return result;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      throw error;
    }
  }