"use client";

import { useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { createProject } from "@/lib/projects/createProject";
import { useRouter } from "next/navigation";

export default function CreateProjectButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid || !name.trim()) return;

    setLoading(true);
    try {
      const projectId = await createProject(uid, name);
      setOpen(false);
      setName("");
      router.push(`/dashboard/builder/${projectId}`);
    } catch (err) {
      console.error("Create project failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full mb-3 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium"
      >
        + New Project
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#11162a] rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Create new project
            </h2>

            <input
              className="w-full p-2 rounded bg-black/30 border border-white/10 mb-4 outline-none"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 text-sm rounded bg-blue-600"
              >
                {loading ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
