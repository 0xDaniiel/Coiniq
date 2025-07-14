import React from "react";

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-gray-100" id="learn">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        How it works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Search & add coins",
            desc: "Instantly find your favorite cryptocurrencies to watch and track.",
          },
          {
            title: "Track & analyze",
            desc: "See live prices, historical charts, and market trends in real time.",
          },
          {
            title: "Build your portfolio",
            desc: "Create unlimited lists and follow top trending portfolios easily.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-xl p-8 text-center border border-blue-500/30 hover:border-blue-500 shadow-md hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
