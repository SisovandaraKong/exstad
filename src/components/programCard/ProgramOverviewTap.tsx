"use client";

import type { programType } from "@/types/programs";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Props = {
  program: programType;
};

const ProgramOverviewCard: React.FC<Props> = ({ program }) => {
  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Track open state of each FAQ item individually
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});

  // Initialize all FAQ items as open by default
  useEffect(() => {
    const initialState: { [key: number]: boolean } = {};
    program.faq.forEach((section) => {
      section.faqs.forEach((item) => {
        initialState[item.id] = true; // open by default
      });
    });
    setOpenFaqs(initialState);
  }, [program]);

  const toggle = (id: number) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="w-full grid p-[24px] gap-[40px] bg-background">
        <h1 className="text-foreground text-[32px] font-bold">{program.title}</h1>

        {/* Program Overview */}
        <div className="grid gap-[24px]">
          {program.programOverview.map((item) => (
            <div key={item.id} className="grid gap-[24px]">
              <h2 className="text-[20px] text-yellow-400 font-bold">
                <i className="fa-solid fa-bullseye mr-2"></i>
                {item.title}
              </h2>
              <p className="text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-amber-400 p-[34px] rounded-[8px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Learning Outcomes */}
        <div>
          {program.learningOutcome.map((outcome) => (
            <div key={outcome.id} className="grid gap-[24px]">
              <h2 className="text-[20px] text-primary-hover font-bold">
                <i className="fa-solid fa-bullseye mr-2"></i>
                {outcome.title}
              </h2>
              <p className="mb-[10px]">{outcome.subtitle}</p>
              <ul className="list-disc grid gap-[24px] list-inside text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-primary-hover p-[34px] rounded-[8px]">
                {outcome.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Course Requirements */}
        <div>
          {program.courseRequirement.map((requirement) => (
            <div key={requirement.id} className="grid gap-[24px]">
              <h2 className="text-[20px] text-secondary-hover font-bold">{requirement.title}</h2>
              <p>{requirement.description}</p>
              <ul className="list-disc grid gap-[24px] list-inside text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-secondary-hover p-[34px] rounded-[8px]">
                {requirement.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section (Smooth Accordion) */}
        <div>
          {program.faq.map((section) => (
            <div key={section.title} className="grid gap-[24px]">
              <h2 className="text-[20px] text-[#800080] font-bold">{section.title}</h2>
              <div className="text-foreground text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-normal border-l-4 border-[#800080] p-[34px] rounded-[8px]">
                {section.faqs.map((item, index) => {
                  const isOpen = openFaqs[item.id];
                  const height = refs.current[item.id]?.scrollHeight || 0;

                  return (
                    <div key={item.id} className="border-b py-3">
                      <button
                        onClick={() => toggle(item.id)}
                        className="flex justify-between items-center w-full font-bold text-[16px] text-foreground"
                      >
                        <span>
                          {index + 1}. {item.question}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <div
                        ref={(el) => { refs.current[item.id] = el; }} 
                        style={{
                          maxHeight: isOpen ? `${refs.current[item.id]?.scrollHeight}px` : "0px",
                        }}
                        className="transition-all duration-500 ease-in-out overflow-hidden mt-2"
                      >
                        <p className="text-foreground text-[16px] font-normal">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewCard;
