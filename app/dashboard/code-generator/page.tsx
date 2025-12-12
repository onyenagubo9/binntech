"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCode, FiLoader } from "react-icons/fi";

export default function CodeGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateCode() {
    setLoading(true);
    setGeneratedCode("");

    try {
      const res = await fetch("/api/code-generator", {
        method: "POST",
        body: JSON.stringify({ prompt, language }),
      });

      const data = await res.json();

      if (data.error) {
        setGeneratedCode(`Error: ${data.error}`);
      } else {
        setGeneratedCode(data.code);
      }
    } catch (err) {
      setGeneratedCode("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(generatedCode);
    alert("Code copied to clipboard!");
  }

  return (
    <div className="min-h-screen p-6 text-white bg-[#0a0f1f]">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FiCode /> AI Code Generator
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-3xl">

        {/* Prompt Input */}
        <textarea
          className="w-full p-4 bg-black/40 border border-white/20 rounded-lg text-white focus:border-blue-400 outline-none"
          rows={4}
          placeholder="Describe the code you want me to write..."
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Language Selector */}
        <select
          className="mt-4 p-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-blue-400 outline-none"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>JavaScript</option>
          <option>TypeScript</option>
          <option>Python</option>
          <option>React</option>
          <option>Next.js</option>
          <option>Node.js</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>C++</option>
        </select>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mt-4 py-3 bg-blue-600 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          onClick={generateCode}
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <FiLoader className="animate-spin" /> Generating...
            </span>
          ) : (
            "Generate Code"
          )}
        </motion.button>

        {/* Output */}
        {generatedCode && (
          <div className="mt-6 relative">
            <button
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-300"
              onClick={copyCode}
            >
              <FiCopy size={20} />
            </button>

            <pre className="bg-black/60 p-4 rounded-lg border border-white/20 overflow-auto text-sm whitespace-pre-wrap">
              {generatedCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
