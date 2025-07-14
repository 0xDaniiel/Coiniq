import React from "react";
import { roadmap } from "@/lib/data";

const Roadmap = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-4 py-12 md:py-20 text-gray-100"
      id="roadmap"
    >
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        Product Roadmap
      </h2>
      <div className="space-y-8">
        {roadmap.map((phase, idx) => (
          <div
            key={idx}
            className="
              bg-gray-900 
              rounded-xl 
              p-8 
              border border-blue-500/30 
              hover:border-blue-500 
              shadow-md hover:shadow-blue-500/20 
              transition-all duration-300
            "
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
