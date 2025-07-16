"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  const nfts = [
    { name: "Cool Cats", price: 1.2 },
    { name: "Bored Ape", price: 12 },
    { name: "Doodles", price: 0.8 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = nfts
    .filter((n) => n.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-blue-400">NFTs</h1>
      <p className="text-gray-400">Explore trending NFTs and collections.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search NFTs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Sort by price {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl h-60 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((nft, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl overflow-hidden border border-blue-500/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition"
            >
              <div className="h-40 bg-gray-700" /> {/* placeholder image */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 font-medium">{nft.name}</span>
                  <button className="text-yellow-400 hover:text-yellow-500">
                    ★
                  </button>
                </div>
                <div className="text-gray-400 text-sm">
                  Price: {nft.price} ETH
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
