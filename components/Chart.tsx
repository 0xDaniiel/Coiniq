"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

export default function Chart({ prices }: { prices: [number, number][] }) {
  const data = {
    labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: prices.map((p) => p[1]),
        borderColor: "#3b82f6", // Tailwind blue-500
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <Line data={data} />
    </div>
  );
}
