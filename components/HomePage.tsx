"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import type { GlobalData } from "@/types/global";
import type { Coin } from "@/types/coin";
import { fetchGlobal, fetchTopCoins } from "@/lib/coingecko";
import Image from "next/image";

export default function HomePage() {
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

  if (!global)
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );

  const btcDom = global.market_cap_percentage.btc;
  const ethDom = global.market_cap_percentage.eth;
  const othersDom = 100 - btcDom - ethDom;

  const pieData = [
    { name: "Bitcoin", value: btcDom, color: "#f7931a" },
    { name: "Ethereum", value: ethDom, color: "#627eea" },
    { name: "Others", value: othersDom, color: "#3b82f6" },
  ];

  const formatUsd = (num: number) =>
    "$" + num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen px-6 py-8 w-full">
      <h1 className="text-3xl font-bold py-1 mb-6">Coiniq Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-10 w-full">
        <Card
          title="Market Cap"
          value={formatUsd(global.total_market_cap.usd)}
          color="blue"
        />
        <Card
          title="24h Volume"
          value={formatUsd(global.total_volume.usd)}
          color="green"
        />
        <Card
          title="BTC Dominance"
          value={btcDom.toFixed(2) + "%"}
          color="red"
        />
        <Card
          title="ETH Dominance"
          value={ethDom.toFixed(2) + "%"}
          color="green"
        />
        <Card
          title="Total Coins"
          value={global.active_cryptocurrencies}
          color="blue"
        />
        <Card title="Markets" value={global.markets} color="red" />
        <Card
          title="Top Gainer"
          value={topCoins[0]?.name ?? "—"}
          color="blue"
        />
        <Card title="NFTs Active" value="1,400+" color="green" />
        <Card title="APIs Available" value="200+" color="red" />
        <Card title="Exchanges" value={global.markets} color="green" />
      </div>

      {/* Pie Chart and Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-black rounded-2xl p-4 border dark:border-gray-700 shadow w-full h-[300px]">
          <h2 className="text-lg font-semibold mb-4">Market Share</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
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
        <div className="bg-white dark:bg-black rounded-2xl p-4 border dark:border-gray-700 shadow w-full">
          <h2 className="text-lg font-semibold mb-4">Top Movers (24h)</h2>
          <ul className="space-y-3">
            {topCoins.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">{c.name}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    c.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
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

// Color classes for light and dark
const colorClasses: Record<CardProps["color"], string> = {
  blue: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  green: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
  red: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
};

type CardProps = {
  title: string;
  value: string | number;
  color: "blue" | "green" | "red";
};

const Card = ({ title, value, color }: CardProps) => (
  <div
    className={`p-5 rounded-2xl shadow flex flex-col justify-center h-32 ${colorClasses[color]}`}
  >
    <h3 className="text-sm mb-1 opacity-80">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);
