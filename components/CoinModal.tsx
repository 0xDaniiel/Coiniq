"use client";
import type { Coin } from "@/types/coin";
import { X } from "lucide-react";

interface CoinModalProps {
  coin: Coin;
  onClose: () => void;
}

function formatMarketCap(value: number) {
  if (value >= 1_000_000_000_000)
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value}`;
}

export default function CoinModal({ coin, onClose }: CoinModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-gray-800 w-full max-w-lg rounded-2xl p-6 relative border border-blue-500/20 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Coin Info */}
        <div className="flex items-center gap-4 mb-4">
          <img src={coin.image} alt={coin.name} className="w-10 h-10" />
          <div>
            <h2 className="text-xl font-bold text-white">{coin.name}</h2>
            <p className="text-sm text-blue-400">
              Rank #{coin.market_cap_rank}
            </p>
          </div>
        </div>

        <div className="mb-4 space-y-1">
          <p className="text-green-400 font-semibold text-lg">
            Price: ${coin.current_price.toLocaleString()}
          </p>
          <p className="text-blue-300 text-sm">
            Market Cap: {formatMarketCap(coin.market_cap)}
          </p>
        </div>

        {/* Chart placeholder */}
        <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mb-4">
          Chart coming soon...
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => alert("Added to favorites (not implemented yet)")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            ★ Add to Favorites
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
