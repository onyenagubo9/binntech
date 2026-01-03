"use client";

import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/chat/CodeBlock";
import AITypingIndicator from "@/components/chat/AITypingIndicator";

interface BuilderProps {
  projectId: string;
}

interface ChatMessage {
  id?: string;
  sender: "user" | "ai";
  message: string;
  createdAt?: any;
}

export default function Builder({ projectId }: BuilderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     Auto-scroll
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText, aiTyping]);

  /* =========================
     Firestore listener (SAFE)
  ========================= */
  useEffect(() => {
    const user = auth.currentUser;

    if (!user || !projectId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(
        db,
        "users",
        user.uid,
        "projects",
        projectId,
        "messages"
      ),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setMessages(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as ChatMessage),
          }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Snapshot error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  /* =========================
     Ensure project exists
  ========================= */
  const ensureProjectExists = async (uid: string) => {
    if (!uid || !projectId) return;

    await setDoc(
      doc(db, "users", uid, "projects", projectId),
      {
        name: projectId.replace(/-/g, " "),
        slug: projectId,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  /* =========================
     Send message (STREAMING)
  ========================= */
  const handleSend = async () => {
    if (!projectId) return;
    if (!input.trim() || sending) return;

    const user = auth.currentUser;
    if (!user) return;

    const text = input.trim();
    setInput("");
    setSending(true);
    setAiTyping(true);
    setStreamingText("");

    await ensureProjectExists(user.uid);

    await addDoc(
      collection(
        db,
        "users",
        user.uid,
        "projects",
        projectId,
        "messages"
      ),
      {
        sender: "user",
        message: text,
        createdAt: serverTimestamp(),
      }
    );

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        fullText += decoder.decode(value);
        setStreamingText(fullText);
      }

      await addDoc(
        collection(
          db,
          "users",
          user.uid,
          "projects",
          projectId,
          "messages"
        ),
        {
          sender: "ai",
          message: fullText,
          createdAt: serverTimestamp(),
        }
      );
    } catch (err) {
      console.error("AI stream failed:", err);
    } finally {
      setAiTyping(false);
      setStreamingText("");
      setSending(false);
    }
  };

  /* =========================
     Render
  ========================= */
  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading conversation…
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1f] text-white p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500 italic text-sm">
            No messages yet. Start typing below 👇
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            <div
              className={`text-xs text-gray-400 mb-1 ${
                msg.sender === "user" ? "text-right" : ""
              }`}
            >
              {msg.createdAt?.toDate?.().toLocaleTimeString()}
            </div>

            {msg.sender === "user" ? (
              <div className="flex justify-end">
                <div className="bg-blue-600 rounded-2xl px-4 py-3 max-w-[75%]">
                  {msg.message}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 max-w-[75%]">
                <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-semibold">
                  AI
                </div>

                <div className="bg-[#1b2236] rounded-2xl px-4 py-3">
                  <div className="text-xs text-gray-400 mb-1">
                    BinnAI
                  </div>

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ className, children }) {
                        const isBlock =
                          typeof className === "string" &&
                          className.includes("language-");

                        return isBlock ? (
                          <CodeBlock code={String(children)} />
                        ) : (
                          <code className="bg-black/40 px-1 rounded">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.message}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}

        {streamingText && (
          <div className="flex gap-3 max-w-[75%] opacity-80">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-semibold">
              AI
            </div>
            <div className="bg-[#1b2236] rounded-2xl px-4 py-3">
              {streamingText}
            </div>
          </div>
        )}

        {aiTyping && <AITypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2 bg-[#11162a] p-3 rounded-xl">
        <input
          className="flex-1 bg-transparent outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message…"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
