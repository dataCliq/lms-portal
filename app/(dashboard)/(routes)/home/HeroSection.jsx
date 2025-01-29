'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const jobTrends = {
    SQL: [30, 45, 60, 80, 95],
    PowerBI: [20, 35, 55, 70, 85],
    Python: [25, 40, 65, 85, 100],
    Tableau: [15, 30, 50, 65, 80]
};

const HeroSection = () => {
    const [selectedSkill, setSelectedSkill] = useState('SQL');

    const data = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: `Job Demand for ${selectedSkill}`,
                data: jobTrends[selectedSkill],
                backgroundColor: '#FAA51D',
                borderRadius: 10,
            },
        ],
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-10 xl:px-20 bg-cover bg-center text-white overflow-auto">
            {/* Title */}
            <h1 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] xl:text-[48px] 2xl:text-[54px] font-bold text-[#170F00] font-poppins text-center leading-tight max-w-[90%]">
                Shaping Tomorrow’s Data Experts
            </h1>

            {/* Subtitle */}
            <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] text-[#170F00] font-regular max-w-[90%] sm:max-w-[700px] lg:max-w-[850px] xl:max-w-[1000px] w-full mx-auto mt-4 text-center font-poppins leading-relaxed">
                Welcome to <b>DataCliq</b>, your ultimate destination for mastering the art and science of data analysis. We’re on a mission to create a skilled workforce of <strong>data professionals</strong> through practical learning, real-world examples, and accessible resources.
            </p>

            {/* Skill Selection */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                {['SQL', 'PowerBI', 'Python', 'Tableau'].map((skill) => (
                    <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedSkill === skill ? 'bg-[#FAA51D] text-white' : 'bg-gray-200 text-[#170F00]'}`}
                    >
                        {skill}
                    </button>
                ))}
            </div>

            {/* Animated Bar Chart */}
            <motion.div
                key={selectedSkill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[600px] mt-10"
            >
                <Bar data={data} />
            </motion.div>

            {/* Button */}
            <div className="mt-12 sm:mt-16 lg:mt-24 mb-6">
                <button className="bg-[#FAA51D] text-white text-[14px] sm:text-[16px] lg:text-[17px] font-bold px-6 sm:px-10 lg:px-12 py-2 sm:py-3 lg:py-4 rounded-lg hover:bg-[#FF9D00] transition-all duration-300 font-poppins">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
