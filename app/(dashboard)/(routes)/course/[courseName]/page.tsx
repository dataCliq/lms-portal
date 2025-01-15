'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const CoursePage = () => {
    const searchParams = useSearchParams(); // Use new Next.js navigation hook
    const courseId = searchParams?.get('courseId'); // Extract courseId from query params

    const [courseData, setCourseData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch course data based on courseId
    useEffect(() => {
        const fetchCourseData = async () => {
            if (!courseId) return;

            try {
                // Step 1: Fetch courseNavigation to get the courseId
                const courseNavResponse = await fetch(`/api/course-navigation`);
                const { success, data } = await courseNavResponse.json();

                if (success) {
                    // Step 2: Find the courseNavigation object with the matching courseId
                    const courseNav = data.find((c: any) => c.courseId === courseId);

                    if (courseNav) {
                        // Step 3: Fetch the course details from the test1 collection using the courseId
                        const courseResponse = await fetch(`/api/test1/${courseId}`);
                        const courseData = await courseResponse.json();

                        if (courseData.success) {
                            setCourseData(courseData.data); // Assuming 'data' holds the course data
                        } else {
                            setError('Course details not found');
                        }
                    } else {
                        setError('Course not found in course navigation');
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
            {/* Render additional course details here */}
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-lg font-semibold">Course Details</h2>
                {/* Add course-specific fields if available */}
            </div>
        </div>
    );
};

export default CoursePage;
