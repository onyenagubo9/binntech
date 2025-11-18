"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-400">
          <Link href="/">BinnTech</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li><Link href="#about" className="hover:text-blue-400">About</Link></li>
          <li><Link href="#skills" className="hover:text-blue-400">Skills</Link></li>
          <li><Link href="#projects" className="hover:text-blue-400">Projects</Link></li>
          <li><Link href="#contact" className="hover:text-blue-400">Contact</Link></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-800 flex flex-col items-center space-y-6 py-8 transition-all duration-300">
          <li><Link href="#about" onClick={toggleMenu}>About</Link></li>
          <li><Link href="#skills" onClick={toggleMenu}>Skills</Link></li>
          <li><Link href="#projects" onClick={toggleMenu}>Projects</Link></li>
          <li><Link href="#contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}
