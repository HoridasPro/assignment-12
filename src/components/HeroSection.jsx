"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Heart } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="relative min-h-[600px] w-full bg-gradient-to-br from-[#eaf9fb] via-[#f7fdfd] to-[#fffbf7] overflow-hidden py-16 px-6 lg:px-24 flex items-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        {/* Left Content */}
        <div className="z-10">
          <motion.div
            variants={fadeInUp}
            className="inline-block px-3 py-1 mb-5 rounded-full bg-[#dcf4f9] text-[#0087a7] text-[11px] font-bold tracking-wide shadow-sm"
          >
            Trusted by 10,000+ families
          </motion.div>

          {/* Heading - Size adjusted to match image (4xl to 6xl) */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[56px] font-serif font-bold text-slate-800 leading-[1.15] mb-5"
          >
            Compassionate Care <br />
            for Your <span className="text-[#12a4e4]">Loved Ones</span>
          </motion.h1>

          {/* Paragraph - Smaller font and max-width as per image */}
          <motion.p
            variants={fadeInUp}
            className="text-slate-500 text-base md:text-[17px] max-w-[440px] mb-8 leading-relaxed font-medium"
          >
            Professional and heartfelt caregiving for babies, elderly, and
            patients — right at your doorstep. Because every life deserves
            gentle care.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 mb-10"
          >
            <button className="bg-[#12a4e4] hover:bg-[#0e8bc4] text-white px-7 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-md">
              Book Now <span className="text-lg">→</span>
            </button>
            <Link
              href="/aboutSection"
              className="bg-white border border-slate-100 px-7 py-3 rounded-lg font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Features - Icon labels */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-5 text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-500/80" />
              <span className="text-[13px] font-semibold">
                Verified Caregivers
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-emerald-500/80" />
              <span className="text-[13px] font-semibold">24/7 Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart size={16} className="text-emerald-500/80" />
              <span className="text-[13px] font-semibold">
                100% Satisfaction
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative lg:ml-auto"
        >
          {/* Image Container with rounded corners */}
          <div className="relative rounded-[32px] overflow-hidden shadow-xl border-[6px] border-white">
            <img
              src="/hero-care.jpg"
              alt="Caregiver"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating Rating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute -bottom-5 -left-8 bg-white p-4 rounded-xl shadow-lg border border-slate-50 flex items-center gap-3 min-w-[180px]"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <Heart className="text-emerald-500 fill-emerald-500" size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-[14px] leading-tight">
                4.9★ Rating
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                From 2,500+ reviews
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[100px] -z-10 translate-x-1/4 -translate-y-1/4" />
    </section>
  );
};

export default HeroSection;
