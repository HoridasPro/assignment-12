"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const UserDrapdown = ({ orderId, initialRole }) => {
  const [role, setRole] = useState(initialRole);

  const handleStatusChange = async (e) => {
    e.preventDefault();

    const newRole = e.target.value;
    const oldRole = role;
    setRole(newRole);

    try {
      const res = await fetch(`/api/feedback/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Status updated to ${newRole}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      setRole(oldRole);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };
  return (
    <td className="px-6 py-4 text-center">
      <select
        value={role}
        onChange={handleStatusChange}
        className="p-2 border rounded-lg font-bold text-black bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="admin" className="text-orange-600">
          🛡️ Admin
        </option>
        <option value="user" className="text-orange-600">
          👤 User
        </option>
      </select>
    </td>
  );
};

export default UserDrapdown;
