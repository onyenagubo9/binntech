"use client";
import { motion } from "framer-motion";
import { FaCode, FaBolt, FaFolderOpen } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      title: "Modern Tech Stack",
      text: "We build using Next.js, React, TypeScript, and cloud-based tools for unmatched performance and scalability.",
      icon: <FaCode className="text-blue-400 text-5xl" />,
    },
    {
      title: "Instant Project Delivery",
      text: "Purchase any project and receive instant download access with seamless payment confirmation.",
      icon: <FaBolt className="text-blue-400 text-5xl" />,
    },
    {
      title: "Full Source Code Access",
      text: "Every project includes complete, clean, and production-ready source code — easy to learn, modify, and deploy.",
      icon: <FaFolderOpen className="text-blue-400 text-5xl" />,
    },
  ];

  return (
    <section className="mt-28 px-6 text-center relative">
      {/* Soft glowing background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-linear-to-b from-blue-500/10 to-transparent blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Section Title */}
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-10 text-white"
      >
        Why Choose <span className="text-blue-500">BinnTech?</span>
      </motion.h3>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{
              scale: 1.06,
              boxShadow: "0px 0px 30px rgba(59,130,246,0.4)",
              y: -6,
            }}
            className="p-8 bg-gray-900/70 backdrop-blur-xl rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg"
          >
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              >
                {feature.icon}
              </motion.div>
            </div>

            {/* Title */}
            <h4 className="text-xl font-semibold mb-3 text-blue-400">
              {feature.title}
            </h4>

            {/* Text */}
            <p className="text-gray-300 leading-relaxed">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
