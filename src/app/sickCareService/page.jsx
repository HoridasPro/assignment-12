"use client";

import React from "react";
import { Stethoscope, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const SickCareService = () => {
  const benefits = [
    "Licensed and trained nurses",
    "Chronic condition management",
    "Wound care and medication",
    "Post-surgery recovery support",
    "Vital signs monitoring",
    "Doctor coordination",
  ];

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Hero Section */}
      <motion.div
        className="relative h-[650px] w-full"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/sick-care.jpg"
          alt="Sick Care Service"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <motion.div
              className="flex items-center gap-3 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="bg-white/20 p-2.5 rounded-lg backdrop-blur-md">
                <Stethoscope size={30} strokeWidth={2.5} />
              </div>
              <h1 className="text-5xl font-serif font-semibold">Sick Care</h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-2/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.section className="mb-12" variants={fadeUp}>
              <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">
                About This Service
              </h2>
              <p className="text-slate-500 leading-relaxed text-[17px]">
                Professional medical caregivers for patients recovering at home,
                post-surgery, or managing chronic conditions. Our team includes
                trained nurses who work closely with your doctors instructions
                to ensure optimal recovery.
              </p>
            </motion.section>

            <motion.section variants={fadeUp}>
              <h2 className="text-2xl font-serif font-bold mb-8 text-slate-900">
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2.5"
                    variants={fadeUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="text-emerald-500 w-[18px] h-[18px] shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>

          {/* Right Column: Pricing Card */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-slate-50 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-slate-900">Pricing</h3>

              <div className="space-y-4 mb-8">
                {/* Hourly Rate */}
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-sm font-medium">
                    Per Hour
                  </span>
                  <span className="text-2xl font-bold text-sky-500">৳800</span>
                </div>

                {/* Daily Rate */}
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-sm font-medium">
                    Per Day
                  </span>
                  <span className="text-2xl font-bold text-sky-500">৳8000</span>
                </div>
              </div>

              <Link
                href="/sickBooking"
                className="w-full bg-[#12a4e4] hover:bg-[#0e8bc4] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
              >
                Book Service
                <span className="text-xl font-light">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SickCareService;
