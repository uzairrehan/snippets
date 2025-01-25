"use client"
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar3() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-400">MyApp</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-400">
              Dashboard
            </a>
            <a href="#" className="hover:text-blue-400">
              Profile
            </a>
            <a href="#" className="hover:text-blue-400">
              Settings
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block hover:text-blue-400">
              Dashboard
            </a>
            <a href="#" className="block hover:text-blue-400">
              Profile
            </a>
            <a href="#" className="block hover:text-blue-400">
              Settings
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
