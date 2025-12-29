"use client";

import ToolCard from "@/components/dashboard/ToolCard";
import StoreCard from "@/components/dashboard/StoreCard";

import { FiCpu, FiCode, FiAlertTriangle, FiZap } from "react-icons/fi";

export default function DashboardContent() {
  return (
    <>
      {/* ================= AI TOOLS ================= */}
      <h2 className="text-xl font-semibold mb-4 mt-4">
        AI Developer Tools
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ToolCard
          icon={<FiCode />}
          title="AI Code Generator"
          desc="Generate full code instantly."
          href="/dashboard/builder/test-project"
        />

        <ToolCard
          icon={<FiAlertTriangle />}
          title="AI Debugger"
          desc="Find & fix errors automatically."
          href="/dashboard/builder/test-project"
        />

        <ToolCard
          icon={<FiZap />}
          title="AI Code Explainer"
          desc="Explain any code instantly."
          href="/dashboard/builder/test-project"
        />

        <ToolCard
          icon={<FiCpu />}
          title="Project Starter"
          desc="Generate project structures automatically."
          href="/dashboard/builder/test-project"
        />
      </div>

      {/* ================= STORE ================= */}
      <h2 className="text-xl font-semibold mt-12 mb-4">
        Project Store
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StoreCard
          title="Next.js SAAS Starter"
          price="$19"
        />

        <StoreCard
          title="Auth + Dashboard Template"
          price="$29"
        />

        <StoreCard
          title="AI Chatbot Template"
          price="$15"
        />
      </div>
    </>
  );
}
