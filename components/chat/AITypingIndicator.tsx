"use client";

export default function AITypingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-[75%]">
      {/* Avatar */}
      <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
        AI
      </div>

      {/* Bubble */}
      <div className="bg-[#1b2236] rounded-2xl px-4 py-3 shadow-sm">
        <div className="text-xs text-gray-400 mb-1">BinnAI</div>

        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
