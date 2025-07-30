import Image from "next/image";
import type { NFT } from "@/types/nft";

export default function NftTable({ nfts }: { nfts: NFT[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 rounded">
        <thead className="bg-gray-100 text-left font-semibold text-gray-600">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Floor Price</th>
            <th className="px-4 py-2">Volume (24h)</th>
            <th className="px-4 py-2">% Change</th>
            <th className="px-4 py-2">Total Supply</th>
            <th className="px-4 py-2">Owners</th>
            <th className="px-4 py-2">Verified</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {nfts.map((nft: NFT) => (
            <tr key={nft.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2">
                {nft.image?.small && (
                  <Image
                    src={nft.image.small}
                    alt={nft.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{nft.name}</span>
              </td>
              <td className="px-4 py-3 bg-green-100 text-green-600">
                ${nft.floor_price?.usd?.toLocaleString() || "N/A"}
              </td>
              <td className="px-4 py-3">
                ${nft.volume_24h_usd?.toLocaleString() || "N/A"}
              </td>
              <td className="px-4 py-3 text-green-600 font-medium">—</td>
              <td className="px-4 py-3 bg-blue-100 text-blue-600">
                {nft.total_supply?.toLocaleString() ?? "N/A"}
              </td>
              <td className="px-4 py-3">
                {nft.number_of_owners?.toLocaleString() ?? "N/A"}
              </td>
              <td className="px-4 py-3">
                {nft.is_verified ? (
                  <span className="text-green-600 font-medium">
                    ✅ Verified
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
