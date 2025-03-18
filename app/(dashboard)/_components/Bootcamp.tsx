// _components/BootcampSection.tsx
import React from "react";
import Image from "next/image";

// Sample bootcamp data
const bootcamps = [
  {
    title: "Beginner Dashboard Mastery",
    level: "Hands-On Learning",
    imageSrc: "/b1.png",
    description: "Start your Power BI journey with practical projects. Build dashboards from scratch and gain confidence in just a few weeks.",
  },
  {
    title: "Intermediate Dashboard Design",
    level: "Real-World Projects",
    imageSrc: "/b2.png",
    description: "Take your skills to the next level. Work on real-time projects and learn to create visually stunning and functional dashboards.",
  },
  {
    title: "Advanced Dashboard Optimization",
    level: "Expert Guidance",
    imageSrc: "/b3.jpg",
    description: "Master advanced techniques to optimize dashboards. Get insider tricks from industry experts and elevate your career.",
  },
];

const Bootcamp = () => {
  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative">
      {/* Main Container with Background */}
      <div
        className="rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between relative overflow-visible"
        style={{
          background: "url(/bootcamp.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "24px",
        }}
      >
        {/* Left Side - Title and Features */}
        <div className="flex flex-col items-start space-y-6 text-white lg:w-1/3">
          <h2 className="text-4xl font-bold">
            Power BI <br />
            <span className="border-b-4 border-blue-400">Bootcamp</span>
          </h2>
          {/* Handwritten "Free" mark */}
          <div className="relative">
            <span className="text-2xl text-yellow-300 font-handwritten" style={{ transform: "rotate(-5deg)" }}>
              Free
            </span>
            <div 
              className="absolute inset-0 border-2 border-yellow-300 rounded-full" 
              style={{ 
                transform: "rotate(-5deg)",
                width: "80px",
                height: "40px",
                left: "-10px",
                top: "-10px"
              }}
            />
          </div>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <span className="text-blue-300">✔</span>
              <span>Free Power BI Bootcamp</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-blue-300">✔</span>
              <span>Open for All</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-blue-300">✔</span>
              <span>Learn from Real-Time Projects</span>
            </li>
          </ul>
          {/* Enroll Now Button */}
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            Enroll Now
          </button>
        </div>

        {/* Right Side - Empty, since cards are moved out */}
        <div className="relative lg:w-2/3 flex justify-center items-center mt-24 lg:mt-0"></div>
      </div>

      {/* Bootcamp Cards - Positioned to overlap the div above */}
      <div
        className="absolute z-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w-full px-4"
        style={{
          bottom: "-130px",
          left: "68%",
          transform: "translateX(-50%) translateY(-40px)",
        }}
      >
        {bootcamps.map((bootcamp, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl flex flex-col items-center space-y-3 w-full sm:w-[18rem] overflow-hidden"
            style={{
              transform:
                index === 0
                  ? "translateY(30px)"
                  : index === 1
                  ? "translateY(-30px)"
                  : "translateY(30px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {/* Image at the Top - Full Width, No Padding */}
            <div className="w-full h-36 relative">
              <Image
                src={bootcamp.imageSrc}
                alt={bootcamp.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl rounded-b-2xl"
              />
            </div>
            {/* Card Content with Padding */}
            <div className="p-6 flex flex-col items-start space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">{bootcamp.title}</h3>
              {/* Chip for Level - Left Aligned */}
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                {bootcamp.level}
              </span>
              <p className="text-sm text-gray-600">{bootcamp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bootcamp;