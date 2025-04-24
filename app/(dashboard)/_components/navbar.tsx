"use client"

import Logo from "./logo"
import { Menu, X, User, ChevronLeft, Home } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/api-client"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if current page is home page
  const isHomePage = pathname === "/" || pathname === "/home"

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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isUserMenuOpen && !target.closest('[data-user-menu="true"]')) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isUserMenuOpen])

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      window.location.href = "/signin"
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  // Determine navbar background style based on page and scroll position
  const navbarBgClass = isHomePage
    ? isScrolled
      ? "bg-white/90 backdrop-blur-md shadow-md"
      : "bg-transparent"
    : isScrolled
      ? "bg-white/90 backdrop-blur-md shadow-md"
      : "bg-white shadow-sm"

  // Determine text color based on page and scroll position
  const textColorClass = isHomePage && !isScrolled ? "text-white" : "text-gray-800"

  return (
    <div className={`w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 transition-all duration-300 ${navbarBgClass}`}>
      <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          {/* Back button for course pages */}
          {pathname.includes("/course/") && (
            <Link
              href="/courses"
              className="mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Back to courses"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          )}

          {/* Home button for non-home pages */}
          {/* {!isHomePage && !pathname.includes("/course/") && (
            // <Link
            //   href="/home"
            //   className="mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            //   aria-label="Go to home"
            // >
            //   <Home className="h-5 w-5" />
            </Link>
          )} */}

          <Link href="/home" className="h-auto w-auto flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Center Links (Hidden on Mobile) */}
        <div className="hidden md:flex h-full flex-row items-center justify-center gap-1 lg:gap-6">
          <Link
            href="/home"
            className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
              pathname === "/home" ? "font-medium" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
              pathname === "/courses" ? "font-medium" : ""
            }`}
          >
            Courses
          </Link>
          <Link
            href="/bootcamp"
            className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
              pathname === "/bootcamp" ? "font-medium" : ""
            }`}
          >
            Bootcamp
          </Link>
          <Link
            href="/about"
            className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
              pathname === "/about" ? "font-medium" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/case-study"
            className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
              pathname === "/case-study" ? "font-medium" : ""
            }`}
          >
            Case Studies
          </Link>
          <Link
            href="/contact"
            className={`cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100/80 transition-colors ${
              pathname === "/contact" ? "font-medium" : ""
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right Buttons (Hidden on Mobile) */}
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

        {/* Hamburger Menu for Mobile */}
        <button
          className="flex md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100/80"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} aria-hidden="true"></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white z-50 flex flex-col items-start p-6 gap-6 shadow-lg overflow-y-auto">
            {/* Close Button */}
            <button
              className="text-gray-700 mb-4 self-end p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Menu Items */}
            <Link
              href="/home"
              className={`cursor-pointer w-full text-left py-2 font-medium ${
                pathname === "/home" ? "text-[#0293A6]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`cursor-pointer w-full text-left py-2 font-medium ${
                pathname === "/courses" ? "text-[#0293A6]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/bootcamp"
              className={`cursor-pointer w-full text-left py-2 font-medium ${
                pathname === "/bootcamp" ? "text-[#0293A6]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Bootcamp
            </Link>
            <Link
              href="/about"
              className={`cursor-pointer w-full text-left py-2 font-medium ${
                pathname === "/about" ? "text-[#0293A6]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/case-studies"
              className={`cursor-pointer w-full text-left py-2 font-medium ${
                pathname === "/case-studies" ? "text-[#0293A6]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              href="/contact"
              className={`cursor-pointer w-full text-left py-2 font-medium ${
                pathname === "/contact" ? "text-[#0293A6]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <hr className="w-full border-t border-gray-200 my-2" />

            {/* Sign In and Sign Up Buttons or User Menu */}
            {user ? (
              <>
                <div className="w-full py-2 px-3 bg-gray-100 rounded-lg mb-4">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="font-medium text-gray-900 truncate">{user.name}</p>
                </div>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="cursor-pointer w-full text-left py-2 text-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="cursor-pointer w-full text-left py-2 text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full text-left py-2 text-red-600 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="w-full flex flex-col gap-3 mt-2">
                <Link
                  href="/signin"
                  className="cursor-pointer border border-[#0293A6] text-[#0293A6] px-4 py-2 rounded-full text-center w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="cursor-pointer bg-[#0293A6] text-white px-4 py-2 rounded-full text-center w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
