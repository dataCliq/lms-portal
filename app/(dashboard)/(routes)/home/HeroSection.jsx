"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [characterPosition, setCharacterPosition] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  // Array of words to cycle through
  const textVariants = ["Data Experts", "Analysts", "Data Scientists", "Leaders", "Innovators"];

  // Questions for the mini-game
  const questions = [
    {
      type: "Excel",
      question: "What is the formula to sum values in cells A1 to A10?",
      answer: "=SUM(A1:A10)",
    },
    {
      type: "SQL",
      question: "Write a SQL query to select all columns from a table named 'employees'.",
      answer: "SELECT * FROM employees;",
    },
    {
      type: "Excel",
      question: "What is the formula to find the average of values in cells B1 to B10?",
      answer: "=AVERAGE(B1:B10)",
    },
    {
      type: "SQL",
      question: "Write a SQL query to find the total number of rows in the 'employees' table.",
      answer: "SELECT COUNT(*) FROM employees;",
    },
  ];

  // Automatically cycle through the textVariants array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textVariants.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Handle user input
  const handleAnswerSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setIsJumping(true); // Trigger jump animation
      setTimeout(() => {
        setIsJumping(false); // Reset jump animation
        setCharacterPosition((prevPosition) => prevPosition + 1); // Move character to the next bar
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
        setUserAnswer(""); // Clear input field
      }, 1000); // Delay before moving to the next question
    } else {
      alert("Incorrect answer, try again!");
    }
  };

  // Bar chart data (heights of the bars in pixels)
  const barHeights = [50, 100, 150, 200]; // Heights in pixels

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-10 xl:px-20 bg-cover bg-center text-white overflow-auto">
      {/* Main Content */}
      <div className="text-center relative z-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-bold text-[#170F00] font-poppins leading-tight"
        >
          Shaping Tomorrow's
          <br />
          <span className="inline-block h-[1.2em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-[#FAA51D] inline-block"
              >
                {textVariants[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto mt-6 text-center font-poppins leading-relaxed"
        >
          Welcome to <b>DataCliq</b>, your ultimate destination for mastering the art and science of data analysis.
          We're on a mission to create a skilled workforce of <strong>data professionals</strong> through practical
          learning, real-world examples, and accessible resources.
        </motion.p>

        {/* Mini-Game Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#170F00]">Mini Game: Excel & SQL Challenge</h2>
          {currentQuestionIndex < questions.length ? (
            <div className="mt-6">
              <p className="text-lg text-[#170F00]">{questions[currentQuestionIndex].question}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="mt-4 p-2 border border-gray-300 rounded text-black"
                placeholder="Your answer..."
              />
              <button
                onClick={handleAnswerSubmit}
                className="mt-4 px-4 py-2 bg-[#FAA51D] text-white rounded hover:bg-[#e5941a]"
              >
                Submit
              </button>
            </div>
          ) : (
            <p className="text-lg text-[#170F00] mt-6">Congratulations! You've completed the challenge!</p>
          )}

          {/* Bar Chart and Character */}
          <div className="mt-8 w-full h-64 relative flex items-end justify-center space-x-4 border-b-2 border-[#170F00]">
            {/* Bars */}
            {barHeights.map((height, index) => (
              <div
                key={index}
                className="w-12 bg-[#FAA51D] relative"
                style={{ height: `${height}px` }} // Set height in pixels
              >
                {/* Character */}
                {index === characterPosition && (
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: isJumping ? -50 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                    style={{ bottom: `${height}px` }} // Position character on top of the bar
                  >
                    <img
                      src="/mario.svg" // Path to your SVG file in the public folder
                      alt="Mario Character"
                      width="64"
                      height="64"
                      className="w-16 h-16"
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;