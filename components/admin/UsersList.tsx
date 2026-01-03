"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

interface User {
  id: string;      // 🔑 Firestore document ID (UID)
  email?: string;
}

export default function UsersList({
  onSelectUser,
}: {
  onSelectUser: (userId: string) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    return onSnapshot(
      collection(db, "users"),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,                 // 🔑 THIS IS WHAT MATTERS
          ...(doc.data() as any),
        }));

        console.log("ADMIN users loaded:", data);
        setUsers(data);
      },
      (err) => console.error("Users snapshot error:", err)
    );
  }, []);

  return (
    <div className="bg-[#11162a] rounded-xl p-4">
      <h2 className="font-semibold mb-3">Users</h2>

      {users.map((u) => (
        <button
          key={u.id}
          onClick={() => {
            console.log("ADMIN selected user UID:", u.id);
            setActiveUser(u.id);
            onSelectUser(u.id);
          }}
          className={`block w-full text-left p-2 rounded mb-1 ${
            activeUser === u.id
              ? "bg-blue-600"
              : "hover:bg-white/10"
          }`}
        >
          <div className="text-sm font-medium">
            {u.email || "No email"}
          </div>
          <div className="text-xs text-gray-400 break-all">
            UID: {u.id}
          </div>
        </button>
      ))}
    </div>
  );
}
