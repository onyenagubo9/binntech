"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gray-900/90 backdrop-blur-md text-white fixed w-full top-0 left-0 shadow-lg z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/binn-logo.png"
                alt="BinnTech Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-2xl font-bold text-blue-400">BinnTech</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          {[
            { name: "About", href: "/about" },
            { name: "Projects", href: "/projects" },
            { name: "Services", href: "/services" },
            { name: "Contact", href: "/contact" },
          ].map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <Link href={item.href} className="hover:text-blue-400 transition">
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.07 }}
              className="px-5 py-2 border border-blue-400 text-blue-400 rounded-md hover:bg-blue-500/20 transition"
            >
              Login
            </motion.button>
          </Link>

          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.07 }}
              className="px-5 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-gray-800/95 backdrop-blur-lg flex flex-col items-center space-y-8 py-8 text-lg"
        >
          <Link href="/about" onClick={toggleMenu}>About</Link>
          <Link href="/projects" onClick={toggleMenu}>Projects</Link>
          <Link href="/services" onClick={toggleMenu}>Services</Link>
          <Link href="/contact" onClick={toggleMenu}>Contact</Link>

          {/* Divider */}
          <div className="w-2/3 h-px bg-gray-600 my-2"></div>

          {/* Mobile Login + Signup */}
          <Link href="/auth/login" onClick={toggleMenu}>
            <button className="w-40 px-4 py-2 border border-blue-400 text-blue-400 rounded-md hover:bg-blue-500/20 transition">
              Login
            </button>
          </Link>

          <Link href="/auth/signup" onClick={toggleMenu}>
            <button className="w-40 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
              Sign Up
            </button>
          </Link>
        </motion.ul>
      )}
    </motion.nav>
  );
}
