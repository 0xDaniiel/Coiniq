// components/CoinTable.tsx
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import type { Coin } from "@/types/coin";

interface Props {
  coins: Coin[];
  onCoinClick: (id: string) => void;
  formatMarketCap: (cap: number) => string;
  formatNumberShort: (num: number) => string;
}

export default function CoinTable({
  coins,
  onCoinClick,
  formatMarketCap,
  formatNumberShort,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 border">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">1h%</th>
            <th className="px-4 py-3">24h%</th>
            <th className="px-4 py-3">Market Cap</th>
            <th className="px-4 py-3">Volume</th>
            <th className="px-4 py-3">Circulating Supply</th>
            <th className="px-4 py-3">Last 7d</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              onClick={() => onCoinClick(coin.id)}
              className="hover:bg-gray-50 cursor-pointer border-b"
            >
              <td className="px-4 py-3">{coin.market_cap_rank}</td>
              <td className="px-4 py-3 flex items-center gap-2">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={20}
                  height={20}
                />
                <span>{coin.name}</span>
                <span className="uppercase text-gray-400 text-xs ml-1">
                  {coin.symbol}
                </span>
              </td>
              <td className="px-4 py-3">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                {coin.price_change_percentage_1h_in_currency !== undefined ? (
                  <span
                    className={
                      coin.price_change_percentage_1h_in_currency > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </td>
              <td className="px-4 py-3 bg-blue-100 text-blue-700">
                {formatMarketCap(coin.market_cap)}
              </td>
              <td className="px-4 py-3 bg-green-100 text-green-700">
                ${coin.total_volume.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                {formatNumberShort(coin.circulating_supply)}{" "}
                <span className="uppercase">{coin.symbol}</span>
              </td>
              <td className="px-4 py-3">
                {coin.sparkline_in_7d?.price ? (
                  <Sparklines
                    data={coin.sparkline_in_7d.price}
                    width={100}
                    height={30}
                  >
                    <SparklinesLine
                      color={
                        coin.sparkline_in_7d.price[0] <
                        coin.sparkline_in_7d.price.at(-1)!
                          ? "green"
                          : "red"
                      }
                    />
                  </Sparklines>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
