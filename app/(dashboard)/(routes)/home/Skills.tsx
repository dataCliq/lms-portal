// components/ToolsSection.tsx
import { useState, useEffect } from 'react';

const tools = [
  { name: "Excel", logo: "/logo-skills/excel.svg" },
  { name: "Power BI", logo: "/logo-skills/power-bi.svg" },
  { name: "U-Turn", logo: "/logo-skills/sql.svg" },
  { name: "Inspire", logo: "/logo-skills/tableau.svg" },
  { name: "EBooks", logo: "/logo-skills/python.svg" },
  { name: "Sitemark", logo: "/logo-skills/postgre.svg" },
  { name: "Vertigo", logo: "/logo-skills/ganalytics.svg" },
  { name: "Penta", logo: "/logo-skills/looker.svg" },
  { name: "Ch", logo: "/logo-skills/qlik.svg" },
  { name: "Snowflake", logo: "/logo-skills/rstudio.svg" },
  { name: "Zendesk", logo: "/logo-skills/sas.svg" },
];

const SkillsSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 5) % tools.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleTools = [];
  for (let i = 0; i < 5; i++) {
    visibleTools.push(tools[(startIndex + i) % tools.length]);
  }

  return (
    <div className="w-full py-12 bg-white flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-[40px] md:text-[45px] font-semibold w-[600px] text-center text-[#28282B] mb-4 leading-[3.5rem]">
        Learn the Tools Trusted by Data Experts Worldwide
      </h2>

      {/* Subheading */}
      <p className="text-lg text-center text-gray-600 mb-10 w-[600px]">
        From freshers to working professionals, DataCliq empowers everyone to excel in data analysis.
      </p>

      {/* Tools Carousel */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-32 grid grid-cols-5 gap-6 md:gap-8"> {/* Increased height from h-20 to h-32 */}
          {visibleTools.map((tool, index) => (
            <div 
              key={index} 
              className="relative flex w-full flex-col items-center justify-center"
            >
              <div 
                className="absolute left-0 top-0 flex h-full w-full items-center justify-center transition-logo ease-primary duration-long animate-logo-swipe"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-10 w-auto object-contain transition-all duration-300 group-hover:filter group-hover:hue-rotate-90 group-hover:brightness-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes logoSwipe {
          0% {
            transform: translateY(4rem); /* Increased from 2.5rem */
            opacity: 0;
          }
          33% {
            transform: translateY(0);
            opacity: 1;
          }
          66% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-4rem); /* Increased from -2.5rem */
            opacity: 0;
          }
        }

        .animate-logo-swipe {
          animation: logoSwipe 3s infinite;
        }

        .transition-logo {
          transition: all 0.6s ease;
        }
      `}</style>
    </div>
  );
};

export default SkillsSection;