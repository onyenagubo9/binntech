"use client";

import { useState, useEffect } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import ToolCard from "@/components/dashboard/ToolCard";
import StoreCard from "@/components/dashboard/StoreCard";
import GlowBackground from "@/components/dashboard/GlowBackground";
import Loader from "@/components/dashboard/Loader";

import { FiCpu, FiCode, FiAlertTriangle, FiZap } from "react-icons/fi";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1f] text-white flex justify-center items-center relative w-full">
        <GlowBackground />
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0a0f1f] text-white relative overflow-hidden w-full">

      <GlowBackground />

      {/* Sidebar */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main */}
      <main className="flex-1 w-full p-4 md:p-10 relative z-10">

        <Navbar onMenuClick={() => setMenuOpen(true)} />

        {/* AI Tools */}
        <h2 className="text-xl font-semibold mb-4">AI Developer Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ToolCard icon={<FiCode />} title="AI Code Generator" desc="Generate full code instantly." />
          <ToolCard icon={<FiAlertTriangle />} title="AI Debugger" desc="Find & fix errors automatically." />
          <ToolCard icon={<FiZap />} title="AI Code Explainer" desc="Explain any code instantly." />
          <ToolCard icon={<FiCpu />} title="Project Starter" desc="Generate project structures automatically." />
        </div>

        {/* Store */}
        <h2 className="text-xl font-semibold mt-12 mb-4">Project Store</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StoreCard title="Next.js SAAS Starter" price="$19" />
          <StoreCard title="Auth + Dashboard Template" price="$29" />
          <StoreCard title="AI Chatbot Template" price="$15" />
        </div>

      </main>      
    </div>
  );
}
