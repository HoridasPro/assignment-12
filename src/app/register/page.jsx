"use client";

import SocialLogin from "@/components/SocialLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import { postUser } from "@/actions/server/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({
    number: "",
    name: "",
    email: "",
    ConNumber: "",
    image: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const number = form.number.value.trim();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const ConNumber = form.ConNumber.value.trim();
    const password = form.password.value.trim();
    const image = imageUrl.trim();

    let hasError = false;
    const newErrors = {
      number: "",
      name: "",
      email: "",
      ConNumber: "",
      image: "",
      password: "",
    };
    // NID No
    if (!number) {
      newErrors.number = "NID number is required";
      hasError = true;
    } else if (number.length < 10) {
      newErrors.number = "NID number must be 10 numbers";
      hasError = true;
    }

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }
    // Contact Number
    if (!ConNumber) {
      newErrors.ConNumber = "Contact number is required";
      hasError = true;
    } else if (ConNumber.length < 11) {
      newErrors.ConNumber = "Contact number must be 11 numbers";
      hasError = true;
    }

    // Image validation
    if (!image) {
      newErrors.image = "Photo is required";
      hasError = true;
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image)
    ) {
      newErrors.image = "Invalid photo URL";
      hasError = true;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const result = await postUser({
        number,
        name,
        email,
        ConNumber,
        image,
        password,
      });

      if (result?.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Please login",
          confirmButtonColor: "#12A4E4",
        }).then(() => {
          router.push("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: result?.message || "Something went wrong",
          confirmButtonColor: "#12A4E4",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
        confirmButtonColor: "#12A4E4",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* NID No */}
          <div>
            <label className="block text-sm font-medium mb-1">NID No</label>
            <input
              name="number"
              type="number"
              placeholder="Enter your NID number"
              style={{ "--tw-ring-color": "#12A4E4" }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.number ? "border-red-500" : "focus:border-[#12A4E4]"
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              style={{ "--tw-ring-color": "#12A4E4" }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500" : "focus:border-[#12A4E4]"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              style={{ "--tw-ring-color": "#12A4E4" }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:border-[#12A4E4]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Contact number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              name="ConNumber"
              type="number"
              placeholder="Enter your contact number"
              style={{ "--tw-ring-color": "#12A4E4" }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.ConNumber ? "border-red-500" : "focus:border-[#12A4E4]"
              }`}
            />
            {errors.ConNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.ConNumber}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <ImageUpload
              label="Profile Photo"
              value={imageUrl}
              onChange={setImageUrl}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              style={{ "--tw-ring-color": "#12A4E4" }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "focus:border-[#12A4E4]"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#12A4E4" }}
            className="w-full text-white py-2 rounded-md cursor-pointer disabled:bg-gray-400 hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        <SocialLogin />

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#12A4E4" }}
            className="hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
