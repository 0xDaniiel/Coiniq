"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Cryptocurrencies", href: "/cryptocurrencies" },
  { name: "Exchanges", href: "/exchanges" },
  { name: "NFT", href: "/nft" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-4xl font-semibold text-blue-400"
        >
          Coniq
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Searchbar */}
        <div className="hidden md:block">
          <input
            type="search"
            placeholder="Search coins..."
            className="p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Hamburger icon */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-900/90 backdrop-blur-sm absolute top-full left-0 right-0 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block py-1 transition-colors ${
                pathname === link.href ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <input
            type="text"
            placeholder="Search coins..."
            className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-400"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
