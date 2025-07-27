"use client";
import { useState, useEffect } from "react";
import { fetchExchanges } from "@/lib/coingecko";
import type { Exchange } from "@/types/exchange";
import Image from "next/image";

export default function Page() {
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
    <div className="w-full min-h-screen bg-white text-black px-6 py-6">
      <h1 className="text-3xl font-bold mb-2">Exchanges</h1>
      <p className="text-gray-700 mb-6">Explore top crypto exchanges</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search exchanges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-black text-black rounded px-4 py-2 w-full sm:w-64 shadow-sm"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-800 transition"
        >
          Sort by volume {sortAsc ? "↓" : "↑"}
        </button>
        <select
          value={topFilter}
          onChange={(e) => setTopFilter(e.target.value as "all" | "top10")}
          className="bg-white border border-black text-black rounded px-4 py-2 shadow-sm "
        >
          <option value="all" className="hover:bg-black">
            All Exchanges
          </option>
          <option value="top10" className="hover:bg-black">
            Top 10 by Trust Score
          </option>
        </select>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-neutral-200 rounded-xl p-4 animate-pulse"
            >
              <div className="h-4 bg-neutral-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-neutral-300 rounded w-20 mb-1"></div>
              <div className="h-3 bg-neutral-300 rounded w-16 mb-1"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((ex) => (
            <div
              key={ex.id}
              className="bg-white border border-black rounded-xl p-6 hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={ex.image}
                    alt={ex.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-bold text-lg">{ex.name}</span>
                </div>
                <button className="text-yellow-500 hover:text-yellow-600 text-xl">
                  ★
                </button>
              </div>
              <div className="text-sm font-medium mb-1">
                Volume: {formatVol(ex.trade_volume_24h_btc)}
              </div>
              <div className="text-sm text-green-600 font-medium mb-1">
                Trust Rank: #{ex.trust_score_rank}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
