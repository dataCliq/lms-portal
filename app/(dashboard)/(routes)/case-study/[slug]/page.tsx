"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, User, Tag, Share2, Bookmark, MessageSquare, ChevronRight, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Footer from "../../../_components/Footer"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Mock data for a single case study
const getCaseStudy = (slug) => {
  // In a real app, this would fetch from an API or database
  return {
    id: slug,
    title: "How RetailCo Increased Sales by 32% Using Data Analytics",
    excerpt:
      "A leading retail chain implemented our data analytics framework to optimize inventory and personalize customer experiences.",
    content: `
      <h2>The Challenge</h2>
      <p>RetailCo, a national retail chain with over 200 locations, was facing increasing competition from e-commerce giants and struggling to maintain market share. Their key challenges included:</p>
      <ul>
        <li>Inconsistent inventory management leading to stockouts and overstock situations</li>
        <li>Limited understanding of customer purchasing patterns</li>
        <li>Inability to personalize marketing efforts effectively</li>
        <li>Declining in-store sales and customer engagement</li>
      </ul>

      <h2>Our Approach</h2>
      <p>We worked with RetailCo to implement a comprehensive data analytics strategy that focused on three key areas:</p>
      
      <h3>1. Unified Data Infrastructure</h3>
      <p>First, we helped RetailCo consolidate their fragmented data sources into a centralized data warehouse. This included point-of-sale data, inventory management systems, customer loyalty information, and online shopping behavior. By creating a single source of truth, we enabled cross-functional analysis that wasn't previously possible.</p>
      
      <h3>2. Predictive Inventory Optimization</h3>
      <p>Using historical sales data, seasonal trends, and external factors like weather and local events, we built a machine learning model that could predict demand at the store and SKU level with 87% accuracy. This allowed RetailCo to optimize their inventory levels, reducing both stockouts and excess inventory.</p>
      
      <h3>3. Customer Segmentation and Personalization</h3>
      <p>We implemented advanced clustering algorithms to segment RetailCo's customer base into meaningful groups based on purchasing behavior, preferences, and lifetime value. This segmentation powered personalized marketing campaigns and in-store experiences tailored to each customer segment.</p>

      <h2>Implementation Process</h2>
      <p>The project was implemented in phases over a 6-month period:</p>
      <ul>
        <li><strong>Month 1-2:</strong> Data infrastructure setup and integration</li>
        <li><strong>Month 3-4:</strong> Model development and testing</li>
        <li><strong>Month 5:</strong> Staff training and change management</li>
        <li><strong>Month 6:</strong> Full deployment and optimization</li>
      </ul>

      <h2>The Results</h2>
      <p>Within 12 months of implementation, RetailCo saw remarkable improvements across their business:</p>
      <ul>
        <li><strong>32% increase</strong> in overall sales</li>
        <li><strong>45% reduction</strong> in inventory carrying costs</li>
        <li><strong>28% improvement</strong> in customer retention rates</li>
        <li><strong>3.5x ROI</strong> on personalized marketing campaigns</li>
      </ul>

      <h2>Key Learnings</h2>
      <p>This project highlighted several important lessons for retail analytics implementations:</p>
      <ul>
        <li>The importance of clean, integrated data as a foundation for analytics</li>
        <li>The value of combining domain expertise with data science</li>
        <li>The need for comprehensive staff training to ensure adoption</li>
        <li>The power of incremental implementation to demonstrate value quickly</li>
      </ul>

      <h2>Conclusion</h2>
      <p>RetailCo's success demonstrates how data analytics can transform traditional retail operations in the face of digital disruption. By leveraging their existing data assets and implementing targeted analytics solutions, they were able to not only survive but thrive in a challenging market environment.</p>
    `,
    category: "Retail",
    readTime: "8 min read",
    author: "Alex Johnson",
    date: "May 15, 2024",
    image: "/placeholder.svg?height=600&width=1200",
    authorImage: "/placeholder.svg?height=100&width=100",
  }
}

// Related case studies
const relatedCaseStudies = [
  {
    id: "ecommerce-personalization",
    title: "E-commerce Personalization: A Data-Driven Approach",
    excerpt:
      "Discover how an online marketplace increased conversion rates by 45% through personalized recommendations.",
    category: "E-commerce",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "marketing-attribution",
    title: "Multi-channel Marketing Attribution Model",
    excerpt: "How a D2C brand built a custom attribution model to optimize their marketing spend across channels.",
    category: "Marketing",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const CaseStudyDetailPage = () => {
  const params = useParams()
  const caseStudy = getCaseStudy(params.slug)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f]/5 to-[#84cc16]/5"></div>

        <div className="container relative z-10 mx-auto">
          <div className="mb-8">
            <Link href="/case-studies" className="inline-flex items-center text-[#0f766e] hover:text-[#0a5a54]">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Case Studies
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="inline-block bg-[#0f766e] text-white text-sm font-medium px-3 py-1 rounded mb-4">
                {caseStudy.category}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                {caseStudy.title}
              </h1>

              <div className="flex items-center text-sm text-slate-500 mb-6">
                <Clock className="h-4 w-4 mr-1" />
                <span>{caseStudy.readTime}</span>
                <span className="mx-2">•</span>
                <User className="h-4 w-4 mr-1" />
                <span>{caseStudy.author}</span>
                <span className="mx-2">•</span>
                <span>{caseStudy.date}</span>
              </div>

              <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={caseStudy.image || "/placeholder.svg"}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                </div>

                <div className="flex items-center text-sm text-slate-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>12 comments</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={caseStudy.authorImage || "/placeholder.svg"}
                      alt={caseStudy.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{caseStudy.author}</p>
                    <p className="text-sm text-slate-500">Data Analytics Consultant</p>
                    <p className="text-sm text-[#0f766e] mt-1">View all case studies by this author</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-8"
            >
              <div className="space-y-8">
                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="bg-[#0a192f] h-2"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Table of Contents</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#challenge" className="flex items-center text-slate-600 hover:text-[#0f766e]">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>The Challenge</span>
                        </a>
                      </li>
                      <li>
                        <a href="#approach" className="flex items-center text-slate-600 hover:text-[#0f766e]">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Our Approach</span>
                        </a>
                      </li>
                      <li>
                        <a href="#implementation" className="flex items-center text-slate-600 hover:text-[#0f766e]">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Implementation Process</span>
                        </a>
                      </li>
                      <li>
                        <a href="#results" className="flex items-center text-slate-600 hover:text-[#0f766e]">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>The Results</span>
                        </a>
                      </li>
                      <li>
                        <a href="#learnings" className="flex items-center text-slate-600 hover:text-[#0f766e]">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Key Learnings</span>
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0f766e] to-[#84cc16] h-2"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Related Case Studies</h3>
                    <div className="space-y-4">
                      {relatedCaseStudies.map((study) => (
                        <Link href={`/case-studies/${study.id}`} key={study.id} className="block group">
                          <div className="flex gap-3">
                            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={study.image || "/placeholder.svg"}
                                alt={study.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 group-hover:text-[#0f766e] line-clamp-2">
                                {study.title}
                              </h4>
                              <div className="flex items-center text-xs text-slate-500 mt-1">
                                <Tag className="h-3 w-3 mr-1" />
                                <span>{study.category}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{study.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="bg-[#84cc16] h-2"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Learn These Skills</h3>
                    <p className="text-slate-600 mb-4">
                      Master the data analytics techniques used in this case study through our specialized courses.
                    </p>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                        </div>
                        <span className="text-slate-700">Predictive Analytics Fundamentals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                        </div>
                        <span className="text-slate-700">Customer Segmentation Techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-[#84cc16]"></div>
                        </div>
                        <span className="text-slate-700">Data Visualization for Business</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-[#0f766e] to-[#84cc16] hover:from-[#0a5a54] hover:to-[#65a30d] text-white">
                      Explore Courses
                    </Button>
                  </CardContent>
                </Card>
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

export default CaseStudyDetailPage
