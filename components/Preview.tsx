import React from "react";
import Image from "next/image";

const Preview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        See your portfolio at a glance
      </h2>
      <section className="flex justify-center">
        <Image
          src={"/images/dashboard.svg"}
          alt="Crypto dashboard preview"
          height={500}
          width={500}
          className="rounded-xl shadow-lg border border-blue-500/10 h-full w-full"
        />
      </section>
    </div>
  );
};

export default Preview;
