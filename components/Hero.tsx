"use client";
import { cn } from "@/lib/utils";
import { BoxesCore } from "./ui/background-boxes";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-transparent flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-transparent z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <BoxesCore />

      <h1
        className={cn(
          "md:text-5xl text-3xl font-semibold text-white relative z-20 text-center px-5"
        )}
      >
        Track Your <span className="text-blue-400">Coins & NFTs </span> in Real
        Time
      </h1>
      <p className="text-center mt-3 text-neutral-300 relative z-20 max-w-2xl px-5">
        Live prices, historical charts, and your own crypto & NFT portfolio —
        all in one simple dashboard.
      </p>

      <Link
        href="https://coiniq-git-data-daniels-projects-6d27f7a3.vercel.app/"
        className="mt-8 relative z-20 inline-block px-6 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Hero;
