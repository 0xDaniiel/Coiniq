"use client";
import { X } from "lucide-react";
import type { CoinDetail } from "@/types/coin";
import Image from "next/image";

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black text-black dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-md relative p-6 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          <X />
        </button>

        <div className="flex flex-col items-center text-center space-y-2">
          <Image
            src={image?.large || image?.small}
            alt={name}
            width={80}
            height={80}
            className="rounded mb-2"
          />
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="uppercase text-sm text-gray-600 dark:text-gray-400 tracking-wide">
            {symbol}
          </p>
        </div>

        <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4 text-gray-700 dark:text-gray-200">
          <InfoRow label="Rank" value={`#${market_cap_rank || "N/A"}`} />
          <InfoRow
            label="Current Price"
            value={`$${
              market_data?.current_price?.usd?.toLocaleString() || "N/A"
            }`}
          />
          <InfoRow
            label="Market Cap"
            value={`$${
              market_data?.market_cap?.usd?.toLocaleString() || "N/A"
            }`}
          />
          <InfoRow
            label="24h Volume"
            value={`$${
              market_data?.total_volume?.usd?.toLocaleString() || "N/A"
            }`}
          />
          <InfoRow
            label="All-Time High"
            value={`$${market_data?.ath?.usd?.toLocaleString() || "N/A"}`}
            sub={`on ${formatDate(market_data?.ath_date?.usd)}`}
          />
          <InfoRow
            label="All-Time Low"
            value={`$${market_data?.atl?.usd?.toLocaleString() || "N/A"}`}
            sub={`on ${formatDate(market_data?.atl_date?.usd)}`}
          />
          <InfoRow label="Algorithm" value={hashing_algorithm || "N/A"} />
          <InfoRow label="Genesis Date" value={formatDate(genesis_date)} />
          <InfoRow
            label="Categories"
            value={categories?.slice(0, 2).join(", ") || "N/A"}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="flex justify-between font-medium">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-gray-800 dark:text-gray-100">{value}</span>
      </div>
      {sub && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 text-right">
          {sub}
        </div>
      )}
    </div>
  );
}
