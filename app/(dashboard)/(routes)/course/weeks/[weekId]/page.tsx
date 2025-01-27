"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const WeekDetail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug"); // Get the slug from query parameters
    const [lessons, setLessons] = useState([]); // Store lesson list
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) {
                setError("No slug provided in the URL.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/course-week?slug=${slug}`);
                const result = await response.json();

                console.log("API Response:", result); // Debugging API response

                if (result.success) {
                    const weekData = result.data[0]; // Assuming the API returns an array
                    if (weekData && weekData.lessonList) {
                        setLessons(weekData.lessonList); // Set the lessonList correctly
                        console.log("Lessons:", weekData.lessonList); // Debugging lessons data
                    } else {
                        console.warn("No lessonList found in week data");
                        setLessons([]);
                    }
                } else {
                    setError("Failed to fetch week data");
                }
            } catch (err) {
                console.error("Error fetching week data:", err);
                setError("An error occurred while fetching the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex h-screen">
            {/* Navigation Menu */}
            <div className="w-1/5 bg-gray-900 text-white p-4 flex flex-col gap-6 fixed h-screen">
                <h1 className="text-xl font-bold mb-8 text-center border-b pb-2 border-gray-700">
                    Lessons
                </h1>
                {loading ? (
                    <p className="text-gray-400 text-center">Loading lessons...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : lessons.length > 0 ? (
                    lessons.map((lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => navigateTo(`/lesson/${lesson.id}`)}
                            className="bg-gray-800 hover:bg-gray-700 rounded-md px-4 py-3 text-left transition"
                        >
                            {lesson.title || "Untitled"} {/* Safeguard if title is missing */}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No lessons available</p>
                )}
            </div>

            {/* Main Content */}
            <div className="ml-1/5 flex-1 p-8 bg-gray-100">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                    Week Details
                </h2>
                <p className="text-lg text-gray-600">
                    {loading
                        ? "Loading week details..."
                        : lessons.length > 0
                        ? "Select a lesson from the navigation menu to view its details."
                        : "No lessons available for this week."}
                </p>
            </div>
        </div>
    );
};

export default WeekDetail;
