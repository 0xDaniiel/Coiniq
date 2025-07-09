"use client";

import { useState, useEffect } from "react";
import { getTopCoins } from "@/lib/api";
import CryptoList from "./CryptoList";
import Searchbar from "./Searchbar";
import ToggleCurrency from "./ToggleCurrency";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
};

export default function ClientCoins({
  initialCoins,
}: {
  initialCoins: Coin[];
}) {
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [coins, setCoins] = useState(initialCoins);

  useEffect(() => {
    async function fetchCoins() {
      const data = await getTopCoins(currency);
      setCoins(data);
    }

    fetchCoins();
  }, [currency]);

  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <ToggleCurrency currency={currency} onChange={setCurrency} />
      <Searchbar onSearch={setQuery} />
      <CryptoList coins={filtered} />
    </>
  );
}
