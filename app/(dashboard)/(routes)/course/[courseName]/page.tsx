'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/themes/prism.css'; // Import Prism.js default CSS theme
import 'prismjs/components/prism-javascript'; // Import specific language syntax
import 'prismjs/components/prism-css'; // Import more languages if needed
import 'prismjs/components/prism-markup';

const CoursePage = () => {
    const pathname = usePathname();
    const courseId = pathname ? pathname.split('/').pop() : null;

    const [courseData, setCourseData] = useState<any | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
    const [lessonContent, setLessonContent] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    type ContentBlock = {
        type: 'text' | 'code';
        value: string;
        language?: string;
    };

    // Highlight code after rendering
    useEffect(() => {
        Prism.highlightAll(); // Highlights all code blocks
    }, [lessonContent]);

    useEffect(() => {
        const fetchCourseNavigation = async () => {
            if (!courseId) return;

            try {
                const response = await fetch(`/api/course-navigation`);
                const { success, data } = await response.json();

                if (success) {
                    const course = data.find((c: any) => c.courseId === courseId);
                    if (course) {
                        setCourseData(course);
                        setSelectedLesson(course.lessonId[0]);
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

        fetchCourseNavigation();
    }, [courseId]);

    useEffect(() => {
        const fetchLessonContent = async () => {
            if (!selectedLesson || !courseId) return;

            try {
                const response = await fetch(`/api/course-content`);
                const { success, data } = await response.json();

                if (success) {
                    const content = data.find(
                        (item: any) =>
                            item.courseId === courseId && item.lessonId === selectedLesson
                    );
                    setLessonContent(content || null);
                } else {
                    setError('Failed to fetch lesson content');
                }
            } catch (err) {
                setError('Error fetching lesson content');
                console.error(err);
            }
        };

        fetchLessonContent();
    }, [selectedLesson, courseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <div className="w-1/6 bg-gray-800 text-white fixed h-full top-0 left-0 p-6 pt-24">
                <h2 className="text-xl font-bold mb-4">Lessons</h2>
                <ul className="space-y-2">
                    {courseData.lessonId.map((lesson: string) => (
                        <li key={lesson}>
                            <button
                                className={`w-full text-left px-4 py-2 rounded ${selectedLesson === lesson
                                    ? 'bg-white text-black'
                                    : 'hover:bg-gray-700'
                                    }`}
                                onClick={() => setSelectedLesson(lesson)}
                            >
                                {lesson}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center p-6">
                <div className="max-w-[800px] w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        {lessonContent?.title || 'Select a Lesson'}
                    </h1>
                    {lessonContent ? (
                        <div>
                            <p className="mb-2">
                                <strong>Time Estimate:</strong> {lessonContent.timeEstimate}
                            </p>
                            <div
                                className="lesson-content"
                                dangerouslySetInnerHTML={{ __html: lessonContent.content }}
                            ></div>
                        </div>
                    ) : (
                        <p>No content available for this lesson.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CoursePage;
