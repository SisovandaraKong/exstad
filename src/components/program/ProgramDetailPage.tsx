"use client";
import React, { useState } from "react";
import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import ProgramActivityTap, { ProgramGeneration } from "@/components/program/detail-program/activity/ProgramActivity";
import ProgramEnrollment from "@/components/program/ProgramEnrollment";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";

interface Props {
  openingProgram: openingProgramType;
  masterProgram: MasterProgramType;
}

const ProgramDetailPage: React.FC<Props> = ({ openingProgram, masterProgram }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const generations: ProgramGeneration[] = openingProgram
    ? [{ uuid: openingProgram.uuid, title: `Generation ${openingProgram.generation}` }]
    : [];

  const tabComponents: Record<string, React.FC> = {
    Overview: () => <ProgramOverviewTap program={masterProgram} />,
    Curriculum: () => <ProgramCurriculumTap openingUuid={openingProgram.uuid} masterUuid={masterProgram.uuid} />,
    Activity: () =>
      generations.length ? (
        <ProgramActivityTap generations={generations} />
      ) : (
        <p className="text-gray-500 text-center">No opening programs available.</p>
      ),
    Enrollment: () => <ProgramEnrollment />,
  };

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex lg:flex-col min-h-screen md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
      <div className="flex-1">
        <ProgramHeader uuid={masterProgram.uuid} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <ActiveTabComponent />
        </div>
      </div>
      <ProgramSidebar uuid={masterProgram.uuid} />
    </div>
  );
};

export default ProgramDetailPage;
