"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth/loginUser";

// Icons
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin() {
    setLoading(true);
    setErrorMsg("");

    const { error } = await loginUser(email, password);

    if (error) {
      setErrorMsg(error);
      setLoading(false);
      return;
    }

    router.push("/ai");
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Floating glowing particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle"></div>
        <div className="particle delay-1"></div>
        <div className="particle delay-2"></div>
        <div className="particle delay-3"></div>
      </div>

      {/* Glass glowing card */}
      <div className="relative z-20 backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-xl max-w-md w-full animate-card-in">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/binn-logo.png"
            alt="BinnTech Logo"
            className="w-20 h-20 object-contain animate-logo"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 animate-fade-slow">
          Welcome Back
        </h1>

        <p className="text-center text-gray-300 mb-8 animate-fade-slow">
          Login to access your AI tools
        </p>

        {/* Error message */}
        {errorMsg && (
          <p className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4 text-sm animate-shake">
            {errorMsg}
          </p>
        )}

        {/* EMAIL INPUT WITH ICON */}
        <div className="inputWrapper">
          <FiMail className="inputIcon" />
          <input
            className="inputBox"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD INPUT WITH ICON + SHOW/HIDE */}
        <div className="inputWrapper">
          <FiLock className="inputIcon" />
          <input
            type={showPass ? "text" : "password"}
            className="inputBox"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show/Hide Toggle */}
          <span
            className="passwordToggle"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Forgot Password */}
        <p
          className="text-right text-blue-400 text-sm mb-4 hover:underline cursor-pointer"
          onClick={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mainBtn"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-300">
          Don’t have an account?
          <a href="/auth/signup" className="text-blue-400 ml-1 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

<style>{`
/* Animations + Glow reused from Signup */
.animate-card-in {
  animation: cardIn 0.9s ease-out forwards, cardGlow 3s infinite ease-in-out;
  opacity: 0;
  transform: translateY(50px) scale(0.95);
}
@keyframes cardIn { to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes cardGlow {
  0%,100% { box-shadow:0 0 20px #2563eb50, 0 0 40px #2563eb30; }
  50% { box-shadow:0 0 35px #2563eb80, 0 0 65px #2563eb50; }
}

.animate-logo {
  animation: pulseLogo 3s infinite ease-in-out, logoGlow 2s infinite ease-in-out alternate;
}
@keyframes pulseLogo { 0%,100% {scale:1;} 50% {scale:1.08;} }
@keyframes logoGlow {
  0% {filter:drop-shadow(0 0 6px #60a5fa);}
  100% {filter:drop-shadow(0 0 14px #3b82f6);}
}

/* Floating particles */
.particle {
  position:absolute; width:7px; height:7px; background:#3b82f6; border-radius:50%;
  top:80%; left:15%; animation:floatUp 6s infinite ease-in-out;
  filter:drop-shadow(0 0 10px #3b82f6);
}
.particle.delay-1 { left:40%; animation-duration:7s; }
.particle.delay-2 { left:65%; animation-duration:8s; }
.particle.delay-3 { left:80%; animation-duration:9s; }

@keyframes floatUp {
  0% { transform:translateY(0); opacity:0.2; }
  50% { opacity:1; }
  100% { transform:translateY(-800px); opacity:0; }
}

/* Input Wrapper */
.inputWrapper {
  position: relative;
  margin-bottom: 16px;
}

.inputIcon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #60a5fa;
  font-size: 1.2rem;
  pointer-events:none;
}

/* Show/Hide password */
.passwordToggle {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #93c5fd;
  font-size: 1.3rem;
}

/* Input Box */
.inputBox {
  width: 100%;
  padding: 12px 45px 12px 45px;
  border-radius: 10px;
  background: rgba(17,24,39,0.85);
  border: 1px solid #374151;
  outline: none;
  color: white;
  transition: 0.3s;
}
.inputBox:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 15px #3b82f680, 0 0 30px #2563eb50;
}

/* Login Button */
.mainBtn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color:white;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight:600;
  cursor:pointer;
  transition:0.3s;
  animation: btnGlow 3s infinite ease-in-out;
}
@keyframes btnGlow {
  0%,100% { box-shadow:0 0 20px #2563eb60; }
  50% { box-shadow:0 0 40px #2563eb90; }
}

/* Error shake animation */
.animate-shake {
  animation: shake 0.3s ease-in-out;
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
`}</style>

    </div>
  );
}
