"use client";
import React from "react";
import { motion } from "framer-motion";
import { Baby, Users, Stethoscope, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Baby Care",
      icon: <Baby className="text-sky-500" size={20} />,
      description:
        "Expert nannies and childcare professionals providing safe, nurturing environments for your little ones.",
      price: "৳500/hr",
      image: "/baby-care.jpg",
      link: "/babyCareService", // Scrolls to this section
    },
    {
      title: "Elderly Care",
      icon: <Users className="text-sky-500" size={20} />,
      description:
        "Compassionate companions and skilled nurses for your aging loved ones, ensuring dignity and comfort.",
      price: "৳600/hr",
      image: "/elderly-care.jpg",
      link: "/elderlyCareService", // Scrolls to this section
    },
    {
      title: "Sick Care",
      icon: <Stethoscope className="text-sky-500" size={20} />,
      description:
        "Professional medical caregivers for patients recovering at home, post-surgery, or with chronic conditions.",
      price: "৳800/hr",
      image: "/sick-care.jpg",
      link: "/sickCareService", // Scrolls to this section
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1 mb-4 rounded-full bg-sky-50 text-sky-500 text-[12px] font-bold tracking-wider"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold text-slate-900 mb-4"
          >
            Care That Comes to You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed"
          >
            Choose from our range of professional caregiving services, tailored
            to your family's unique needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="h-[220px] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-serif">
                    {service.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-[14px] leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-sky-500 font-bold text-lg">
                    {service.price}
                  </span>
                  <a
                    href={service.link}
                    className="flex items-center gap-1.5 text-[14px] font-bold text-sky-500 hover:text-sky-600 transition-colors group"
                  >
                    Learn more
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
