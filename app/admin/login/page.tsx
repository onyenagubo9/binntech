"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

// Icons
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loginAdmin() {
    setLoading(true);
    setError("");

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      // 🔐 Check admin privilege
      const adminRef = doc(db, "admins", uid);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        setError("Not authorized as admin");
        setLoading(false);
        return;
      }

      // 🍪 Cookies for middleware
      document.cookie = `binntech_token=${uid}; path=/; max-age=86400; secure;`;
      document.cookie = `binntech_role=admin; path=/; max-age=86400; secure;`;

      router.push("/admin/dashboard");
    } catch {
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
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

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle"></div>
        <div className="particle delay-1"></div>
        <div className="particle delay-2"></div>
        <div className="particle delay-3"></div>
      </div>

      {/* Card */}
      <div className="relative z-20 backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-xl max-w-md w-full animate-card-in">

        {/* Icon */}
        <div className="flex justify-center mb-6 text-blue-400 text-4xl">
          <FiShield />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Access
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Secure administrator login
        </p>

        {/* Error */}
        {error && (
          <p className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4 text-sm animate-shake">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="inputWrapper">
          <FiMail className="inputIcon" />
          <input
            className="inputBox"
            placeholder="Admin email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="inputWrapper">
          <FiLock className="inputIcon" />
          <input
            type={showPass ? "text" : "password"}
            className="inputBox"
            placeholder="Admin password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="passwordToggle"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Button */}
        <button onClick={loginAdmin} className="mainBtn">
          {loading ? "Verifying..." : "Login as Admin"}
        </button>
      </div>

<style>{`
/* Animations */
.animate-card-in {
  animation: cardIn 0.9s ease-out forwards, cardGlow 3s infinite ease-in-out;
  opacity: 0;
  transform: translateY(50px) scale(0.95);
}
@keyframes cardIn {
  to { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes cardGlow {
  0%,100% { box-shadow:0 0 20px #2563eb50; }
  50% { box-shadow:0 0 40px #2563eb80; }
}

/* Particles */
.particle {
  position:absolute;
  width:7px;
  height:7px;
  background:#3b82f6;
  border-radius:50%;
  top:80%;
  left:15%;
  animation:floatUp 6s infinite ease-in-out;
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

/* Inputs */
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
}
.passwordToggle {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #93c5fd;
}
.inputBox {
  width: 100%;
  padding: 12px 45px;
  border-radius: 10px;
  background: rgba(17,24,39,0.85);
  border: 1px solid #374151;
  outline: none;
  color: white;
}
.inputBox:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 15px #3b82f680;
}

/* Button */
.mainBtn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
}
.mainBtn:hover {
  background: #1d4ed8;
}

/* Error */
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
