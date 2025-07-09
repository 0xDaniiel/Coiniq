import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getTopCoins(vsCurrency = "usd", perPage = 10) {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: vsCurrency,
        order: "market_cap_desc",
        per_page: perPage,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top coins:", error);
    return [];
  }
}

export async function getCoinMarketChart(
  id: string,
  vsCurrency = "usd",
  days = 7
) {
  try {
    const res = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: vsCurrency,
        days,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching market chart:", error);
    return { prices: [] };
  }
}
