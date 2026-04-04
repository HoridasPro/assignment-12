"use client";
import React from "react";
import { CheckCircle2, Baby } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const BabyCareService = () => {
  const benefits = [
    "Certified childcare professionals",
    "Age-appropriate activities",
    "Daily progress reports",
    "Safe and nurturing environment",
    "Feeding and nap schedules",
    "First-aid trained",
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <div className="relative h-[650px] w-full overflow-hidden">
        <motion.img
          src="/baby-care.jpg"
          alt="Baby Care Hero"
          className="h-full w-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="absolute inset-0 bg-black/20 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 text-white"
            >
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Baby size={32} />
              </div>
              <h1 className="text-5xl font-serif font-semibold">Baby Care</h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT */}
          <div className="lg:w-2/3">
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-serif font-bold mb-6 text-slate-900">
                About This Service
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Our certified nannies and childcare specialists provide safe,
                nurturing, and stimulating care for infants and toddlers.
                Whether you need a few hours of relief or full-day support, our
                caregivers ensure your little ones are in the best hands.
              </p>
            </motion.section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-8 text-slate-900">
                Benefits
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <span className="text-slate-700 font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-slate-900">Pricing</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between p-5 bg-slate-50 rounded-xl">
                  <span>Per Hour</span>
                  <span className="text-2xl font-bold text-sky-500">৳500</span>
                </div>

                <div className="flex justify-between p-5 bg-slate-50 rounded-xl">
                  <span>Per Day</span>
                  <span className="text-2xl font-bold text-sky-500">৳4000</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                <Link href="/babyBooking">Book Service</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BabyCareService;
