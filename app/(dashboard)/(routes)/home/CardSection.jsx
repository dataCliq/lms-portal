// "use client"

// import { ArrowRight, BarChart3, FileText, Users } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import Image from "next/image"

// const CardSection = () => {
//   const features = [
//     {
//       title: "Free Beginner Courses",
//       description:
//         "Start with our free courses on Power BI, Excel, Python, Tableau, SQL, and PostgreSQL. Learn at your own pace with weekly lessons.",
//       icon: BarChart3,
//       color: "bg-blue-50 border-blue-100",
//       hoverColor: "group-hover:text-blue-600",
//       buttonColor: "text-blue-600 hover:text-blue-700",
//       imagePath: "/dashboard.svg",
//       action: "Start for Free",
//       link: "#courses",
//     },
//     {
//       title: "Free Cheat Sheets",
//       description:
//         "Access downloadable cheat sheets for quick reference on formulas, functions, and best practices in data analysis.",
//       icon: FileText,
//       color: "bg-emerald-50 border-emerald-100",
//       hoverColor: "group-hover:text-emerald-600",
//       buttonColor: "text-emerald-600 hover:text-emerald-700",
//       imagePath: "/Cheatsheets.png",
//       action: "Download Now",
//       link: "#cheatsheets",
//     },
//     {
//       title: "Proven Mentorship",
//       description:
//         "Join a community backed by our successful 1-month Power BI mentorship program, trusted by 100+ learners.",
//       icon: Users,
//       color: "bg-amber-50 border-amber-100",
//       hoverColor: "group-hover:text-amber-600",
//       buttonColor: "text-amber-600 hover:text-amber-700",
//       imagePath: "/mentor.svg",
//       action: "See Testimonials",
//       link: "#testimonials",
//     },
//   ]

//   return (
//     <section className="w-full bg-[#F5FEFC] py-20 px-48">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center text-center space-y-4 mb-12">
//           <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2">
//             DataCliq Advantage
//           </div>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
//             Why Choose DataCliq for Your Data Journey?
//           </h2>
//           <p className="text-slate-600 md:text-lg max-w-[800px]">
//             Unlock your data potential with confidence through our expert-led courses, resources, and community.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className={`group border ${feature.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
//             >
//               <CardHeader className="pb-2">
//                 <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
//                   <Image
//                     src={feature.imagePath || "/placeholder.svg"}
//                     alt={feature.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <CardTitle className={`text-xl font-bold transition-colors ${feature.hoverColor}`}>
//                   {feature.title}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-slate-600 text-base">{feature.description}</CardDescription>
//               </CardContent>
//               <CardFooter>
//                 <Button variant="ghost" className={`p-0 ${feature.buttonColor} font-medium`} asChild>
//                   <a href={feature.link}>
//                     {feature.action}
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </a>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CardSection

"use client"

import { ArrowRight, BarChart3, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const CardSection = () => {
  const features = [
    {
      title: "Free Beginner Courses",
      description:
        "Start with our free courses on Power BI, Excel, Python, Tableau, SQL, and PostgreSQL. Learn at your own pace with weekly lessons.",
      icon: BarChart3,
      color: "bg-blue-50 border-blue-100",
      hoverColor: "group-hover:text-blue-600",
      buttonColor: "text-blue-600 hover:text-blue-700",
      imagePath: "/dashboard.svg?height=200&width=300",
      action: "Start for Free",
      link: "#courses",
    },
    {
      title: "Free Cheat Sheets",
      description:
        "Access downloadable cheat sheets for quick reference on formulas, functions, and best practices in data analysis.",
      icon: FileText,
      color: "bg-emerald-50 border-emerald-100",
      hoverColor: "group-hover:text-emerald-600",
      buttonColor: "text-emerald-600 hover:text-emerald-700",
      imagePath: "/Cheatsheets.png?height=200&width=300",
      action: "Download Now",
      link: "#cheatsheets",
    },
    {
      title: "Proven Mentorship",
      description:
        "Join a community backed by our successful 1-month Power BI mentorship program, trusted by 100+ learners.",
      icon: Users,
      color: "bg-amber-50 border-amber-100",
      hoverColor: "group-hover:text-amber-600",
      buttonColor: "text-amber-600 hover:text-amber-700",
      imagePath: "/mentor.svg?height=200&width=300",
      action: "See Testimonials",
      link: "#testimonials",
    },
  ]

  return (
    <section className="w-full bg-[#F5FEFC] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-48">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2">
            DataCliq Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-4xl">
            Why Choose DataCliq for Your Data Journey?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-3xl">
            Unlock your data potential with confidence through our expert-led courses, resources, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group border ${feature.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <CardHeader className="pb-2">
                <div className="w-full h-36 sm:h-40 md:h-48 relative rounded-md overflow-hidden mb-4">
                  <Image
                    src={feature.imagePath || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className={`text-lg sm:text-xl font-bold transition-colors ${feature.hoverColor}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-sm sm:text-base">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className={`p-0 ${feature.buttonColor} font-medium`} asChild>
                  <a href={feature.link}>
                    {feature.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardSection
