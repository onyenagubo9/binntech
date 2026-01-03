"use client";

import { useState } from "react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-black/50 hover:bg-black text-white"
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <pre className="bg-black/70 p-4 rounded-xl overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
