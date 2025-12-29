"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/auth/login");
      return;
    }

    async function loadStats() {
      const snap = await getDocs(collection(db, "users"));
      setUsersCount(snap.size);
      setLoading(false);
    }

    loadStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1f] text-white flex items-center justify-center">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">BinnTech Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Total Users" value={usersCount} />
        <Stat title="Active Plans" value="Pro / Free" />
        <Stat title="System Status" value="Online" />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
