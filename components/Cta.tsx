import React from "react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-400">
        Ready to start tracking?
      </h2>
      <p className="text-gray-400 mb-6">
        Track live prices and build your crypto & NFT watchlist instantly — no
        signup required.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
      >
        Start Tracking Now
      </Link>
    </section>
  );
};

export default CTA;
