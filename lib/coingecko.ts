import type { Coin } from "@/types/coin";
import type { Exchange } from "@/types/exchange";
import type { CoinDetail } from "@/types/coin";
import type { Ticker } from "@/types/exchange";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchGlobal = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/global");
  if (!res.ok) throw new Error("Failed to fetch global market data");
  const data = await res.json();
  return data.data;
};

export async function fetchTopCoins(): Promise<Coin[]> {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

export async function fetchCoinDetails(id: string): Promise<CoinDetail> {
  const res = await fetch(`${BASE_URL}/coins/${id}`);
  if (!res.ok) throw new Error("Failed to fetch coin details");
  return res.json();
}

export const fetchExchanges = async (): Promise<Exchange[]> => {
  const res = await fetch(`${BASE_URL}/exchanges?per_page=50&page=1`);
  if (!res.ok) throw new Error("Failed to fetch exchanges");
  const exchanges = await res.json();

  const detailedExchanges = await Promise.all(
    exchanges.map(async (ex: Exchange) => {
      try {
        const res = await fetch(`${BASE_URL}/exchanges/${ex.id}`);
        const details = await res.json();
        const tickers = details.tickers as Ticker[];
        const coinsSet = new Set(tickers.map((t) => t.base));

        return {
          ...ex,
          centralized: details.centralized,
          year_established: details.year_established,
          tickers,
          coins_count: coinsSet.size,
          has_api: !!details.links?.api?.length,
        };
      } catch {
        return ex;
      }
    })
  );

  return detailedExchanges;
};

// export async function fetchTopNFTs() {
//   const res = await fetch(`${BASE_URL}/nfts/list`);
//   if (!res.ok) throw new Error("Failed to fetch NFT list");

//   const nftList = await res.json();

//   // Try fetching details for the first 20 NFT IDs
//   const top = nftList.slice(0, 20);

//   const results = await Promise.all(
//     top.map(async (nft: { id: string }) => {
//       try {
//         const detailRes = await fetch(`${BASE_URL}/nfts/${nft.id}`);
//         if (!detailRes.ok) return null;
//         const data = await detailRes.json();

//         // Only keep NFTs with image and market data
//         if (data.image?.small && data.floor_price?.usd !== null) return data;
//         return null;
//       } catch {
//         return null;
//       }
//     })
//   );

//   return results.filter(Boolean); // remove nulls
// }

// export async function fetchTopNFTs() {
//   const res = await fetch("https://api.coingecko.com/api/v3/nfts/markets");
//   if (!res.ok) throw new Error("Failed to fetch top NFTs");

//   const data = await res.json();

//   // Optional: Limit to top 20
//   return data.slice(0, 20);
// }

export async function fetchTopNFTs(limit = 20) {
  // const BASE_URL = "https://api.coingecko.com/api/v3";

  const res = await fetch(`${BASE_URL}/nfts/list`);
  if (!res.ok) throw new Error("Failed to fetch NFT list");

  const nftList = await res.json();
  const top = nftList.slice(0, limit);

  const results = await Promise.all(
    top.map(async (nft) => {
      try {
        const detailRes = await fetch(`${BASE_URL}/nfts/${nft.id}`);
        if (!detailRes.ok) return null;
        const data = await detailRes.json();

        if (data.image?.small && data.floor_price?.usd !== null) return data;
        return null;
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean);
}
