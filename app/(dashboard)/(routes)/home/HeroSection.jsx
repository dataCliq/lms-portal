'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Array of words to cycle through
    const textVariants = [
        'Data Experts',
        'Analysts',
        'Data Scientists',
        'Leaders',
        'Innovators',
    ];

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
            <div className="text-center">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-bold text-[#170F00] font-poppins leading-tight"
                >
                    Shaping Tomorrow’s{' '}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentTextIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-[#FAA51D]" // Different color for the changing text
                        >
                            {textVariants[currentTextIndex]}
                        </motion.span>
                    </AnimatePresence>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto mt-6 text-center font-poppins leading-relaxed"
                >
                    Welcome to <b>DataCliq</b>, your ultimate destination for mastering the art and science of data analysis. We’re on a mission to create a skilled workforce of <strong>data professionals</strong> through practical learning, real-world examples, and accessible resources.
                </motion.p>

                {/* Call to Action Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-10"
                >
                    <button className="bg-[#FAA51D] text-white text-[16px] sm:text-[18px] lg:text-[20px] font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins">
                        Get Started
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;