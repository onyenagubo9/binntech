"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaLaptopCode, FaPaintBrush, FaCloud, FaCogs, FaLock } from "react-icons/fa";

export default function About() {
  return (
    <section
      className="relative py-24 text-white"
      style={{
        backgroundImage: "url('/tech2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(1.35)", // brighter background
      }}
    >
      {/* LIGHT overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-12 text-blue-400"
        >
          About BinnTech
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* Company Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-xl border-4 border-blue-500"
          >
            <Image
              src="/tech2.jpg"
              alt="BinnTech Team"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h3 className="text-3xl font-bold mb-4 text-blue-300">
              Who We Are
            </h3>

            <p className="text-gray-100 leading-relaxed mb-6">
              BinnTech is a modern technology company dedicated to building
              powerful, scalable, and user-friendly digital products.
              We develop intelligent solutions that help individuals and
              businesses succeed through innovation.
            </p>

            <h4 className="text-2xl font-semibold text-blue-300 mb-3">
              Our Mission
            </h4>

            <p className="text-gray-100 leading-relaxed mb-6">
              To deliver world-class software, top-tier user experiences,
              and innovative systems that empower people and businesses
              across the globe.
            </p>

            <h4 className="text-2xl font-semibold text-blue-300 mb-6">
              What We Do
            </h4>

            {/* FEATURES WITH ICONS + ANIMATIONS */}
            <div className="grid grid-cols-1 gap-5">
              
              {/* ITEM 1 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-md hover:bg-white/20 transition"
              >
                <FaLaptopCode className="text-blue-400 text-2xl" />
                <span className="text-gray-100">
                  Full-stack Web & Mobile Development
                </span>
              </motion.div>

              {/* ITEM 2 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-md hover:bg-white/20 transition"
              >
                <FaPaintBrush className="text-blue-400 text-2xl" />
                <span className="text-gray-100">
                  UI/UX Design & Digital Branding
                </span>
              </motion.div>

              {/* ITEM 3 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-md hover:bg-white/20 transition"
              >
                <FaCloud className="text-blue-400 text-2xl" />
                <span className="text-gray-100">
                  Cloud-Based Business Solutions
                </span>
              </motion.div>

              {/* ITEM 4 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-md hover:bg-white/20 transition"
              >
                <FaCogs className="text-blue-400 text-2xl" />
                <span className="text-gray-100">
                  Custom Dashboards & Automation Systems
                </span>
              </motion.div>

              {/* ITEM 5 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-md hover:bg-white/20 transition"
              >
                <FaLock className="text-blue-400 text-2xl" />
                <span className="text-gray-100">
                  API Integrations & Secure Payments
                </span>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
