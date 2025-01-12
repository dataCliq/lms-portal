'use client';

import React, { useEffect, useState } from "react";
import Card from "../../_components/course-card";

interface Course {
  _id: string; // Assuming MongoDB's ObjectId is used as the unique identifier
  title: string;
  lessonsCount: number;
}

const CourseCard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/mongo-test");
        const data = await response.json();

        if (data.success) {
          setCourses(data.data);
        } else {
          setError("Failed to fetch courses");
        }
      } catch (err) {
        setError("Error fetching courses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Show a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle errors if data fetch fails
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render cards for each course
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {courses.map((course) => (
        <Card
          key={course._id} // Use a unique key for React's reconciliation
          title={course.title}
          lessonsCount={course.lessonsCount}
          onStartNow={() => alert(`Starting course: ${course.title}`)}
        />
      ))}
    </div>
  );
};

export default CourseCard;
