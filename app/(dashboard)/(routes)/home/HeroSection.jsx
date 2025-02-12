"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Array of words to cycle through
  const textVariants = ["Data Experts", "Analysts", "Data Scientists", "Leaders", "Innovators"];

  // Automatically cycle through the textVariants array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textVariants.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-10 xl:px-20 bg-cover bg-center text-white overflow-auto">
      {/* Main Content */}
      <div className="text-center relative z-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[62px] text-[#170F00] font-semibold font-poppins leading-tight"
        >
          Transform into a Data Pro <br />
          <span className="bg-gradient-to-r from-[#C48200] via-[#A65D00] to-[#804000] bg-clip-text text-transparent font-bold xl:text-[72px]">
            Learn, Build, and Succeed!
          </span>




        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[16px] sm:text-[18px] md:text-[18px] lg:text-[16px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[900px] w-full mx-auto mt-2 text-center font-poppins leading-relaxed"
        >
          Kickstart your data career with <b>DataCliq</b> – the ultimate platform for aspiring data analysts!
          Gain expertise in tools like Excel, SQL, and Tableau, and build real-world projects to stand out.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          {/* Filled Button */}
          <button className="bg-[#F4A500] text-white font-poppins font-semibold py-3 px-8 rounded-full ">
            Explore Courses
          </button>

          {/* Outlined Button */}
          <button className="border-2 border-[#FFC300] text-[#FFC300] font-poppins font-semibold py-3 px-8 rounded-full hover:bg-[#ffffff] hover:text-[#FFC300] transition-colors duration-300">
            Download Cheatsheet
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;