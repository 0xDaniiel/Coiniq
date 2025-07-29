import type { Coin } from "@/types/coin";

export function applyFilter(coins: Coin[], filter: string): Coin[] {
  switch (filter) {
    case "top100":
      return coins.filter(
        (coin) => coin.market_cap_rank && coin.market_cap_rank <= 100
      );
    case "gainers":
      return coins
        .filter((coin) => coin.price_change_percentage_24h !== undefined)
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 100);
    default:
      return coins;
  }
}
