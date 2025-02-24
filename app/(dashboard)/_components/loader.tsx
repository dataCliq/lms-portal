// app/_components/Loader.tsx
"use client";

import React from "react";

interface LoaderProps {
  isLoading?: boolean; // Optional prop to control visibility
  message?: string; // Optional custom message
}

const Loader: React.FC<LoaderProps> = ({ isLoading = true, message = "Loading Data..." }) => {
  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      <div className="relative w-[200px] h-[100px] flex justify-between items-end"> {/* Increased width from 200px to 300px */}
        {/* Bar 1 */}
        <div className="w-[30px] bg-[#ffbd30] animate-[grow-shrink_1.5s_ease-in-out_infinite] rounded-t"></div>
        {/* Bar 2 */}
        <div className="w-[30px] bg-[#ffbd30] animate-[grow-shrink_1.5s_ease-in-out_0.2s_infinite] rounded-t"></div>
        {/* Bar 3 */}
        <div className="w-[30px] bg-[#ffbd30] animate-[grow-shrink_1.5s_ease-in-out_0.4s_infinite] rounded-t"></div>
        {/* Bar 4 */}
        <div className="w-[30px] bg-[#ffbd30] animate-[grow-shrink_1.5s_ease-in-out_0.6s_infinite] rounded-t"></div>
      </div>
      <p className="mt-4 text-sm text-[#804000] font-medium">{message}</p>
    </div>
  );
};

// CSS Animation for Tailwind (add to your globals.css or a CSS module if needed)
const styles = `
  @keyframes grow-shrink {
    0%, 100% { height: 0; }
    50% { height: 100px; }
  }

  .animate-[grow-shrink_1.5s_ease-in-out_infinite] {
    animation: grow-shrink 1.5s ease-in-out infinite;
  }
  .animate-[grow-shrink_1.5s_ease-in-out_0.2s_infinite] {
    animation: grow-shrink 1.5s ease-in-out 0.2s infinite;
  }
  .animate-[grow-shrink_1.5s_ease-in-out_0.4s_infinite] {
    animation: grow-shrink 1.5s ease-in-out 0.4s infinite;
  }
  .animate-[grow-shrink_1.5s_ease-in-out_0.6s_infinite] {
    animation: grow-shrink 1.5s ease-in-out 0.6s infinite;
  }
  .animate-[grow-shrink_1.5s_ease-in-out_0.8s_infinite] {
    animation: grow-shrink 1.5s ease-in-out 0.8s infinite;
  }
`;

export default Loader;