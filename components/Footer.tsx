import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-sm">© 2025 Coniq. All rights reserved.</div>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link
            href="/tracker"
            className="hover:text-blue-400 transition-colors"
          >
            Tracker
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Telegram
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
