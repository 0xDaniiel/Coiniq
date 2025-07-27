"use client";
import { useState, useEffect } from "react";
import type { NFT } from "@/types/nft";
import { fetchTopNFTs } from "@/lib/coingecko";
import NFTModal from "@/components/NFTModal";
import Image from "next/image";

export default function Page() {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTopNFTs();
        setNFTs(data);
      } catch (e) {
        console.error("Error loading NFTs", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = nfts.filter((nft) =>
    nft.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-4 py-6 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">NFT Market</h1>

      <input
        type="text"
        placeholder="Search NFTs..."
        className="mb-6 bg-white px-4 py-2 rounded border border-gray-300 text-black w-full sm:w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((nft) => (
            <div
              key={nft.id}
              onClick={() => setSelectedNFT(nft)}
              className="bg-white rounded-lg overflow-hidden cursor-pointer border border-gray-300 hover:shadow-md transition"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{nft.name}</h2>
                  <span className="text-sm text-gray-600">
                    {nft.symbol?.toUpperCase()}
                  </span>
                </div>

                {nft.image?.small ? (
                  <Image
                    src={nft.image.small}
                    alt={nft.name}
                    width={320}
                    height={160}
                    className="object-contain w-full h-40"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="mt-2 text-sm text-gray-700">
                  Floor: ${nft.floor_price?.usd?.toLocaleString() || "N/A"}
                </div>
                <div className="text-sm text-gray-700">
                  Volume (24h): ${nft.volume_24h_usd?.toLocaleString() || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedNFT && (
        <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
      )}
    </div>
  );
}
