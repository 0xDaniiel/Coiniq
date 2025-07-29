"use client";
import { useEffect, useState } from "react";
import { fetchTopCoins } from "@/lib/coingecko";
import type { Coin, CoinDetail } from "@/types/coin";
import CoinModal from "@/components/CoinModal";
import Image from "next/image";

export default function Page() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCoin, setSelectedCoin] = useState<CoinDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopCoins();
        setCoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const applyFilter = (coins: Coin[]) => {
    switch (filter) {
      case "top100":
        return coins.filter(
          (coin) => coin.market_cap_rank && coin.market_cap_rank <= 100
        );
      case "gainers":
        return coins
          .filter((coin) => coin.price_change_percentage_24h !== undefined)
          .sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
          .slice(0, 100);
      default:
        return coins;
    }
  };

  const filteredCoins = applyFilter(
    coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const formatMarketCap = (cap: number): string => {
    if (cap >= 1_000_000_000) return `$${(cap / 1_000_000_000).toFixed(1)}B`;
    if (cap >= 1_000_000) return `$${(cap / 1_000_000).toFixed(1)}M`;
    return `$${cap.toLocaleString()}`;
  };

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
    <div className="w-full px-4 py-6 bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4 text-black">Cryptocurrencies</h1>
      <p className="text-gray-600 mb-4">
        Browse and track top cryptocurrencies. Data updates every 10 seconds.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
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
        <div className="w-full divide-y divide-gray-200">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => openCoinModal(coin.id)}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <div className="font-bold text-black text-lg">
                    {coin.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Market Cap: {formatMarketCap(coin.market_cap)} | Rank: #
                    {coin.market_cap_rank}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-green-600 font-semibold">
                  ${coin.current_price.toLocaleString()}
                </div>
                <div
                  className={`text-sm ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  24h: {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
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
