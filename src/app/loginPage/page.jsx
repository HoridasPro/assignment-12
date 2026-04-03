import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="  w-full flex items-center justify-center p-10 bg-gradient-to-br from-[#e0f7fa] via-white to-[#fff8e1]">
      <div className="w-full max-w-[480px] bg-white p-12 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 flex flex-col items-center">
        <div className="mb-2">
          <Heart className="text-[#0ea5e9]" size={40} strokeWidth={1.5} />
        </div>

        <h2
          className="text-3xl font-bold text-[#0f172a] mb-3"
          style={{ fontFamily: "serif" }}
        >
          Welcome Back
        </h2>
        <p className="text-gray-500 text-base mb-2">
          Sign in to manage your bookings
        </p>

        <form className="w-full space-y-2">
          <div>
            <label className="block text-gray-600 mb-2 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-4 rounded-xl bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="pb-4">
            <label className="block text-gray-600 mb-2 font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-xl bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all placeholder:text-gray-400"
            />
          </div>

          <button className="w-full bg-[#82d6f6] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0ea5e9] transition-all shadow-lg shadow-sky-100 flex items-center justify-center">
            Login
          </button>
        </form>

        <div className="mt-10 text-center text-sm">
          <p className="text-gray-500">
            Do not have an account?{" "}
            <Link
              href="/registerPage"
              className="text-[#0ea5e9] hover:text-[#0284c7] hover:underline transition-colors font-bold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
