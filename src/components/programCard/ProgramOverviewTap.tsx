"use client";

import type { programType } from "@/types/programs";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BsLightbulb } from "react-icons/bs";
import { BsJournalCheck } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";




import Image from "next/image";

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
       <h1 className="text-foreground font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">{program.title}</h1>


        {/* Program Overview */}
        <div className="grid gap-[24px]">
          {program.programOverview.map((item) => (
            <div key={item.id} className="grid gap-[24px]">
              
             <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-400 font-bold"> <Image unoptimized width={24} height={24} src={"/image/logo/mission.png"} alt={item.title}  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"  />  {item.title}</h2>
             <p className="text-foreground text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-amber-400 p-4 sm:p-6 md:p-8 rounded-lg">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Learning Outcomes */}
        <div>
          {program.learningOutcome.map((outcome) => (
            <div key={outcome.id} className="grid gap-6">
                <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-primary-hover font-bold"><BsLightbulb className="text-lg sm:text-xl md:text-2xl" />{outcome.title}</h2>
                <p className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base">{outcome.subtitle}</p>
                <ul className="list-disc list-inside grid gap-4 sm:gap-6 text-foreground text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-primary-hover p-4 sm:p-6 md:p-8 rounded-lg">{outcome.description.map((point, index) => (<li key={index}>{point}</li>))}</ul>
              </div>

          ))}
        </div>

        {/* Course Requirements */}
        <div>
          {program.courseRequirement.map((requirement) => (
           <div key={requirement.id} className="grid gap-6">
                <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-hover font-bold"><BsJournalCheck className="text-lg sm:text-xl md:text-2xl" />{requirement.title}</h2>
                <p className="text-sm sm:text-base md:text-lg">{requirement.description}</p>
                <ul className="list-disc list-inside grid gap-4 sm:gap-6 text-foreground text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-secondary-hover p-4 sm:p-6 md:p-8 rounded-lg">{requirement.description.map((point, index) => (<li key={index}>{point}</li>))}</ul>
              </div>

          ))}
        </div>

        {/* FAQ Section (Smooth Accordion) */}
        <div>
          {program.faq.map((section) => (
            <div key={section.title} className="grid gap-6">
            <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl lg:text-2xl text-[#800080] font-bold"><TfiHelpAlt className="text-lg sm:text-xl md:text-2xl" /> {section.title}</h2>
            <div className="text-foreground text-sm sm:text-base md:text-lg font-normal shadow-[0_4px_15px_rgba(0,0,0,0.15)] border-l-4 border-[#800080] p-4 sm:p-6 md:p-8 rounded-lg">
              {section.faqs.map((item, index) => {
                const isOpen = openFaqs[item.id];
                return (
                  <div key={item.id} className="border-b py-2 sm:py-3">
                    <button onClick={() => toggle(item.id)} className="flex justify-between items-center text-start w-full font-bold text-sm sm:text-base md:text-lg text-foreground">
                      <span>{index + 1}. {item.question}</span>
                      <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      ref={(el) => { refs.current[item.id] = el; }}
                      style={{ maxHeight: isOpen ? `${refs.current[item.id]?.scrollHeight}px` : "0px" }}
                      className="transition-all duration-500 ease-in-out overflow-hidden mt-2"
                    >
                      <p className="text-foreground text-sm sm:text-base md:text-lg font-normal">{item.answer}</p>
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
