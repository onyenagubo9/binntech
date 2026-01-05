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
  createdAt?: any;
}

interface ProjectMeta {
  name?: string;
  color?: string;
  icon?: string;
}

export default function Builder({ projectId }: BuilderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [project, setProject] = useState<ProjectMeta>({});

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     Auto-scroll
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     Load project + messages
  ========================= */
  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !projectId) {
      setLoading(false);
      return;
    }

    // Load project meta
    getDoc(doc(db, "users", user.uid, "projects", projectId)).then(
      (snap) => {
        if (snap.exists()) {
          setProject(snap.data() as ProjectMeta);
        }
      }
    );

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
      (err) => {
        console.error(err);
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
        name: project.name || projectId.replace(/-/g, " "),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  /* =========================
     Send message
  ========================= */
  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const user = auth.currentUser;
    if (!user) return;

    const text = input.trim();
    setInput("");
    setSending(true);

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

    setSending(false);
  };

  if (loading) {
    return (
      <div
        className="ml-64 p-6 text-gray-400"
      >
        Loading conversation…
      </div>
    );
  }

  return (
    <div className="ml-64 flex flex-col min-h-screen bg-[#0a0f1f] text-white">
      {/* ✅ STICKY CHAT HEADER */}
      <ChatHeader
        name={project.name}
        color={project.color}
        icon={project.icon}
      />

      {/* 💬 CHAT BODY */}
      <div className="flex-1 flex flex-col px-6 py-4">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              No messages yet. Start typing below 👇
            </p>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.sender === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-blue-600 px-4 py-2 rounded-xl max-w-[70%]">
                    {msg.message}
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 max-w-[70%]">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                    AI
                  </div>
                  <div className="bg-[#1b2236] px-4 py-2 rounded-xl">
                    {msg.message}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* ✍️ INPUT */}
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
    </div>
  );
}
