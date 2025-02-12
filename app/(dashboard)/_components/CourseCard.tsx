'use client';

import Link from "next/link";
import 'font-awesome/css/font-awesome.min.css';
import React, { useEffect, useState } from "react";

interface Course {
    _id: string,
    title: string,
    rating: Float32Array,
    weekCount: Float32Array,
    courseId: string,
    slug: string,
    imageSrc: string,
    description: string,
    tags: [string],
    price: Float32Array,
    createdAt: Date,
    updatedAt: Date,
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
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 place-items-center">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="flex flex-col items-center relative"
                    >
                        {/* Image Section */}
                        <div
                            className="w-[330px] h-[200px] bg-cover bg-center relative bg-orange-200 rounded-2xl"
                            style={{ backgroundImage: `url(${course.imageSrc})` }}
                        >
                            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                                Featured
                            </div>
                        </div>

                        {/* Rating Card and Chip Section */}
                        <div className="absolute top-[220px] w-[330px] flex justify-between items-center px-4">
                            <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                Self-paced
                            </div>
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm flex items-center shadow-md">
                                ⭐ {course.rating}/5
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-[350px] h-[290px] rounded-2xl flex flex-col justify-between items-start p-4 border absolute top-[120px] -z-10"></div>

                        {/* Text Section */}
                        <div className="w-[350px] flex flex-col justify-center items-start p-4 rounded-2xl mt-12">
                            <h2 className="w-[250px] text-[22px] pl-2 font-semibold text-gray-800 text-left whitespace-normal overflow-wrap break-words">
                                {course.title}
                            </h2>
                            <div className="flex justify-between items-center w-full mt-4">
                                <div className="flex items-center text-sm text-gray-600 px-3 py-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 3.75H7.5m9 0a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25m-9-16.5A2.25 2.25 0 005.25 6v12a2.25 2.25 0 002.25 2.25m9 0h-9"
                                        />
                                    </svg>
                                    {course.weekCount} Lessons
                                </div>
                                {/* <Link href={`/course/${encodeURIComponent(course.courseId)}`}>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
                                    >
                                        Start Now
                                    </button>
                                </Link> */}

                                <Link href={`/course/weeks?courseId=${course.courseId}`}>
                                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
                                        Start Now
                                    </button>
                                </Link>


                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );

};

export default CourseCard;

