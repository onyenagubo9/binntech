"use client";

interface StoreCardProps {
  title: string;
  price: string;
}

export default function StoreCard({
  title,
  price,
}: StoreCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-blue-400 font-bold mb-4">
        {price}
      </p>

      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold transition">
        Buy Now
      </button>
    </div>
  );
}
