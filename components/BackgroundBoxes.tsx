"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { BoxesCore } from "./ui/background-boxes";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <BoxesCore />

      <h1
        className={cn(
          "md:text-4xl text-2xl font-semibold text-white relative z-20 text-center"
        )}
      >
        Track Crypto in Real Time
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20 max-w-xl">
        Live prices, historical charts, and your own portfolio — all in one
        simple dashboard.
      </p>
    </div>
  );
}
