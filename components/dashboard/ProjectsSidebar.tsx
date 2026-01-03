"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { useRouter, usePathname } from "next/navigation";
import CreateProjectButton from "@/components/dashboard/CreateProjectButton";

interface Project {
  id: string;
  name?: string;
  color?: string;
  icon?: string;
}

export default function ProjectsSidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [authReady, setAuthReady] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let unsubscribeProjects: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // 🔒 Clean up old listener
      if (unsubscribeProjects) {
        unsubscribeProjects();
        unsubscribeProjects = null;
      }

      if (!user) {
        setProjects([]);
        setAuthReady(true);
        return;
      }

      // ✅ Attach Firestore listener AFTER auth is ready
      unsubscribeProjects = onSnapshot(
        collection(db, "users", user.uid, "projects"),
        (snap) => {
          const data: Project[] = snap.docs.map((docSnap) => {
            const docData = docSnap.data() as Omit<Project, "id">;

            return {
              ...docData,
              id: docSnap.id,
            };
          });

          setProjects(data);
          setAuthReady(true);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0f1428] border-r border-white/10 flex flex-col">
      {/* 🔒 FIXED HEADER */}
      <div className="shrink-0 p-4 border-b border-white/10 bg-[#0f1428]">
        <h1 className="text-lg font-semibold tracking-tight">
          BinnTech AI
        </h1>
        <p className="text-xs text-gray-400 mb-3">
          Your projects & chats
        </p>

        <CreateProjectButton />
      </div>

      {/* 📜 PROJECT LIST */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <h2 className="text-xs font-semibold text-gray-400 my-3">
          Projects
        </h2>

        {!authReady && (
          <p className="text-xs text-gray-500 italic">
            Loading projects…
          </p>
        )}

        {authReady && projects.length === 0 && (
          <p className="text-xs text-gray-500 italic">
            No projects yet
          </p>
        )}

        <div className="space-y-1">
          {projects.map((project) => {
            const active = pathname.includes(project.id);

            return (
              <button
                key={project.id}
                onClick={() =>
                  router.push(`/dashboard/builder/${project.id}`)
                }
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-white/10 text-gray-200"
                  }
                `}
              >
                {/* 🎨 Color dot */}
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: project.color || "#3B82F6",
                  }}
                />

                {/* 🧩 Icon */}
                <span className="text-base">
                  {project.icon || "📁"}
                </span>

                {/* 📛 Name */}
                <span className="truncate">
                  {project.name || "Untitled project"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
