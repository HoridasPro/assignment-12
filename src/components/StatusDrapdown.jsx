"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const StatusDrapdown = ({ orderId, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = async (e) => {
    e.preventDefault();

    const newStatus = e.target.value;
    const oldStatus = status;
    setStatus(newStatus);

    try {
      const res = await fetch(`/api/feedback/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Status updated to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      setStatus(oldStatus);
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
        value={status}
        onChange={handleStatusChange}
        className="p-2 border rounded-lg font-bold text-black bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="pending" className="text-orange-600">
          🕒 Pending
        </option>
        <option value="confirm" className="text-blue-600">
          🔵 Confirm
        </option>
        <option value="completed" className="text-green-600">
          ✅ Completed
        </option>
      </select>
    </td>
  );
};

export default StatusDrapdown;
