"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

interface Lesson {
  title: string;
  id: string;
  slug: string;
}

interface Week {
  _id: string;
  weekId: number;
  courseId: string;
  lessonCount: number;
  slug: string;
  lessonList: Lesson[];
  createdAt: string;
  updatedAt: string;
}

interface Question {
  id: string;
  text: string;
  answer?: string;
}

interface LessonContent {
  _id: string;
  weekId: number;
  courseId: string;
  lessonId: string;
  slug: string;
  name: string;
  content: string;
  videoUrl: string | null;
  attachments: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DropdownState {
  keyword: string;
  definition: string;
  nodeIndex: number;
}

const WeekDetail = () => {
  const [week, setWeek] = useState<Week | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdown, setDropdown] = useState<DropdownState | null>(null);
  const [activeTab, setActiveTab] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const weekId = params?.weekId as string;
  const contentRef = useRef<HTMLDivElement>(null);

  const questions = {
    beginner: [
      { id: "b1", text: "What is the difference between qualitative and quantitative data?" },
      { id: "b2", text: "Explain what data cleaning means." },
      { id: "b3", text: "Name 3 common data analysis tools." },
    ],
    intermediate: [
      { id: "i1", text: "How would you handle missing data in a dataset?" },
      { id: "i2", text: "What is a pivot table and its use?" },
    ],
    advanced: [
      { id: "a1", text: "Describe a complex data analysis project you’ve worked on." },
    ],
  };

  const getSearchParams = useCallback(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        slug: searchParams.get("slug") || "",
        courseId: searchParams.get("courseId") || "",
      };
    }
    return { slug: "", courseId: "" };
  }, []);

  const fetchWeekData = useCallback(async () => {
    const { slug, courseId } = getSearchParams();
    if (!slug || !courseId || !weekId) {
      setError("Missing slug, courseId, or weekId");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/course-week?courseId=${courseId}&slug=${slug.split("/")[0]}&weekId=${weekId}`
      );
      const result = await response.json();
      if (result.success && result.data) {
        setWeek(result.data);
        const lessonSlug = slug.split("/")[1] || "";
        if (lessonSlug) {
          const lesson = result.data.lessonList.find((l: Lesson) => l.slug === lessonSlug);
          if (lesson) await fetchLessonContent(lesson.id);
        }
      } else {
        setError("Failed to fetch week data");
      }
    } catch (err) {
      setError("Error fetching week data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [weekId, getSearchParams]);

  const fetchLessonContent = useCallback(
    async (lessonId: string) => {
      const { courseId } = getSearchParams();
      if (!courseId || !weekId || !lessonId) {
        setError("Missing courseId, weekId, or lessonId");
        return;
      }
  
      try {
        const response = await fetch(
          `/api/lesson-content?courseId=${courseId}&weekId=${weekId}&lessonId=${lessonId}`
        );
        const result = await response.json();
        if (result.success && result.data) {
          setCurrentLesson(result.data);
          const newSlug = `${week?.slug}/${result.data.slug}`;
          if (!week?.slug || !result.data.slug) {
            setError("Invalid slug data for navigation");
            return;
          }
          router.push(`/course/weeks/${weekId}?courseId=${courseId}&slug=${newSlug}`);
          sessionStorage.setItem("currentLesson", JSON.stringify(result.data));
        } else {
          setError("Failed to fetch lesson content");
        }
      } catch (err) {
        setError("Error fetching lesson content: " + err.message);
        console.error("Fetch error:", err);
      }
    },
    [weekId, week, router, getSearchParams]
  );

  const fetchDefinition = async (keyword: string) => {
    try {
      const response = await axios.get(`/api/definitions?keyword=${encodeURIComponent(keyword)}`);
      return response.data.definition || "No definition available";
    } catch (err) {
      console.error("Error fetching definition:", err);
      return "Error fetching definition";
    }
  };

  // New function to handle "Next" button navigation
  const goToNextLesson = useCallback(() => {
    if (!week?.lessonList || !currentLesson) return;

    const currentLessonIndex = week.lessonList.findIndex(
      (lesson) => lesson.id === currentLesson.lessonId
    );

    if (currentLessonIndex === -1) {
      setError("Current lesson not found in lesson list");
      return;
    }

    const nextLessonIndex = currentLessonIndex + 1;
    if (nextLessonIndex < week.lessonList.length) {
      const nextLesson = week.lessonList[nextLessonIndex];
      fetchLessonContent(nextLesson.id);
    } else {
      console.log("No more lessons in this week");
      // Optionally, you could redirect to the next week or show a message
    }
  }, [week, currentLesson, fetchLessonContent]);

  useEffect(() => {
    const initializePageState = async () => {
      const savedLesson = sessionStorage.getItem("currentLesson");
      if (savedLesson) setCurrentLesson(JSON.parse(savedLesson));
      await fetchWeekData();
    };
    initializePageState();
  }, [fetchWeekData]);

  useEffect(() => {
    if (!contentRef.current || !currentLesson) return;

    const keywords = contentRef.current.querySelectorAll(".keyword");
    if (keywords.length === 0) return;

    const handleClick = async (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const keywordElement = e.target as HTMLElement;
      const keywordText = keywordElement.textContent?.trim() || "";
      const definition = await fetchDefinition(keywordText);

      const keywordNodes = Array.from(keywords);
      const nodeIndex = keywordNodes.indexOf(keywordElement);

      const existingDropdown = contentRef.current?.querySelector(".inline-dropdown");
      if (existingDropdown) existingDropdown.remove();

      setDropdown({ keyword: keywordText, definition, nodeIndex });
    };

    keywords.forEach((keyword) => keyword.addEventListener("click", handleClick));
    return () => keywords.forEach((keyword) => keyword.removeEventListener("click", handleClick));
  }, [currentLesson, fetchDefinition]);

  useEffect(() => {
    if (!contentRef.current || !dropdown) return;

    const keywords = contentRef.current.querySelectorAll(".keyword");
    const keywordElement = keywords[dropdown.nodeIndex];

    if (!keywordElement) return;

    const dropdownElement = document.createElement("div");
    dropdownElement.className = "inline-dropdown";
    dropdownElement.innerHTML = `
      <div class="flex justify-between items-center">
        <p class="text-sm text-[#666]">${dropdown.definition}</p>
        <button class="text-[#666] hover:text-[#804000] text-lg leading-none" aria-label="Close">×</button>
      </div>
    `;

    const closeButton = dropdownElement.querySelector("button");
    if (closeButton) closeButton.addEventListener("click", () => setDropdown(null));

    keywordElement.insertAdjacentElement("afterend", dropdownElement);

    return () => dropdownElement.remove();
  }, [dropdown]);

  const handleTabClick = (tab: "beginner" | "intermediate" | "advanced") => {
    setActiveTab(tab);
    setOpenAccordion(null);
  };

  const toggleAccordion = (questionId: string) => {
    setOpenAccordion(openAccordion === questionId ? null : questionId);
  };

  // Check if there's a next lesson
  const hasNextLesson = () => {
    if (!week?.lessonList || !currentLesson) return false;
    const currentIndex = week.lessonList.findIndex(
      (lesson) => lesson.id === currentLesson.lessonId
    );
    return currentIndex !== -1 && currentIndex < week.lessonList.length - 1;
  };

  if (loading) return <p className="text-center text-lg text-[#804000]">Loading...</p>;
  if (error) return <p className="text-center text-lg text-[#804000]">Error: {error}</p>;
  if (!week) return <p className="text-center text-lg text-[#804000]">No data found for this week</p>;

  return (
    <div className="min-h-screen flex bg-white">
      <nav className="w-64 bg-white border-r border-[#359D9E]/10 h-screen fixed top-16 left-0 overflow-y-auto z-10">
  <div className="p-5 border-b border-[#359D9E]/20">
    <h2 className="text-lg font-medium text-[#215273]">
      Week {week.weekId} Lessons
    </h2>
  </div>
  <ul className="p-4 space-y-3">
    {week.lessonList && week.lessonList.length > 0 ? (
      week.lessonList.map((lesson) => (
        <li key={lesson.id}>
          <button
            onClick={() => fetchLessonContent(lesson.id)}
            className="w-full text-left px-3 py-2 text-sm text-[#215273] hover:text-[#00A3B5] hover:bg-[#359D9E]/10 rounded-md transition duration-200 ease-in-out"
          >
            {lesson.title}
          </button>
        </li>
      ))
    ) : (
      <li className="text-[#215273]/70 px-3 py-2 text-sm">
        No lessons available
      </li>
    )}
  </ul>
</nav>

      <main className="flex-1 ml-64 pt-16 p-8 overflow-y-auto">
        <div className="lesson-content" ref={contentRef}>
          {currentLesson ? (
            <div className="lesson-container">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />

              {/* Enhanced Practice Interview Questions Section */}
              <div className="accordion-section mt-8 bg-[#fafafa] p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#170F00]">
                    Practice Interview Questions
                  </h3>
                  <span className="text-sm text-[#804000]">
                    {questions[activeTab].length} Questions
                  </span>
                </div>

                <div className="flex space-x-2 mb-6">
                  {(["beginner", "intermediate", "advanced"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#804000] focus:ring-opacity-50 ${
                        activeTab === tab
                          ? "bg-[#804000] text-white shadow-md scale-105"
                          : "bg-[#f5f5f5] text-[#666] hover:bg-[#e0e0e0] hover:text-[#804000] hover:shadow-sm"
                      }`}
                      aria-label={`Show ${tab} questions`}
                      aria-pressed={activeTab === tab}
                    >
                      <span className="capitalize">{tab}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {questions[activeTab].length > 0 ? (
                    questions[activeTab].map((question) => (
                      <div
                        key={question.id}
                        className="bg-white rounded-lg shadow-sm border border-[#f5f5f5] overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleAccordion(question.id)}
                          className="w-full text-left px-5 py-4 text-[#666] hover:text-[#804000] hover:bg-[#f9f9f9] flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#804000] focus:ring-opacity-50"
                          aria-expanded={openAccordion === question.id}
                          aria-controls={`accordion-content-${question.id}`}
                        >
                          <span className="text-base font-medium">{question.text}</span>
                          <span
                            className={`text-lg transition-transform duration-300 ${
                              openAccordion === question.id ? "rotate-90" : ""
                            }`}
                          >
                            >
                          </span>
                        </button>
                        {openAccordion === question.id && (
                          <div
                            id={`accordion-content-${question.id}`}
                            className="px-5 py-4 bg-[#f5f5f5] text-[#666] text-sm animate-fade-in"
                          >
                            <p>{question.answer || "Answer coming soon..."}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-[#666] text-center py-4">
                      No questions available for this level.
                    </p>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={goToNextLesson}
                  disabled={!hasNextLesson()}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
                    hasNextLesson()
                      ? "bg-[#804000] text-white hover:bg-[#663300] focus:ring-2 focus:ring-[#804000] focus:ring-opacity-50"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Lesson
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl text-[#666] text-center">
              Select a lesson from the sidebar to view its content.
            </p>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default WeekDetail;