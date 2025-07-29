"use client";
import { useState, useEffect } from "react";
import { fetchExchanges } from "@/lib/coingecko";
import type { Exchange } from "@/types/exchange";
import ExchangeHighlights from "@/components/ExchangeHighlights";
import ExchangeTable from "@/components/ExchangeTable";

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

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4">Exchanges</h1>
      <p className="text-gray-600 mb-4">
        Explore top crypto exchanges. Data sorted by 24h volume.
      </p>

      {!loading && <ExchangeHighlights exchanges={exchanges} />}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search exchanges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 text-black rounded px-4 py-2 w-full sm:w-64"
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
          className="bg-white border border-gray-300 text-black rounded px-4 py-2"
        >
          <option value="all">All Exchanges</option>
          <option value="top10">Top 10 by Trust Score</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <ExchangeTable exchanges={filtered} />
      )}
    </div>
  );
}
