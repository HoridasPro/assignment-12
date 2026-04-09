"use client";
import { useEffect, useState } from "react";

export default function UserBookings() {
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
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and view all your service bookings below.
          </p>
        </div>
        <div className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-700 rounded-full w-fit">
          Total Bookings: {data.length}
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
                  Booking Type
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="13" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium italic">
                        Fetching your data...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center py-20 text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr
                    key={item._id || i}
                    className="hover:bg-blue-50/30 transition-colors duration-150"
                  >
                    <td className="px-5 py-5 text-sm font-semibold text-gray-400">
                      {i + 1}
                    </td>

                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-900 font-bold">
                        {item.service || "N/A"}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5 capitalize italic">
                        {item.role || "User"}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold">
                        {item.type || "N/A"}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-800 font-medium">
                        {item.city}, {item.district}
                      </p>
                      <p className="text-gray-500 text-xs truncate max-w-[150px]">
                        {item.address}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-center">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold border ${
                          item.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : item.status === "Accepted"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-center text-sm text-gray-500 italic whitespace-nowrap">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-5 py-5 text-right">
                      <span className="text-lg font-black text-orange-600 tracking-tight">
                        ৳{item.total || 0}
                      </span>
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
