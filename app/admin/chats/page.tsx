"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import UsersList from "@/components/admin/UsersList";
import ProjectsList from "@/components/admin/ProjectsList";
import MessagesViewer from "@/components/admin/MessagesViewer";

export default function AdminChatsPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const adminSnap = await getDoc(doc(db, "admins", user.uid));
      if (!adminSnap.exists()) {
        router.replace("/dashboard");
        return;
      }

      setIsAdmin(true);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Checking admin access…
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white p-6 grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <UsersList onSelectUser={setSelectedUser} />
      </div>

      <div className="col-span-3">
        {selectedUser && (
          <ProjectsList
            userId={selectedUser}
            onSelectProject={setSelectedProject}
          />
        )}
      </div>

      <div className="col-span-6">
        {selectedUser && selectedProject && (
          <MessagesViewer
            userId={selectedUser}
            projectId={selectedProject}
          />
        )}
      </div>
    </div>
  );
}
