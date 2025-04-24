"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, CheckCircle, Clock, FileText, Laptop, Network, Users } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for charts
const skillProgressData = [
    { name: "Week 1", excel: 30, powerbi: 10 },
    { name: "Week 2", excel: 50, powerbi: 40 },
    { name: "Week 3", excel: 65, powerbi: 60 },
    { name: "Week 4", excel: 80, powerbi: 85 },
]

const jobMarketData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 50 },
    { name: "May", value: 60 },
    { name: "Jun", value: 65 },
    { name: "Jul", value: 75 },
]

export default function BootcampPage() {
    // Define colors directly in the component
    const colors = {
        primary: "#00BFA6", // DataCliq green
        secondary: "#0099CC", // DataCliq blue
        accent: "#F5FCFF", // Light blue background
        powerBIColor: "#F2C811", // Power BI gold
        excelColor: "#217346", // Excel green
        textPrimary: "#333333",
        textSecondary: "#666666",
        lightBlue: "#E6F7FF",
        gradientStart: "#E6F7FF",
        gradientEnd: "#F0FFFC",
    }

    return (
        <div className="w-full" >
            <div
                className="text-center py-16 px-6 w-full mt-5"

            >
                <Badge className="mb-4" style={{ backgroundColor: colors.lightBlue, color: colors.secondary }}>
                    Limited Spots Available
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: colors.textPrimary }}>
                    Bootcamp Cohort 2 by <span style={{ color: colors.primary }}>Data</span>
                </h1>
                <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
                    Master data analysis in just one month with our intensive, project-based bootcamp designed for professionals
                    and beginners alike.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Featured Skills Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <Card className="overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="h-2" style={{ backgroundColor: colors.excelColor }}></div>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Image
                                    src="/excel-logo.svg"
                                    alt="Excel"
                                    width={40}
                                    height={40}
                                    className="mr-2"
                                />
                                Excel Mastery
                            </CardTitle>
                            <CardDescription>Learn advanced Excel techniques for data analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p>Master Excel for data analysis with skills in:</p>
                                <ul className="space-y-2">
                                    {[
                                        "Advanced formulas and functions",
                                        "Pivot Tables and data modeling",
                                        "Data visualization with charts",
                                        "Data cleaning and transformation",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.excelColor }} />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="h-40 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={skillProgressData}>
                                            <Bar dataKey="excel" fill={colors.excelColor} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <p className="text-xs text-center mt-2" style={{ color: colors.textSecondary }}>
                                        Excel skill progression over 4 weeks
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="h-2" style={{ backgroundColor: colors.powerBIColor }}></div>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Image
                                    src="/bi-logo.svg"
                                    alt="Power BI"
                                    width={40}
                                    height={40}
                                    className="mr-2"
                                />
                                Power BI Expertise
                            </CardTitle>
                            <CardDescription>Create powerful interactive dashboards</CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <div className="space-y-4">
                                <p>Develop Power BI skills including:</p>
                                <ul className="space-y-2">
                                    {[
                                        "Data modeling and relationships",
                                        "DAX formulas and calculations",
                                        "Interactive visualizations",
                                        "Dashboard design and publishing",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle
                                                className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                                style={{ color: colors.powerBIColor }}
                                            />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="h-40 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={skillProgressData}>
                                            <Bar dataKey="powerbi" fill={colors.powerBIColor} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <p className="text-xs text-center mt-2" style={{ color: colors.textSecondary }}>
                                        Power BI skill progression over 4 weeks
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <Card className="lg:col-span-2 border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle style={{ color: colors.textPrimary }}>Transform Your Career in Data Analysis</CardTitle>
                            <CardDescription>
                                Join our exclusive bootcamp and gain in-demand skills that employers are looking for
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p style={{ color: colors.textSecondary }}>
                                The Datacliq Bootcamp is an intensive 4-week program designed to take you from zero to job-ready in data
                                analysis. Whether you're a working professional looking to pivot careers or a fresher wanting to break
                                into the field, our curriculum is tailored to help you succeed.
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium" style={{ color: colors.textPrimary }}>
                                    What You'll Learn:
                                </h3>
                                <ul className="space-y-2">
                                    {[
                                        "Fundamentals of data analysis and visualization",
                                        "Industry-standard tools and techniques",
                                        "Real-world problem solving with actual datasets",
                                        "Portfolio-building projects that showcase your skills",
                                        "Job search strategies and interview preparation",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Job Market Trend Chart */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium mb-4" style={{ color: colors.textPrimary }}>
                                    Data Analyst Job Market Trend
                                </h3>
                                <div className="h-64 bg-white p-4 rounded-lg">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={jobMarketData}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke={colors.secondary}
                                                strokeWidth={2}
                                                dot={{ fill: colors.secondary, r: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                    <p className="text-xs text-center mt-2" style={{ color: colors.textSecondary }}>
                                        Increasing demand for data analysts in 2025
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium mb-4" style={{ color: colors.textPrimary }}>
                                    Your 4-Week Journey:
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            week: "Week 1",
                                            title: "Foundations & First Project",
                                            description: "Master the fundamentals and complete your first analysis project",
                                            color: "#4ECDC4",
                                        },
                                        {
                                            week: "Week 2",
                                            title: "Advanced Techniques & Second Project",
                                            description: "Dive deeper into analysis methods and tackle a more complex dataset",
                                            color: "#45B7D1",
                                        },
                                        {
                                            week: "Week 3",
                                            title: "Visualization & Third Project",
                                            description: "Learn to create compelling data stories through visualization",
                                            color: "#3F9EEB",
                                        },
                                        {
                                            week: "Week 4",
                                            title: "Integration & Final Project",
                                            description: "Bring everything together in a comprehensive capstone project",
                                            color: "#3A86FF",
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="relative flex">
                                            <div className="mr-4 flex flex-col items-center">
                                                <div
                                                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                                    style={{ backgroundColor: item.color }}
                                                >
                                                    {index + 1}
                                                </div>
                                                {index < 3 && <div className="h-full w-0.5 bg-gray-200 my-1"></div>}
                                            </div>
                                            <div className="bg-white p-4 rounded-lg flex-1 shadow-sm">
                                                <Badge className="mb-2" style={{ backgroundColor: item.color, color: "white" }}>
                                                    {item.week}
                                                </Badge>
                                                <h4 className="text-base font-semibold">{item.title}</h4>
                                                <p className="text-sm" style={{ color: colors.textSecondary }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-sm">
                            <CardHeader style={{ backgroundColor: colors.lightBlue }}>
                                <CardTitle style={{ color: colors.textPrimary }}>Bootcamp Highlights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="flex items-start">
                                    <div className="p-2 rounded-md mr-4" style={{ backgroundColor: colors.lightBlue }}>
                                        <Calendar className="h-5 w-5" style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">4-Week Program</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Intensive training with flexible hours
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-2 rounded-md mr-4" style={{ backgroundColor: colors.lightBlue }}>
                                        <Laptop className="h-5 w-5" style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">4 Real Projects</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Build a portfolio that stands out
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-2 rounded-md mr-4" style={{ backgroundColor: colors.lightBlue }}>
                                        <Network className="h-5 w-5" style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Networking</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Connect with industry professionals
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-2 rounded-md mr-4" style={{ backgroundColor: colors.lightBlue }}>
                                        <FileText className="h-5 w-5" style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Resume Support</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Get your resume job-ready
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-2 rounded-md mr-4" style={{ backgroundColor: colors.lightBlue }}>
                                        <Users className="h-5 w-5" style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Small Cohort</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Limited to just 10 participants
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-2 rounded-md mr-4" style={{ backgroundColor: colors.lightBlue }}>
                                        <Clock className="h-5 w-5" style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Flexible Schedule</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Perfect for working professionals
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader style={{ backgroundColor: colors.primary, color: "white" }}>
                                <CardTitle>Limited Enrollment</CardTitle>
                                <CardDescription style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                    Only 10 spots available for this cohort
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="mb-4" style={{ color: colors.textSecondary }}>
                                    Applications are accepted on a first-come, first-served basis. Submit your resume today to secure your
                                    spot.
                                </p>
                                <Button className="w-full" size="lg" style={{ backgroundColor: colors.primary }}>
                                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                            <CardFooter className="text-sm border-t pt-4" style={{ color: colors.textSecondary }}>
                                Cohort starts on June 15, 2025
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Previous Batch Dashboards */}
                <div className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
                            Dashboards Created by Previous Batches
                        </h2>
                        <p className="text-lg mt-2" style={{ color: colors.textSecondary }}>
                            See the impressive work our students create during the bootcamp
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { tool: "Power BI", title: "Sales Analytics Dashboard" },
                            { tool: "Power BI", title: "HR Performance Metrics" },
                            { tool: "Excel", title: "Financial Analysis Dashboard" },
                        ].map((project, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                            >
                                <div className="aspect-video relative bg-white flex items-center justify-center">
                                    <Image
                                        src={`/placeholder.svg?height=200&width=400&text=Dashboard+${index + 1}`}
                                        alt={`Dashboard example ${index + 1}`}
                                        width={400}
                                        height={200}
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="pt-4">
                                    <Badge
                                        className="mb-2"
                                        style={{
                                            backgroundColor: project.tool === "Power BI" ? colors.powerBIColor : colors.excelColor,
                                            color: "white",
                                        }}
                                    >
                                        {project.tool}
                                    </Badge>
                                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                                        Created by Cohort 1 student
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>

                {/* Testimonials */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10" style={{ color: colors.textPrimary }}>
                        What Our Graduates Say
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-sm bg-white overflow-hidden">
                            <CardContent className="pt-6">
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <svg width="45" height="36" className="fill-current" style={{ color: colors.primary }}>
                                            <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                                        </svg>
                                    </div>
                                    <p className="italic flex-grow" style={{ color: colors.textSecondary }}>
                                        "This bootcamp completely transformed my career. I went from knowing almost nothing about data
                                        analysis to landing a job within two months of completion."
                                    </p>
                                    <div className="mt-6 pt-6 border-t">
                                        <p className="font-medium">Sarah J.</p>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Data Analyst at TechCorp
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm bg-white overflow-hidden">
                            <CardContent className="pt-6">
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <svg width="45" height="36" className="fill-current" style={{ color: colors.secondary }}>
                                            <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                                        </svg>
                                    </div>
                                    <p className="italic flex-grow" style={{ color: colors.textSecondary }}>
                                        "As a working professional, I was worried about the time commitment, but the flexible schedule made
                                        it possible. The skills I gained were immediately applicable to my current role."
                                    </p>
                                    <div className="mt-6 pt-6 border-t">
                                        <p className="font-medium">Michael T.</p>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                                            Business Intelligence Specialist
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div
                    className="py-16 rounded-lg text-white text-center"
                    style={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    }}
                >
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
                        <p className="text-lg mb-8 text-white/90">
                            Join our exclusive bootcamp and gain the skills, portfolio, and network you need to succeed in data
                            analysis.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="bg-white hover:bg-gray-100" style={{ color: colors.primary }}>
                                Apply Now
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                                Download Syllabus
                            </Button>
                        </div>
                        <p className="mt-8 text-sm text-white/80">
                            Have questions?{" "}
                            <Link href="/contact" className="text-white underline hover:text-white/90">
                                Contact us
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
