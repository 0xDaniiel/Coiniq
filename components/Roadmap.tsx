import React from "react";

const roadmap = [
  {
    title: "Q3 2025",
    items: ["Launch MVP", "Track top 100 coins", "Basic NFT tracking"],
  },
  {
    title: "Q4 2025",
    items: ["Add wallet integration", "Portfolio export", "Trending alerts"],
  },
  {
    title: "Q1 2026",
    items: [
      "Support for more chains",
      "Social sharing",
      "Mobile-friendly dashboard",
    ],
  },
];

const Roadmap = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        Product Roadmap
      </h2>
      <div className="space-y-8">
        {roadmap.map((phase, idx) => (
          <div
            key={idx}
            className="bg-gray-800/60 backdrop-blur rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-300">
              {phase.title}
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {phase.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
