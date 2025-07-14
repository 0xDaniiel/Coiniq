import React from "react";

const faqs = [
  {
    question: "Is it free to use?",
    answer:
      "Yes! You can track coins and NFTs without signing up or paying anything.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed — just open the tracker and start adding assets to your watchlist.",
  },
  {
    question: "Does it support NFTs?",
    answer:
      "Yes! You can track popular NFTs and collections alongside your crypto coins.",
  },
  {
    question: "Where does your data come from?",
    answer:
      "We aggregate data from trusted providers to give you live prices and historical charts.",
  },
];

const FAQ = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-gray-800/60 backdrop-blur rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              {faq.question}
            </h3>
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
