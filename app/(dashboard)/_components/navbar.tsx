"use client"

import Logo from "./logo"
import { Menu, X, User } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getCurrentUser, logout } from "@/lib/api-client"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser()
      setUser(userData)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div
      className={`w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md" // Glass effect when scrolled
          : "bg-transparent" // Transparent background initially
      }`}
    >
      <div className="h-full w-full flex items-center justify-between">
        {/* Logo Section */}
        <a href="#home" className="h-auto w-auto flex items-center">
          <Logo />
        </a>

        {/* Center Links (Hidden on Mobile) */}
        <div className="hidden md:flex w-full md:w-[600px] h-full flex-row items-center justify-between md:mr-20">
          <Link href="/home" className="cursor-pointer px-2">
            Home
          </Link>
          <Link href="/courses" className="cursor-pointer px-2">
            Courses
          </Link>
          <Link href="#contact" className="cursor-pointer px-2">
            Bootcamp
          </Link>
          <Link href="#contact" className="cursor-pointer px-2">
            About
          </Link>
          <Link href="#contact" className="cursor-pointer px-2">
            Blog
          </Link>
          <Link href="#contact" className="cursor-pointer px-2">
            Contact Us
          </Link>
        </div>

        {/* Right Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex flex-row gap-5">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 border border-[#170F00] px-[15px] py-[10px] rounded-full"
              >
                <User size={16} />
                <span>{user.name}</span>
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
              <div className="border border-[#170F00] px-[30px] py-[10px] rounded-full">
                <Link href="/signin" className="cursor-pointer">
                  Sign In
                </Link>
              </div>
              <div className="bg-[#10B981] text-white font-bold px-[30px] py-[10px] rounded-full">
                <Link href="/signup" className="cursor-pointer">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="flex md:hidden text-gray-700" onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-1/2 h-full bg-white z-50 flex flex-col items-start p-6 gap-6 shadow-lg">
            {/* Close Button */}
            <button className="text-gray-700 mb-4 self-end" onClick={() => setIsMenuOpen(false)}>
              <X size={28} />
            </button>

            {/* Menu Items */}
            <Link
              href="/home"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="#resources"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="#bootcamp"
              className="cursor-pointer w-full text-left text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Bootcamp
            </Link>

            <hr className="w-full border-t border-gray-300" />

            {/* Sign In and Sign Up Buttons or User Menu */}
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="cursor-pointer w-full text-left text-gray-800 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="cursor-pointer w-full text-left text-gray-800 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="cursor-pointer w-full text-left text-gray-800 font-medium">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="cursor-pointer border border-[#170F00] px-4 py-2 rounded-full text-gray-700 text-left w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="cursor-pointer bg-[#10B981] text-white px-4 py-2 rounded-full text-left w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
