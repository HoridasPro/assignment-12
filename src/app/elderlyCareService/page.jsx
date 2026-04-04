"use client";
import React from "react";
import { CheckCircle2, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ElderlyCareService = () => {
  const benefits = [
    "Companionship and emotional support",
    "Medication management",
    "Personal hygiene support",
    "Mobility and exercise assistance",
    "Meal preparation and nutrition",
    "24/7 emergency response",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <motion.div
        className="relative h-[650px] w-full overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/elderly-care.jpg"
          alt="Elderly Care"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <motion.div
              className="flex items-center gap-4 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-md">
                <Users size={32} />
              </div>
              <h1 className="text-5xl font-serif font-bold tracking-tight">
                Elderly Care
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
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
            <motion.section className="mb-14" variants={fadeUp}>
              <h2 className="text-3xl font-serif font-bold mb-6 text-slate-900">
                About This Service
              </h2>
              <p className="text-slate-500 leading-relaxed text-lg max-w-3xl">
                Our compassionate companions and skilled nurses provide
                dignified, personalized care for aging family members. From
                daily assistance to specialized medical support, we help seniors
                live comfortably and happily at home.
              </p>
            </motion.section>

            <motion.section variants={fadeUp}>
              <h2 className="text-3xl font-serif font-bold mb-10 text-slate-900">
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 group"
                    variants={fadeUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>

          {/* Right: Sticky Pricing Card */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-50 sticky top-10">
              <h3 className="text-2xl font-bold mb-8 text-slate-900">
                Pricing
              </h3>

              <div className="space-y-5 mb-10">
                {/* Hourly Rate */}
                <div className="flex justify-between items-center p-6 bg-slate-50/80 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-semibold">Per Hour</span>
                  <span className="text-3xl font-bold text-[#0ea5e9]">
                    ৳600
                  </span>
                </div>

                {/* Daily Rate */}
                <div className="flex justify-between items-center p-6 bg-slate-50/80 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-semibold">Per Day</span>
                  <span className="text-3xl font-bold text-[#0ea5e9]">
                    ৳5000
                  </span>
                </div>
              </div>

              <Link
                href="/elderlyBooking"
                className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]"
              >
                Book Service
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ElderlyCareService;
