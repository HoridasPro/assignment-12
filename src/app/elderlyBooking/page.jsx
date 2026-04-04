"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { postUsers } from "@/action/server/auth";
 
 

const divisions = [
  "Dhaka",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
  "Chattogram",
];

const ElderlyBooking = () => {
  const [service, setService] = useState("");
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState("Hours");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const ratePerUnit = 500;

  const handleBooking = async () => {
    setLoading(true);

    const bookingData = {
      service,
      type,
      amount,
      division,
      district,
      city,
      address,
      total: ratePerUnit * amount,
      status: "pending",
    };

    try {
      const result = await postUsers(bookingData);

      if (result?.success) {
        Swal.fire({
          icon: "success",
          title: "Elderly Booking Successful",
          text: "Redirecting...",
          confirmButtonColor: "#0ea5e9",
        }).then(() => {
          router.push("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Elderly Booking Failed",
          text: result?.message || "Something went wrong",
          confirmButtonColor: "#0ea5e9",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Book Elderly Care
          </h1>
          <p className="text-slate-500 mt-1">
            Fill in the details below to book your caregiver.
          </p>
        </div>

        <div className="space-y-6">
          {/* Duration */}
          <section className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-sky-500" />
              <h2 className="font-semibold text-sm">Duration</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label>Service</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label>Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option>Hours</option>
                  <option>Days</option>
                </select>
              </div>

              <div>
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  min={1}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-sky-500" />
              <h2 className="font-semibold text-sm">Location</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Division</label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select division</option>
                  {divisions.map((div) => (
                    <option key={div}>{div}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label>Full Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </section>

          {/* Summary */}
          <section className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between">
              <span>Baby Care</span>
              <span>
                ৳{ratePerUnit} × {amount} {type}
              </span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>৳{ratePerUnit * amount}</span>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-sky-500 text-white py-3 rounded-xl mt-4 cursor-pointer"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ElderlyBooking;
