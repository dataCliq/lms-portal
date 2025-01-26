'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface LessonDetails {
  lessonId: string;
  name: string;
  content: string;
  videoUrl: string | null;
  attachments: string | null;
}

export default function WeekDetailsPage() {
  const router = useRouter();
  const { weekId } = router.query; // Extract weekId from the route

  const [weekDetails, setWeekDetails] = useState<LessonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!weekId) return; // Wait for weekId to be available

    const fetchWeekDetails = async () => {
      try {
        const response = await fetch(`/api/lesson-content?weekId=${weekId}`);
        const result = await response.json();

        if (result.success) {
          setWeekDetails(result.data);
        } else {
          setError('Failed to fetch week details.');
        }
      } catch (err) {
        setError('Error fetching week details.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeekDetails();
  }, [weekId]);

  if (loading) return <p className="text-center text-lg text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  if (!weekDetails || weekDetails.length === 0) {
    return <p className="text-center text-lg text-gray-500">No lessons available for this week.</p>;
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Week {weekId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weekDetails.map((lesson) => (
          <div
            key={lesson.lessonId}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300 transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-gray-800">{lesson.name}</h3>
            <div
              className="text-gray-600 my-4"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
            {lesson.videoUrl && (
              <div className="my-4">
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Watch Video
                </a>
              </div>
            )}
            {lesson.attachments && (
              <div className="my-4">
                <a
                  href={lesson.attachments}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download Attachments
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
