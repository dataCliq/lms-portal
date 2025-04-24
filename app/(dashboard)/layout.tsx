"use client";

import Navbar from "./_components/navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      {pathname === "/" || pathname === "/home" ? (
        <div
          className="flex flex-col w-full min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.svg')",
          }}
        >
          {children}
        </div>
      ) : (
        <div className="w-full bg-white min-h-screen">
          {children}
        </div>
      )}
    </div>
  );
}