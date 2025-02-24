"use client";

import Navbar from "./_components/navbar"; // Ensure Navbar exists in this location
import { usePathname } from "next/navigation"; // Import usePathname hook from Next.js

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current path

  // Ensure HomePage renders only when at '/' or '/home'
  return (
    <div
      className="flex flex-col items-center w-full min-h-screen" // Removed bg-cover, bg-center, bg-no-repeat, and backgroundImage
    >
      <Navbar />
      {/* Render HomePage only on the root (/) or /home routes */}
      {(pathname === "/" || pathname === "/home") && (
        <div
          className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.svg')", // Background image only for homepage
          }}
        >
          {children}
        </div>
      )}

      {/* Render dynamic children (e.g., course pages) with plain white background */}
      {(pathname !== "/" && pathname !== "/home") && (
        <div className="w-full bg-white p-6"> {/* Plain white background for non-homepage pages */}
          {children}
        </div>
      )}
    </div>
  );
}