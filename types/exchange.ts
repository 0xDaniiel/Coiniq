export interface Exchange {
  id: string;
  name: string;
  image: string;
  trade_volume_24h_btc: number;
  trust_score_rank: number;
  country?: string;
  centralized?: boolean;
  year_established?: number;
  tickers?: { base: string }[];
  links?: { api?: string[] };
  coins_count?: number;
  has_api?: boolean;
  // optional future: volume_change_1h?: number
}
