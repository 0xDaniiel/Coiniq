"use client";
import { X } from "lucide-react";
import type { NFT } from "@/types/nft";
import Image from "next/image";

interface NFTModalProps {
  nft: NFT;
  onClose: () => void;
}

export default function NFTModal({ nft, onClose }: NFTModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-[#0f172a] rounded-2xl shadow-lg max-w-lg w-full text-white overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
          {nft.image?.small ? (
            <Image
              src={nft.image.small}
              alt={nft.name}
              width={160}
              height={160}
              className="h-40 w-40 object-contain rounded mb-4"
            />
          ) : (
            <div className="text-gray-500">No Image</div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{nft.name}</h2>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              {nft.symbol}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
              Chain: {nft.asset_platform_id || "N/A"}
            </span>
            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
              ID: {nft.id}
            </span>
          </div>

          <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Floor Price</span>
              <span className="font-medium">
                ${nft.floor_price?.usd?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">24h Volume</span>
              <span className="font-medium">
                ${nft.volume_24h_usd?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>

          {nft.description && (
            <div className="mt-4 text-sm text-gray-300 whitespace-pre-line">
              {nft.description.length > 300
                ? nft.description.slice(0, 300) + "..."
                : nft.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
