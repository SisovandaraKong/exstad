"use client";

import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useGetAllFaqQuery } from "./faqApi";
import { TfiHelpAlt } from "react-icons/tfi";

interface FaqProps {
  programUuid: string;
}

const FaqSection: React.FC<FaqProps> = ({ programUuid }) => {
  const { data: faqSections = [], isLoading, isError } = useGetAllFaqQuery(programUuid,{refetchOnMountOrArgChange:true});
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const initializedRef = useRef(false);

  // Optional: open all by default
  useEffect(() => {
    // Only initialize once when data first loads
    if (faqSections.length > 0 && !initializedRef.current) {
      const initialState: Record<string, boolean> = {};
      faqSections.forEach((section) =>
        section.faqs.forEach((item) => {
          initialState[item.id] = true; // set false if you want closed by default
        })
      );
      setOpenFaqs(initialState);
      initializedRef.current = true;
    }
  }, [faqSections.length]); // Only depend on length, not the entire array

  const toggle = (id: string) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) return <p>Loading FAQs...</p>;
  if (isError) return <p>Failed to load FAQs.</p>;
  if (!faqSections.length) return <p>No FAQs available.</p>;

  return (
    <div className="grid gap-6">
      {faqSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="grid gap-6">
          <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-[#800080] font-bold"><TfiHelpAlt className="text-lg sm:text-xl md:text-2xl" /> 
            {section.title}
          </h2>

          <div className="text-foreground text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-[#800080] p-4 sm:p-6 md:p-8 rounded-lg">
            {section.faqs.map((item, index) => {
              const isOpen = openFaqs[item.id];
              return (
                <div key={item.id} className="border-b py-2 sm:py-3">
                  {/* Toggle Button */}
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex justify-between items-center text-start w-full font-bold text-sm sm:text-base md:text-lg text-foreground"
                  >
                    <span>{index + 1}. {item.question}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Collapsible Answer */}
                  <div
                    ref={(el) => { refs.current[item.id] = el; }}
                    style={{
                      maxHeight: isOpen ? `${refs.current[item.id]?.scrollHeight}px` : "0px"
                    }}
                    className="transition-all duration-500 ease-in-out overflow-hidden mt-2"
                  >
                    <p className="text-foreground text-sm sm:text-base md:text-lg font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqSection;