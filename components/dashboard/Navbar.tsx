export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      className="
      sticky top-0 z-40 
      flex justify-between items-center 
      mb-10 py-4 px-1
      backdrop-blur-xl bg-white/5 
      border-b border-white/10
      shadow-lg
    "
    >
      {/* Hamburger menu for mobile */}
      <button className="md:hidden text-3xl text-blue-400" onClick={onMenuClick}>
        ☰
      </button>

      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/50"
          className="w-10 h-10 rounded-full border border-white/30 shadow-lg"
          alt="avatar"
        />
      </div>
    </div>
  );
}
