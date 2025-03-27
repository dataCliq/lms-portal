// components/ToolsSection.tsx
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

      {/* Tools Grid */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 md:gap-8 place-items-center justify-center">
        {tools.map((tool, index) => (
          <div key={index} className="flex justify-center p-4 group">
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-12 w-auto object-contain block mx-auto transition-all duration-300 group-hover:filter group-hover:hue-rotate-90 group-hover:brightness-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;