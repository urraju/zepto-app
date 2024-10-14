"use client";
import { useState } from "react";
import Link from "next/link";
import logo from "@/public/assets/zepto-logo.png";
import Image from "next/image";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 w-full bg-white z-50 shadow container mx-auto">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-black font-bold text-xl">
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Center: Menu items */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-black hover:text-gray-600">
            Home
          </Link>
          <Link
            href="/pages/wishlist"
            className="text-black hover:text-gray-600"
          >
            Wishlist
          </Link>
        </div>

        {/* Right: Login/Signup */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-orange-500 hover:text-gray-600">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-all duration-300"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block text-black hover:text-gray-300 py-2"
            >
              Home
            </Link>
            <Link
              href="/pages/wishlist"
              className="block text-black hover:text-gray-300 py-2"
            >
              Wishlist
            </Link>
            <Link
              href="/login"
              className="block text-black hover:text-gray-300 py-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
