// /lib/coingecko.ts

const BASE_URL = "https://api.coingecko.com/api/v3";

// Fetch top coins
export async function fetchTopCoins(currency: string = "usd") {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=true`
  );
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

// Fetch top exchanges
export async function fetchExchanges() {
  const res = await fetch(`${BASE_URL}/exchanges`);
  if (!res.ok) throw new Error("Failed to fetch exchanges");
  return res.json();
}

// Fetch NFTs (CoinGecko has limited NFT endpoints, but as example:)
export async function fetchNFTs() {
  const res = await fetch(`${BASE_URL}/nfts/list`);
  if (!res.ok) throw new Error("Failed to fetch NFTs");
  return res.json();
}
