'use client';

import React from "react";
import CourseCard from "../../_components/CourseCard";

const CoursePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Our Courses</h1>
      <CourseCard />
    </div>
  );
};

export default CoursePage;
