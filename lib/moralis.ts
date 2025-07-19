const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY!;
const BASE_URL = "https://deep-index.moralis.io/api/v2.2";

export async function fetchTopNFTs(chain: string = "eth", limit: number = 10) {
  const res = await fetch(`${BASE_URL}/nft/top?chain=${chain}&limit=${limit}`, {
    headers: {
      "X-API-Key": MORALIS_API_KEY,
    },
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch top NFTs");
  }

  const data = await res.json();
  return data.result; // Array of NFTs
}

export async function fetchNFTDetails(
  address: string,
  tokenId: string,
  chain: string = "eth"
) {
  const res = await fetch(
    `${BASE_URL}/nft/${address}/${tokenId}?chain=${chain}&format=decimal&normalizeMetadata=true`,
    {
      headers: {
        "X-API-Key": MORALIS_API_KEY,
      },
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch NFT metadata");
  }

  return res.json(); // Includes metadata, image, chain info
}
