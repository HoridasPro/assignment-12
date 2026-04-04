"use client";

import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <ul className="space-y-4">
          <li><Link href="/dashboard">Home</Link></li>
          <li><Link href="/dashboard/bookings">Bookings</Link></li>
          <li><Link href="/dashboard/users">Users</Link></li>
          <li><Link href="/dashboard/settings">Settings</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-100">
        {children}
      </div>
    </div>
  );
}