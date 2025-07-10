import React from "react";
import { TrendingUp, BarChart, Wallet } from "lucide-react"; // icons from lucide-react

const features = [
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    title: "Live Prices",
    description: "Track real-time prices for thousands of coins and NFTs.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-blue-500" />,
    title: "Detailed Charts",
    description:
      "Analyze historical data and market trends with interactive charts.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-blue-500" />,
    title: "Portfolio Tracking",
    description: "Build and monitor your own crypto & NFT portfolio easily.",
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-white">
          Powerful Features to Track Your Assets
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/60 backdrop-blur rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-neutral-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
