"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

interface Project {
  id: string;        // Firestore document ID
  name?: string;     // Display name
  slug?: string;     // 🔑 Actual projectId used in chat paths (e.g. "test-project")
}

export default function ProjectsList({
  userId,
  onSelectProject,
}: {
  userId: string;
  onSelectProject: (projectId: string) => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    console.log("ADMIN loading projects for user:", userId);
    setLoading(true);

    return onSnapshot(
      collection(db, "users", userId, "projects"),
      (snap) => {
        const data: Project[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));

        console.log("ADMIN projects found:", data);
        setProjects(data);
        setLoading(false);
      },
      (error) => {
        console.error("Projects snapshot error:", error);
        setLoading(false);
      }
    );
  }, [userId]);

  return (
    <div className="bg-[#11162a] rounded-xl p-4">
      <h2 className="font-semibold mb-3">Projects</h2>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-sm">Loading projects…</p>
      )}

      {/* Empty */}
      {!loading && projects.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          No projects found.
        </p>
      )}

      {/* Projects */}
      {projects.map((project) => {
        // 🔑 CRITICAL: must match Firestore path used by Builder
        const projectId = project.slug ?? project.id;

        return (
          <button
            key={projectId}
            onClick={() => {
              console.log("ADMIN selected project:", projectId);
              setActiveProject(projectId);
              onSelectProject(projectId);
            }}
            className={`block w-full text-left p-2 rounded mb-1 transition ${
              activeProject === projectId
                ? "bg-blue-600"
                : "hover:bg-white/10"
            }`}
          >
            {project.name || projectId}
          </button>
        );
      })}
    </div>
  );
}
