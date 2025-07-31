import { Sparklines, SparklinesLine } from "react-sparklines";
import type { Coin } from "@/types/coin";

export default function CoinHighlights({ coins }: { coins: Coin[] }) {
  if (!coins || coins.length === 0) return null;

  const topGainer = [...coins]
    .filter((coin) => coin.price_change_percentage_24h !== undefined)
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )[0];

  const topVolume = [...coins]
    .filter((coin) => coin.total_volume !== undefined)
    .sort((a, b) => b.total_volume - a.total_volume)[0];

  const topCap = [...coins]
    .filter((coin) => coin.market_cap !== undefined)
    .sort((a, b) => b.market_cap - a.market_cap)[0];

  const Card = ({ title, coin }: { title: string; coin: Coin | undefined }) => {
    if (!coin) return null;
    return (
      <div className="rounded-2xl shadow-md p-4 w-full sm:w-1/3 border border-gray-200 dark:border-white/10 bg-white dark:bg-black cursor-pointer">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-xl font-bold text-gray-700 dark:text-white">
          {coin.name} ({coin.symbol.toUpperCase()})
        </p>
        <Sparklines data={coin.sparkline_in_7d?.price || []} height={40}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Card title="Top Gainer (24h)" coin={topGainer} />
      <Card title="Highest Volume" coin={topVolume} />
      <Card title="Top Market Cap" coin={topCap} />
    </div>
  );
}
