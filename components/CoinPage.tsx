"use client";
import { useState } from "react";
import { useCoins } from "@/hooks/usecoins";
import type { CoinDetail } from "@/types/coin";
import CoinTable from "@/components/CoinTable";
import CoinModal from "@/components/CoinModal";
import { formatMarketCap, formatNumberShort } from "@/lib/dataCal";
import { sortCoins, applyFilter } from "@/lib/sortCoin";
import CoinHighlights from "@/components/CoinHighlights";

export default function CoinPage() {
  const { coins, loading } = useCoins();
  const [search, setSearch] = useState("");
  // const [sortBy, setSortBy] = useState<"24h" | "volume" | null>(null);
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCoin, setSelectedCoin] = useState<CoinDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredCoins = sortCoins(
    applyFilter(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      ),
      filter
    ),
    null,
    "desc"
  );

  const openCoinModal = async (coinId: string) => {
    try {
      setModalLoading(true);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      if (!res.ok) throw new Error("Failed to fetch full coin data");
      const data = await res.json();
      setSelectedCoin(data);
    } catch (error) {
      console.error("Error loading coin details", error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    // <div className="w-full min-h-screen bg-white text-black px-4 py-6">
    <div className="w-full min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 py-6">
      <h1 className="text-3xl font-bold  py-1 mb-6">Cryptocurrencies</h1>

      <div className="mb-6">
        <CoinHighlights coins={coins} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 w-full md:py-3 py-2">
        {/* Search input on the left */}
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-black border border-gray-300 dark:border-white/20 text-black dark:text-white rounded px-4 py-2 w-full sm:w-64"
        />

        {/* Filter dropdown on the right */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white dark:bg-black border border-gray-300 dark:border-white/20 text-black dark:text-white rounded px-4 py-2"
        >
          <option value="all">All Coins</option>
          <option value="top100">Top 100 by Market Cap</option>
          <option value="gainers">Top Gainers (24h)</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10  rounded w-full"></div>
          <div className="h-4 bg-gray-200  dark:bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10  rounded w-3/4"></div>
        </div>
      ) : (
        <CoinTable
          coins={filteredCoins}
          onCoinClick={openCoinModal}
          formatMarketCap={formatMarketCap}
          formatNumberShort={formatNumberShort}
        />
      )}

      {modalLoading && (
        <p className="text-gray-600 mt-4">Loading coin details...</p>
      )}

      {selectedCoin && !modalLoading && (
        <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
    </div>
  );
}
