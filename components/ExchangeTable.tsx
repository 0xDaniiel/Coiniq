import Image from "next/image";
import type { Exchange } from "@/types/exchange";

const ExchangeTable = ({ exchanges }: { exchanges: Exchange[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[800px] w-full text-sm text-left text-gray-600 dark:text-gray-300 border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-black dark:outline text-xs uppercase text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Exchange</th>
            <th className="px-4 py-3">24h Volume (BTC)</th>
            <th className="px-4 py-3">Trust Score</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Coins Listed</th>
            <th className="px-4 py-3">API Support</th>
            <th className="px-4 py-3">Year Established</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((ex) => (
            <tr
              key={ex.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                {ex.trust_score_rank}
              </td>
              <td className="px-4 py-3 flex items-center gap-2">
                <Image
                  src={ex.image}
                  alt={ex.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-semibold">{ex.name}</span>
              </td>
              <td className="px-4 py-3">
                {ex.trade_volume_24h_btc.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                BTC
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-xs font-medium">
                  #{ex.trust_score_rank}
                </span>
              </td>
              <td className="px-4 py-3">
                {ex.country || (
                  <span className="text-gray-400 italic dark:text-gray-500">
                    Unknown
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                {ex.centralized !== undefined ? (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ex.centralized
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                    }`}
                  >
                    {ex.centralized ? "Centralized" : "Decentralized"}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3">{ex.coins_count ?? "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ex.has_api
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300"
                  }`}
                >
                  {ex.has_api ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-4 py-3">{ex.year_established || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeTable;
