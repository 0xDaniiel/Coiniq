import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div
      id="about"
      className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-gray-100 flex flex-col md:flex-row items-center gap-10"
    >
      <section>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-400">
          About Coniq
        </h1>
        <p className="mb-6 text-lg leading-relaxed">
          Coniq is a modern crypto tracker that helps you monitor real-time
          prices, view historical charts, and manage your own portfolio
          effortlessly. Built with Next.js, Tailwind CSS, and powered by the
          CoinGecko API, we bring you clean data, beautiful charts, and a fast,
          responsive design.
        </p>
        <p className="mb-8 text-lg leading-relaxed">
          Whether you&apos;re a casual investor or a crypto enthusiast, Coniq
          makes it simple to stay updated on top cryptocurrencies, explore
          exchanges, discover NFTs, and personalize your watchlist — all in one
          place.
        </p>
      </section>

      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <Image
          src="/images/data.png"
          alt="Crypto market chart"
          className="object-cover"
          fill
          placeholder="blur"
          blurDataURL="/images/data-blur.png"
        />
      </div>
    </div>
  );
};

export default About;
