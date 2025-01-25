"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Links */}
          <div className="flex-1 flex justify-start space-x-6 hidden md:flex">
            <a href="#" className="hover:text-blue-400">
              Home
            </a>
            <a href="#" className="hover:text-blue-400">
              Features
            </a>
          </div>

          {/* Brand */}
          <div className="flex justify-center">
            <span className="text-2xl font-bold text-blue-400">Brand</span>
          </div>

          {/* Right Links */}
          <div className="flex-1 flex justify-end space-x-6 hidden md:flex">
            <a href="#" className="hover:text-blue-400">
              Pricing
            </a>
            <a href="#" className="hover:text-blue-400">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-4 py-3 space-y-2">
            <a href="#" className="block hover:text-blue-400">
              Home
            </a>
            <a href="#" className="block hover:text-blue-400">
              Features
            </a>
            <a href="#" className="block hover:text-blue-400">
              Pricing
            </a>
            <a href="#" className="block hover:text-blue-400">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
