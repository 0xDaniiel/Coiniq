import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-sm">&copy; 2025 Coniq. All rights reserved.</div>
        <div className="flex space-x-4">
          <Link
            href="https://x.com/0xDaniiel"
            target="_blank"
            className="hover:text-blue-400 transition-colors flex items-center"
          >
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
