"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      text: "Care.xyz has been a lifesaver! The baby caregiver was so gentle and professional. My kids love her.",
      name: "Fatima Rahman",
      role: "Mother of 2",
    },
    {
      text: "Finding reliable elderly care for my father was stressful until we found Care.xyz. The caregiver is like family now.",
      name: "Abdul Karim",
      role: "Son",
    },
    {
      text: "After my surgery, the home nurse from Care.xyz helped me recover quickly. Highly recommend their sick care service.",
      name: "Nusrat Jahan",
      role: "Patient",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block px-4 py-1 mb-4 rounded-full bg-sky-50 text-sky-500 text-[12px] font-bold tracking-widest uppercase"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold text-slate-900 mb-16"
        >
          What Families Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.03)] text-left flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-sky-500 fill-sky-500"
                  />
                ))}
              </div>
              <p className="text-slate-500 italic text-[15px] leading-relaxed mb-8 flex-grow">
                {rev.text}
              </p>
              <div>
                <h4 className="font-bold text-slate-800 text-base">
                  {rev.name}
                </h4>
                <p className="text-slate-400 text-xs mt-1">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
