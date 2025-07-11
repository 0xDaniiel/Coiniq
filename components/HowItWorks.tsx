import React from "react";

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        How it works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Search & add coins</h3>
          <p className="text-gray-300">
            Instantly find your favorite cryptocurrencies to watch and track.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Track & analyze</h3>
          <p className="text-gray-300">
            See live prices, historical charts, and market trends in real time.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Build your portfolio</h3>
          <p className="text-gray-300">
            Create unlimited lists and follow top trending portfolios easily.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
