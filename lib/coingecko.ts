// /lib/coingecko.ts
import type { Coin } from "@/types/coin";
import type { Exchange } from "@/types/exchange";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchTopCoins(): Promise<Coin[]> {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

export async function fetchCoinDetails(id: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/coins/${id}`);
  if (!res.ok) throw new Error("Failed to fetch coin details");
  return res.json();
}

export const fetchExchanges = async (): Promise<Exchange[]> => {
  const res = await fetch(`${BASE_URL}/exchanges?per_page=50&page=1`);
  if (!res.ok) throw new Error("Failed to fetch exchanges");
  return res.json();
};

export async function fetchTopNFTs() {
  const res = await fetch(`${BASE_URL}/nfts/list`);
  if (!res.ok) throw new Error("Failed to fetch NFT list");

  const nftList = await res.json();

  // Try fetching details for the first 20 NFT IDs
  const top = nftList.slice(0, 20);

  const results = await Promise.all(
    top.map(async (nft: any) => {
      try {
        const detailRes = await fetch(`${BASE_URL}/nfts/${nft.id}`);
        if (!detailRes.ok) return null;
        const data = await detailRes.json();

        // Only keep NFTs with image and market data
        if (data.image?.small && data.floor_price?.usd !== null) return data;
        return null;
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean); // remove nulls
}
