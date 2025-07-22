import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coniq — Crypto, NFTs & Market Dashboard",
  description:
    "Track live cryptocurrencies, exchanges, NFTs, and build your favorite watchlists all in one sleek dashboard.",
  keywords: ["crypto", "dashboard", "nft", "market", "prices", "exchanges"],
  authors: [{ name: "Daniel" }],
  creator: "Daniel",
  metadataBase: new URL("https://coniq.app"), // replace with your real domain later
  openGraph: {
    title: "Coniq — Real-time Crypto & NFT Dashboard",
    description:
      "Your all-in-one dashboard for live crypto prices, NFTs, exchanges and watchlists.",
    url: "https://coniq.app", // replace with your real domain later
    siteName: "Coniq",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coniq — Real-time Crypto & NFT Dashboard",
    description:
      "Track live cryptocurrencies, NFTs, exchanges and your favorites on Coniq.",
    creator: "@0xDaniiel",
  },
  icons: {
    icon: "/images/icon.png", // replace later
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900 text-gray-100`}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <SidebarTrigger />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
