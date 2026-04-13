// "use client";

// import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { FaRegUser } from "react-icons/fa";
// import { IoIosLogOut } from "react-icons/io";

// const AuthButton = ({ isMobile = false, profileImage }) => {
//   const { data: status } = useSession();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   if (status === "loading") return null;
//   const isAuthenticated = status === "authenticated";

//   return (
//     <div
//       className={`relative flex ${
//         isMobile ? "flex-col gap-2" : "gap-3"
//       } items-center`}
//       ref={dropdownRef}
//     >
//       {isAuthenticated ? (
//         <>
//           {/* Profile Image */}
//           <img
//             src={profileImage || "/default-avatar.png"}
//             alt="profile"
//             onClick={() => setOpen(!open)}
//             className={`cursor-pointer rounded-full object-cover ${
//               isMobile ? "w-12 h-12" : "w-10 h-10"
//             }`}
//           />

//           {/* Dropdown */}
//           {open && (
//             <div
//               className={`absolute right-0 mt-35 w-44 bg-white shadow-lg rounded-xl z-50 ${
//                 isMobile ? "static mt-2 w-full" : ""
//               }`}
//             >
//               <div className="flex flex-col p-2">
//                 <Link
//                   href="/dashboard"
//                   className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded-xl"
//                   onClick={() => setOpen(false)}
//                 >
//                   <FaRegUser className="w-5 h-5" /> Dashboard
//                 </Link>

//                 <button
//                   onClick={() => signOut({ callbackUrl: "/" })}
//                   className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl text-sm text-red-500"
//                 >
//                   <IoIosLogOut className="w-5 h-5 text-red-500" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex gap-2">
//           <Link
//             href="/login"
//             className={`px-5 py-2 border rounded text-sm font-medium ${
//               isMobile ? "w-full text-center" : ""
//             }`}
//           >
//             Login
//           </Link>

//           <Link
//             href="/register"
//             className={`bg-[#0ea5e9] text-white px-5 py-2 rounded text-sm font-medium ${
//               isMobile ? "w-full text-center" : ""
//             }`}
//           >
//             Register
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthButton;
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const AuthButton = ({ isMobile = false, profileImage, userName }) => {
  // ১. সেশন ডাটা এবং স্ট্যাটাস প্রপারলি ডিস্ট্রাকচার করা হয়েছে
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

  // লোডিং অবস্থায় কিছু না দেখানো বা ছোট একটি পালস ইফেক্ট
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
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {!isMobile && (
              <span className="text-sm font-semibold text-gray-700 hidden lg:block">
                {userName || session?.user?.name || "User"}
              </span>
            )}
            <img
              src={profileImage || "/default-avatar.png"}
              alt="profile"
              className={`rounded-full border-2 border-sky-100 object-cover ${
                isMobile ? "w-12 h-12" : "w-10 h-10"
              }`}
            />
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
