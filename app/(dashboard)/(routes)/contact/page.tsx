"use client"

import Link from "next/link"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin, Send, MessageSquare, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "../../_components/Footer"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log(formState)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background mt-5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0f766e] to-[#84cc16] opacity-5"></div>

        {/* Animated data visualization elements */}
        <div className="absolute top-20 right-10 opacity-20">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-32 rounded-full border-4 border-[#0f766e]"
          />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 120 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-8 bg-[#84cc16] rounded-t-lg"
          />
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 80 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-8 bg-[#0f766e] rounded-t-lg ml-12"
          />
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 160 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-8 bg-[#0a192f] rounded-t-lg ml-24"
          />
        </div>

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#0f766e] to-[#84cc16] text-white rounded-full text-sm font-medium mb-4">
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Let's Start Your <span className="text-[#0f766e]">Data Journey</span> Together
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Have questions about our courses? Want to learn more about how DataCliq can help you build a career in
              data? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info - Now first */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
                  <p className="text-slate-600 mb-8">
                    Reach out to us through any of these channels. We're committed to responding within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0f766e]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-[#0f766e]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">Email Us</h3>
                        <p className="text-slate-600 mb-2">For general inquiries and support</p>
                        <a href="mailto:hello@datacliq.com" className="text-[#0f766e] font-medium hover:underline">
                          hello@datacliq.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0f766e]/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-[#0f766e]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">Call Us</h3>
                        <p className="text-slate-600 mb-2">Mon-Fri from 9am to 6pm (EST)</p>
                        <a href="tel:+15551234567" className="text-[#0f766e] font-medium hover:underline">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0f766e]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-[#0f766e]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">Visit Us</h3>
                        <p className="text-slate-600 mb-2">Our office and learning center</p>
                        <address className="text-[#0f766e] font-medium not-italic">
                          123 Data Street, Suite 456
                          <br />
                          New York, NY 10001
                        </address>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {["twitter", "linkedin", "facebook", "instagram"].map((social, index) => (
                      <a
                        key={index}
                        href={`https://${social}.com/datacliq`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-[#0f766e]/10 flex items-center justify-center hover:bg-[#0f766e] hover:text-white transition-colors duration-300"
                      >
                        <span className="sr-only">{social}</span>
                        <div className="h-5 w-5" aria-hidden="true">
                          {/* Simple placeholder for social icons */}
                          {index % 2 === 0 ? <MessageSquare className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Now second */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#0a192f] via-[#0f766e] to-[#84cc16]"></div>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                          Phone Number (Optional)
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          value={formState.phone}
                          onChange={handleChange}
                          className="border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="interest" className="text-sm font-medium text-slate-700">
                          I'm Interested In
                        </label>
                        <Select value={formState.interest} onValueChange={handleSelectChange}>
                          <SelectTrigger className="border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data-analytics">Data Analytics Bootcamp</SelectItem>
                            <SelectItem value="data-science">Data Science Course</SelectItem>
                            <SelectItem value="machine-learning">Machine Learning Fundamentals</SelectItem>
                            <SelectItem value="business-intelligence">Business Intelligence</SelectItem>
                            <SelectItem value="other">Other Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-700">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us what you're looking for..."
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#0f766e] to-[#84cc16] hover:from-[#0a5a54] hover:to-[#65a30d] text-white"
                    >
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordions */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">
              Get quick answers to common questions about our courses and approach.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Do I need prior experience to take your courses?",
                  answer:
                    "No prior experience is required for our beginner courses. We start with the fundamentals and gradually build up to more advanced concepts. For intermediate and advanced courses, we recommend checking the specific prerequisites listed in the course description.",
                },
                {
                  question: "How long does it take to complete a course?",
                  answer:
                    "Our bootcamp is 12 weeks long with part-time and full-time options available. Individual courses vary in length from 4 to 8 weeks, depending on the complexity of the material and depth of coverage.",
                },
                {
                  question: "Do you offer job placement assistance?",
                  answer:
                    "Yes, we provide career support including resume reviews, interview preparation, and connections to our industry partners. While we don't guarantee job placement, we work closely with you to maximize your opportunities.",
                },
                {
                  question: "What makes DataCliq different from other platforms?",
                  answer:
                    "Our focus on small cohorts ensures personalized attention. We emphasize practical, hands-on learning with real-world projects rather than just theory. Our instructors are industry practitioners who bring current, relevant experience to their teaching.",
                },
                {
                  question: "Can I pay in installments?",
                  answer:
                    "Yes, we offer flexible payment plans to make our courses more accessible. You can choose to pay in monthly installments with no interest. Contact our admissions team for more details about payment options.",
                },
                {
                  question: "What if I'm not satisfied with the course?",
                  answer:
                    "We offer a 14-day satisfaction guarantee. If you're not happy with the course within the first two weeks, you can request a full refund. We're confident in the quality of our education, but we want you to feel secure in your investment.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="border-none shadow-lg rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white hover:bg-slate-50 text-left font-semibold text-slate-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-white text-slate-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-600 mb-4">Still have questions? We're here to help!</p>
              <Button className="bg-gradient-to-r from-[#0f766e] to-[#84cc16] hover:from-[#0a5a54] hover:to-[#65a30d] text-white">
                Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                12 weeks of intensive, hands-on training to launch your career in data. Next cohort starts soon!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-5 w-5 text-[#84cc16]" />
                  <span>Live instruction from industry experts</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-5 w-5 text-[#84cc16]" />
                  <span>Real-world projects for your portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-5 w-5 text-[#84cc16]" />
                  <span>Career coaching and job placement assistance</span>
                </li>
              </ul>
              <Button size="lg" className="bg-[#84cc16] hover:bg-[#65a30d] text-[#0a192f] font-medium">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
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

      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0f766e] to-[#84cc16] opacity-80"></div>

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
            <p className="text-lg text-slate-200 mb-8">
              Take the first step toward becoming a data professional. Apply for our next cohort or schedule a call to
              learn more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#0f766e] hover:bg-slate-100 hover:text-[#0a5a54]">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ContactPage
