"use client";

interface ChatHeaderProps {
  name?: string;
  color?: string;
  icon?: string;
}

export default function ChatHeader({
  name = "Untitled project",
  color = "#3B82F6",
  icon = "📁",
}: ChatHeaderProps) {
  return (
    <div
      className="
        sticky top-0 z-40
        bg-[#0a0f1f]/95 backdrop-blur
        border-b border-white/10
        h-16
        flex items-center
      "
    >
      {/* INNER CONTAINER */}
      <div
        className="
          w-full
          px-4 md:px-6
          flex items-center gap-3
          ml-64
          md:ml-64
          sm:ml-0
        "
      >
        {/* Project color */}
        <span
          className="h-3 w-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />

        {/* Icon */}
        <span className="text-lg shrink-0">{icon}</span>

        {/* Project name */}
        <h2 className="font-semibold text-sm md:text-base truncate">
          {name}
        </h2>
      </div>
    </div>
  );
}
