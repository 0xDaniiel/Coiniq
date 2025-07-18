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
  const [filter, setFilter] = useState<"market_cap" | "price_change">(
    "market_cap"
  );

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
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filter === "market_cap") return b.market_cap - a.market_cap;
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    });

  const formatMarketCap = (cap: number) => {
    if (cap >= 1_000_000_000) return `${(cap / 1_000_000_000).toFixed(1)}B`;
    if (cap >= 1_000_000) return `${(cap / 1_000_000).toFixed(1)}M`;
    return cap.toLocaleString();
  };

  return (
    <div className="w-full px-4 py-6 bg-[#0d1b2a] min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-white">Cryptocurrencies</h1>
      <p className="text-blue-300 mb-4">Track live price, market cap & more.</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1b263b] border border-gray-700 text-gray-100 rounded px-4 py-2 w-full sm:max-w-xs"
        />
        <select
          onChange={(e) =>
            setFilter(e.target.value as "market_cap" | "price_change")
          }
          className="bg-[#1b263b] border border-gray-700 text-gray-100 rounded px-4 py-2"
        >
          <option value="market_cap">Sort by Market Cap</option>
          <option value="price_change">Sort by 24h Change</option>
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
              className="bg-[#1e3a5f] rounded-2xl p-5 border border-blue-900 hover:border-blue-400 hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-semibold text-lg">
                    {coin.name}
                  </span>
                </div>
                <button className="text-yellow-400 text-xl">★</button>
              </div>
              <div className="text-green-300 text-base font-medium mb-1">
                ${coin.current_price.toLocaleString()}
              </div>
              <div
                className={`text-sm font-medium mb-1 ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                24h: {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="text-blue-200 text-sm mb-1">
                Market Cap: ${formatMarketCap(coin.market_cap)}
              </div>
              <div className="text-indigo-300 text-sm">
                Rank: #{coin.market_cap_rank}
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
