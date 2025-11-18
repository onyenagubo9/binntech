"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Glowing Ring Spinner */}
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 border-t-transparent rounded-full" />
        <div className="absolute top-1 left-1 w-[4.5rem] h-[4.5rem] border-4 border-blue-400/50 border-t-transparent rounded-full" />
      </motion.div>

      {/* Text under spinner */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-6 text-lg text-blue-400 tracking-wide"
      >
        Loading your experience...
      </motion.p>

      {/* Floating glow animation behind */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  );
}
