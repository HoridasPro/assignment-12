import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

const RegisterCard = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#e0f7fa] via-white to-[#fff8e1]">
      {/* Register/Create Account Card */}
      <div className="w-full max-w-[500px] bg-white p-12 rounded-[2rem] shadow-2xl shadow-gray-100 border border-gray-100 flex flex-col items-center">
        {/* Top Heart Icon */}
        <div className="mb-6">
          <Heart className="text-[#0ea5e9]" size={36} strokeWidth={1.5} />
        </div>

        {/* Title and Subtitle */}
        <h2
          className="text-3xl font-bold text-[#0f172a] mb-2"
          style={{ fontFamily: "serif" }}
        >
          Create Account
        </h2>
        <p className="text-gray-500 text-sm mb-10 text-center">
          Join Care.xyz to book trusted caregivers
        </p>

        {/* Form */}
        <form className="w-full space-y-5">
          {/* NID Number Field */}
          <div>
            <label className="block text-gray-600 mb-1.5 font-medium text-xs">
              NID Number
            </label>
            <input
              type="text"
              placeholder="National ID"
              className="w-full px-5 py-3 rounded-lg bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Full Name Field */}
          <div>
            <label className="block text-gray-600 mb-1.5 font-medium text-xs">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-5 py-3 rounded-lg bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-600 mb-1.5 font-medium text-xs">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-lg bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Contact Number Field */}
          <div>
            <label className="block text-gray-600 mb-1.5 font-medium text-xs">
              Contact Number
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+880..."
                className="w-full px-5 py-3 rounded-lg bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all placeholder:text-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 mb-1.5 font-medium text-xs">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-lg bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="pb-3">
            <label className="block text-gray-600 mb-1.5 font-medium text-xs">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-lg bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Create Account Button */}
          <button className="w-full bg-[#82d6f6] text-white py-3 rounded-lg font-bold text-base hover:bg-[#0ea5e9] transition-all flex items-center justify-center">
            Create Account
          </button>
        </form>

        {/* Bottom Link */}
        <div className="mt-8 text-center text-xs tracking-wide">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              href="/loginPage"
              className="text-[#0ea5e9] hover:text-[#0284c7] hover:underline transition-colors font-bold"
            >
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
