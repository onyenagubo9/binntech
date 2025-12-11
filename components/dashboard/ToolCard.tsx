import React from "react";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void; // optional, in case you want the card to open a page
}

export default function ToolCard({ icon, title, desc, onClick }: ToolCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        p-6 
        bg-white/5 
        rounded-2xl 
        border border-white/10 
        backdrop-blur-lg 
        shadow-lg 
        hover:shadow-blue-500/30 
        transition 
        hover:-translate-y-1 
        cursor-pointer 
        group
      "
    >
      <div className="text-blue-400 text-3xl mb-3 group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
}
