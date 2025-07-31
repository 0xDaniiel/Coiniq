"use client";
import { useState, useEffect } from "react";
import { fetchExchanges } from "@/lib/coingecko";
import type { Exchange } from "@/types/exchange";
import ExchangeHighlights from "@/components/ExchangeHighlights";
import ExchangeTable from "@/components/ExchangeTable";

export default function ExchangePage() {
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

  return (
    <div className="w-full px-4 py-6 min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold py-1 mb-6">Exchanges</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Explore top crypto exchanges. Data sorted by 24h volume.
      </p>

      {!loading && <ExchangeHighlights exchanges={exchanges} />}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 w-full md:py-3 py-2">
        {/* Search on the left */}
        <input
          type="text"
          placeholder="Search exchanges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white text-black dark:bg-black dark:text-white dark:border-gray-700 border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
        />

        {/* Sort and Filter on the right */}
        <div className="flex gap-3">
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded hover:bg-blue-800 dark:hover:bg-blue-400 transition"
          >
            Sort by volume {sortAsc ? "↓" : "↑"}
          </button>
          <select
            value={topFilter}
            onChange={(e) => setTopFilter(e.target.value as "all" | "top10")}
            className="bg-white text-black dark:bg-black dark:text-white dark:border-gray-700 border border-gray-300 rounded px-4 py-2"
          >
            <option value="all">All Exchanges</option>
            <option value="top10">Top 10 by Trust Score</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        </div>
      ) : (
        <ExchangeTable exchanges={filtered} />
      )}
    </div>
  );
}
