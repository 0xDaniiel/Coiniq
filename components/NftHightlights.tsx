import Image from "next/image";
import type { NFT } from "@/types/nft";

export default function NftHighlights({ nfts }: { nfts: NFT[] }) {
  const topVolume = [...nfts].sort(
    (a, b) => (b.volume_24h_usd ?? 0) - (a.volume_24h_usd ?? 0)
  )[0];
  const topFloor = [...nfts].sort(
    (a, b) => (b.floor_price?.usd ?? 0) - (a.floor_price?.usd ?? 0)
  )[0];
  const mostOwners = [...nfts].sort(
    (a, b) => (b.number_of_owners ?? 0) - (a.number_of_owners ?? 0)
  )[0];
  const mostVerified = nfts.find((nft) => nft.is_verified) ?? nfts[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <HighlightCard
        label="Total NFTs Fetched"
        value={nfts.length}
        color="blue"
      />
      <HighlightCard
        label="Top Volume (24h)"
        value={topVolume?.name}
        image={topVolume?.image?.small}
        color="green"
      />
      <HighlightCard
        label="Highest Floor Price"
        value={topFloor?.name}
        image={topFloor?.image?.small}
        color="red"
      />
      <HighlightCard
        label="Most Owners"
        value={mostOwners?.name}
        image={mostOwners?.image?.small}
        color="yellow"
      />
      <HighlightCard
        label="Verified Collection"
        value={mostVerified?.name}
        image={mostVerified?.image?.small}
        color="green"
      />
    </div>
  );
}

function HighlightCard({
  label,
  value,
  color,
  image,
}: {
  label: string;
  value: string | number;
  color: "blue" | "green" | "red" | "yellow";
  image?: string;
}) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div
      className={`w-full min-w-[220px] min-h-[120px] p-4 rounded-xl shadow text-sm flex flex-col justify-center ${colorMap[color]}`}
    >
      <p className="opacity-80">{label}</p>
      <div className="flex items-center gap-2 mt-1">
        {image && (
          <Image
            src={image}
            alt={value.toString()}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <p className="text-xl font-bold truncate">{value}</p>
      </div>
    </div>
  );
}
