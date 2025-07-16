export type Coin = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;

  // other fields   (e.g., price_change_percentage_24h etc.)
};
