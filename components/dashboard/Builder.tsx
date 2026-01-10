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
  getDoc,
} from "firebase/firestore";

import ChatHeader from "@/components/dashboard/ChatHeader";

interface BuilderProps {
  projectId: string;
}

interface ChatMessage {
  id?: string;
  sender: "user" | "ai";
  message: string;
}

interface ProjectMeta {
  name?: string;
  color?: string;
  icon?: string;
}

export default function Builder({ projectId }: BuilderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [project, setProject] = useState<ProjectMeta>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* Auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Scroll detection */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const nearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 120;
      setShowScrollBtn(!nearBottom);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* Load messages */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) return;

      getDoc(doc(db, "users", user.uid, "projects", projectId)).then((snap) => {
        if (snap.exists()) setProject(snap.data() as ProjectMeta);
      });

      const q = query(
        collection(db, "users", user.uid, "projects", projectId, "messages"),
        orderBy("createdAt", "asc")
      );

      return onSnapshot(q, (snap) => {
        setMessages(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as ChatMessage),
          }))
        );
      });
    });

    return () => unsub();
  }, [projectId]);

  /* STREAM AI */
  const streamAI = async (text: string, aiDocId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let aiText = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        aiText += decoder.decode(value, { stream: true });

        await setDoc(
          doc(db, "users", user.uid, "projects", projectId, "messages", aiDocId),
          { message: aiText },
          { merge: true }
        );
      }
    }
  };

  /* SEND */
  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const user = auth.currentUser;
    if (!user) return;

    const text = input.trim();
    setInput("");
    setSending(true);

    const msgRef = collection(
      db,
      "users",
      user.uid,
      "projects",
      projectId,
      "messages"
    );

    await addDoc(msgRef, {
      sender: "user",
      message: text,
      createdAt: serverTimestamp(),
    });

    const aiDoc = await addDoc(msgRef, {
      sender: "ai",
      message: "Thinking...",
      createdAt: serverTimestamp(),
    });

    await streamAI(text, aiDoc.id!);
    setSending(false);
  };

  /* COPY CODE */
  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  /* COPY SELECTED TEXT */
  const copySelection = async () => {
    const selected = window.getSelection()?.toString();
    if (!selected) return;
    await navigator.clipboard.writeText(selected);
  };

  /* RENDER MESSAGE */
  const renderMessage = (text: string, msgId: string) => {
    const parts = text.split(/```/g);

    return parts.map((part, i) => {
      if (i % 2 === 1) {
        const lines = part.trim().split("\n");
        const firstLine = lines[0].toLowerCase();

        const knownLangs = [
          "bash","python","js","javascript","ts","typescript","html","css",
          "json","java","c","cpp","c++","php","go","rust","sql","yaml","yml"
        ];

        const cleanCode = knownLangs.includes(firstLine)
          ? lines.slice(1).join("\n")
          : part.trim();

        return (
          <div
            key={i}
            className="relative bg-black rounded-xl p-3 md:p-4 mt-3 text-sm font-mono overflow-x-auto border border-white/10"
          >
            <button
              onClick={() => copyCode(cleanCode, msgId + i)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700"
            >
              {copiedCode === msgId + i ? "Copied ✓" : "Copy"}
            </button>

            <pre className="whitespace-pre-wrap break-words text-gray-200">
{cleanCode}
            </pre>
          </div>
        );
      }

      return (
        <p key={i} className="whitespace-pre-wrap break-words text-gray-200">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="h-screen w-full bg-[#0a0f1f] text-white grid grid-rows-[auto_1fr_auto]">

      <ChatHeader
        name={project.name}
        color={project.color}
        icon={project.icon}
      />

      {/* MESSAGES */}
      <div
        ref={scrollRef}
        className="relative overflow-y-auto px-3 md:px-6 py-3 md:py-4 space-y-4"
        onMouseUp={copySelection}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.sender === "user" ? (
              <div className="flex justify-end">
                <div className="bg-blue-600 px-3 py-2 rounded-xl max-w-[90%] md:max-w-[70%] break-words text-sm">
                  {msg.message}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 max-w-full">
                <div className="h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                  AI
                </div>
                <div className="bg-[#1b2236] px-3 py-2 rounded-xl max-w-[90%] md:max-w-full text-gray-200 text-sm">
                  {renderMessage(msg.message, msg.id!)}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />

        {showScrollBtn && (
          <button
            onClick={() =>
              bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="fixed bottom-24 right-4 md:right-6 bg-[#1b2236] text-gray-200 px-3 py-2 rounded-full shadow hover:bg-[#222a40] text-sm"
          >
            ↓ New
          </button>
        )}
      </div>

      {/* INPUT */}
      <div className="border-t border-white/10 bg-[#0a0f1f] px-3 md:px-6 py-3 md:py-4">
        <div className="flex gap-2 bg-[#11162a] p-3 rounded-xl">
          <input
            className="flex-1 bg-transparent outline-none text-sm text-gray-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message…"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={sending}
            className="bg-blue-600 px-3 md:px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {sending ? "Thinking…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
