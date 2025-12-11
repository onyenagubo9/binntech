"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

export default function AiToolsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/auth/login");
      else setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p className="p-4">Checking authentication...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">AI Tools</h1>
    </div>
  );
}
