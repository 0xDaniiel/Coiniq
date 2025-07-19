"use client";
import { X } from "lucide-react";
import type { CoinDetail } from "@/types/coin";

interface CoinModalProps {
  coin: CoinDetail;
  onClose: () => void;
}

export default function CoinModal({ coin, onClose }: CoinModalProps) {
  const {
    image,
    name,
    symbol,
    market_data,
    market_cap_rank,
    hashing_algorithm,
    genesis_date,
    categories,
  } = coin;

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <X />
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={image?.large || image?.small}
            alt={name}
            className="h-20 w-20 mb-4 rounded"
          />
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-gray-400 mb-1">Symbol: {symbol?.toUpperCase()}</p>
          <p className="text-gray-400 mb-1">Rank: #{market_cap_rank}</p>
          <p className="text-gray-400 mb-1">
            Current Price: $
            {market_data?.current_price?.usd?.toLocaleString() || "N/A"}
          </p>
          <p className="text-gray-400 mb-1">
            Market Cap: $
            {market_data?.market_cap?.usd?.toLocaleString() || "N/A"}
          </p>
          <p className="text-gray-400 mb-1">
            24h Volume: $
            {market_data?.total_volume?.usd?.toLocaleString() || "N/A"}
          </p>
          <p className="text-gray-400 mb-1">
            All-Time High: ${market_data?.ath?.usd?.toLocaleString() || "N/A"}
            <br />
            <span className="text-sm text-gray-500">
              on {formatDate(market_data?.ath_date?.usd)}
            </span>
          </p>
          <p className="text-gray-400 mb-1">
            All-Time Low: ${market_data?.atl?.usd?.toLocaleString() || "N/A"}
            <br />
            <span className="text-sm text-gray-500">
              on {formatDate(market_data?.atl_date?.usd)}
            </span>
          </p>
          <p className="text-gray-400 mb-1">
            Algorithm: {hashing_algorithm || "N/A"}
          </p>
          <p className="text-gray-400 mb-1">
            Genesis Date: {formatDate(genesis_date)}
          </p>
          <p className="text-gray-400 mb-1">
            Categories: {categories?.slice(0, 2).join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
