import type { Coin } from "@/types/coin";
export function applyFilter(coins: Coin[], filter: string): Coin[] {
  if (filter === "top100") {
    return coins.slice(0, 100);
  }
  if (filter === "gainers") {
    return [...coins]
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      )
      .slice(0, 100);
  }
  return coins;
}


