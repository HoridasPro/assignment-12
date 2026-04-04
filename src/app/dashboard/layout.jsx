// "use client";

// import { useSession } from "next-auth/react";
// import Link from "next/link";

// export default function DashboardLayout({ children }) {
//   const { data: session, status } = useSession();

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-slate-800 text-white p-5">
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>

//         <ul className="space-y-4">
//           {status == "users" ? (
//             <>
//               <li>
//                 <Link href="/dashboard/bookings">Bookings</Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link href="/dashboard/bookings">Bookings</Link>
//               </li>
//               <li>
//                 <Link href="/dashboard/users">Users</Link>
//               </li>
//               <li>
//                 <Link href="/dashboard">Home</Link>
//               </li>
//               <li>
//                 <Link href="/dashboard/settings">Settings</Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-slate-100">{children}</div>
//     </div>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  // সেশন লোড হওয়া পর্যন্ত অপেক্ষা করা ভালো
  if (status === "loading") {
    return <div className="p-6">Loading...</div>;
  }

  // ইউজার এডমিন কি না তা চেক করা
  const isUser = session?.user?.role === "user";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6 text-sky-400">
          {isUser ? "User Dashboard" : "Admin Dashboard"}
        </h2>

        <ul className="space-y-4">
          {/* শুধুমাত্র এডমিন হলে নিচের মেনুগুলো দেখবে */}
          {isUser ? (
            <>
              {/* ইউজার এবং এডমিন উভয়ই এটি দেখবে */}
              <li>
                <Link href="/dashboard" className="hover:text-sky-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="hover:text-sky-400">
                  My Bookings
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dashboard/users" className="hover:text-sky-400">
                  Manage Users
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="hover:text-sky-400">
                  All Bookings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="hover:text-sky-400">
                  Settings
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-100">{children}</div>
    </div>
  );
}
