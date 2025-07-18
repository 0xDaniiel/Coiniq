"use client";
import { useEffect, useState } from "react";
import { fetchTopCoins } from "@/lib/coingecko";
import type { Coin } from "@/types/coin";
import CoinModal from "@/components/CoinModal";

export default function Page() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [filter, setFilter] = useState("all");

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

  return (
    <div className="w-full px-4 py-6 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">
        Cryptocurrencies
      </h1>
      <p className="text-gray-400 mb-4">
        Browse and track top cryptocurrencies. Data updates every 10 seconds.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 rounded px-4 py-2 w-full sm:w-64"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Search
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 rounded px-4 py-2"
        >
          <option value="all">All Coins</option>
          <option value="top100">Top 100 by Market Cap</option>
          <option value="gainers">Top Gainers (24h)</option>
        </select>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className="bg-gray-900 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10   duration-3000 hover:scale-[1.02] cursor-pointer transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-bold text-lg">
                    {coin.name}
                  </span>
                </div>
                <button className="text-yellow-400 hover:text-yellow-500 text-xl">
                  ★
                </button>
              </div>
              <div className="text-green-400 text-base font-semibold mb-1">
                Price: ${coin.current_price.toLocaleString()}
              </div>
              <div className="text-purple-300 text-sm font-medium mb-1">
                Market Cap: {formatMarketCap(coin.market_cap)}
              </div>
              <div className="text-teal-300 text-sm font-medium mb-1">
                Rank: #{coin.market_cap_rank}
              </div>
              <div
                className={`text-sm font-medium ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCoin && (
        <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
    </div>
  );
}
