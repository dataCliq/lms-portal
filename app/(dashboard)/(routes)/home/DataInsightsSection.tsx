"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowRight, TrendingUp, PieChartIcon, BarChart2 } from "lucide-react"

const DataInsightsSection = () => {
  const [activeTab, setActiveTab] = useState("salary")

  // Salary data
  const salaryData = [
    { role: "Junior Analyst", salary: 65000 },
    { role: "Data Analyst", salary: 85000 },
    { role: "Senior Analyst", salary: 105000 },
    { role: "Data Scientist", salary: 120000 },
    { role: "Analytics Manager", salary: 140000 },
  ]

  // Demand data
  const demandData = [
    { year: "2020", demand: 65 },
    { year: "2021", demand: 78 },
    { year: "2022", demand: 87 },
    { year: "2023", demand: 95 },
    { year: "2024", demand: 110 },
    { year: "2025", demand: 125, projected: true },
  ]

  // Skills data
  const skillsData = [
    { name: "SQL", value: 28 },
    { name: "Python", value: 22 },
    { name: "Excel", value: 18 },
    { name: "Tableau", value: 15 },
    { name: "Power BI", value: 12 },
    { name: "R", value: 5 },
  ]

  const COLORS = ["#00A3B5", "#0F172A", "#10B981", "#68D391"]

  return (
    <div className="w-full bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#28282B] md:text-4xl">Data Analysis Career Insights</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Explore the growing demand, competitive salaries, and essential skills in the data analysis field
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[450px] w-full rounded-xl bg-white p-6 shadow-xl lg:w-2/3"
          >
            {/* Tabs */}
            <div className="mb-6 flex border-b">
              <button
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${activeTab === "salary" ? "border-b-2 border-[#00A3B5] text-[#00A3B5]" : "text-gray-500"}`}
                onClick={() => setActiveTab("salary")}
              >
                <BarChart2 className="h-4 w-4" />
                <span>Salary Potential</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${activeTab === "demand" ? "border-b-2 border-[#00A3B5] text-[#00A3B5]" : "text-gray-500"}`}
                onClick={() => setActiveTab("demand")}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Job Demand</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${activeTab === "skills" ? "border-b-2 border-[#00A3B5] text-[#00A3B5]" : "text-gray-500"}`}
                onClick={() => setActiveTab("skills")}
              >
                <PieChartIcon className="h-4 w-4" />
                <span>In-Demand Skills</span>
              </button>
            </div>

            {/* Chart Content */}
            <div className="h-[350px]">
              {activeTab === "salary" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="role" tick={{ fill: "#4B5563" }} />
                    <YAxis tick={{ fill: "#4B5563" }} />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, "Average Salary"]}
                      contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    />
                    <Bar dataKey="salary" fill="#00A3B5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeTab === "demand" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fill: "#4B5563" }} />
                    <YAxis tick={{ fill: "#4B5563" }} />
                    <Tooltip
                      formatter={(value, name) => [value, "Demand Index"]}
                      contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="demand"
                      stroke="#00A3B5"
                      strokeWidth={3}
                      dot={{ r: 6, fill: "#00A3B5", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 8, fill: "#00A3B5", strokeWidth: 2, stroke: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeTab === "skills" && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Demand"]}
                      contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/3"
          >
            <h3 className="mb-6 text-2xl font-bold text-[#28282B]">Why Data Analysis is the Career of the Future</h3>

            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                The demand for skilled data analysts continues to grow across all industries as organizations
                increasingly rely on data-driven decision making.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-[#E6F5F7] p-2">
                    <TrendingUp className="h-5 w-5 text-[#00A3B5]" />
                  </div>
                  <span className="text-lg">
                    <strong className="text-[#00A3B5]">Growing Demand:</strong> 22% projected job growth through 2030
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-[#E6F5F7] p-2">
                    <BarChart2 className="h-5 w-5 text-[#00A3B5]" />
                  </div>
                  <span className="text-lg">
                    <strong className="text-[#00A3B5]">Competitive Salaries:</strong> Average starting salary of
                    $65,000+
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 rounded-full bg-[#E6F5F7] p-2">
                    <PieChartIcon className="h-5 w-5 text-[#00A3B5]" />
                  </div>
                  <span className="text-lg">
                    <strong className="text-[#00A3B5]">Versatile Skills:</strong> Applicable across industries from
                    healthcare to finance
                  </span>
                </li>
              </ul>

              <p className="pt-2 text-lg">
                At DataCliq, we prepare you with the exact skills employers are looking for, helping you stand out in
                this competitive field.
              </p>

              <button className="group mt-6 flex items-center gap-2 rounded-lg bg-[#00A3B5] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#0F172A]">
                <span>Start Your Data Career</span>
                <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DataInsightsSection
