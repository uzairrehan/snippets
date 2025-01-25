"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Logo</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Services
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-2">
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              About
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Services
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
