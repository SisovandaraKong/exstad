"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProgramOverviewSection from "./overview/ProgramOverviewSection";
import LearningOutcomeSection from "./outcomes/LearningOutcomeSection";
import RequirementSection from "./requirement/RequirementSection";
import FaqSection from "./faq/faqSection";

import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import TechnologySection from "./technology/TechnologySection";

// ✅ Combined type
type Props = {
  program: MasterProgramType & { openingProgram?: openingProgramType };
};

const ProgramOverviewCard: React.FC<Props> = ({ program }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div>
      <div className="w-full grid p-[24px] gap-[40px] bg-background rounded-b-[24px]">
        {/* Title from master program */}
        <h1 className="text-foreground font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {program.title}
        </h1>

        {/* ✅ Example: show deadline or generation if available from opening program */}
        {program.openingProgram && (
          <p className="text-muted-foreground">
            Generation {program.openingProgram.generation} · Deadline:{" "}
            {new Date(program.openingProgram.deadline).toLocaleDateString()}
          </p>
        )}

        {/* Program Overview */}
        <div className="grid gap-[24px]" data-aos="fade-up">
          <ProgramOverviewSection programUuid={program.uuid} />
        </div>

        {/* Learning Outcomes */}
        <div data-aos="fade-up">
          <LearningOutcomeSection programUuid={program.uuid} />
        </div>

        {/* Course Requirements */}
        <div data-aos="fade-up">
          <RequirementSection programUuid={program.uuid} />
        </div>
        <div className="grid gap-[24px]" data-aos="fade-up">
          <TechnologySection programUuid={program.uuid} />
        </div>

        {/* FAQ Section */}
        <div data-aos="fade-up">
          <FaqSection programUuid={program.uuid} />
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewCard;
