"use client";

import { useSession } from "next-auth/react";
import { User, Mail, ShieldCheck, Loader2 } from "lucide-react";
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
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/feedback?email=${session.user.email}`);
          if (res.ok) {
            const dbData = await res.json();

            setUserData({
              name: dbData.name || session.user.name || "N/A",
              email: dbData.email || session.user.email || "N/A",
              image: dbData.image || session.user.image || "",
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);

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
                  {userData.image ? (
                    <img
                      src={userData.image}
                      className="w-full h-full object-cover"
                      alt="Profile"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-avatar.png";
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
