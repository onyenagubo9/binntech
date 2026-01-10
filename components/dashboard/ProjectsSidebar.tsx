"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { useRouter, usePathname } from "next/navigation";
import CreateProjectButton from "@/components/dashboard/CreateProjectButton";
import { Menu, X } from "lucide-react";

interface Project {
  id: string;
  name?: string;
  color?: string;
  icon?: string;
}

export default function ProjectsSidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [authReady, setAuthReady] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let unsubscribeProjects: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeProjects) {
        unsubscribeProjects();
        unsubscribeProjects = null;
      }

      if (!user) {
        setProjects([]);
        setAuthReady(true);
        return;
      }

      unsubscribeProjects = onSnapshot(
        collection(db, "users", user.uid, "projects"),
        (snap) => {
          setProjects(
            snap.docs.map((docSnap) => ({
              ...(docSnap.data() as Omit<Project, "id">),
              id: docSnap.id,
            }))
          );
          setAuthReady(true);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, []);

  /* Close sidebar on navigation (mobile) */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 🍔 MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#0f1428] p-2 rounded-lg border border-white/10 text-white"
      >
        <Menu size={18} />
      </button>

      {/* 🌑 OVERLAY (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* 📂 SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          bg-[#0f1428] border-r border-white/10 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="shrink-0 p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">BinnTech AI</h1>
            <p className="text-xs text-gray-400">Your projects & chats</p>
          </div>

          {/* ❌ CLOSE (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* CREATE PROJECT */}
        <div className="p-4">
          <CreateProjectButton />
        </div>

        {/* PROJECT LIST */}
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
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: project.color || "#3B82F6",
                    }}
                  />
                  <span>{project.icon || "📁"}</span>
                  <span className="truncate">
                    {project.name || "Untitled project"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
