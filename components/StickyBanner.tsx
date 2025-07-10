"use client";
import React, { useState } from "react";
import { StickyBanner } from "@/components/ui/sticky-banner"; // adjust import to match your project

export function StickyBannerDemo() {
  const [visible, setVisible] = useState(true);

  // Remove from DOM when closed
  if (!visible) return null;

  return (
    <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
      <div className="flex justify-between items-center w-full max-w-[90%] mx-auto text-white drop-shadow-md">
        <p>
          Introducing Coniq: track live crypto prices & build your personal
          portfolio — now live in beta.{" "}
          <a
            href="/cryptocurrencies"
            className="transition duration-200 hover:underline"
          >
            Tracker
          </a>
        </p>
      </div>
    </StickyBanner>
  );
}
