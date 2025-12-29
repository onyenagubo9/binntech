"use client";

import { useState, useEffect, useRef, use } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { saveMessage } from "@/lib/db/saveMessage";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ChatMessage = {
  id?: string;
  sender: "user" | "ai";
  message: string;
};

export default function AppBuilder({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const uid = auth.currentUser?.uid;

  /* -------------------- AUTO SCROLL (FIXED) -------------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, streamingText]);

  /* -------------------- LOAD CHAT HISTORY -------------------- */
  useEffect(() => {
    if (!uid || !projectId) return;

    const q = query(
      collection(db, "users", uid, "projects", projectId, "messages"),
      orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snap) => {
      const data: ChatMessage[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as ChatMessage),
      }));
      setMessages(data);
    });
  }, [uid, projectId]);

  /* -------------------- SEND MESSAGE (WITH MEMORY) -------------------- */
  async function sendMessage() {
    if (!input.trim() || !uid) return;

    const userText = input;
    setInput("");
    setAiTyping(true);
    setStreamingText("");

    // Save user message
    await saveMessage(uid, projectId, "user", userText);

    // Build memory (last 20 messages)
    const memory = messages.slice(-20).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.message,
    }));

    const res = await fetch("/api/ai-chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [...memory, { role: "user", content: userText }],
      }),
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    let aiText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      aiText += chunk;
      setStreamingText((prev) => prev + chunk);
    }

    // Save AI response
    await saveMessage(uid, projectId, "ai", aiText);

    setStreamingText("");
    setAiTyping(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-white/10 bg-black/40">
        <h1 className="text-xl font-bold">BinnAI App Builder</h1>
        <p className="text-gray-400 text-sm">
          Build your app by chatting with BinnAI
        </p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "ai" && (
              <Image
                src="/binn-logo.png"
                alt="BinnAI"
                width={36}
                height={36}
                className="rounded-full"
              />
            )}

            <div
              className={`max-w-[75%] p-4 rounded-xl whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 rounded-br-none"
                  : "bg-white/10 border border-white/20 rounded-bl-none"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    if (!match) {
                      return (
                        <code className="bg-black/40 px-1 rounded" {...props}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <div className="relative">
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              String(children).replace(/\n$/, "")
                            )
                          }
                          className="absolute top-2 right-2 text-xs bg-black/60 px-2 py-1 rounded"
                        >
                          Copy
                        </button>

                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                }}
              >
                {msg.message}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* STREAMING MESSAGE */}
        {aiTyping && (
          <div className="flex gap-3">
            <Image
              src="/binn-logo.png"
              alt="BinnAI"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="max-w-[75%] p-4 bg-white/10 border border-white/20 rounded-xl">
              <ReactMarkdown>{streamingText || "…"}</ReactMarkdown>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            className="flex-1 p-3 bg-black/40 border border-white/20 rounded-xl outline-none focus:border-blue-500"
            placeholder="Ask BinnAI to help you build your app..."
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
