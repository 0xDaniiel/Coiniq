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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => openCoinModal(coin.id)}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100 duration-300 hover:scale-[1.02] cursor-pointer transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-black font-bold text-lg">
                    {coin.name}
                  </span>
                </div>
                <button className="text-yellow-500 hover:text-yellow-600 text-xl">
                  ★
                </button>
              </div>
              <div className="text-green-600 text-base font-semibold mb-1">
                Price: ${coin.current_price.toLocaleString()}
              </div>
              <div className="text-purple-700 text-sm font-medium mb-1">
                Market Cap: {formatMarketCap(coin.market_cap)}
              </div>
              <div className="text-teal-700 text-sm font-medium mb-1">
                Rank: #{coin.market_cap_rank}
              </div>
              <div
                className={`text-sm font-medium ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
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
