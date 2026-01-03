"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiFolder,
  FiMessageSquare,
} from "react-icons/fi";

/* ================= TYPES ================= */
interface User {
  id: string;
  email?: string;
}

interface Project {
  id: string;
  name?: string;
  createdAt?: any;
}

interface Message {
  id: string;
  message: string;
  sender: "user" | "ai";
  createdAt?: any;
}

/* ================= PAGE ================= */
export default function AdminMessagesPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  /* ================= AUTH ================= */
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

  /* ================= FETCH USERS ================= */
  async function fetchUsers() {
    const snap = await getDocs(collection(db, "users"));

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    setUsers(data);
  }

  /* ================= FETCH PROJECTS ================= */
  async function fetchProjects(userId: string) {
    setProjects([]);
    setMessages([]);
    setSelectedProject(null);

    const snap = await getDocs(
      collection(db, "users", userId, "projects")
    );

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];

    setProjects(data);
  }

  /* ================= FETCH MESSAGES ================= */
  async function fetchMessages(userId: string, projectId: string) {
    const snap = await getDocs(
      collection(
        db,
        "users",
        userId,
        "projects",
        projectId,
        "messages"
      )
    );

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];

    setMessages(data);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-300">
        Loading admin messages…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FiMessageSquare className="text-blue-400" />
        Admin Message Viewer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* USERS */}
        <Panel title="Users" icon={<FiUsers />}>
          {users.map((user) => (
            <Item
              key={user.id}
              label={user.email || user.id}
              active={selectedUser?.id === user.id}
              onClick={() => {
                setSelectedUser(user);
                fetchProjects(user.id);
              }}
            />
          ))}
        </Panel>

        {/* PROJECTS */}
        <Panel title="Projects" icon={<FiFolder />}>
          {projects.length === 0 && (
            <p className="text-gray-400 text-sm">
              Select a user to view projects
            </p>
          )}

          {projects.map((project) => (
            <Item
              key={project.id}
              label={project.name || project.id}
              active={selectedProject?.id === project.id}
              onClick={() => {
                setSelectedProject(project);
                fetchMessages(selectedUser!.id, project.id);
              }}
            />
          ))}
        </Panel>

        {/* MESSAGES */}
        <div className="lg:col-span-2 bg-gray-950 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Conversation
          </h2>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-gray-400">
                Select a project to view messages
              </p>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-4 rounded-xl text-sm ${
                  msg.sender === "ai"
                    ? "bg-blue-500/10 border border-blue-500/20 ml-auto"
                    : "bg-gray-800 border border-gray-700"
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {msg.message}
                </p>
                <div className="text-xs text-gray-400 mt-1">
                  {msg.sender.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
      <h2 className="flex items-center gap-2 font-semibold mb-4">
        <span className="text-blue-400">{icon}</span>
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-3 py-2 rounded transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
    >
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
