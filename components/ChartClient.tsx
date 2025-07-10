"use client";

import { useEffect, useState } from "react";
import { getCoinMarketChart } from "@/lib/api";
import Chart from "./Chart";

type Props = {
  id: string;
  initialPrices: [number, number][];
};

export default function ChartClient({ id, initialPrices }: Props) {
  const [days, setDays] = useState(7);
  const [prices, setPrices] = useState(initialPrices);

  useEffect(() => {
    async function fetchData() {
      const data = await getCoinMarketChart(id, "usd", days);
      setPrices(data.prices);
    }

    fetchData();
  }, [id, days]);

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {[7, 30].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-4 py-1 rounded border ${
              days === d
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white border-gray-600"
            }`}
          >
            {d}D
          </button>
        ))}
      </div>
      <Chart prices={prices} />
    </div>
  );
}
