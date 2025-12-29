"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  href: string;
}

export default function ToolCard({
  icon,
  title,
  desc,
  href,
}: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition group">
        <div className="text-3xl text-blue-400 mb-4 group-hover:scale-110 transition">
          {icon}
        </div>

        <h3 className="text-lg font-semibold mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-400">
          {desc}
        </p>
      </div>
    </Link>
  );
}
