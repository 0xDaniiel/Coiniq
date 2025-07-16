export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-400">
        Cryptocurrencies
      </h1>
      <p className="text-gray-400 mb-6">
        Browse and track all available cryptocurrencies.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-xl p-4 border border-blue-500/10 hover:border-blue-500/30 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700" />
                <span className="text-gray-300 font-medium">Bitcoin</span>
              </div>
              <button className="text-yellow-400 hover:text-yellow-500">
                ★
              </button>
            </div>
            <div className="text-gray-300 text-sm mb-1">Price: $31,000</div>
            <div className="text-green-400 text-sm mb-1">24h Change: +2.5%</div>
            <div className="text-gray-400 text-xs">
              Market Cap: $600B | Volume: $25B
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
