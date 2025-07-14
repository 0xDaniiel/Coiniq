"use client";
import { StickyBanner } from "@/components/ui/sticky-banner";
import Link from "next/link";

export function StickyBannerDemo() {
  return (
    <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
      <div className="flex justify-between items-center w-full max-w-[90%] mx-auto text-white drop-shadow-md">
        <p className="flex gap-5">
          <span>
            Introducing Coniq: track live crypto prices & build your personal
            portfolio — now live in beta.{" "}
          </span>
          <Link
            href="/#about"
            className="transition duration-200 hover:underline"
          >
            See more..
          </Link>
        </p>
      </div>
    </StickyBanner>
  );
}
