"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiShield,
} from "react-icons/fi";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const adminRef = doc(db, "admins", user.uid);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        await signOut(auth);
        router.push("/admin/login");
        return;
      }

      setAdminEmail(user.email || "");
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-300">
        <div className="animate-pulse text-lg">Loading admin dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 text-blue-400 text-xl font-bold mb-10">
          <FiShield />
          BinnTech Admin
        </div>

        <nav className="space-y-3 flex-1">
          <SidebarItem icon={<FiActivity />} label="Overview" active />
          <SidebarItem icon={<FiUsers />} label="Users" />
          <SidebarItem icon={<FiDollarSign />} label="Payments" />
          <SidebarItem icon={<FiSettings />} label="Settings" />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Logged in as <span className="text-blue-400">{adminEmail}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="md:hidden bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* STATS / FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <FeatureCard
            icon={<FiUsers />}
            title="Users"
            description="View and manage all users"
          />
          <FeatureCard
            icon={<FiDollarSign />}
            title="Payments"
            description="Track transactions & revenue"
          />
          <FeatureCard
            icon={<FiActivity />}
            title="Usage"
            description="Monitor platform activity"
          />
          <FeatureCard
            icon={<FiSettings />}
            title="Subscriptions"
            description="Manage plans & access"
          />
        </div>

        {/* CONTENT PANEL */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <ul className="space-y-3 text-gray-300">
            <li>✅ Admin authentication active</li>
            <li>✅ Firestore admin roles verified</li>
            <li>✅ Secure session handling enabled</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
      <div className="text-blue-400 text-2xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
