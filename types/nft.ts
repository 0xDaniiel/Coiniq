export type NFT = {
  id: string;
  name: string;
  symbol?: string;
  image?: {
    small?: string;
    large?: string;
  };
  asset_platform_id?: string;
  floor_price?: {
    usd?: number;
  };
  volume_24h_usd?: number;
  description?: string;
};
