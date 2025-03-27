import React, { useState } from "react";
import Image from "next/image";

const LearningSteps = () => {
  const [hoveredPoint, setHoveredPoint] = useState(0);

  const steps = [
    {
      title: "Easy Sign Up Process",
      description: "Join our platform by creating an account and exploring our wide range of courses.",
      image: "/b1.png",
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

  const defaultImage = "/b1.png";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <style jsx>{`
        .gradient-top-border {
          border-top: 4px solid; /* Thicker top border */
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          border-image: linear-gradient(
            to right,
            transparent 0%,
            #10B981 20%,
            #3B82F6 80%,
            transparent 100%
          ) 1;
          background: transparent;
          transition: all 0.3s ease;
          border-radius: 12px; /* Rounded corners for a sleek look */
        }
        .no-gradient {
          border: 1px solid transparent;
          transition: all 0.3s ease;
          border-radius: 12px; /* Consistent rounded corners */
        }
      `}</style>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side - List of Points */}
        <div className="flex flex-col space-y-6 lg:w-1/2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 group"
              onMouseEnter={() => setHoveredPoint(index + 1)}
              onMouseLeave={() => setHoveredPoint(0)}
            >
              {/* Numbered Circle */}
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                {String(index + 1).padStart(2, "0")}
              </div>
              {/* Title and Description with gradient top border */}
              <div
                className={`flex-1 p-3 ${
                  hoveredPoint === index + 1 || (hoveredPoint === 0 && index === 0)
                    ? "gradient-top-border"
                    : "no-gradient"
                }`}
              >
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
          <div className="relative w-full max-w-md h-96">
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