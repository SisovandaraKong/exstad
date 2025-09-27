"use client";

import type { programType } from "@/types/programs";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BsLightbulb } from "react-icons/bs";
import { BsJournalCheck } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
 
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import ProgramOverviewSection from "./ProgramOverviewSection";
import { MasterProgramType } from "@/types/master-program";
import LearningOutcomeSection from "./LearningOutcomeSection";
import RequirementSection from "./RequirementSection";
import FaqSection from "./faqSection";

type Props = {
  program: MasterProgramType;
};

const ProgramOverviewCard: React.FC<Props> = ({ program }) => {
  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Track open state of each FAQ item individually
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});

  // Initialize all FAQ items as open by default
  // useEffect(() => {
  //   const initialState: { [key: number]: boolean } = {};
  //   program.faq.forEach((section) => {
  //     section.faqs.forEach((item) => {
  //       initialState[item.id] = true; // open by default
  //     });
  //   });
  //   setOpenFaqs(initialState);
  // }, [program]);


  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);


  const toggle = (id: number) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="w-full grid p-[24px] gap-[40px] bg-background rounded-b-[24px]">
       <h1 className="text-foreground font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">{program.title}</h1>


        {/* Program Overview */}
        <div className="grid gap-[24px]"  data-aos="fade-up" >
        <ProgramOverviewSection programUuid={program.uuid} />
        </div>

        {/* Learning Outcomes */}
        <div data-aos="fade-up">
          <LearningOutcomeSection programUuid={program.uuid}/>
        </div>

        {/* Course Requirements */}
        <div data-aos="fade-up">
          <RequirementSection programUuid={program.uuid}/>
        </div>

        {/* FAQ Section (Smooth Accordion) */}
        <div data-aos="fade-up">
          <FaqSection programUuid={program.uuid}/>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewCard;
