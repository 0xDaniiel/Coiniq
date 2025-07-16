'use client';
import { useState, useEffect } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  const exchanges = [
    { name: "Binance", volume: 10, rank: 1, markets: 300 },
    { name: "Coinbase", volume: 5, rank: 2, markets: 150 },
    { name: "Kraken", volume: 3, rank: 3, markets: 100 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = exchanges
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortAsc ? a.volume - b.volume : b.volume - a.volume);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-blue-400">Exchanges</h1>
      <p className="text-gray-400">Browse top crypto exchanges and their stats.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search exchanges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Sort by volume {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-20 mb-1" />
              <div className="h-3 bg-gray-700 rounded w-16 mb-1" />
              <div className="h-2 bg-gray-700 rounded w-28" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ex, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl p-4 border border-blue-500/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-medium">{ex.name}</span>
                <button className="text-yellow-400 hover:text-yellow-500">★</button>
              </div>
              <div className="text-gray-300 text-sm mb-1">24h Volume: ${ex.volume}B</div>
              <div className="text-green-400 text-sm mb-1">Rank: #{ex.rank}</div>
              <div className="text-gray-400 text-xs">Markets: {ex.markets}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
