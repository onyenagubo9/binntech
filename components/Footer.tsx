"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 border-t border-gray-800 py-10 text-center text-gray-400">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl font-semibold text-blue-400 mb-3">
          BinnTech
        </h3>
        <p className="max-w-md mx-auto text-sm mb-6">
          Building modern, scalable web and mobile solutions with clean
          design and solid performance.
        </p>

        <div className="flex justify-center gap-6 text-xl mb-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:anthony@binntech.com"
            className="hover:text-blue-400 transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} BinnTech — Built by{" "}
          <span className="text-blue-400 font-medium">
            Anthony Obinna
          </span>
        </p>
      </motion.div>
    </footer>
  );
}
