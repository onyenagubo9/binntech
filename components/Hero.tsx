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
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
        >
          We Build <span className="text-blue-400">Modern</span>  
          <br /> Digital Solutions
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-lg text-gray-200 max-w-xl mx-auto"
        >
          BinnTech creates powerful web and mobile applications using  
          <span className="text-blue-400 font-semibold"> Next.js</span>,  
          <span className="text-blue-400 font-semibold"> React Native</span>,  
          <span className="text-blue-400 font-semibold"> Node.js</span>  
          and modern cloud technologies — built for performance and scalability.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/projects"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Explore Projects
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/contact"
              className="px-6 py-3 border border-blue-400 text-blue-400 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
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
              icon: <FaRocket className="text-blue-400 text-4xl" />,
              title: "Fast Deployment",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
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
