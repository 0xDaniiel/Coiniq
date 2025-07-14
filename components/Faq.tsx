import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

const FAQ = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-20 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-400 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-blue-500/30 rounded-xl overflow-hidden bg-gray-900 hover:border-blue-500 transition-all duration-300"
          >
            <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-white">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
