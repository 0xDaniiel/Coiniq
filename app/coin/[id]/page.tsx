import ChartClient from "@/components/ChartClient";
import { getCoinMarketChart } from "@/lib/api";

export default async function CoinPage({ params }: { params: { id: string } }) {
  const data = await getCoinMarketChart(params.id, "usd", 7); // default data
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4 text-black">Price Chart</h1>
      <ChartClient id={params.id} initialPrices={data.prices} />
    </main>
  );
}
