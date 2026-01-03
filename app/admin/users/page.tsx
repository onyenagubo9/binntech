"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FiUsers } from "react-icons/fi";

interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  plan?: string;
  createdAt?: any;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      await fetchUsers();
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  async function fetchUsers() {
    try {
      const q = query(
        collection(db, "users"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const usersData: User[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-300">
        Loading users…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FiUsers className="text-blue-400 text-3xl" />
        <h1 className="text-3xl font-bold">All Users</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-950 border border-gray-800 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-900 border-b border-gray-800">
            <tr>
              <Th>Email</Th>
              <Th>Name</Th>
              <Th>Plan</Th>
              <Th>Role</Th>
              <Th>Joined</Th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition"
              >
                <Td>{user.email || "—"}</Td>
                <Td>{user.name || "—"}</Td>
                <Td>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                    {user.plan || "free"}
                  </span>
                </Td>
                <Td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.role === "admin"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </Td>
                <Td>
                  {user.createdAt?.toDate
                    ? user.createdAt.toDate().toLocaleDateString()
                    : "—"}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- TABLE HELPERS ---------- */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-6 py-4 font-semibold text-gray-300">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-6 py-4">{children}</td>;
}
