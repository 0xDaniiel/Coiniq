"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import type { GlobalData } from "@/types/global";
import type { Coin } from "@/types/coin";
import { fetchGlobal, fetchTopCoins } from "@/lib/coingecko";

export default function Home() {
  const [global, setGlobal] = useState<GlobalData | null>(null);
  const [topCoins, setTopCoins] = useState<Coin[]>([]);

  useEffect(() => {
    fetchGlobal().then(setGlobal);
    fetchTopCoins().then((coins) => {
      const movers = coins
        .filter((c) => c.price_change_percentage_24h !== undefined)
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 5);
      setTopCoins(movers);
    });
  }, []);

  if (!global) return <p>Loading...</p>;

  const btcDom = global.market_cap_percentage.btc;
  const ethDom = global.market_cap_percentage.eth;
  const altDom = 100 - btcDom;

  const pieData = [
    { name: "Bitcoin", value: btcDom, color: "#f7931a" },
    { name: "Ethereum", value: ethDom, color: "#627eea" },
    { name: "Others", value: 100 - btcDom - ethDom, color: "#3b82f6" },
  ];

  const formatUsd = (num: number) =>
    "$" + num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <Card
          title="Market Cap"
          value={formatUsd(global.total_market_cap.usd)}
        />
        <Card title="24h Volume" value={formatUsd(global.total_volume.usd)} />
        <Card title="BTC Dominance" value={btcDom.toFixed(2) + "%"} />
        <Card title="ETH Dominance" value={ethDom.toFixed(2) + "%"} />
        <Card
          title="Total Coins"
          value={global.active_cryptocurrencies.toLocaleString()}
        />
        <Card title="Total Markets" value={global.markets.toLocaleString()} />
        <Card title="Total Exchanges" value={global.markets.toLocaleString()} />
        <Card title="Top Gainer" value={topCoins[0]?.name ?? "-"} />
      </div>

      {/* Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border shadow">
          <h2 className="text-xl font-semibold mb-4">Market Share</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label={({ name, percent }) =>
                  percent !== undefined
                    ? `${name}: ${(percent * 100).toFixed(1)}%`
                    : name
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Movers */}
        <div className="bg-white rounded-2xl p-6 border shadow">
          <h2 className="text-xl font-semibold mb-4">Top Movers (24h)</h2>
          <ul className="text-sm space-y-2">
            {topCoins.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>{c.name}</span>
                <span
                  className={`$ {
                    c.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {c.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Card Component
const Card = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white p-4 border rounded-lg shadow hover:shadow-md transition text-center h-full flex flex-col justify-center">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <p className="text-lg font-bold text-black">{value}</p>
  </div>
);
