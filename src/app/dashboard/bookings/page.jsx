"use client";
import StatusDrapdown from "@/components/StatusDrapdown";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((result) => {
        setData(result.allCareData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Delete failed");

      setData((prevData) => prevData.filter((item) => item._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Item deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Booking Management
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor and update status for all incoming bookings.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  SI NO
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Service Details
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Booking Type
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Location Info
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status Update
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="12" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium italic tracking-wide">
                        Loading Booking Data...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan="12"
                    className="text-center py-20 text-gray-400 font-medium"
                  >
                    No booking data available at the moment.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr
                    key={item._id || i}
                    className="hover:bg-indigo-50/30 transition-colors duration-150"
                  >
                    <td className="px-5 py-5 text-sm font-semibold text-gray-400">
                      {i + 1}
                    </td>

                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-900 font-bold text-base">
                        {item.service || "N/A"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-xs italic">
                          {item.role || "User"}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-indigo-600 text-xs font-semibold uppercase tracking-tighter">
                          Amt: {item.amount || 0}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200">
                        {item.email || "N/A"}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200">
                        {item.type || "N/A"}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-800 font-semibold">
                        {item.city}, {item.district}
                      </p>
                      <p
                        className="text-gray-500 text-xs mt-1 truncate max-w-[180px]"
                        title={item.address}
                      >
                        {item.division} • {item.address}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-center">
                      <div className="inline-block min-w-[120px]">
                        <StatusDrapdown
                          orderId={item._id}
                          initialStatus={item.status || "pending"}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-5 text-center text-sm text-gray-500 italic whitespace-nowrap font-medium">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-5 py-5 text-right">
                      <span className="text-lg font-black text-orange-600 tracking-tight">
                        ৳{item.total || 0}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="group relative p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-90"
                        title="Delete Booking"
                      >
                        <span className="font-bold border border-red-200 px-3 py-2 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-all cursor-pointer">
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
