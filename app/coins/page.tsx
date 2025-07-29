"use client";
import { useState } from "react";
import { useCoins } from "@/hooks/usecoins";
import { applyFilter } from "@/lib/filterCoins";
import type { CoinDetail } from "@/types/coin";
import CoinTable from "@/components/CoinTable";
import CoinModal from "@/components/CoinModal";
import { formatMarketCap, formatNumberShort } from "@/lib/dataCal";

export default function Page() {
  const { coins, loading } = useCoins();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCoin, setSelectedCoin] = useState<CoinDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const filteredCoins = applyFilter(
    coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    ),
    filter
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
    <div className="w-full min-h-screen bg-white text-black px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Cryptocurrencies</h1>
      <p className="text-gray-600 mb-4">
        Browse and track top cryptocurrencies. Data updates every 10 seconds.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 text-black rounded px-4 py-2 w-full sm:w-64"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 text-black rounded px-4 py-2"
        >
          <option value="all">All Coins</option>
          <option value="top100">Top 100 by Market Cap</option>
          <option value="gainers">Top Gainers (24h)</option>
        </select>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
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
