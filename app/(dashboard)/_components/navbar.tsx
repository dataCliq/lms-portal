"use client";

import Logo from "./logo";
import { Menu, X, User, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/api-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/home";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isUserMenuOpen && !target.closest('[data-user-menu="true"]')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navbarBgClass = isHomePage
    ? isScrolled
      ? "bg-white/90 backdrop-blur-md shadow-md"
      : "bg-transparent"
    : isScrolled
    ? "bg-white/90 backdrop-blur-md shadow-md"
    : "bg-white shadow-sm";

  const textColorClass = isHomePage && !isScrolled ? "text-white" : "text-gray-800";

  return (
    <div className={`w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 transition-all duration-300 ${navbarBgClass}`}>
      <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Back Button */}
        <div className="flex items-center gap-2">
          {/* {pathname.includes("/course/") && (
            // <Link href="/courses" className="mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Back to courses">
            //   <ChevronLeft className="h-5 w-5" />
            // </Link>
          )} */}
          <Link href="/home" className="h-auto w-auto flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex h-full flex-row items-center justify-center gap-1 lg:gap-6">
          {[
            { label: "Home", href: "/home" },
            { label: "Courses", href: "/courses" },
            { label: "Bootcamp", href: "/bootcamp" },
            { label: "About", href: "/about" },
            { label: "Case Studies", href: "/case-study" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
                pathname === href ? "font-medium" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Side - User Buttons */}
        <div className="hidden md:flex flex-row gap-3 lg:gap-5">
          {user ? (
            <div className="relative" data-user-menu="true">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 border border-[#0293A6] px-3 py-2 rounded-full hover:bg-[#0293A6]/5 transition-colors"
              >
                <User size={16} className="text-[#0293A6]" />
                <span className="text-[#0293A6] max-w-[100px] truncate">{user.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="border border-[#0293A6] text-[#0293A6] px-4 py-2 rounded-full hover:bg-[#0293A6]/5 transition-colors text-sm lg:text-base lg:px-6"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#0293A6] text-white font-medium px-4 py-2 rounded-full hover:bg-[#026d7d] transition-colors text-sm lg:text-base lg:px-6"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="flex md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100/80"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} aria-hidden="true"></div>
          <div className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white z-50 flex flex-col items-start p-6 gap-6 shadow-lg overflow-y-auto">
            <button
              className="text-gray-700 mb-4 self-end p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {[
              { label: "Home", href: "/home" },
              { label: "Courses", href: "/courses" },
              { label: "Bootcamp", href: "/bootcamp" },
              { label: "About", href: "/about" },
              { label: "Case Studies", href: "/case-study" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`cursor-pointer w-full text-left py-2 font-medium ${
                  pathname === href ? "text-[#0293A6]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
