export type NFT = {
  id: string;
  name: string;
  symbol?: string;
  image?: {
    small?: string;
    large?: string;
  };
  floor_price?: {
    usd?: number;
  };
  volume_24h_usd?: number;
  market_cap_usd?: number;
  total_supply?: number;
  number_of_owners?: number;
  external_url?: string;
  is_verified?: boolean;
};
