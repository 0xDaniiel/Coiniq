"use client";
import { X } from "lucide-react";
import Image from "next/image";
import type { NFT } from "@/types/nft";

interface NFTModalProps {
  nft: NFT;
  onClose: () => void;
}

export default function NFTModal({ nft, onClose }: NFTModalProps) {
  const description =
    typeof nft.description === "string"
      ? nft.description
      : nft.description?.en || "";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full text-neutral-900 font-sans overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 transition"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {nft.image?.small ? (
            <Image
              src={nft.image.small}
              alt={nft.name}
              width={160}
              height={160}
              className="h-40 w-40 object-contain rounded"
            />
          ) : (
            <div className="text-gray-400">No Image</div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Name & Symbol */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              {nft.name}
            </h2>
            <p className="text-xs text-neutral-500 uppercase tracking-wide mt-1">
              {nft.symbol}
            </p>
            {nft.is_verified && (
              <p className="text-green-600 font-medium mt-1 text-sm">
                ✅ Verified
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
              Chain: {nft.asset_platform_id || "N/A"}
            </span>
            <span className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
              ID: {nft.id}
            </span>
          </div>

          {/* Stats */}
          <div className="border-t border-neutral-200 pt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Floor Price</span>
              <span className="font-semibold">
                ${nft.floor_price?.usd?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">24h Volume</span>
              <span className="font-semibold">
                ${nft.volume_24h_usd?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Owners</span>
              <span className="font-semibold">
                {nft.number_of_owners?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Total Supply</span>
              <span className="font-semibold">
                {nft.total_supply?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mt-2 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {description.length > 300
                ? description.slice(0, 300) + "..."
                : description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
