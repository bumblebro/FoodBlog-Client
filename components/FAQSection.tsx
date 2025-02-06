"use client";
import { useState } from "react";

export const FAQSection = ({ faqs }: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section px-4 py-8">
      <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((item: any, index: any) => (
          <div key={index} className="border-b pb-4">
            {/* Question - Click to toggle */}
            <button
              className="text-base  font-medium mb-2 flex justify-between w-full text-left"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span className="ml-2 ">
                {openIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                  </svg>
                )}
              </span>
            </button>

            {/* Answer - Show if active */}
            {openIndex === index && (
              <p className="text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
