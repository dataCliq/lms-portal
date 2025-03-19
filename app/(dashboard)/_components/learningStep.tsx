import React, { useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js for the Image component

const LearningSteps = () => {
  // State to track the currently hovered point (default to 0 for no hover)
  const [hoveredPoint, setHoveredPoint] = useState(0);

  // Array of points with titles, descriptions, and corresponding image URLs
  const steps = [
    {
      title: "Easy Sign Up Process",
      description: "Join our platform by creating an account and exploring our wide range of courses.",
      image: "/b1.png", // Replace with your actual image URL
    },
    {
      title: "Course Selection",
      description: "Browse through our course catalog and choose the subjects that interest you the most.",
      image: "/b2.png",
    },
    {
      title: "Start Learning",
      description: "Begin your educational journey and gain new knowledge and skills at your own pace.",
      image: "/b3.jpg",
    },
    {
      title: "Track Progress",
      description: "Monitor your learning progress with our intuitive dashboard and stay motivated.",
      image: "/b1.png",
    },
    {
      title: "Earn Certificates",
      description: "Complete courses and earn certificates to showcase your achievements.",
      image: "/b2.png",
    },
  ];

  // Default image when no point is hovered
  const defaultImage = "/images/default-step.jpg"; // Replace with your default image URL

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Flex container for two columns */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side - List of Points */}
        <div className="flex flex-col space-y-6 lg:w-1/2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 group"
              onMouseEnter={() => setHoveredPoint(index + 1)} // Set hovered point (1-based index)
              onMouseLeave={() => setHoveredPoint(0)} // Reset to default on mouse leave
            >
              {/* Numbered Circle */}
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                {String(index + 1).padStart(2, "0")} {/* Format as "01", "02", etc. */}
              </div>
              {/* Title and Description */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-80">
            <Image
              src={hoveredPoint === 0 ? defaultImage : steps[hoveredPoint - 1].image}
              alt="Learning step illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSteps;