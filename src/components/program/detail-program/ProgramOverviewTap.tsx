"use client";
import {  useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProgramOverviewSection from "./overview/ProgramOverviewSection";
import { MasterProgramType } from "@/types/master-program";
import LearningOutcomeSection from "./outcomes/LearningOutcomeSection";
import RequirementSection from "./requirement/RequirementSection";
import FaqSection from "./faq/faqSection";

type Props = {
  program: MasterProgramType;
};

const ProgramOverviewCard: React.FC<Props> = ({ program }) => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

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
