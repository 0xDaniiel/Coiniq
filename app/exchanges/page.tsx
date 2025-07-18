"use client";
import { useState, useEffect } from "react";
import { fetchExchanges } from "@/lib/coingecko";
import type { Exchange } from "@/types/exchange";

export default function page() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [topFilter, setTopFilter] = useState<"all" | "top10">("all");

  useEffect(() => {
    fetchExchanges()
      .then(setExchanges)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = exchanges
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => (topFilter === "top10" ? e.trust_score_rank <= 10 : true))
    .sort((a, b) =>
      sortAsc
        ? b.trade_volume_24h_btc - a.trade_volume_24h_btc
        : a.trade_volume_24h_btc - b.trade_volume_24h_btc
    );

  const formatVol = (vol: number) => `$${(vol / 1_000).toFixed(1)}k BTC`;

  return (
    <div className="w-full px-4 py-6 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">Exchanges</h1>
      <p className="text-gray-400 mb-4">Explore top crypto exchanges</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search exchanges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 rounded px-4 py-2 w-full sm:w-64"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sort by volume {sortAsc ? "↓" : "↑"}
        </button>
        <select
          value={topFilter}
          onChange={(e) => setTopFilter(e.target.value as any)}
          className="bg-gray-800 border border-gray-700 text-gray-100 rounded px-4 py-2"
        >
          <option value="all">All Exchanges</option>
          <option value="top10">Top 10 by Trust Score</option>
        </select>
      </div>
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-16 mb-1"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ex) => (
            <div
              key={ex.id}
              className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500 hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={ex.image}
                    alt={ex.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-bold text-lg">
                    {ex.name}
                  </span>
                </div>
                <button className="text-yellow-400 hover:text-yellow-500 text-xl">
                  ★
                </button>
              </div>
              <div className="text-gray-300 text-base font-semibold mb-1">
                Volume: {formatVol(ex.trade_volume_24h_btc)}
              </div>
              <div className="text-green-400 text-sm font-medium mb-1">
                Trust Rank: #{ex.trust_score_rank}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
