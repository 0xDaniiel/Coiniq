import type { Exchange } from "@/types/exchange";
import Image from "next/image";

export default function ExchangeHighlights({
  exchanges,
}: {
  exchanges: Exchange[];
}) {
  if (!exchanges || exchanges.length === 0) return null;

  const topVolume = [...exchanges]
    .filter((e) => e.trade_volume_24h_btc !== undefined)
    .sort((a, b) => b.trade_volume_24h_btc - a.trade_volume_24h_btc)[0];

  const topTrusted = [...exchanges]
    .filter((e) => e.trust_score_rank !== undefined)
    .sort((a, b) => a.trust_score_rank - b.trust_score_rank)[0];

  const topCountry = [...exchanges]
    .filter((e) => e.country !== undefined)
    .reduce<Record<string, number>>((acc, curr) => {
      if (curr.country) acc[curr.country] = (acc[curr.country] || 0) + 1;
      return acc;
    }, {});

  const topCountryName = Object.entries(topCountry).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  const colorMap: Record<string, string> = {
    volume: "bg-blue-100 text-blue-700",
    trust: "bg-green-100 text-green-700",
    country: "bg-yellow-100 text-yellow-700",
  };

  const Card = ({
    title,
    value,
    image,
    subtitle,
    colorKey,
  }: {
    title: string;
    value: string;
    image?: string;
    subtitle?: string;
    colorKey: "volume" | "trust" | "country";
  }) => (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl shadow-md cursor-pointer border border-gray-100 w-full sm:w-1/3 hover:shadow-lg transition min-h-[120px] ${colorMap[colorKey]}`}
    >
      {image && (
        <Image
          src={image}
          alt={value}
          width={48}
          height={48}
          className="rounded-full"
        />
      )}
      <div>
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-lg font-semibold">{value}</p>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Card
        title="Top Volume"
        value={topVolume.name}
        image={topVolume.image}
        subtitle={`${topVolume.trade_volume_24h_btc.toFixed(0)} BTC`}
        colorKey="volume"
      />
      <Card
        title="Most Trusted"
        value={topTrusted.name}
        image={topTrusted.image}
        subtitle={`Trust Rank #${topTrusted.trust_score_rank}`}
        colorKey="trust"
      />
      {topCountryName && (
        <Card
          title="Most Common Country"
          value={topCountryName}
          subtitle="Most registered exchanges"
          colorKey="country"
        />
      )}
    </div>
  );
}
