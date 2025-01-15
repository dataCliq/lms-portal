'use client';

import Navbar from './_components/navbar'; // Ensure Navbar exists in this location
import { usePathname } from 'next/navigation'; // Import usePathname hook from Next.js

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current path

  // Ensure HomePage renders only when at '/' or '/home'
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.svg')", // Ensure this path points to your actual background image
      }}
    >
      <Navbar />
      {/* Render HomePage only on the root (/) or /home routes */}
      {(pathname === '/' || pathname === '/home') && children}

      {/* Render dynamic children (e.g., course pages) */}
      {(pathname !== '/' && pathname !== '/home') && children}
    </div>
  );
}
