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
          className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[62px] text-[#28282B] font-semibold font-poppins leading-tight"
        >
          Transform into a Data Pro <br />
          <span className="bg-gradient-to-r from-[#0F172A] via-[#00A3B5] to-[#68D391] bg-clip-text text-transparent font-bold xl:text-[72px]">
  Learn, Build, and Succeed!
</span>


        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[16px] sm:text-[18px] md:text-[18px] lg:text-[16px] text-[#170f00ec] font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[900px] w-full mx-auto mt-2 text-center font-poppins leading-relaxed"
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
          <div class="flex justify-center gap-4">
  <button
    type="submit"
    class="inline-flex items-center shadow-xl text-lg bg-[#10B981] backdrop-blur-md lg:font-semibold border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#0FA070] hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group transition-all duration-300 ease-in-out"
  >
    <span class="relative z-10">Explore Courses</span>
    <span
      class="ml-0 opacity-0 translate-x-2 group-hover:ml-2 group-hover:opacity-100 group-hover:translate-x-0 ease-in-out duration-300 text-gray-800 group-hover:text-teal-800"
    >&gt;</span>
  </button>

  <button
    type="button"
    class="inline-flex items-center shadow-xl text-lg backdrop-blur-md lg:font-semibold border-[#10B981] text-[#10B981] hover:text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#0FA070] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group transition-all duration-300 ease-in-out"
  >
    <span class="relative z-10">Download Cheatsheet</span>
    <span
      class="ml-0 opacity-0 translate-x-2 group-hover:ml-2 group-hover:opacity-100 group-hover:translate-x-0 ease-in-out duration-300 text-teal-500 group-hover:text-teal-800"
    >&gt;</span>
  </button>
</div>
          {/* Outlined Button */}
          
          {/* <div
            class="flex justify-center items-center border-2 border-radius border-white-200 overflow-hidden p-1 rounded-full shadow-lg"
          >
            <button
              class="bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group w-50 h-16 inline-flex transition-all duration-300 overflow-visible p-1 rounded-full group"
            >
              <div
                class="w-full h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-1 rounded-full hover:shadow-none duration-300"
              >
                <div
                  class="w-full h-full text-xl gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#f4f4f4,#fefefe)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] duration-200 items-center text-[18px] font-medium gap-4 inline-flex overflow-hidden px-4 py-2 rounded-full black group-hover:text-blue-600 "
                >
                  <span class="ml-2">Download Cheatsheet</span>
                </div>
              </div>
            </button>
          </div> */}

        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;