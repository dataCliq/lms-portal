import Logo from "./logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 bg-white shadow-md transition-all duration-300`}
    >
      <div className="h-full w-full flex items-center justify-between">
        {/* Logo Section */}
        <a href="#home" className="h-auto w-auto flex items-center">
          <Logo />
        </a>

        {/* Center Links (Hidden on Mobile) */}
        <div className="hidden md:flex w-full md:w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <a href="#home" className="cursor-pointer px-2">
            Home
          </a>
          <a href="#features" className="cursor-pointer px-2">
            Features
          </a>
          <a href="#pricing" className="cursor-pointer px-2">
            Pricing
          </a>
          <a href="#contact" className="cursor-pointer px-2">
            Contact
          </a>
        </div>

        {/* Right Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex flex-row gap-5">
          <div className="border border-[#170F00] px-[30px] py-[10px] rounded-full">
            <a href="#signin" className="cursor-pointer">
              Sign In
            </a>
          </div>
          <div className="bg-[#FDCE39] px-[30px] py-[10px] rounded-full">
            <a href="#signup" className="cursor-pointer">
              Sign Up
            </a>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="flex md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-1/2 h-full bg-white z-50 flex flex-col items-start p-6 gap-6 shadow-lg">
            {/* Close Button */}
            <button
              className="text-gray-700 mb-4 self-end"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Menu Items */}
            <a
              href="#home"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            <hr className="w-full border-t border-gray-300" />

            {/* Sign In and Sign Up Buttons */}
            <a
              href="#signin"
              className="cursor-pointer border border-[#170F00] px-4 py-2 rounded-full text-gray-700 text-left w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </a>
            <a
              href="#signup"
              className="cursor-pointer bg-[#FDCE39] px-4 py-2 rounded-full text-gray-700 text-left w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
