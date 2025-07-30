"use client";
import { useState, useEffect } from "react";
import type { NFT } from "@/types/nft";
import { fetchTopNFTs } from "@/lib/coingecko";
import NftHighlights from "@/components/NftHightlights";
import NftTable from "@/components/NftTable";

export default function NftsPage() {
  const [nfts, setNFTs] = useState<NFT[]>([]);
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
      <h1 className="text-3xl font-bold mb-6 py-1">NFT Market</h1>

      <input
        type="text"
        placeholder="Search NFTs..."
        className="mb-6 bg-white px-4 py-2 rounded border border-gray-300 text-black w-full sm:w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!loading && <NftHighlights nfts={filtered} />}

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) : (
        <NftTable nfts={filtered} />
      )}
    </div>
  );
}
