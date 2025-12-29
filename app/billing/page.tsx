"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { usePaystackPayment } from "react-paystack";

export default function BillingPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Get logged-in user's email
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/auth/login");
      return;
    }

    setEmail(auth.currentUser.email || "");
  }, [router]);

  const paystackConfig = {
    reference: `binntech_${Date.now()}`,
    email,
    amount: 5000 * 100, // ₦5,000 in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  function handleSubscribe() {
    if (!email) return;

    setLoading(true);

    initializePayment({
      onSuccess: async (reference) => {
        // Call backend to verify & credit user
        await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: reference.reference,
          }),
        });

        alert("Payment successful! Pro plan activated.");
        router.push("/dashboard");
      },
      onClose: () => {
        setLoading(false);
        alert("Payment cancelled");
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">

        <h1 className="text-2xl font-bold mb-2 text-center">
          Pro Plan
        </h1>

        <p className="text-center text-gray-300 mb-6">
          ₦5,000 / month
        </p>

        <div className="space-y-3 mb-6 text-sm text-gray-200">
          <p>✅ 500 AI credits per month</p>
          <p>✅ AI Code Generator</p>
          <p>✅ AI Debugger</p>
          <p>✅ Project Builder</p>
          <p>✅ Priority access</p>
        </div>

        <button
          disabled={loading}
          onClick={handleSubscribe}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Processing..." : "Subscribe for ₦5,000"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Secure payment powered by Paystack
        </p>
      </div>
    </div>
  );
}
