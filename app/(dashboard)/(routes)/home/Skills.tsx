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
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(5)

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        // sm
        setVisibleCount(2)
      } else if (window.innerWidth < 768) {
        // md
        setVisibleCount(3)
      } else if (window.innerWidth < 1024) {
        // lg
        setVisibleCount(4)
      } else {
        setVisibleCount(5)
      }
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + visibleCount) % tools.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [visibleCount])

  const visibleTools = []
  for (let i = 0; i < visibleCount; i++) {
    visibleTools.push(tools[(startIndex + i) % tools.length])
  }

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center text-[#28282B] mb-3 sm:mb-4 md:mb-6 leading-tight max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4">
        Learn the Tools Trusted by Data Experts Worldwide
      </h2>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl px-4">
        From freshers to working professionals, DataCliq empowers everyone to excel in data analysis.
      </p>

      {/* Tools Carousel */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 grid gap-4 sm:gap-6 md:gap-8 ${
            visibleCount === 2
              ? "grid-cols-2"
              : visibleCount === 3
                ? "grid-cols-3"
                : visibleCount === 4
                  ? "grid-cols-4"
                  : "grid-cols-5"
          }`}
        >
          {visibleTools.map((tool, index) => (
            <div
              key={`${tool.name}-${startIndex}-${index}`}
              className="relative flex w-full flex-col items-center justify-center group"
            >
              <div
                className="absolute left-0 top-0 flex h-full w-full items-center justify-center transition-logo ease-primary duration-long animate-logo-swipe"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <img
                  src={tool.logo || "/placeholder.svg"}
                  alt={tool.name}
                  className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 w-auto object-contain transition-all duration-300 group-hover:filter group-hover:hue-rotate-90 group-hover:brightness-110"
                />
              </div>
              {/* Optional: Tool name for accessibility */}
              <span className="sr-only">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes logoSwipe {
          0% {
            transform: translateY(2rem);
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
            transform: translateY(-2rem);
            opacity: 0;
          }
        }

        @media (min-width: 640px) {
          @keyframes logoSwipe {
            0% {
              transform: translateY(2.5rem);
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
              transform: translateY(-2.5rem);
              opacity: 0;
            }
          }
        }

        @media (min-width: 1024px) {
          @keyframes logoSwipe {
            0% {
              transform: translateY(3rem);
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
              transform: translateY(-3rem);
              opacity: 0;
            }
          }
        }

        @media (min-width: 1280px) {
          @keyframes logoSwipe {
            0% {
              transform: translateY(4rem);
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
              transform: translateY(-4rem);
              opacity: 0;
            }
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
  )
}

export default SkillsSection
