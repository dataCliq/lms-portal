'use client';

import HomePage from './(routes)/home/page'; // Assuming HomePage is located in (routes)/home/page.tsx
import Page from './(routes)/sign-in/[[...sign-in]]/page';
import Navbar from './_components/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.svg')", // Update with the correct path to your background image
        }}
      >
        {/* Navbar and HomePage are part of the dashboard layout */}
        <Navbar />
        <HomePage /> {/* This should be part of the dashboard layout */}
        {children} {/* Render dashboard-specific content */}
      </div>
    </>
  );
}
