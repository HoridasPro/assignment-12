"use client";
import { useEffect, useState } from "react";

export default function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Booking Page</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm font-semibold">
              <th className="px-6 py-4 border-b">SI NO</th>
              <th className="px-6 py-4 border-b">Service</th>
              <th className="px-6 py-4 border-b">Booking Type</th>
              <th className="px-6 py-4 border-b">Amount</th>
              <th className="px-6 py-4 border-b">Role</th>
              <th className="px-6 py-4 border-b">Divition</th>
              <th className="px-6 py-4 border-b">City</th>
              <th className="px-6 py-4 border-b">District</th>
              <th className="px-6 py-4 border-b">Address</th>
              <th className="px-6 py-4 border-b">Status</th>
              <th className="px-6 py-4 border-b">CreatedAt</th>
              <th className="px-6 py-4 border-b text-right">Total Price</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-600 text-sm">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-lg">
                  Loading bookings...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 border-b transition-colors duration-200"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.service || 0}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.type || "N/A"}
                  </td>
                  <td className="px-6 py-4">{item.amount || 0}</td>
                  <td className="px-6 py-4">{item.role || 0}</td>
                  <td className="px-6 py-4">{item.division || 0}</td>
                  <td className="px-6 py-4">{item.district || 0}</td>
                  <td className="px-6 py-4">{item.city || 0}</td>
                  <td className="px-6 py-4">{item.address || 0}</td>
                  <button className="btn bg-red-500 mt-3 rounded-xl">
                    <td className="px-4 py-1 text-white font-bold">
                      {item.status || 0}
                    </td>
                  </button>
                  <td className="px-6 py-3">{item.createdAt || 0}</td>
                  <td className="px-6 py-4 text-right font-bold text-orange-600">
                    ৳{item.total || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
