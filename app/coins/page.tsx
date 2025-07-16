"use client";
import { useEffect, useState } from "react";
import { fetchTopCoins } from "@/lib/coingecko";
import type { Coin } from "@/types/coin";

export default function Page() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTopCoins()
      .then((data) => setCoins(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4 text-blue-400">
        Cryptocurrencies
      </h1>
      <p className="text-gray-400 mb-6 text-base">
        Browse and track all available cryptocurrencies.
      </p>

      <input
        type="text"
        placeholder="Search coins..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-800 border border-gray-700 text-gray-100 rounded px-4 py-2 mb-6 w-full max-w-md"
      />

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-900 rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-200 font-semibold text-lg">
                    {coin.name}
                  </span>
                </div>
                <button className="text-yellow-400 hover:text-yellow-500 text-xl">
                  ★
                </button>
              </div>
              <div className="text-green-400 text-base font-medium mb-1">
                Price: ${coin.current_price.toLocaleString()}
              </div>
              <div className="text-purple-400 text-sm mb-1">
                Market Cap: ${coin.market_cap.toLocaleString()}
              </div>
              <div className="text-teal-400 text-sm">
                Rank: #{coin.market_cap_rank}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
