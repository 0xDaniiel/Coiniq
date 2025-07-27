import { TrendingUp, PieChart, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>
      <p className="text-sm mb-6 text-black/70">
        Welcome to your dashboard. Here you can get a quick snapshot of your
        favorite markets, coins, and trends.
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-black/10 hover:border-black/20 hover:shadow-md hover:shadow-black/10 transition duration-300">
          <h2 className="flex items-center text-lg font-semibold mb-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Top Movers
          </h2>
          <p className="text-sm text-black/60">
            See which assets moved the most today.
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-black/10 hover:border-black/20 hover:shadow-md hover:shadow-black/10 transition duration-300">
          <h2 className="flex items-center text-lg font-semibold mb-2">
            <PieChart className="w-4 h-4 mr-2" />
            Portfolio Summary
          </h2>
          <p className="text-sm text-black/60">
            Your watchlist and favorites overview.
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-black/10 hover:border-black/20 hover:shadow-md hover:shadow-black/10 transition duration-300">
          <h2 className="flex items-center text-lg font-semibold mb-2">
            <BarChart3 className="w-4 h-4 mr-2" />
            Market Trends
          </h2>
          <p className="text-sm text-black/60">
            Overall market sentiment and trends.
          </p>
        </div>
      </section>
    </div>
  );
}
