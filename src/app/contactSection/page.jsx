"use client";
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-10 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "serif" }}
          >
            Get in Touch
          </h2>
          <p className="text-gray-500 text-lg">
            Have questions? We had love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Details */}
          <div
            className={`space-y-8 lg:pt-10 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="bg-[#e0f2fe] p-4 rounded-xl">
                <Mail className="text-[#0ea5e9]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a]">Email</h4>
                <p className="text-gray-500">support@care.xyz</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-[#e0f2fe] p-4 rounded-xl">
                <Phone className="text-[#0ea5e9]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a]">Phone</h4>
                <p className="text-gray-500">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-[#e0f2fe] p-4 rounded-xl">
                <MapPin className="text-[#0ea5e9]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a]">Address</h4>
                <p className="text-gray-500">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div
            className={`bg-white p-5 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <form className="space-y-2">
              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-[#0ea5e9] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0284c7] transition-all shadow-lg shadow-sky-100">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
