import type { Coin } from "@/types/coin";

export function sortCoins(
  coins: Coin[],
  sortBy: "24h" | "volume" | null,
  order: "asc" | "desc"
): Coin[] {
  if (!sortBy) return coins;

  const sorted = [...coins].sort((a, b) => {
    let aVal =
      sortBy === "24h" ? a.price_change_percentage_24h : a.total_volume;
    let bVal =
      sortBy === "24h" ? b.price_change_percentage_24h : b.total_volume;

    return order === "asc" ? aVal - bVal : bVal - aVal;
  });

  return sorted;
}

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

  return coins; // "all"
}
