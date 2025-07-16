import { TrendingUp, PieChart, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-400">
        Dashboard Overview
      </h1>
      <p className="text-gray-400 mb-6">
        Welcome to your dashboard. Here you can get a quick snapshot of your
        favorite markets, coins, and trends.
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition duration-300">
          <h2 className="flex items-center text-lg font-semibold mb-2 text-blue-300">
            <TrendingUp className="w-4 h-4 mr-2" />
            Top Movers
          </h2>
          <p className="text-gray-400 text-sm">
            See which assets moved the most today.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition duration-300">
          <h2 className="flex items-center text-lg font-semibold mb-2 text-blue-300">
            <PieChart className="w-4 h-4 mr-2" />
            Portfolio Summary
          </h2>
          <p className="text-gray-400 text-sm">
            Your watchlist and favorites overview.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition duration-300">
          <h2 className="flex items-center text-lg font-semibold mb-2 text-blue-300">
            <BarChart3 className="w-4 h-4 mr-2" />
            Market Trends
          </h2>
          <p className="text-gray-400 text-sm">
            Overall market sentiment and trends.
          </p>
        </div>
      </section>
    </div>
  );
}
