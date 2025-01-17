'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const CoursePage = () => {
    const pathname = usePathname(); // Get the current URL path
    const courseId = pathname ? pathname.split('/').pop() : null; // Extract 'courseId' from the path

    const [courseData, setCourseData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!courseId) return; // Exit if no courseId is found

            try {
                const response = await fetch(`/api/course-navigation`);
                const { success, data } = await response.json();

                if (success) {
                    // Find the specific course data using the courseId
                    const course = data.find((c: any) => c.courseId === courseId);

                    if (course) {
                        setCourseData(course);
                    } else {
                        setError(`Course with ID '${courseId}' not found`);
                    }
                } else {
                    setError('Failed to fetch course navigation data');
                }
            } catch (err) {
                setError('Error fetching course data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{courseData?.title}</h1>
            <p className="text-gray-700 mb-6">{courseData?.description}</p>
            {/* Render additional course details */}
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-lg font-semibold">Course Details</h2>
                <ul>
                    <li><strong>Lesson ID:</strong> {courseData?.lessonId}</li>
                    <li><strong>Order:</strong> {courseData?.order}</li>
                </ul>
            </div>
        </div>
    );
};

export default CoursePage;
