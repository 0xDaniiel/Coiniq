// /lib/coingecko.ts
import type { Coin } from "@/types/coin";
import type { Exchange } from "@/types/exchange";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchTopCoins(): Promise<Coin[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
  );
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

// Fetch top exchanges
// lib/coingecko.ts

// Fetches the top 50 exchanges
// lib/coingecko.ts

export const fetchExchanges = async (): Promise<Exchange[]> => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/exchanges?per_page=50&page=1"
  );
  if (!res.ok) throw new Error("Failed to fetch exchanges");
  return res.json();
};

// Fetch NFTs (CoinGecko has limited NFT endpoints, but as example:)
export async function fetchNFTs() {
  const res = await fetch(`${BASE_URL}/nfts/list`);
  if (!res.ok) throw new Error("Failed to fetch NFTs");
  return res.json();
}
