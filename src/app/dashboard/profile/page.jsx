// "use client";

// import { useSession } from "next-auth/react";
// import { User, Mail, ShieldCheck, Camera, Save, X, Loader2 } from "lucide-react";
// import { useState, useEffect } from "react";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // মেইন ডাটা স্টেট
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     image: "",
//   });

//   // ১. ডাটাবেজ থেকে ইউজারের লেটেস্ট ডাটা লোড করা
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (session?.user?.email) {
//         try {
//           const res = await fetch(`/api/user?email=${session.user.email}`);
//           if (res.ok) {
//             const userData = await res.json();
//             setData({
//               name: userData.name || session.user.name || "",
//               email: userData.email || session.user.email || "",
//               image: userData.image || session.user.image || "",
//             });
//           }
//         } catch (error) {
//           console.error("Error loading profile:", error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [session]);

//   // ২. ইমেজ হ্যান্ডেল (Base64 এ কনভার্ট করা)
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         alert("Image size must be under 2MB");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setData((prev) => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // ৩. ডাটাবেজে ডাটা সেভ করা (Save to MongoDB)
//   const handleSave = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/user", {
//         method: "PUT", // অথবা POST আপনার API অনুযায়ী
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: data.email,
//           name: data.name,
//           image: data.image,
//         }),
//       });

//       if (res.ok) {
//         setIsEditing(false);
//         // নেভবারকে জানান দেওয়া যে প্রোফাইল আপডেট হয়েছে
//         window.dispatchEvent(new Event("profileUpdated"));
//         alert("Profile updated successfully!");
//       } else {
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (status === "loading") return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-sky-500" size={40} /></div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 min-h-screen bg-[#ECFAFB]">
//       <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
//         <div className="flex flex-col md:flex-row items-center gap-8">

//           {/* প্রোফাইল ইমেজ সেকশন */}
//           <div className="relative group">
//             <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-sky-100 shadow-md bg-slate-50 flex items-center justify-center">
//               {data.image ? (
//                 <img
//                   src={data.image}
//                   className="w-full h-full object-cover"
//                   alt="Profile"
//                 />
//               ) : (
//                 <User size={50} className="text-slate-300" />
//               )}
//             </div>

//             {isEditing && (
//               <label className="absolute bottom-[-10px] right-[-10px] bg-sky-500 p-2 rounded-xl text-white cursor-pointer shadow-lg hover:bg-sky-600 transition">
//                 <Camera size={20} />
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                 />
//               </label>
//             )}
//           </div>

//           {/* ইনফরমেশন সেকশন */}
//           <div className="flex-1 space-y-3 text-center md:text-left">
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                 Full Name
//               </label>
//               {isEditing ? (
//                 <input
//                   className="w-full md:w-auto block text-2xl font-bold border-b-2 border-sky-400 outline-none px-2 bg-sky-50/50 rounded-t-md text-slate-800"
//                   value={data.name}
//                   onChange={(e) => setData({ ...data, name: e.target.value })}
//                   autoFocus
//                 />
//               ) : (
//                 <h2 className="text-3xl font-extrabold text-slate-800">
//                   {data.name || "N/A"}
//                 </h2>
//               )}
//             </div>

//             <div className="flex flex-col md:flex-row gap-4 text-slate-500 font-medium">
//               <p className="flex items-center justify-center md:justify-start gap-2">
//                 <Mail size={18} className="text-sky-400" />
//                 {data.email}
//               </p>
//               <p className="flex items-center justify-center md:justify-start gap-2">
//                 <ShieldCheck size={18} className="text-emerald-400" />
//                 <span className="bg-emerald-50 text-emerald-600 px-3 py-0.5 rounded-full text-xs font-bold border border-emerald-100 uppercase">
//                   {session?.user?.role || "User"}
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* অ্যাকশন বাটন */}
//           <div className="flex gap-3">
//             {!isEditing ? (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="px-6 py-2.5 bg-white border-2 border-sky-500 text-sky-600 font-bold rounded-xl hover:bg-sky-500 hover:text-white transition-all shadow-md"
//               >
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
//                   disabled={isLoading}
//                 >
//                   <X size={24} />
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   disabled={isLoading}
//                   className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition shadow-lg shadow-sky-200 disabled:opacity-50"
//                 >
//                   {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  ShieldCheck,
  Loader2,
  Calendar,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // ১. প্রথমে চেক করছি সেশনে ইমেইল আছে কি না
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/feedback?email=${session.user.email}`);
          if (res.ok) {
            const dbData = await res.json();

            setUserData({
              // ২. ডাটাবেজে ডাটা থাকলে সেটা নিবে, না থাকলে সেশন থেকে নিবে
              name: dbData.name || session.user.name || "N/A",
              email: dbData.email || session.user.email || "N/A",
              image: dbData.image || session.user.image || "",
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);
          // ৩. এরর হলে সেশনের ডাটা সেট করে দিবে যেন খালি না থাকে
          setUserData({
            name: session.user.name || "N/A",
            email: session.user.email || "N/A",
            image: session.user.image || "",
          });
        }
      }
    };

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-sky-500" size={45} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f9ff] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-sky-100/50 overflow-hidden border border-white">
          <div className="h-32 bg-gradient-to-r from-sky-400 to-blue-500" />

          <div className="px-8 pb-10">
            <div className="relative flex flex-col items-center -mt-16">
              <div className="relative">
                <div className="w-36 h-36 rounded-3xl overflow-hidden border-8 border-white shadow-xl bg-slate-100 flex items-center justify-center">
                  {/* ৪. এখানে ইমেজ সোর্স চেক করা হচ্ছে */}
                  {userData.image ? (
                    <img
                      src={userData.image}
                      className="w-full h-full object-cover"
                      alt="Profile"
                      onError={(e) => {
                        // যদি ইমেজ লোড হতে ফেইল করে তবে ইউজার আইকন দেখাবে
                        e.target.onerror = null;
                        e.target.src = "/default-avatar.png"; // আপনার পাবলিক ফোল্ডারে এই নামে ছবি থাকতে হবে
                      }}
                    />
                  ) : (
                    <User size={60} className="text-slate-300" />
                  )}
                </div>
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full shadow-sm" />
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  {userData.name}
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="bg-sky-50 text-sky-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-sky-100">
                    {session?.user?.role || "Member"}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Mail className="text-sky-500" size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    Email Address
                  </p>
                  <p className="text-slate-700 font-semibold">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <ShieldCheck className="text-emerald-500" size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    Account Status
                  </p>
                  <p className="text-slate-700 font-semibold text-emerald-600">
                    Verified User
                  </p>
                </div>
              </div>

              {/* বাকি আইটেমগুলো আগের মতোই থাকবে */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
