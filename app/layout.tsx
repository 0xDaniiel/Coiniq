import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Header from "@/components/Header";
import { StickyBannerDemo } from "@/components/StickyBanner";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Coniq — Real-time Crypto Tracker & Charts",
  description:
    "Track live prices, charts, and trends for the top cryptocurrencies. Built with Next.js & CoinGecko API.",
  icons: {
    icon: "/images/icon.png", // to be updated
    shortcut: "/images/icon.png", // to be updated
    apple: "/apple-touch-icon.png", // to be updated
  },
  keywords: [
    "crypto",
    "cryptocurrency",
    "price tracker",
    "bitcoin",
    "ethereum",
    "chart",
    "next.js",
  ],
  authors: [{ name: "Daniel" }],
  creator: "Daniel",
  metadataBase: new URL("https://coniq.vercel.app"), // replace with my domain
  openGraph: {
    title: "Coniq — Real-time Crypto Tracker & Charts",
    description:
      "Track live prices and charts for the top cryptocurrencies with Coniq.",
    url: "https://coniq.vercel.app",
    siteName: "Coniq",
    images: [
      {
        url: "/og-image.png", // to be replaced
        width: 1200,
        height: 630,
        alt: "Coniq Crypto Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coniq — Real-time Crypto Tracker & Charts",
    description:
      "Track live prices and charts for the top cryptocurrencies with Coniq.",
    images: ["/og-image.png"],
    creator: "@0xDaniiel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className}   min-h-screen bg-black text-gray-100`}
      >
        <StickyBannerDemo />
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
