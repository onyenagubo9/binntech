"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseClient";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/auth/login");
      return;
    }

    async function loadProfile() {
      const uid = auth.currentUser!.uid;
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setEmail(data.email || auth.currentUser!.email || "");
        setPlan(data.plan || "free");
        setCredits(data.credits || 0);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function saveProfile() {
    if (!auth.currentUser) return;

    setSaving(true);

    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, {
      name,
    });

    setSaving(false);
    alert("Profile updated");
  }

  async function logout() {
    await signOut(auth);
    router.push("/auth/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1f] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex justify-center p-6">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Profile
        </h1>

        {/* Name */}
        <label className="block mb-2 text-sm text-gray-300">
          Display Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 bg-black/40 border border-white/20 rounded-xl outline-none focus:border-blue-500"
        />

        {/* Email (readonly) */}
        <label className="block mb-2 text-sm text-gray-300">
          Email
        </label>
        <input
          value={email}
          disabled
          className="w-full mb-4 p-3 bg-black/30 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
        />

        {/* Plan */}
        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-400">Plan</span>
          <span className="font-semibold capitalize">{plan}</span>
        </div>

        {/* Credits */}
        <div className="flex justify-between mb-6 text-sm">
          <span className="text-gray-400">Credits</span>
          <span className="font-semibold">{credits}</span>
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full mb-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        <button
          onClick={logout}
          className="w-full py-3 bg-red-600/80 hover:bg-red-700 rounded-xl font-semibold transition"
        >
          Log Out
        </button>

      </div>
    </div>
  );
}
