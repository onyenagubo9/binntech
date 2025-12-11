export default function StoreCard({ title, price }: any) {
  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg shadow-lg hover:shadow-purple-500/30 transition hover:-translate-y-1 cursor-pointer">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-300 text-sm mt-2">Ready-to-use project folder</p>
      <p className="text-blue-400 font-bold text-xl mt-4">{price}</p>
    </div>
  );
}
