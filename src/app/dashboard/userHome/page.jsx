"use client";
import React, { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";

const UserHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((result) => {
        setData(result.careData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const pendingBookings = data.filter(
    (item) => item.status === "pending",
  ).length;
  const confirmBookings = data.filter(
    (item) => item.status === "confirm",
  ).length;
  const completedBookings = data.filter(
    (item) => item.status === "completed",
  ).length;

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          State Manegement
        </h1>
        <p className="text-gray-500 mt-1">
          Here is a quick overview of your bookings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Bookings Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-2xl">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Total Bookings
            </p>
            <h2 className="text-3xl font-black text-gray-900">
              {loading ? "..." : data.length}
            </h2>
          </div>
        </div>

        {/* Pending Bookings Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-2xl">
            <FaClock />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Pending
            </p>
            <h2 className="text-3xl font-black text-gray-900">
              {loading ? "..." : pendingBookings}
            </h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-2xl">
            <FaCheckCircle />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Confirm
            </p>
            <h2 className="text-3xl font-black text-gray-900">
              {loading ? "..." : confirmBookings}
            </h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-2xl">
            <FaClipboardCheck />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Completed
            </p>
            <h2 className="text-3xl font-black text-gray-900">
              {loading ? "..." : completedBookings}
            </h2>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mt-10 flex items-center gap-3 text-gray-400 italic">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          Updating stats...
        </div>
      )}
    </div>
  );
};

export default UserHome;
