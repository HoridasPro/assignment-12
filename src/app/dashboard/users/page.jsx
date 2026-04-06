"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/userFeedback")
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Users</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm font-semibold">
              <th className="px-6 py-4 border-b">SI NO</th>
              <th className="px-6 py-4 border-b">Image</th>
              <th className="px-6 py-4 border-b">Name</th>
              <th className="px-6 py-4 border-b">Email</th>
              <th className="px-6 py-4 border-b">Role</th>
              <th className="px-6 py-4 border-b">CreatedAt</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-600 text-sm">
            {loading ? (
              <tr>
                
                <td colSpan="6" className="text-center py-10 text-lg">
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

                
                  <td className="px-6 py-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40";
                        }}  
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        No Img
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">{item.email || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs">
                      {item.role || "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
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
