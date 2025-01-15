'use client';

import HeroSection from './HeroSection';
import CardSection from './CardSection';
import CourseCard from '../../_components/CourseCard';

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

      {/* Dynamic Course Cards */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Our Courses</h2>
        <CourseCard /> {/* Fetches courses from the database */}
      </div>

      <div className="w-full py-20" />
    </div>
  );
};

export default HomePage;

