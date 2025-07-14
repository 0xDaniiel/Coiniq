"use client";
import React from "react";
import CountUp from "react-countup";
import { liveStats } from "@/lib/data";

const Stats = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-gray-100 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400">
        Trusted by crypto enthusiasts worldwide
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {liveStats.map((stat, idx) => (
          <div key={idx}>
            <p className="text-4xl font-bold text-white">
              {stat.value !== null ? (
                <CountUp
                  end={stat.value}
                  duration={2}
                  separator=","
                  suffix={stat.suffix}
                />
              ) : (
                stat.text
              )}
            </p>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
