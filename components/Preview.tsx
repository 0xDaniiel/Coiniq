import React from "react";
import Image from "next/image";

const Preview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        See your portfolio at a glance
      </h2>
      <section className="flex justify-center">
        <div className="max-w-4xl w-full">
          <Image
            src="/images/dashboard.png"
            alt="Crypto dashboard preview"
            width={1200}
            height={800}
            className="rounded-xl shadow-lg border border-blue-500/10 w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Preview;
