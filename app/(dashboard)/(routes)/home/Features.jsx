"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, ChartLegend)

const Features = () => {
  const [activeTab, setActiveTab] = useState("skills")

  // Data for the line chart (data analysis focus)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Models Trained",
        data: [50, 80, 60, 90, 120, 100],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Queries Run",
        data: [200, 300, 250, 400, 350, 450],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        beginAtZero: true,
      },
    },
  }

  // Data for the Inspire dashboard
  const salaryComparisonData = [
    { country: "India", salary: 5000, color: "#3B82F6" },
    { country: "US", salary: 65000, color: "#10B981" },
  ]

  const careerTransitionData = [
    { name: "Software Dev", value: 32, color: "#3B82F6" },
    { name: "Business", value: 28, color: "#10B981" },
    { name: "Academia", value: 15, color: "#F59E0B" },
    { name: "Fresh Grads", value: 18, color: "#6366F1" },
    { name: "Other", value: 7, color: "#EC4899" },
  ]

  // Data for the Proline dashboard
  // Single bootcamp success metrics - without placement rate
  const bootcampMetrics = [
    { name: "Skill Mastery", value: 92, fill: "#10B981" },
    { name: "Satisfaction", value: 95, fill: "#F59E0B" },
    { name: "Project Completion", value: 88, fill: "#3B82F6" },
    { name: "Interactivity", value: 94, fill: "#6366F1" },
  ]

  const toolsData = [
    { name: "Python", usage: 78, color: "#3B82F6" },
    { name: "SQL", usage: 72, color: "#10B981" },
    { name: "Excel", usage: 68, color: "#F59E0B" },
    { name: "Tableau", usage: 56, color: "#6366F1" },
    { name: "Power BI", usage: 52, color: "#EC4899" },
  ]

  return (
    <div className="w-full py-8 sm:py-12 md:py-16">
      <div className="w-full">
        {/* Inspire Section */}
        <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[650px]">
          {/* Blob Background */}
          <img
            src="/blob1.svg"
            alt=""
            className="absolute -top-1/4 sm:-top-1/2 -left-1/4 transform w-[60%] sm:w-[80%] h-auto max-w-none opacity-50 sm:opacity-100"
          />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                {/* Left: Text and Button */}
                <div className="w-full lg:w-[600px] text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">✕</span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 ml-2">Inspire</h3>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Inspire Your Data Analysis Journey and Unlock a World of Career Opportunities with DataCliq
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-6">
                    From beginner to job-ready—unlock the skills that top companies are looking for.
                  </p>
                  <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Start Your Journey
                  </button>
                </div>

                {/* Right: Inspire Dashboard */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="bg-[#38343F] transform rounded-xl p-3 sm:p-6 relative overflow-hidden left-0 sm:left-0 lg:left-[4.7rem]">
                    <div className="dashboard-container w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-xl bg-white flex flex-col overflow-hidden">
                      {/* Dashboard Header */}
                      <div className="bg-blue-600 text-white p-3 sm:p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs sm:text-sm font-bold">DC</span>
                          </div>
                          <h3 className="text-sm sm:text-base font-semibold">Data Analyst Career Insights</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">LIVE DATA</span>
                        </div>
                      </div>

                      {/* Dashboard Content */}
                      <div className="flex-1 p-2 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 overflow-auto">
                        {/* Salary Comparison Card */}
                        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                          <div className="p-3 sm:p-4 pb-2">
                            <h4 className="text-sm sm:text-base font-semibold">Entry-Level Salary Comparison</h4>
                            <p className="text-xs text-gray-500">Annual salary in USD</p>
                          </div>
                          <div className="p-3 sm:p-4 pt-0">
                            <div className="h-[120px] sm:h-[160px] md:h-[220px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salaryComparisonData} layout="vertical">
                                  <XAxis type="number" hide />
                                  <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} />
                                  <Tooltip
                                    formatter={(value) => [`$${value.toLocaleString()}`, "Salary"]}
                                    contentStyle={{
                                      backgroundColor: "#fff",
                                      border: "1px solid #e2e8f0",
                                      borderRadius: "0.375rem",
                                      fontSize: "12px",
                                    }}
                                  />
                                  <Bar dataKey="salary" radius={[0, 4, 4, 0]}>
                                    {salaryComparisonData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="mt-2 space-y-1 sm:space-y-2">
                              <div className="flex justify-between items-center text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
                                  <span>India</span>
                                </div>
                                <span className="font-semibold">$5,000</span>
                              </div>
                              <div className="flex justify-between items-center text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500"></div>
                                  <span>US</span>
                                </div>
                                <span className="font-semibold">$65,000</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Career Transition Card - Hidden on mobile to save space */}
                        <div className="hidden md:block bg-white border rounded-lg shadow-sm overflow-hidden">
                          <div className="p-4 pb-2">
                            <h4 className="text-base font-semibold">Career Transitions to Data Analysis</h4>
                            <p className="text-xs text-gray-500">Previous professional backgrounds</p>
                          </div>
                          <div className="p-4 pt-0">
                            <div className="h-[120px] sm:h-[180px] flex items-center justify-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={careerTransitionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={60}
                                    paddingAngle={2}
                                    dataKey="value"
                                  >
                                    {careerTransitionData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip
                                    formatter={(value) => [`${value}%`, "Percentage"]}
                                    contentStyle={{
                                      backgroundColor: "#fff",
                                      border: "1px solid #e2e8f0",
                                      borderRadius: "0.375rem",
                                      fontSize: "12px",
                                    }}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-1">
                              {careerTransitionData.map((item, index) => (
                                <div key={index} className="flex items-center gap-1 text-xs">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {item.name}: {item.value}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Footer */}
                      <div className="p-2 sm:p-3 border-t flex justify-between items-center bg-gray-50">
                        <div className="text-xs text-gray-500">Updated: April 2025</div>
                        <button className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700">
                          <span>View Full Report</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proline Section */}
        <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[630px] mt-12 sm:mt-16 md:mt-20">
          <img src="/blob2.svg" alt="" className="absolute bottom-0 right-0 h-auto opacity-50 sm:opacity-100" />
          <div className="relative z-10 w-full h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                {/* Left: Proline Dashboard */}
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <div className="bg-gradient-to-r from-[#0F172A] via-[#00A3B5] to-[#68D391] transform rounded-xl p-3 sm:p-6 relative overflow-hidden right-0 sm:right-0 lg:right-[4.7rem]">
                    <div className="dashboard-container w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-xl bg-white flex flex-col overflow-hidden">
                      {/* Dashboard Header */}
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs sm:text-sm font-bold">DC</span>
                          </div>
                          <h3 className="text-sm sm:text-base font-semibold">Data Skills & Learning Metrics</h3>
                        </div>
                        <div className="hidden sm:flex bg-white/20 rounded-md p-0.5">
                          <button
                            className={`text-xs py-1 px-3 rounded ${activeTab === "skills" ? "bg-white text-indigo-600" : "text-white"}`}
                            onClick={() => setActiveTab("skills")}
                          >
                            Skills
                          </button>
                          <button
                            className={`text-xs py-1 px-3 rounded ${activeTab === "success" ? "bg-white text-indigo-600" : "text-white"}`}
                            onClick={() => setActiveTab("success")}
                          >
                            Success
                          </button>
                        </div>
                      </div>

                      {/* Dashboard Content */}
                      <div className="flex-1 p-2 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 overflow-auto">
                        {/* Tools Usage Card */}
                        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                          <div className="p-3 sm:p-4 pb-2">
                            <h4 className="text-sm sm:text-base font-semibold">Most In-Demand Tools</h4>
                            <p className="text-xs text-gray-500">% of job listings requiring these tools</p>
                          </div>
                          <div className="p-3 sm:p-4 pt-0">
                            <div className="space-y-2 sm:space-y-4 mt-2">
                              {toolsData
                                .slice(0, window.innerWidth >= 768 ? toolsData.length : 3)
                                .map((tool, index) => (
                                  <div key={index} className="space-y-1">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                      <span>{tool.name}</span>
                                      <span className="font-semibold">{tool.usage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                                      <div
                                        className="h-full rounded-full"
                                        style={{
                                          width: `${tool.usage}%`,
                                          backgroundColor: tool.color,
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>
                            <div className="mt-3 sm:mt-4 flex justify-center">
                              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 sm:px-3 py-1 rounded-full">
                                Python & SQL dominate the market
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bootcamp Success Card - Hidden on mobile */}
                        <div className="hidden md:block bg-white border rounded-lg shadow-sm overflow-hidden">
                          <div className="p-4 pb-2">
                            <h4 className="text-base font-semibold">First Bootcamp Metrics</h4>
                            <p className="text-xs text-gray-500">Performance data from our first cohort</p>
                          </div>
                          <div className="p-4 pt-0">
                            <div className="h-[160px] sm:h-[220px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                  cx="50%"
                                  cy="50%"
                                  innerRadius="25%"
                                  outerRadius="90%"
                                  data={bootcampMetrics}
                                  startAngle={180}
                                  endAngle={0}
                                >
                                  <RadialBar
                                    minAngle={15}
                                    background
                                    clockWise={true}
                                    dataKey="value"
                                    cornerRadius={10}
                                  />
                                  <Tooltip
                                    formatter={(value) => [`${value}%`, "Score"]}
                                    contentStyle={{
                                      backgroundColor: "#fff",
                                      border: "1px solid #e2e8f0",
                                      borderRadius: "0.375rem",
                                      fontSize: "12px",
                                    }}
                                  />
                                  <Legend
                                    iconSize={8}
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
                                  />
                                </RadialBarChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="mt-1 text-center">
                              <div className="text-sm font-medium">
                                Overall Success: <span className="text-green-600">90%</span>
                              </div>
                              <div className="text-xs text-gray-500">First cohort completed Jan 2025</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Footer */}
                      <div className="p-2 sm:p-3 border-t flex justify-between items-center bg-gray-50">
                        <div className="text-xs text-gray-500">Based on our first cohort's performance</div>
                        <button className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700">
                          <span>Enroll Now</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Text Content */}
                <div className="w-full lg:w-1/2 lg:pl-12 text-left order-1 lg:order-2">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">✕</span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 ml-2">Proline</h3>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Experience Seamless and Beginner-Friendly Learning with DataCliq's Step-by-Step Data Analysis
                    Courses
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-6">
                    Step-by-step lessons, free resources, and a community to support your growth—all in one place
                  </p>
                  <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Explore Free Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .dashboard-container:hover {
          transform: translateY(-5px);
        }

        @media (max-width: 768px) {
          .dashboard-container {
            border-radius: 0.75rem !important;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Features
