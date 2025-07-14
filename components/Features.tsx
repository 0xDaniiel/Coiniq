import React from "react";
import { TrendingUp, BarChart, Wallet } from "lucide-react";

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
    <section className="py-12 md:py-20 bg-transparent" id="features">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-blue-400">
          Powerful Features to Track Your Assets
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-8 text-center border border-blue-500/20 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
