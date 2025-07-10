"use client";
import Link from "next/link";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
};

export default function CryptoList({ coins }: { coins: Coin[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {coins.map((coin) => (
        <Link
          key={coin.id}
          href={`/coin/${coin.id}`}
          className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition block"
        >
          <div className="flex items-center space-x-2 mb-2">
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <span className="text-white font-medium">
              {coin.name} ({coin.symbol.toUpperCase()})
            </span>
          </div>
          <div className="text-blue-400 font-semibold">
            ${coin.current_price.toLocaleString()}
          </div>
        </Link>
      ))}
    </div>
  );
}
