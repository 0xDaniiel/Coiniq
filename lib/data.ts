import { Home, Search, BarChart, Star, Image, Briefcase } from "lucide-react";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Charts", href: "/charts" },
];

export const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Cryptocurrencies",
    url: "/dashboard/coins",
    icon: Search,
  },
  {
    title: "Exchanges",
    url: "/dashboard/exchanges",
    icon: BarChart,
  },
  {
    title: "NFTs",
    url: "/dashboard/nfts",
    icon: Image,
  },
  {
    title: "Favorites",
    url: "/dashboard/favorites",
    icon: Star,
  },
  // {
  //   title: "Portfolio",
  //   url: "/dashboard/portfolio",
  //   icon: Briefcase,
  // },
];
