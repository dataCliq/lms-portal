"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Users,
  Clock,
  ChevronRight,
  MessageSquare,
  Github,
  BarChart2,
  LineChart,
  PieChart,
  BarChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Footer from "../../_components/Footer"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section - Modern asymmetric design with brand colors */}
      <section className="relative overflow-hidden py-20 md:py-28 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0f766e] to-[#84cc16] opacity-5"></div>
        <div className="absolute -right-20 top-20 w-72 h-72 bg-[#84cc16] rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-[#0f766e] rounded-full blur-3xl opacity-10"></div>

        <div className="container relative z-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#0f766e] to-[#84cc16] text-white rounded-full text-sm font-medium mb-2">
                About DataCliq
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                Transforming Data <span className="text-[#0f766e]">Education</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                We empower professionals and beginners to build rewarding careers in data through practical, accessible,
                and industry-relevant courses.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0f766e] to-[#84cc16] hover:from-[#0a5a54] hover:to-[#65a30d] text-white border-none"
                >
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-[#0f766e] text-[#0f766e] hover:bg-[#0f766e]/10">
                  Our Approach
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=900&width=800"
                  alt="Data professionals collaborating"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#0f766e] to-[#84cc16] flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Personalized Learning</h3>
                      <p className="text-sm text-slate-600">
                        Small cohorts ensure individual attention and better outcomes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section - Card-based layout */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-slate-600">
              DataCliq is on a mission to democratize data education by making professional analytics skills accessible
              to everyone, regardless of their background.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0a192f] to-[#0f766e] flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Practical Learning</h3>
                  <p className="text-slate-600">
                    We focus on hands-on projects with real datasets that prepare you for actual work scenarios, not
                    just theory.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                      </div>
                      <span className="text-slate-700">Industry-relevant projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                      </div>
                      <span className="text-slate-700">Real-world datasets</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0f766e] to-[#84cc16] flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Personalized Paths</h3>
                  <p className="text-slate-600">
                    Everyone learns differently. Our adaptive learning system tailors the experience to your pace and
                    style.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                      </div>
                      <span className="text-slate-700">Skill-based assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                      </div>
                      <span className="text-slate-700">Custom learning tracks</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-[#0a192f] to-[#0f766e] text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Why DataCliq?</h3>
                  <p className="text-slate-200">
                    Traditional education often fails to prepare students for actual data work. We focus on practical
                    skills that employers value, taught by industry practitioners.
                  </p>
                  <div className="pt-2">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">
                      Our Methodology
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Section - Improved Design */}
      <section className="py-20 bg-gradient-to-br from-[#0a192f]/5 to-[#84cc16]/5 w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f766e" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-lg text-slate-600">
              DataCliq is a young, ambitious company with a clear vision for the future of data education. Here's how
              we're building something special.
            </p>
          </motion.div>

          {/* Timeline with connected dots */}
          <div className="relative">
            {/* Horizontal connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#0a192f] via-[#0f766e] to-[#84cc16] hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  year: "2022",
                  title: "The Beginning",
                  description:
                    "Our founders identified a critical gap in data education: too much theory, not enough practical application. DataCliq was born to address this need.",
                  icon: "🚀",
                  delay: 0.1,
                },
                {
                  year: "2023",
                  title: "Growth & Development",
                  description:
                    "Our learning platform went live, featuring interactive lessons, hands-on projects, and personalized learning paths. We welcomed our first cohort of students.",
                  icon: "📈",
                  delay: 0.2,
                },
                {
                  year: "2024",
                  title: "Expansion & Innovation",
                  description:
                    "We're expanding our course offerings, building industry partnerships, and creating a thriving community of data professionals supporting each other's growth.",
                  icon: "🌐",
                  delay: 0.3,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: item.delay }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 border-[#0f766e] flex items-center justify-center text-2xl z-10 hidden md:flex shadow-lg">
                    {item.icon}
                  </div>

                  {/* Mobile dot */}
                  <div className="md:hidden w-16 h-16 rounded-full bg-white border-4 border-[#0f766e] flex items-center justify-center text-2xl z-10 mb-4 mx-auto shadow-lg">
                    {item.icon}
                  </div>

                  {/* Content card - alternating top/bottom for desktop */}
                  <div className={`md:mt-32 ${index % 2 === 0 ? "md:mt-0 md:mb-32" : ""}`}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm">
                      <div className="h-2 bg-gradient-to-r from-[#0a192f] via-[#0f766e] to-[#84cc16]"></div>
                      <CardContent className="p-6">
                        <div className="inline-block px-3 py-1 bg-[#0f766e] text-white text-sm font-medium rounded-full mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key milestones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0f766e]/10 flex items-center justify-center flex-shrink-0 text-[#0f766e]">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Growing Community</h3>
                        <p className="text-slate-600">
                          From our first 8 students to a thriving community of over 500 data enthusiasts, we're building
                          a network of professionals who support each other's growth.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                          <span className="text-sm text-slate-500">500+ Students</span>
                          <div className="h-2 w-2 rounded-full bg-[#84cc16] ml-4"></div>
                          <span className="text-sm text-slate-500">12 Countries</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0f766e]/10 flex items-center justify-center flex-shrink-0 text-[#0f766e]">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Expanding Curriculum</h3>
                        <p className="text-slate-600">
                          We've expanded from our core data analytics program to specialized courses in machine
                          learning, data visualization, and business intelligence.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                          <span className="text-sm text-slate-500">8 Courses</span>
                          <div className="h-2 w-2 rounded-full bg-[#84cc16] ml-4"></div>
                          <span className="text-sm text-slate-500">200+ Lessons</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Data Skills Matter Section */}
      <section className="py-16 bg-white w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dataPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 100 10" stroke="#0f766e" strokeWidth="0.5" strokeDasharray="5,5" />
                <path d="M 10 0 L 10 100" stroke="#0f766e" strokeWidth="0.5" strokeDasharray="5,5" />
                <circle cx="10" cy="10" r="2" fill="#84cc16" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dataPattern)" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Data Skills Matter</h2>
            <p className="text-lg text-slate-600">
              The demand for data professionals continues to grow across industries. Here's why now is the perfect time
              to start your data journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BarChart2,
                title: "240% Growth",
                description: "Increase in data job postings over the last five years",
                color: "from-[#0a192f] to-[#0f766e]",
              },
              {
                icon: LineChart,
                title: "$120,000",
                description: "Average salary for data professionals in the US",
                color: "from-[#0f766e] to-[#84cc16]",
              },
              {
                icon: PieChart,
                title: "89%",
                description: "Of companies say they need more data-skilled employees",
                color: "from-[#0a192f] to-[#0f766e]",
              },
              {
                icon: BarChart,
                title: "Top 3",
                description: "Data Science ranked in top 3 best jobs for 5 years running",
                color: "from-[#0f766e] to-[#84cc16]",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div
                      className={`h-16 w-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 opacity-80`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Modern cards */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-slate-600">
              A passionate group of data professionals, educators, and industry experts committed to your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                initials: "AJ",
                name: "Alex Johnson",
                role: "CEO & Co-Founder",
                bio: "Former lead data scientist with 10+ years industry experience",
                delay: 0.1,
              },
              {
                initials: "SC",
                name: "Sarah Chen",
                role: "CTO",
                bio: "Specializes in scalable learning platforms and data infrastructure",
                delay: 0.2,
              },
              {
                initials: "MB",
                name: "Michael Brown",
                role: "Head of Education",
                bio: "Data educator with 8+ years teaching experience",
                delay: 0.3,
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: member.delay }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 bg-gradient-to-br from-[#0a192f] via-[#0f766e] to-[#84cc16] relative overflow-hidden opacity-80">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{member.initials}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-[#0f766e] font-medium">{member.role}</p>
                    <p className="text-slate-600 mt-2">{member.bio}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0f766e] hover:text-[#0a5a54] hover:bg-[#84cc16]/10 p-0"
                      >
                        Connect <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute Section */}
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contribute to Our Mission</h2>
            <p className="text-lg text-slate-600">
              Help us make data education accessible to everyone. Your contribution supports scholarships, open
              educational resources, and community initiatives.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gradient-to-br from-[#0a192f] to-[#0f766e] p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Why Contribute?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      <span>Fund scholarships for underrepresented groups in tech</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      <span>Support the development of free educational resources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      <span>Help us organize community workshops and events</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      <span>Open source contributors welcome!</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Make a Difference</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-2">
                      {["$25", "$50", "$100"].map((amount, i) => (
                        <Button
                          key={i}
                          variant={i === 1 ? "default" : "outline"}
                          className={i === 1 ? "bg-[#0f766e] hover:bg-[#0a5a54]" : "border-[#0f766e] text-[#0f766e]"}
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[#0f766e] to-[#84cc16] hover:from-[#0a5a54] hover:to-[#65a30d] text-white">
                      Contribute Now
                    </Button>
                    <p className="text-sm text-slate-500 text-center">
                      All contributions are tax-deductible. You'll receive a receipt for your records.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
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
                12 weeks of intensive, hands-on training to launch your career in data. Next cohort starts soon!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-[#84cc16]" />
                  <span>Live instruction from industry experts</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-[#84cc16]" />
                  <span>Real-world projects for your portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-[#84cc16]" />
                  <span>Career coaching and job placement assistance</span>
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

      {/* Social Media Section */}
      <section className="py-12 bg-white w-full">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Join Our Community</h2>
            <p className="text-slate-600">
              Follow us on social media for the latest updates, free resources, and community events.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Twitter", icon: "𝕏", color: "bg-black" },
              { name: "LinkedIn", icon: "in", color: "bg-[#0077b5]" },
              { name: "Instagram", icon: "📸", color: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" },
              { name: "YouTube", icon: "▶️", color: "bg-[#ff0000]" },
            ].map((social, index) => (
              <Link href="#" key={index} className="group">
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className={`h-2 ${social.color}`}></div>
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-slate-100 group-hover:bg-slate-200 transition-colors">
                      <span className="text-xl">{social.icon}</span>
                    </div>
                    <p className="font-medium text-slate-900">{social.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 max-w-md mx-auto">
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="bg-[#25D366] h-2"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Join our WhatsApp Channel</h3>
                    <p className="text-sm text-slate-600">Get daily tips and updates</p>
                  </div>
                </div>
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">Subscribe to Channel</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action - Modern gradient */}
      <section className="py-20 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0f766e] to-[#84cc16] opacity-90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
        </div>

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Data Journey?</h2>
            <p className="text-lg text-slate-200 mb-8">
              Join our next cohort and transform your career with DataCliq's practical, industry-focused courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#0f766e] hover:bg-slate-100 hover:text-[#0a5a54]">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Download Course Catalog
              </Button>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row gap-6 justify-center items-center text-white">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#84cc16]" />
                <span>Small cohort sizes for personalized attention</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#84cc16]" />
                <span>Industry-relevant curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#84cc16]" />
                <span>Learn at your own pace</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AboutPage
