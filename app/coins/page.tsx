"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fake coins list
  const coins = [
    { name: "Bitcoin", price: 31000, change: 2.5, marketCap: "600B" },
    { name: "Ethereum", price: 2000, change: -1.2, marketCap: "250B" },
    { name: "Solana", price: 40, change: 5.3, marketCap: "20B" },
    { name: "Cardano", price: 0.35, change: -0.5, marketCap: "12B" },
  ];

  useEffect(() => {
    // Fake loading for demo
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort
  const filteredCoins = coins
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-blue-400">Cryptocurrencies</h1>
      <p className="text-gray-400">
        Browse and track all available cryptocurrencies.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search coins..."
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
            <div key={idx} className="bg-gray-800 rounded-xl p-4 animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-700" />
                <div className="h-4 bg-gray-700 rounded w-24" />
              </div>
              <div className="h-3 bg-gray-700 rounded w-20 mb-1" />
              <div className="h-3 bg-gray-700 rounded w-16 mb-1" />
              <div className="h-2 bg-gray-700 rounded w-28" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCoins.map((coin, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl p-4 border border-blue-500/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700" />
                  <span className="text-gray-300 font-medium">{coin.name}</span>
                </div>
                <button className="text-yellow-400 hover:text-yellow-500">
                  ★
                </button>
              </div>
              <div className="text-gray-300 text-sm mb-1">
                Price: ${coin.price}
              </div>
              <div
                className={`${
                  coin.change >= 0 ? "text-green-400" : "text-red-400"
                } text-sm mb-1`}
              >
                24h Change: {coin.change > 0 ? "+" : ""}
                {coin.change}%
              </div>
              <div className="text-gray-400 text-xs">
                Market Cap: {coin.marketCap}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
