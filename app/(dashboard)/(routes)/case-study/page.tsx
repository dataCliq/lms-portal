"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, User, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "../../_components/Footer"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const caseStudies = [
  {
    id: "retail-analytics",
    title: "How RetailCo Increased Sales by 32% Using Data Analytics",
    excerpt:
      "A leading retail chain implemented our data analytics framework to optimize inventory and personalize customer experiences.",
    category: "Retail",
    readTime: "8 min read",
    author: "Alex Johnson",
    date: "May 15, 2024",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "healthcare-prediction",
    title: "Predictive Analytics in Healthcare: Improving Patient Outcomes",
    excerpt:
      "Learn how a regional hospital network used machine learning to predict patient readmissions and improve care quality.",
    category: "Healthcare",
    readTime: "12 min read",
    author: "Sarah Chen",
    date: "April 28, 2024",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "finance-dashboard",
    title: "Building a Real-time Financial Dashboard for Investment Decisions",
    excerpt: "How a fintech startup leveraged data visualization to help clients make better investment choices.",
    category: "Finance",
    readTime: "10 min read",
    author: "Michael Brown",
    date: "April 10, 2024",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "ecommerce-personalization",
    title: "E-commerce Personalization: A Data-Driven Approach",
    excerpt:
      "Discover how an online marketplace increased conversion rates by 45% through personalized recommendations.",
    category: "E-commerce",
    readTime: "9 min read",
    author: "Emily Zhang",
    date: "March 22, 2024",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "supply-chain-optimization",
    title: "Supply Chain Optimization Through Advanced Analytics",
    excerpt: "A manufacturing company reduced costs by 18% by implementing data-driven supply chain optimizations.",
    category: "Manufacturing",
    readTime: "11 min read",
    author: "David Wilson",
    date: "March 5, 2024",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "marketing-attribution",
    title: "Multi-channel Marketing Attribution Model",
    excerpt: "How a D2C brand built a custom attribution model to optimize their marketing spend across channels.",
    category: "Marketing",
    readTime: "7 min read",
    author: "Jessica Lee",
    date: "February 18, 2024",
    image: "/placeholder.svg?height=600&width=800",
  },
]

const CaseStudiesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background mt-5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0f766e] to-[#84cc16] opacity-5"></div>
        <div className="absolute -right-20 top-20 w-72 h-72 bg-[#84cc16] rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-[#0f766e] rounded-full blur-3xl opacity-10"></div>

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#0f766e] to-[#84cc16] text-white rounded-full text-sm font-medium mb-4">
              Real-World Applications
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Data Success <span className="text-[#0f766e]">Stories</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Explore how organizations across industries are leveraging data analytics to solve real business
              challenges and drive measurable results.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search case studies..."
                  className="pl-10 border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-40 border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#0f766e] text-white text-xs font-medium px-2 py-1 rounded">
                      {study.category}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{study.readTime}</span>
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{study.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{study.title}</h3>
                    <p className="text-slate-600 mb-4 flex-grow">{study.excerpt}</p>
                    <Link href={`/case-studies/${study.id}`}>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-[#0f766e] hover:text-[#0a5a54] hover:bg-transparent"
                      >
                        Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-16 bg-gradient-to-br from-[#0a192f]/5 to-[#84cc16]/5 w-full">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Success Story</h2>
            <p className="text-lg text-slate-600">
              An in-depth look at how our data education transformed a company's approach to decision-making.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Featured case study"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block bg-[#84cc16] text-[#0a192f] text-xs font-medium px-2 py-1 rounded mb-2">
                    Enterprise
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Global Tech Firm Reduces Decision Time by 73%</h3>
                  <div className="flex items-center text-sm text-white/80">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>15 min read</span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>DataCliq Team</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">The Challenge</h3>
                <p className="text-slate-600">
                  A Fortune 500 technology company was struggling with data silos and slow decision-making processes.
                  With operations across 24 countries, they needed a unified approach to data analytics that could
                  provide real-time insights to leadership.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 pt-2">Our Approach</h3>
                <p className="text-slate-600">
                  We trained their team of 120 analysts in advanced data visualization and predictive modeling
                  techniques. By implementing a centralized data platform and standardized reporting framework, we
                  helped them transform their decision-making process.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 pt-2">The Results</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                    </div>
                    <span>73% reduction in time-to-decision for strategic initiatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                    </div>
                    <span>$4.2M in cost savings through optimized operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                    </div>
                    <span>28% increase in data literacy across the organization</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-[#0f766e] to-[#84cc16] hover:from-[#0a5a54] hover:to-[#65a30d] text-white">
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bootcamp Promotion */}
      <section className="py-12 bg-[#0a192f] text-white w-full">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-[#84cc16] text-[#0a192f] text-sm font-medium rounded-full mb-4">
                Limited Seats Available
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Data Analytics Bootcamp</h2>
              <p className="text-lg text-slate-300 mb-6">
                Learn the skills needed to create success stories like these. Next cohort starts soon!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-[#84cc16]" />
                  <span>Master the tools used in these case studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-[#84cc16]" />
                  <span>Work on real-world projects for your portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-[#84cc16]" />
                  <span>Join a community of data professionals</span>
                </li>
              </ul>
              <Button size="lg" className="bg-[#84cc16] hover:bg-[#65a30d] text-[#0a192f] font-medium">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Data bootcamp students collaborating"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a192f]/80 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Next Cohort Starts</p>
                    <p className="text-[#84cc16] font-bold">June 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Spots Remaining</p>
                    <p className="text-[#84cc16] font-bold">4 of 12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CaseStudiesPage
