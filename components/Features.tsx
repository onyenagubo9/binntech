"use client";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Modern Stack",
      text: "We build using Next.js, React, and TypeScript for speed, security, and scalability.",
    },
    {
      title: "Instant Delivery",
      text: "Purchase projects and receive instant download links once payment is confirmed.",
    },
    {
      title: "Full Source Code",
      text: "Get access to well-documented, production-ready source code for each project.",
    },
  ];

  return (
    <section className="mt-28 px-6 text-center relative">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl"
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-10 text-white"
      >
        Why Choose <span className="text-blue-500">BinnTech?</span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59,130,246,0.3)" }}
            className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <h4 className="text-xl font-semibold mb-3 text-blue-400">
              {feature.title}
            </h4>
            <p className="text-gray-300">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
