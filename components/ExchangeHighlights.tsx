// components/ExchangeHighlights.tsx
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

  const Card = ({
    title,
    value,
    image,
    subtitle,
  }: {
    title: string;
    value: string;
    image?: string;
    subtitle?: string;
  }) => (
    <div className="rounded-2xl shadow p-4 border border-gray-200 w-full sm:w-1/3 bg-white hover:shadow-lg transition">
      <h2 className="text-gray-500 text-sm mb-1">{title}</h2>
      <div className="flex items-center gap-4">
        {image && (
          <Image
            src={image}
            alt={value}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <div>
          <div className="text-lg font-bold">{value}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
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
      />
      <Card
        title="Most Trusted"
        value={topTrusted.name}
        image={topTrusted.image}
        subtitle={`Trust Rank #${topTrusted.trust_score_rank}`}
      />
      {topCountryName && (
        <Card
          title="Most Common Country"
          value={topCountryName}
          subtitle="Most registered exchanges"
        />
      )}
    </div>
  );
}
