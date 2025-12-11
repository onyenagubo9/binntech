"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/auth/resetPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null); // FIXED

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="
        relative z-20 backdrop-blur-xl bg-white/10 border border-white/20 
        p-10 rounded-2xl shadow-xl max-w-md w-full animate-card-in
      ">

        <h1 className="text-3xl font-bold text-center mb-4">
          Reset Password
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Enter your email to receive a reset link
        </p>

        {/* Input */}
        <input
          className="inputBox"
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Button */}
        <button onClick={handleReset} className="mainBtn">
          Send Reset Link
        </button>

        {/* Feedback Message */}
        {msg && (
          <p className="text-center mt-4 text-blue-300 animate-fade-in">
            {msg}
          </p>
        )}

        <p className="text-center mt-6 text-gray-300">
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Back to Login
          </a>
        </p>
      </div>

      {/* Extra Styles */}
      <style>{`
        .animate-card-in {
          animation: cardIn 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px) scale(0.97);
        }
        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .inputBox {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border-radius: 10px;
          background: rgba(17, 24, 39, 0.85);
          border: 1px solid #374151;
          color: white;
          outline: none;
          transition: all 0.3s;
        }
        .inputBox:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 12px #3b82f670;
        }

        .mainBtn {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          color: white;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 20px #2563eb60;
        }
        .mainBtn:hover {
          background: #1d4ed8;
          box-shadow: 0 0 25px #2563eb90;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
