"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaRocket, FaLaptopCode, FaMobileAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-8 py-32 md:py-48 overflow-hidden"
      style={{
        backgroundImage: "url('/tech1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Moving gradient */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Neon Glow Pulse Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
        >
          {/* First Line */}
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px #3b82f6",
                "0 0 20px #3b82f6",
                "0 0 35px #60a5fa",
                "0 0 20px #3b82f6",
                "0 0 10px #3b82f6",
              ],
              color: ["#ffffff", "#dbeafe", "#ffffff"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            We Build <span className="text-blue-400">Modern</span>
          </motion.span>

          <br />

          {/* Second Line */}
          <motion.span
            animate={{
              textShadow: [
                "0 0 12px #60a5fa",
                "0 0 25px #93c5fd",
                "0 0 40px #3b82f6",
                "0 0 25px #93c5fd",
                "0 0 12px #60a5fa",
              ],
              color: ["#bfdbfe", "#ffffff", "#bfdbfe"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="inline-block text-blue-300"
          >
            Digital Solutions
          </motion.span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-lg text-gray-200 max-w-xl mx-auto"
        >
          BinnTech creates powerful web and mobile applications using{" "}
          <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
          <span className="text-blue-400 font-semibold">React Native</span>,{" "}
          <span className="text-blue-400 font-semibold">Node.js</span> — built
          for performance and scalability.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/projects"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Explore Projects
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/contact"
              className="px-6 py-3 border border-blue-400 text-blue-400 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature icons */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaLaptopCode className="text-blue-400 text-4xl" />,
              title: "Web Apps",
            },
            {
              icon: <FaMobileAlt className="text-blue-400 text-4xl" />,
              title: "Mobile Apps",
            },
            {
              icon: <FaRocket className="text-blue-400 text-4-4xl" />,
              title: "Fast Deployment",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              whileHover={{ scale: 1.08 }}
              className="flex flex-col items-center bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg hover:bg-white/20 transition"
            >
              {item.icon}
              <p className="text-white mt-3 font-semibold">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
