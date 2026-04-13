"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const AuthButton = ({ isMobile = false, profileImage, userName }) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading")
    return <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />;

  const isAuthenticated = status === "authenticated";

  return (
    <div
      className={`relative flex ${
        isMobile ? "flex-col gap-2 w-full" : "gap-3"
      } items-center`}
      ref={dropdownRef}
    >
      {isAuthenticated ? (
        <>
          {/* Profile Image & Name Section */}
          <div
            className="relative group flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={profileImage || "/default-avatar.png"}
              alt="profile"
              className={`rounded-full border-2 border-sky-100 object-cover ${
                isMobile ? "w-12 h-12" : "w-10 h-10"
              }`}
            />
            {!isMobile && (
              <span
                className="absolute left-1/2 -translate-x-1/2 top-10 
      bg-black text-white text-xs px-2 py-1 rounded
      opacity-0 group-hover:opacity-100 transition
      whitespace-nowrap z-1 font-bold"
              >
                {userName || session?.user?.name || "User"}
              </span>
            )}
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div
              className={`absolute right-0 top-full mt-3 bg-white shadow-xl border border-gray-100 rounded-xl z-50 ${
                isMobile ? "static mt-2 w-full shadow-none border-none" : ""
              }`}
            >
              <div className="flex flex-col p-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-sky-50 text-gray-700 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <FaRegUser className="w-4 h-4 text-sky-500" /> Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                >
                  <IoIosLogOut className="w-5 h-5 text-red-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className={`flex ${isMobile ? "flex-col w-full" : "flex-row"} gap-2`}
        >
          <Link
            href="/login"
            className={`px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center ${
              isMobile ? "w-full" : ""
            }`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors text-center ${
              isMobile ? "w-full" : ""
            }`}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
