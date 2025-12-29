"use client";

import { useState } from "react";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState("alloy");

  async function generateSpeech() {
    if (!text.trim()) return;

    setLoading(true);
    setAudioUrl(null);

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    setAudioUrl(url);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-4">
          Text to Speech
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text for BinnAI to speak..."
          className="w-full h-40 p-4 bg-black/40 border border-white/20 rounded-xl outline-none mb-4 resize-none"
        />

        {/* Voice selection */}
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full mb-4 p-3 bg-black/40 border border-white/20 rounded-xl"
        >
          <option value="alloy">Alloy (Neutral)</option>
          <option value="verse">Verse (Deep)</option>
          <option value="luna">Luna (Soft)</option>
        </select>

        <button
          onClick={generateSpeech}
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Speech"}
        </button>

        {/* Audio player */}
        {audioUrl && (
          <div className="mt-6">
            <audio controls src={audioUrl} className="w-full" />
            <a
              href={audioUrl}
              download="binnai-tts.mp3"
              className="block text-center mt-3 text-blue-400 hover:underline"
            >
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
