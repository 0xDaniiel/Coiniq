# 🪙 Coniq — Real-time Crypto Tracker & Charts

Coniq is a web app built with **Next.js** that lets users:
- Track real-time prices of the top 10 cryptocurrencies
- View 7-day and 30-day historical price charts
- Search and switch between coins
- Toggle prices in USD or BTC

---

## 📦 Tech stack
- **Next.js** (App Router)
- **Tailwind CSS** — styling
- **Axios** — API requests
- **Chart.js** (via react-chartjs-2) — charts
- **CoinGecko API** — public crypto data

---

## ⚙️ Features
- Show real-time prices and market data
- Historical price charts
- Dynamic coin pages (`/coin/[id]`)
- Search bar to filter coins
- USD / BTC toggle (planned)

---

## 📂 Project structure

/app
  ├── page.tsx            → Homepage
  ├── coin/[id]/page.tsx  → Dynamic coin detail page
/components
  ├── CryptoList.tsx      → List of coins on homepage
  ├── Chart.tsx           → Chart component
  ├── Searchbar.tsx       → Search bar
/lib
  └── api.ts              → Functions to call CoinGecko API
/public
  └── favicon.ico
/styles
  └── globals.css


## 📈 Data source
- [CoinGecko API](https://www.coingecko.com/en/api) — free, no API key required

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
