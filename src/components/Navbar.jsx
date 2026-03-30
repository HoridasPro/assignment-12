"use client";
import { Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Heart
          className="text-[#0ea5e9]"
          size={28}
          fill="#0ea5e9"
          fillOpacity={0.1}
        />
        <h1 className="text-xl font-bold text-gray-800">
          Care<span className="text-[#0ea5e9]">.xyz</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="bg-[#e0f2fe] text-[#0369a1] px-4 py-2 rounded-lg font-medium"
        >
          Home
        </Link>

        {/* Services Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Services
            <ChevronDown
              size={18}
              className={`transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              <Link
                href="/babyCareService"
                className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600"
              >
                Baby Care
              </Link>
              <Link
                href="/elderlyCareService"
                className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600"
              >
                Elderly Care
              </Link>
              <Link
                href="/sickCareService"
                className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600"
              >
                Sick Care
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/aboutSection"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          About
        </Link>
        <Link
          href="contactSection"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Contact
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-6">
        <Link
          href="/loginPage"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Login
        </Link>
        <Link
          href="/registerPage"
          className="bg-[#0ea5e9] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0284c7] transition-colors shadow-md shadow-sky-100"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
