import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a232e] text-gray-400 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand/About Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Heart
                className="text-[#0ea5e9]"
                size={24}
                fill="#0ea5e9"
                fillOpacity={0.2}
              />
              <h2 className="text-xl font-bold text-white">
                Care<span className="text-[#0ea5e9]">.xyz</span>
              </h2>
            </div>
            <p className="leading-relaxed max-w-xs text-sm">
              Trusted caregiving services for your loved ones. Professional,
              compassionate, and always there when you need us.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Baby Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Elderly Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sick Care
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#0ea5e9]" />
                <a href="mailto:support@care.xyz" className="hover:text-white">
                  support@care.xyz
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#0ea5e9]" />
                <a href="tel:+8801234567890" className="hover:text-white">
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-[#0ea5e9]" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-xs tracking-wider">
          <p>© 2026 Care.xyz — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
