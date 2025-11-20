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

              {/* underline hover animation */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

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
        </motion.ul>
      )}
    </motion.nav>
  );
}
