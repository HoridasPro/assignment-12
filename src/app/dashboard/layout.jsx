// "use client";

// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { LayoutDashboard, Users, BookOpen, Home } from "lucide-react";
// import { usePathname } from "next/navigation"; // Active link bujhar jonno

// export default function DashboardLayout({ children }) {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();

//   if (status === "loading") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <div className="animate-pulse text-lg font-medium text-slate-500">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   const isUser = session?.user?.role === "user";
//   if (!session?.user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <div className="text-lg font-medium text-red-500">
//           User not available
//         </div>
//       </div>
//     );
//   }

//   // Active Link Styling Function
//   const isActive = (path) => pathname === path;

//   const navLinkClass = (path) => `
//     flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
//     ${
//       isActive(path)
//         ? "bg-sky-500 text-white shadow-md shadow-sky-200"
//         : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
//     }
//   `;

//   return (
//     <div className="flex min-h-screen bg-slate-50 font-sans items-start">
//       {/* Sidebar - Sticky Version */}
//       <aside className=" bg-white border-r border-slate-200 p-6 flex flex-col shadow-sm   sticky top-0">
//         <div className="mb-10 px-2">
//           <h2 className="text-2xl font-extrabold text-sky-500 flex items-center gap-3 tracking-tight">
//             <div className="bg-sky-500 p-2 rounded-lg text-white">
//               <LayoutDashboard size={24} />
//             </div>
//             <span>{isUser ? "User" : "Admin"} Panel</span>
//           </h2>
//           {/* User Info at Bottom */}
//           <div className="overflow-hidden text-center">
//             <p className="text-sm font-semibold text-slate-800 truncate">
//               {session?.user?.name}
//             </p>
//             <p className="text-xs text-slate-500 truncate">
//               {session.user.email}
//             </p>
//           </div>
//         </div>

//         <nav className="  overflow-y-auto">
//           <ul className="space-y-2">
//             {isUser ? (
//               <>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     className={navLinkClass("/dashboard")}
//                   >
//                     <Home size={20} />
//                     <span className="font-medium">Home</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/userBooking"
//                     className={navLinkClass("/dashboard/userBooking")}
//                   >
//                     <BookOpen size={20} />
//                     <span className="font-medium">My Bookings</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/profile"
//                     className={navLinkClass("/dashboard/profile")}
//                   >
//                     <Users size={20} />
//                     <span className="font-medium">Profile</span>
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     className={navLinkClass("/dashboard")}
//                   >
//                     <Home size={20} />
//                     <span className="font-medium">Home</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/users"
//                     className={navLinkClass("/dashboard/users")}
//                   >
//                     <Users size={20} />
//                     <span className="font-medium">Manage Users</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/bookings"
//                     className={navLinkClass("/dashboard/bookings")}
//                   >
//                     <BookOpen size={20} />
//                     <span className="font-medium">Manage All Bookings</span>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-h-screen">
//         <div className="p-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[calc(100vh-64px)] p-8">
//               {children}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse text-lg font-medium text-slate-500">
          Loading...
        </div>
      </div>
    );
  }

  const isUser = session?.user?.role === "user";

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-lg font-medium text-red-500">
          User not available
        </div>
      </div>
    );
  }

  const isActive = (path) => pathname === path;

  const navLinkClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${
      isActive(path)
        ? "bg-sky-500 text-white shadow-md shadow-sky-200"
        : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
    }
  `;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar - FIXED (this is the only real solution) */}
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col shadow-sm fixed top-0 left-0 h-screen">
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-extrabold text-sky-500 flex items-center gap-3 tracking-tight">
            <div className="bg-sky-500 p-2 rounded-lg text-white">
              <LayoutDashboard size={24} />
            </div>
            <span>{isUser ? "User" : "Admin"} Panel</span>
          </h2>

          <div className="mt-4 px-2 overflow-hidden text-left">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {session.user.email}
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {isUser ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className={navLinkClass("/dashboard")}
                  >
                    <Home size={20} />
                    <span className="font-medium">Home</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/userBooking"
                    className={navLinkClass("/dashboard/userBooking")}
                  >
                    <BookOpen size={20} />
                    <span className="font-medium">My Bookings</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/profile"
                    className={navLinkClass("/dashboard/profile")}
                  >
                    <Users size={20} />
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className={navLinkClass("/dashboard")}
                  >
                    <Home size={20} />
                    <span className="font-medium">Home</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/users"
                    className={navLinkClass("/dashboard/users")}
                  >
                    <Users size={20} />
                    <span className="font-medium">Manage Users</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/bookings"
                    className={navLinkClass("/dashboard/bookings")}
                  >
                    <BookOpen size={20} />
                    <span className="font-medium">Manage All Bookings</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content (just add margin) */}
      <main className="flex-1 ml-72">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[calc(100vh-64px)] p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// "use client";

// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { LayoutDashboard, Users, BookOpen, Home } from "lucide-react";
// import { usePathname } from "next/navigation";

// export default function DashboardLayout({ children }) {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();

//   if (status === "loading") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <div className="animate-pulse text-lg font-medium text-slate-500">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   const isUser = session?.user?.role === "user";
//   if (!session?.user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <div className="text-lg font-medium text-red-500">
//           User not available
//         </div>
//       </div>
//     );
//   }

//   const isActive = (path) => pathname === path;

//   const navLinkClass = (path) => `
//     flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
//     ${
//       isActive(path)
//         ? "bg-sky-500 text-white shadow-md shadow-sky-200"
//         : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
//     }
//   `;

//   return (
//     <div className="flex min-h-screen bg-slate-50 font-sans">
//       {/* Sidebar - Fixed Full Height */}
//       <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col shadow-sm sticky top-0 h-screen">
//         <div className="mb-10 px-2">
//           <h2 className="text-2xl font-extrabold text-sky-500 flex items-center gap-3 tracking-tight">
//             <div className="bg-sky-500 p-2 rounded-lg text-white">
//               <LayoutDashboard size={24} />
//             </div>
//             <span>{isUser ? "User" : "Admin"} Panel</span>
//           </h2>
//           <div className="mt-4 px-2 overflow-hidden text-left">
//             <p className="text-sm font-semibold text-slate-800 truncate">
//               {session?.user?.name}
//             </p>
//             <p className="text-xs text-slate-500 truncate">
//               {session.user.email}
//             </p>
//           </div>
//         </div>

//         <nav className="flex-1 overflow-y-auto">
//           <ul className="space-y-2">
//             {isUser ? (
//               <>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     className={navLinkClass("/dashboard")}
//                   >
//                     <Home size={20} />
//                     <span className="font-medium">Home</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/userBooking"
//                     className={navLinkClass("/dashboard/userBooking")}
//                   >
//                     <BookOpen size={20} />
//                     <span className="font-medium">My Bookings</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/profile"
//                     className={navLinkClass("/dashboard/profile")}
//                   >
//                     <Users size={20} />
//                     <span className="font-medium">Profile</span>
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     href="/dashboard"
//                     className={navLinkClass("/dashboard")}
//                   >
//                     <Home size={20} />
//                     <span className="font-medium">Home</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/users"
//                     className={navLinkClass("/dashboard/users")}
//                   >
//                     <Users size={20} />
//                     <span className="font-medium">Manage Users</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/bookings"
//                     className={navLinkClass("/dashboard/bookings")}
//                   >
//                     <BookOpen size={20} />
//                     <span className="font-medium">Manage All Bookings</span>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content - Full height with scrolling */}
//       <main className="flex-1 h-screen overflow-y-auto">
//         <div className="p-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[calc(100vh-64px)] p-8">
//               {children}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
