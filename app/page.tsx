import { getTopCoins } from "@/lib/api";
import ClientCoins from "@/components/ClientCoins";

export default async function Home() {
  const coins = await getTopCoins(); // defaults to USD

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Coniq – Top Cryptocurrencies
      </h1>
      <ClientCoins initialCoins={coins} />
    </main>
  );
}
