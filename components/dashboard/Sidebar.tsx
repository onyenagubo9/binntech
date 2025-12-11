"use client";

import Image from "next/image";
import { FiX, FiHome, FiCpu, FiShoppingBag, FiUser } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
        ></div>
      )}

      {/* Sidebar container */}
      <aside
        className={`
          absolute md:sticky top-0 left-0 h-screen w-64
          bg-white/5 backdrop-blur-xl border-r border-white/10 p-6
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden text-2xl text-white absolute top-4 right-4"
        >
          <FiX />
        </button>

        {/* Logo */}
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Image
            src="/binn-logo.png"
            width={32}
            height={32}
            alt="Logo"
            className="rounded-md"
          />
          BinnTech
        </h2>

        {/* Navigation */}
        <nav className="space-y-4">
          <SidebarLink icon={<FiHome />} label="Dashboard" />
          <SidebarLink icon={<FiCpu />} label="AI Tools" />
          <SidebarLink icon={<FiShoppingBag />} label="Project Store" />
          <SidebarLink icon={<FiUser />} label="Profile" />
        </nav>
      </aside>
    </>
  );
}

function SidebarLink({ icon, label }: SidebarLinkProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/10 transition">
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
