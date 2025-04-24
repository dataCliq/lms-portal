"use client";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-[#0F172A] via-[#00A3B5] to-[#68D391] text-white py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:pl-12 lg:pr-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo/Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-white mb-4">DataCiq</h3>
            <p className="text-gray-200 text-sm text-center md:text-left w-[200px]">
              Empowering learning with innovative courses and resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="ml-14">
            <h4 className="text-lg font-semibold mb-4 ">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Courses", href: "/courses" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-200">
              <li>Email: <a href="mailto:support@yoursite.com" className="hover:text-white transition-colors duration-300">support@yoursite.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors duration-300">+1 (234) 567-890</a></li>
              <li>Address: 123 Learning Lane, Education City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start ml-16">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              {[
                {
                  name: "Twitter",
                  href: "https://twitter.com",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  href: "https://instagram.com",
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.982-6.98.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-gray-200 text-sm border-t border-gray-300/20 pt-6">
          <p>© {currentYear} DataCliq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;