"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, Home } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const isUser = session?.user?.role === "user";
  if (!session?.user) {
    return <div className="p-6 text-center">User not available</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-100 text-gray-800 p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-sky-400 flex items-center gap-2">
          <LayoutDashboard size={22} />
          {isUser ? "User Dashboard" : "Admin Dashboard"}
        </h2>

        <ul className="space-y-3">
          {isUser ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition"
                >
                  <Home size={18} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/userBooking"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition"
                >
                  <BookOpen size={18} />
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/userAdminDrapdown"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition"
                >
                  <Users size={18} />
                  Manage Users
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition"
                >
                  <Home size={18} />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/users"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition"
                >
                  <Users size={18} />
                  Manage Users
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/bookings"
                  className="flex items-center gap-3 p-2 rounded-lg ransition"
                >
                  <BookOpen size={18} />
                  All Bookings
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-100 text-gray-800">
        <div className="bg-white p-6 rounded-2xl shadow-md min-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
