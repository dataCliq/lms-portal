export async function fetchCourses() {
  const response = await fetch("/api/courses", { method: "GET" });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch courses: ${response.status} - ${text || response.statusText}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || "Failed to fetch courses");
  }
  return data;
}

export async function createCourse(data: {
  courseId: string;
  title: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}) {
  const response = await fetch("/api/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create course: ${response.status} - ${text || response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to create course");
  }
  return result;
}

export async function updateCourse(
  courseId: string,
  data: {
    title: string;
    slug: string;
    description?: string;
    updatedAt: string;
  }
) {
  const response = await fetch(`/api/courses?courseId=${encodeURIComponent(courseId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to update course: ${response.status} - ${text || response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to update course");
  }
  return result;
}

export async function deleteCourse(courseId: string) {
  const response = await fetch(`/api/courses?courseId=${encodeURIComponent(courseId)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to delete course: ${response.status} - ${text || response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to delete course");
  }
  return result;
}

export async function fetchWeeks() {
  const response = await fetch("/api/course-week", { method: "GET" });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch weeks: ${response.status} - ${text || response.statusText}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || "Failed to fetch weeks");
  }
  return data;
}

export async function createWeek(data: {
  courseId: string;
  weekId: number;
  slug: string;
  title: string;
  lessonCount: number;
  createdAt: string;
  updatedAt: string;
}) {
  const response = await fetch("/api/course-week", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create week: ${response.status} - ${text || response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to create week");
  }
  return result;
}

export async function updateWeek(courseId: string, weekId: string, data: {
  title: string;
  slug: string;
  lessonCount: number;
  updatedAt: string;
}) {
  const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}&weekId=${encodeURIComponent(weekId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to update week: ${response.status} - ${text || response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to update week");
  }
  return result;
}

export async function deleteWeek(courseId: string, weekId: string) {
  const response = await fetch(`/api/course-week?courseId=${encodeURIComponent(courseId)}&weekId=${encodeURIComponent(weekId)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to delete week: ${response.status} - ${text || response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to delete week");
  }
  return result;
}