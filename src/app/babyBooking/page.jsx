"use client";
import React, { useState, useEffect } from "react"; // useEffect যোগ করা হয়েছে
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { postUsers } from "@/action/server/auth";
import { useSession } from "next-auth/react"; // useSession ইমপোর্ট করা হয়েছে

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

const BabyBooking = () => {
  const { data: session, status } = useSession(); // সেশন চেক করার জন্য
  const [service, setService] = useState("Baby Booking");
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState("Hours");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // --- Login Check Logic Start ---
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  // --- Login Check Logic End ---

  const ratePerHours = 500;
  const ratePerDays = 5000;
  const currentTotal =
    type === "Hours" ? ratePerHours * amount : ratePerDays * amount;

  const handleBooking = async () => {
    // --- Validation Start ---
    if (!division || !district || !city || !address) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all location fields (Division, District, City, and Address).",
        confirmButtonColor: "#0ea5e9",
      });
      return;
    }

    if (amount < 1) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Amount must be at least 1.",
        confirmButtonColor: "#0ea5e9",
      });
      return;
    }
    // --- Validation End ---

    setLoading(true);

    const bookingData = {
      service,
      type,
      amount,
      division,
      district,
      city,
      address,
      total: currentTotal,
      status: "pending",
      userEmail: session?.user?.email, // ইউজার ট্র্যাকিং এর জন্য
    };

    try {
      const result = await postUsers(bookingData);

      if (result?.success) {
        Swal.fire({
          icon: "success",
          title: "Baby Booking Successful",
          text: "Booking has been recorded.",
          confirmButtonColor: "#0ea5e9",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Baby Booking Failed",
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

  // স্ট্যাটাস লোডিং থাকলে পেজ কন্টেন্ট দেখাবে না
  if (status === "loading") return null;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Book Baby Care</h1>
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
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option>Baby Booking</option>
                </select>
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
                    <option key={div} value={div}>
                      {div}
                    </option>
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
                  placeholder="Enter district"
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
                placeholder="Enter city"
              />
            </div>

            <div>
              <label>Full Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="House no, Road no, Area..."
              />
            </div>
          </section>

          {/* Summary */}
          <section className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between">
              <span>Baby Care</span>
              <span>
                {type == "Hours"
                  ? `৳ ${ratePerHours} * ${amount} ${type}`
                  : `৳ ${ratePerDays} * ${amount} ${type}`}
              </span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>৳{currentTotal}</span>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-sky-500 text-white py-3 rounded-xl mt-4 cursor-pointer hover:bg-sky-600 transition-colors disabled:bg-sky-300"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BabyBooking;
