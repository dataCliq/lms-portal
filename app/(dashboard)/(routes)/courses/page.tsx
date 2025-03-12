"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "../../_components/CourseCard";
import Loader from "../../_components/loader";

interface Course {
  _id: string;
  title: string;
  rating: number;
  weekCount: number;
  courseId: string;
  slug: string;
  imageSrc: string;
  description: string;
  tags: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/mongo-test");
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
          setFilteredCourses(data.data);
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

  useEffect(() => {
    let result = courses;
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedTag !== "All") {
      result = result.filter((course) => course.tags.includes(selectedTag));
    }
    setFilteredCourses(result);
  }, [searchQuery, selectedTag, courses]);

  const uniqueTags = ["All", ...new Set(courses.flatMap((course) => course.tags))];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg font-medium bg-red-50 px-6 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Courses
          </h1>
          <p className="mt-2 text-lg text-gray-500 max-w-2xl">
            Master new skills with our curated selection of self-paced courses.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-6 rounded-lg ">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search courses or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="tag-filter" className="text-gray-600 font-medium">
              Filter:
            </label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition duration-200"
            >
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredCourses.length > 0 ? (
            <CourseCard courses={filteredCourses} />
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No courses match your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("All");
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;