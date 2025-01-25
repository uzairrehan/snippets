"use client"
import {  useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submit (you can integrate it with your product search logic)
    console.log('Search query:', searchQuery);
  };

  return (
    <div>
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-white text-3xl font-bold">
              MyStore
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 rounded-md text-black focus:outline-none"
              />
              <button type="submit" className="text-white">
                <FaSearch className="h-6 w-6" />
              </button>
            </form>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
              <Link href="/shop" className="text-white hover:text-gray-300">
                Shop
              </Link>
              <Link href="/about" className="text-white hover:text-gray-300">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
              <Link href="/cart" className="text-white hover:text-gray-300">
                <FaShoppingCart className="h-6 w-6" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white">
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="space-y-4">
              <Link href="/" className="block text-white hover:text-gray-300 py-2">
                Home
              </Link>
              <Link href="/shop" className="block text-white hover:text-gray-300 py-2">
                Shop
              </Link>
              <Link href="/about" className="block text-white hover:text-gray-300 py-2">
                About
              </Link>
              <Link href="/contact" className="block text-white hover:text-gray-300 py-2">
                Contact
              </Link>
              <Link href="/cart" className="block text-white hover:text-gray-300 py-2">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome to MyStore</h1>
        {/* Your content here */}
      </main>
    </div>
  );
}
