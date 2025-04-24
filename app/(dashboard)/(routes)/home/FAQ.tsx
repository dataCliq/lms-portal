"use client";
import React, { useState } from "react";

const faqData = [
  {
    question: "Do you provide a complete design style?",
    answer:
      "Pretium ac auctor quis urna orci feugiat. Vulputate tellus velit tellus orci auctor vel nulla facilisi ut. Ante nunc risus viverra vivamus. Eros amet at lectus ac ac nibh dignissim.",
    isOpen: true,
  },
  {
    question: "How to apply saturn to our project?",
    answer: "Details about applying saturn to your project go here.",
    isOpen: false,
  },
  {
    question: "How was the license?",
    answer: "Details about the license go here.",
    isOpen: false,
  },
  {
    question: "How much we can buy this marvelous product?",
    answer: "Pricing details for the product go here.",
    isOpen: false,
  },
  {
    question: "Do you have any terms & conditions?",
    answer: "Terms and conditions details go here.",
    isOpen: false,
  },
];

const FAQ = () => {
  const [faqs, setFaqs] = useState(faqData);

  const toggleFAQ = (index: number) => {
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <section className="flex flex-col items-center py-20 w-full">
      {/* Caption */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 bg-gray-100 font-semibold tracking-widest px-4 py-1 rounded-full inline-block">
          Frequently Asked Questions
        </p>
      </div>

      {/* Heading */}
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#00A3B5] to-[#68D391] mb-12">
        We Answer Your Questions
      </h2>

      {/* FAQ Accordion */}
      <div className="w-full max-w-5xl p-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b ${
              index === faqs.length - 1 ? "border-b-0" : "border-gray-100"
            } py-5 transition-all duration-300 rounded-lg`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left focus:outline-none"
            >
              <span className="text-xl font-semibold text-gray-800">
                {faq.question}
              </span>
              <span
                className={`text-blue-500 transform transition-transform duration-300 ease-in-out ${
                  faq.isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#00A3B5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out will-change-[max-height,opacity,padding] ${
                faq.isOpen
                  ? "max-h-48 opacity-100 py-4"
                  : "max-h-0 opacity-0 py-0"
              }`}
              style={{
                transitionProperty: "max-height, opacity, padding",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="mt-4 text-gray-600 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;