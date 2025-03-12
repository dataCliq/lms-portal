"use client";

import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

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

interface CourseCardProps {
  courses?: Course[];
}

const CourseCard: React.FC<CourseCardProps> = ({ courses = [] }) => {
  if (!Array.isArray(courses) || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No courses available</p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <div
          key={course._id}
          className="relative flex w-96 flex-col rounded-xl bg-white text-gray-700 shadow-md transition-all hover:shadow-lg min-h-[370px]"
        >
          <div
            className="relative mx-4 -mt-6 h-48 rounded-xl bg-cover bg-center shadow-lg shadow-blue-gray-500/40 "
            style={{ backgroundImage: `url(${course.imageSrc})` }}
          >
            <div className="absolute top-3 left-3 bg-[#0293A6] text-white text-xs font-medium px-2 py-1 rounded-md">
              Featured
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                Self-paced
              </div>
              <div className="bg-[#10B981]/10 text-[#10B981] px-3 py-1 rounded-md text-sm font-medium flex items-center shadow-md">
                ⭐ {course.rating}/5
              </div>
            </div>
            <h5 className="mb-2 h-14 text-xl font-semibold leading-snug text-blue-gray-900 line-clamp-2">
              {course.title}
            </h5>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-gray-600">
                <FontAwesomeIcon icon={faBook} className="text-xl text-[#0293A6] mr-2" />
                {course.weekCount} Lessons
              </div>
              <Link href={`/course/weeks?courseId=${course.courseId}`}>
                <button className="select-none h-[40px] w-[120px] rounded-lg bg-[#0293A6] py-2 px-4 text-center text-[15px] font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                  Start Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseCard;