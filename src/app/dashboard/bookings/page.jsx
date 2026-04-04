"use client";
import { useEffect, useState } from "react";

export default function Bookings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/feedback") // or your booking API
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Bookings</h1>

      {data.map((item, i) => (
        <div key={i} className="p-4 bg-white mb-3 rounded shadow">
          <p>Type: {item.type}</p>
          <p>Amount: {item.amount}</p>
          <p>Total: ৳{item.total}</p>
        </div>
      ))}
    </div>
  );
}
