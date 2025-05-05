"use client"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const CareerPathSection = () => {
  const careerPaths = [
    {
      title: "Data Analyst",
      description: "Transform raw data into actionable insights using SQL, Excel, and visualization tools.",
      skills: ["SQL", "Excel", "Data Visualization", "Statistical Analysis"],
      color: "bg-gradient-to-br from-[#D9EBFF] to-[#F5FEFC]",
      borderColor: "border-[#00A3B5]",
      icon: "/data-analyst-icon.svg",
    },
    {
      title: "Business Intelligence Analyst",
      description: "Create interactive dashboards and reports to drive business decisions.",
      skills: ["Power BI", "Tableau", "SQL", "Data Modeling"],
      color: "bg-gradient-to-br from-[#DAFAF3] to-[#F5FEFC]",
      borderColor: "border-[#10B981]",
      icon: "/bi-analyst-icon.svg",
    },
    {
      title: "Data Scientist",
      description: "Apply advanced analytics and machine learning to solve complex business problems.",
      skills: ["Python", "Machine Learning", "Statistical Modeling", "Data Mining"],
      color: "bg-gradient-to-br from-[#E6F5F7] to-[#F5FEFC]",
      borderColor: "border-[#0F172A]",
      icon: "/data-scientist-icon.svg",
    },
  ]

  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#28282B] mb-4">Your Data Analysis Career Path</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DataCliq prepares you for these high-demand roles with structured learning paths and real-world projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {careerPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`rounded-xl border-2 ${path.borderColor} overflow-hidden shadow-lg ${path.color}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#28282B]">{path.title}</h3>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50">
                    <img src={path.icon || "/placeholder.svg"} alt={path.title} className="w-8 h-8" />
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{path.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#00A3B5] mb-2">Key Skills:</h4>
                  <ul className="space-y-2">
                    {path.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] mr-2" />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-2 bg-white text-[#00A3B5] border border-[#00A3B5] rounded-lg hover:bg-[#00A3B5] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group">
                  <span>Explore Path</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            Not sure which path is right for you? Take our free career assessment to find your perfect match.
          </p>
          <button className="px-6 py-3 bg-[#00A3B5] text-white rounded-lg hover:bg-[#008a99] transition-colors duration-300 inline-flex items-center gap-2 group">
            <span>Take Career Assessment</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default CareerPathSection
