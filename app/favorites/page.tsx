export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-blue-400">Favorites</h1>
      <p className="text-gray-400">
        Your saved coins, NFTs, and exchanges in one place.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-xl p-4 border border-blue-500/10 
            hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 
            transition duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium">
                Favorite Item #{idx + 1}
              </span>
              <button className="text-yellow-400 hover:text-yellow-500">
                ★
              </button>
            </div>
            <div className="text-gray-400 text-sm">
              Details or type: Coin / NFT / Exchange
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
