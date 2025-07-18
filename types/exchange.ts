export interface Exchange {
  id: string;
  name: string;
  image: string;
  trade_volume_24h_btc: number;
  trust_score_rank: number;
  country?: string;
}
