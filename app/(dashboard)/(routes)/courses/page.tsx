"use client";

import React from "react";
import CourseCard from "../../_components/CourseCard";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Explore Our Courses</h1>
          <p className="mt-2 text-gray-600">
            Discover a variety of self-paced courses to enhance your skills.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Optional Filters (can be expanded later) */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-gray-600">Showing all available courses</p>
          {/* Add filters or sorting here if desired */}
          {/* Example: <select className="border rounded-md p-2"><option>Sort by Rating</option></select> */}
        </div>

        {/* Course Cards */}
        <CourseCard />
      </main>
    </div>
  );
};

export default CoursesPage;