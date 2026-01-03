"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  sender: "user" | "ai";
  message: string;
}

export default function MessagesViewer({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !projectId) return;

    console.log("MessagesViewer mounted with:", userId, projectId);
    setLoading(true);

    const q = query(
      collection(
        db,
        "users",
        userId,
        "projects",
        projectId,
        "messages"
      ),
      orderBy("createdAt", "asc")
    );

    return onSnapshot(
      q,
      (snap) => {
        setMessages(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Message, "id">),
          }))
        );
        setLoading(false);
      },
      (err) => {
        console.error("Messages snapshot error:", err);
        setLoading(false);
      }
    );
  }, [userId, projectId]);

  return (
    <div className="bg-[#11162a] rounded-xl p-4 h-full overflow-y-auto">
      <h2 className="font-semibold mb-3">
        Chat — <span className="text-gray-400">{projectId}</span>
      </h2>

      {loading && (
        <p className="text-gray-400 text-sm">Loading messages…</p>
      )}

      {!loading && messages.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          No messages in this project yet.
        </p>
      )}

      {messages.map((m) => (
        <div
          key={m.id}
          className={`mb-3 p-3 rounded-xl max-w-[80%] ${
            m.sender === "user"
              ? "bg-blue-600 ml-auto"
              : "bg-[#1b2236]"
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {m.message}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
