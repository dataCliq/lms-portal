'use client';

import HeroSection from './HeroSection';
import CardSection from './CardSection';
import CourseCard from '../course/page'; // Assuming this is the course cards page

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center">
      {/* Hero Section */}
      <div className="w-full">
        <HeroSection />
      </div>

      {/* Add Controlled Gap */}
      <div className="w-full py-10" /> 

      {/* Card Section */}
      <div className="w-full ">
        <CardSection />
      </div>

      {/* Add Another Controlled Gap */}
      <div className="w-full py-8" />

      {/* Course Cards Section */}
      <div className="w-full px-4">
        <CourseCard /> 
      </div>

      <div className="w-full py-20" />
    </div>
  );
};

export default HomePage;
