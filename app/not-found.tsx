"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./(dashboard)/_components/navbar";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

   return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* SVG Background */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full z-0 overflow-hidden">
        <Image
          src="/404-2.svg"
          alt="404 Background"
          width={0}
          height={0}
          className="w-full h-auto object-cover object-center"
          quality={100}
          priority
        />
      </div>

      {/* Main Content */}
      <motion.main
        className="flex-1 flex items-center justify-center px-4 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl w-full space-y-4 text-center rounded-lg">
          {/* 404 Header */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-black">
              404
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-4">
              Oops! We Lost That Page
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-md mx-auto mt-4">
              It seems the page you’re looking for has wandered off. No worries—we’ll help you find your way back to something great!
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div variants={itemVariants}>
            <Link href="/">
              <button className="mt-6 px-6 py-2 bg-[#10B981] text-white font-semibold rounded-full hover:bg-[#0FA070] transition-colors duration-300">
                Take Me Home
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}