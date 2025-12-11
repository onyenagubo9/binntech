"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/auth/resetPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleReset() {
    const { success, error } = await resetPassword(email);

    if (success) {
      setMsg("Password reset email sent! Check your inbox.");
    } else {
      setMsg(error);
    }
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center text-white px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/tech1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-20 backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-xl max-w-md w-full animate-card-in">

        <h1 className="text-3xl font-bold text-center mb-4">Reset Password</h1>

        <p className="text-center text-gray-300 mb-6">
          Enter your email to receive a reset link
        </p>

        <input
          className="inputBox"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleReset} className="mainBtn">
          Send Reset Link
        </button>

        {msg && (
          <p className="text-center mt-4 text-blue-300">{msg}</p>
        )}

        <p className="text-center mt-6 text-gray-300">
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
