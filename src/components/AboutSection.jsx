"use client";
import React, { useEffect, useState, useRef } from "react";
import { Users, ShieldCheck, Heart, Clock } from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { Icon: Users, title: "10,000+", subtitle: "Families Served" },
    { Icon: ShieldCheck, title: "500+", subtitle: "Certified Caregivers" },
    { Icon: Heart, title: "98%", subtitle: "Satisfaction Rate" },
    { Icon: Clock, title: "24/7", subtitle: "Support Available" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`bg-[#f8fafc] py-20 lg:py-15 px-6 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16  ">
        {/* Left Side: Content */}
        <div className="max-w-2xl space-y-6">
          <span className="inline-block bg-[#f0fdf4] text-[#166534] px-4 py-1 rounded-full text-sm font-bold">
            About Us
          </span>

          <h2
            className="text-5xl lg:text-6xl font-bold text-[#0f172a] leading-tight"
            style={{ fontFamily: "serif" }}
          >
            A Mission Built on{" "}
            <span className="text-[#0ea5e9]">Compassion</span>
          </h2>

          <p className="text-lg text-gray-500 leading-relaxed">
            At Care.xyz, we believe that quality caregiving should be accessible
            to every family. Our platform connects you with verified, trained
            professionals who treat your loved ones like their own.
          </p>

          <p className="text-lg text-gray-500 leading-relaxed">
            From newborn care to elder companionship and patient recovery
            support we are here with gentle hands and warm hearts, whenever you
            need us.
          </p>
        </div>

        {/* Right Side: Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white p-10 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } hover:shadow-md hover:-translate-y-1`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-4 bg-[#f0f9ff] rounded-full mb-6">
                <stat.Icon
                  className="text-[#0ea5e9]"
                  size={32}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-4xl font-extrabold text-[#0f172a] mb-2">
                {stat.title}
              </h3>
              <p className="text-gray-500 font-medium text-lg">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
