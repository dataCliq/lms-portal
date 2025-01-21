'use client';

import React from 'react';

const WeeksPage: React.FC = () => {
    const weeks = [
        {
            title: 'Week 1',
            topics: ['Introduction to the Course', 'Getting Started', 'Overview of Tools', 'Practice Assignments'],
            link: '/dashboard/routes/course/weeks/week1',
        },
        {
            title: 'Week 2',
            topics: ['Intermediate Concepts', 'Hands-on Practice', 'Group Discussion', 'Weekly Quiz'],
            link: '/dashboard/routes/course/weeks/week2',
        },
        {
            title: 'Week 3',
            topics: ['Advanced Techniques', 'Case Study Analysis', 'Live Project Work', 'Feedback Session'],
            link: '/dashboard/routes/course/weeks/week3',
        },
        {
            title: 'Week 4',
            topics: ['Capstone Project', 'Final Assessment', 'Certification Process', 'Q&A Session'],
            link: '/dashboard/routes/course/weeks/week4',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Weekly Breakdown</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weeks.map((week, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">{week.title}</h2>
                                <ul className="list-disc pl-5 text-gray-700">
                                    {week.topics.map((topic, idx) => (
                                        <li key={idx} className="mb-2">{topic}</li>
                                    ))}
                                </ul>
                            </div>
                            <a href={week.link} className="mt-4">
                                <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 w-full">
                                    Start
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeksPage;
