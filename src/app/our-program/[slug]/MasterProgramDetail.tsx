"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import ProgramActivityTap, { ProgramGeneration } from "@/components/program/detail-program/activity/ProgramActivity";

import ProgramHeaderSkeleton from "@/components/program/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewSidebarSkeleton from "@/components/program/skeleton/ProgramSidebarSkeleton";
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/program/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/program/skeleton/ProgramActivitySkeleton";

import { useGetMasterProgramByTitleQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import { MasterProgramType } from "@/types/master-program";
import NotFoundProgram from "@/components/program/components/NotFound";

interface MasterProgramDetailClientProps {
  initialProgram?: MasterProgramType;
}

const MasterProgramDetailPage: React.FC<MasterProgramDetailClientProps> = ({
  initialProgram,
}) => {
  const params = useParams();
  const masterProgramSlug = params?.slug as string;

  const [activeTab, setActiveTab] = useState("overview");

  // Fetch master program by slug/title
  const { data: masterProgram, isLoading: isMasterLoading, isError: isMasterError } =
    useGetMasterProgramByTitleQuery(
      { title: masterProgramSlug ?? initialProgram?.title ?? "" },
      { skip: !masterProgramSlug && !initialProgram?.title }
    );

  // Fetch all opening programs to show activity tab
  const { data: allPrograms = [], isLoading: isAllProgramsLoading } =
    useGetAllOpeningProgramsQuery();

  // Loading skeletons
  if (isMasterLoading || isAllProgramsLoading) {
    return (
      <div className="flex flex-col xl:flex-row p-5 md:p-8 gap-6 my-[20px] mx-auto max-w-7xl">
        <div className="flex-1">
          <ProgramHeaderSkeleton />
          {activeTab === "overview" && <ProgramOverviewCardSkeleton />}
          {activeTab === "curriculum" && <ProgramCurriculumSkeleton />}
          {activeTab === "activity" && <ProgramActivitySkeleton />}
        </div>
        <ProgramOverviewSidebarSkeleton />
      </div>
    );
  }

  // Error handling
  if (isMasterError || !masterProgram) {
    return <NotFoundProgram title="Master program not found"/>
  }

  // Get all generations for this master program (for activity tab)
  const generations: ProgramGeneration[] = allPrograms
    .filter(op => op.programName === masterProgram.title)
    .sort((a, b) => (a.generation ?? 1) - (b.generation ?? 1))
    .map(op => ({
      uuid: op.uuid,
      title: `Generation ${op.generation ?? 1}`,
    }));

  // Map translation keys to components (NO timeline, NO enrollment for master program)
  const tabComponents: Record<string, React.FC> = {
    overview: () => <ProgramOverviewTap program={masterProgram} />,
    curriculum: () => (
      <ProgramCurriculumTap
        openingUuid={undefined} // No opening program - will show master curriculum
        masterUuid={masterProgram.uuid}
      />
    ),
    activity: () =>
      generations.length ? (
        <ProgramActivityTap generations={generations} />
      ) : (
        <p className="text-gray-500 text-center">No opening programs available.</p>
      ),
    roadmap: () => <p className="text-gray-500 text-center">Roadmap content here</p>,
  };

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex lg:flex-col md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
      <div className="flex-1">
        <ProgramHeader
          masterProgram={masterProgram}
          openingProgram={undefined} // No opening program - header will hide timeline & enrollment tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div>
          <ActiveTabComponent />
        </div>
      </div>
      <ProgramSidebar 
        program={masterProgram} 
        openingData={undefined} // No opening data - sidebar will hide enrollment info
      />
    </div>
  );
};

export default MasterProgramDetailPage;