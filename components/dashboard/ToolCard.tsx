import Link from "next/link";
import { ReactNode } from "react";

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  href: string;
}

export default function ToolCard({ icon, title, desc, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white/10 border border-white/20 p-6 rounded-xl cursor-pointer hover:bg-white/20 transition shadow-md">
        <div className="text-blue-400 text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm mt-2">{desc}</p>
      </div>
    </Link>
  );
}
