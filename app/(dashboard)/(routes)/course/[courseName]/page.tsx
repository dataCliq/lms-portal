// app/course/[courseName]/page.tsx
'use client'
import { useRouter } from 'next/router';
import React from 'react';

const CoursePage = () => {
  const router = useRouter();
  const { courseName } = router.query; // Get the course name from the URL
  
  return (
    <div className="course-page">
      <h1 className="text-4xl font-bold text-center">{courseName} Course</h1>
      <p>Welcome to the {courseName} course. Here is the content...</p>
      {/* Add more course-specific content here */}
    </div>
  );
};

export default CoursePage;
