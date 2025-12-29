"use client";

import { useState, useEffect } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import GlowBackground from "@/components/dashboard/GlowBackground";
import Loader from "@/components/dashboard/Loader";
import ProfilePage from "@/components/dashboard/ProfileContent";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1f] text-white flex justify-center items-center w-full">
        <GlowBackground />
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0a0f1f] text-white w-full">
      <GlowBackground />

      {/* Sidebar */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-y-auto p-4 md:p-10 relative z-10">
        <Navbar onMenuClick={() => setMenuOpen(true)} />

        {/* 👇 Moved content */}
        <ProfilePage/>
      </main>
    </div>
  );
}
