"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-8 mt-24 overflow-hidden">
      {/* Floating Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-white leading-tight"
      >
        Build.{" "}
        <motion.span
          animate={{
            y: [0, -6, 0],
            textShadow: [
              "0px 0px 8px #3B82F6",
              "0px 0px 16px #3B82F6",
              "0px 0px 8px #3B82F6",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-blue-500 inline-block"
        >
          Launch.
        </motion.span>{" "}
        Grow.
      </motion.h2>

      {/* Animated Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-5 text-lg text-gray-300 max-w-2xl"
      >
        Explore powerful web and mobile app projects built with modern tools like{" "}
        <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
        <span className="text-blue-400 font-semibold">React Native</span>, and{" "}
        <span className="text-blue-400 font-semibold">Node.js</span>.  
        Purchase complete project folders instantly and start building your next idea.
      </motion.p>

      {/* Floating Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 space-x-4 flex flex-wrap justify-center"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-blue-500/40 transition-all duration-300"
          >
            Explore Projects
          </Link>
        </motion.div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <Link
            href="/contact"
            className="px-6 py-3 border border-blue-500 text-blue-400 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Background floating blur orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      />
    </section>
  );
}
