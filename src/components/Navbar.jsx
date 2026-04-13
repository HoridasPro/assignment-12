"use client";

import { Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ইউজার ডাটার জন্য স্টেট (Name এবং Image রাখার জন্য)
  const [userData, setUserData] = useState({
    name: "",
    image: "",
  });

  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const isServiceActive = [
    "/babyCareService",
    "/elderlyCareService",
    "/sickCareService",
  ].includes(pathname);

  // ==========================================
  // MONGODB থেকে লেটেস্ট ডাটা ফেচ করা
  // ==========================================
  const loadingUserData = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.email) {
      setUserData({ name: "", image: "" });
      return;
    }

    try {
      // সরাসরি API থেকে লেটেস্ট ডাটা কল করা হচ্ছে
      const res = await fetch(`/api/user?email=${session.user.email}`);
      if (res.ok) {
        const data = await res.json();
        setUserData({
          name: data.name || session.user.name || "User",
          image: data.image || session.user.image || "",
        });
      } else {
        // API এরর দিলে সেশন থেকে ডাটা ব্যাকআপ হিসেবে রাখা
        setUserData({
          name: session.user.name || "User",
          image: session.user.image || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user from DB:", error);
      setUserData({
        name: session?.user?.name || "User",
        image: session?.user?.image || "",
      });
    }
  }, [session, status]);

  // মাউন্ট হওয়ার সময় এবং প্রোফাইল আপডেট ইভেন্ট ঘটলে রান করবে
  useEffect(() => {
    loadingUserData();

    // প্রোফাইল পেজ থেকে পাঠানো কাস্টম ইভেন্ট লিসেনার
    window.addEventListener("profileUpdated", loadingUserData);

    return () => {
      window.removeEventListener("profileUpdated", loadingUserData);
    };
  }, [loadingUserData]);

  return (
    <nav className="max-w-7xl mx-auto bg-white py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Heart className="text-[#0ea5e9]" size={28} />
        <h1 className="text-xl font-bold">
          Care<span className="text-[#0ea5e9]">.xyz</span>
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`px-4 py-2 rounded-lg font-medium ${
            isActive("/") ? "bg-sky-50 text-[#0ea5e9]" : "text-gray-600"
          }`}
        >
          Home
        </Link>

        {/* Services Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className={`flex items-center gap-1 font-medium transition-colors px-4 py-2 rounded-lg ${
              isServiceActive
                ? "text-[#0ea5e9] bg-sky-50"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Services
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 mt-1">
              <Link
                href="/babyCareService"
                className={`block px-4 py-2 transition-colors ${
                  isActive("/babyCareService")
                    ? "bg-sky-50 text-sky-600 font-semibold"
                    : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                }`}
              >
                Baby Care
              </Link>
              <Link
                href="/elderlyCareService"
                className={`block px-4 py-2 transition-colors ${
                  isActive("/elderlyCareService")
                    ? "bg-sky-50 text-sky-600 font-semibold"
                    : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                }`}
              >
                Elderly Care
              </Link>
              <Link
                href="/sickCareService"
                className={`block px-4 py-2 transition-colors ${
                  isActive("/sickCareService")
                    ? "bg-sky-50 text-sky-600 font-semibold"
                    : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                }`}
              >
                Sick Care
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/aboutSection"
          className={`px-4 py-2 font-medium transition-colors rounded-lg ${
            isActive("/aboutSection")
              ? "bg-sky-50 text-[#0ea5e9]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          About
        </Link>
        <Link
          href="/contactSection"
          className={`px-4 py-2 font-medium transition-colors rounded-lg ${
            isActive("/contactSection")
              ? "bg-sky-50 text-[#0ea5e9]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Contact
        </Link>
      </div>

      {/* Auth Buttons - এখানে নাম এবং ইমেজ দুটোই পাস করা হচ্ছে */}
      <div className="flex items-center gap-6">
        <AuthButton profileImage={userData.image} userName={userData.name} />
      </div>
    </nav>
  );
};

export default Navbar;
