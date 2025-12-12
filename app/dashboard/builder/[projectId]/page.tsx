"use client";

import { useState, useEffect, useRef, use } from "react";
import { saveMessage } from "@/lib/db/saveMessage";
import { auth, db } from "@/lib/firebaseClient";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Image from "next/image";

export default function AppBuilder({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  // Fix for async params
  const { projectId } = use(params);

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const uid = auth.currentUser?.uid;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  // Load messages in real time
  useEffect(() => {
    if (!uid || !projectId) return;

    const q = query(
      collection(db, "users", uid, "projects", projectId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [uid, projectId]);

  // Send message
  async function sendMessage() {
    if (!input.trim() || !uid) return;

    const userText = input;
    setInput("");
    setAiTyping(true);

    // Save user message to Firestore
    await saveMessage(uid, projectId, "user", userText);

    // Call your AI API route
    const res = await fetch("/api/ai-chat", {
      method: "POST",
      body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();

    // Save AI response to Firestore
    await saveMessage(uid, projectId, "ai", data.reply);

    setAiTyping(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-white/10 bg-black/40">
        <h1 className="text-xl font-bold">BinnAI App Builder</h1>
        <p className="text-gray-400 text-sm">Chat with BinnAI to build your application</p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >

            {/* BinnAI Avatar */}
            {msg.sender === "ai" && (
              <Image
                src="/binn-logo.png"
                width={35}
                height={35}
                alt="BinnAI Avatar"
                className="rounded-full shadow-md"
              />
            )}

            {/* MESSAGE BUBBLE */}
            <div
              className={`max-w-[75%] p-3 rounded-xl whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white/10 border border-white/20 rounded-bl-none"
              }`}
            >
              {msg.message}
            </div>

          </div>
        ))}

        {/* AI TYPING INDICATOR */}
        {aiTyping && (
          <div className="flex items-center gap-3">
            <Image
              src="/binn-logo.png"
              width={35}
              height={35}
              alt="BinnAI Avatar"
              className="rounded-full shadow-md"
            />
            <div className="bg-white/10 border border-white/20 p-3 rounded-xl w-20">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex gap-3">

          <input
            className="flex-1 p-3 bg-black/40 border border-white/20 rounded-xl outline-none focus:border-blue-500"
            placeholder="Ask BinnAI to help build your app..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="px-6 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}
