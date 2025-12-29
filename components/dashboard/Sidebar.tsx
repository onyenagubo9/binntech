"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiX,
  FiHome,
  FiCpu,
  FiShoppingBag,
  FiUser,
  FiPlusCircle,
} from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // TEMP credit value (replace with Firestore later)
  const credits = 120;

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0
          h-screen w-64
          bg-white/5 backdrop-blur-xl
          border-r border-white/10
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full p-6">

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-2xl text-white"
          >
            <FiX />
          </button>

          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center gap-2 mb-10">
            <Image
              src="/binn-logo.png"
              alt="BinnTech Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-2xl font-bold text-white">BinnTech</span>
          </Link>

          {/* NAV LINKS */}
          <nav className="flex-1 space-y-2">
            <SidebarLink
              icon={<FiHome />}
              label="Dashboard"
              href="/dashboard"
            />
            <SidebarLink
              icon={<FiCpu />}
              label="AI Tools"
              href="/dashboard"
            />
            <SidebarLink
              icon={<FiShoppingBag />}
              label="Project Store"
              href="/store"
            />
            <SidebarLink
              icon={<FiUser />}
              label="Profile"
              href="/profile"
            />
          </nav>

          {/* CREDITS SECTION */}
          <div className="pt-6 border-t border-white/10">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400">Credits</p>
              <p className="text-2xl font-bold text-blue-400">{credits}</p>

              <Link
                href="/billing"
                className="mt-3 inline-flex items-center justify-center gap-2
                  w-full py-2 rounded-lg
                  bg-blue-600 hover:bg-blue-700
                  text-white font-medium transition"
              >
                <FiPlusCircle />
                Add Credits
              </Link>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}

function SidebarLink({ icon, label, href }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-3
        px-4 py-3 rounded-lg
        text-gray-300 hover:text-white
        hover:bg-white/10
        transition
      "
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
