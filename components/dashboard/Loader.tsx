export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full py-20">
      <div className="loader"></div>

      <style>{`
        .loader {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 5px solid rgba(59,130,246,0.3);
          border-top-color: #3b82f6;
          animation: spin 0.8s linear infinite, glow 1.5s ease-in-out infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px #3b82f680, 0 0 20px #60a5fa70; }
          50% { box-shadow: 0 0 20px #3b82f6cc, 0 0 40px #60a5faaa; }
        }
      `}</style>
    </div>
  );
}
