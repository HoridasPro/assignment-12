"use client";
import UserDrapdown from "@/components/userDrapdown";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setData(data.usersData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);
  // User delete handle
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {data.length} Users
      </h1>

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
              <th className="px-6 py-4 border-b">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-600 text-sm">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-lg">
                  Loading Users...
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

                  <UserDrapdown
                    orderId={item._id}
                    initialRole={item.role}
                  ></UserDrapdown>
                  <td className="px-6 py-4">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
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
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">
                  Users Not Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
