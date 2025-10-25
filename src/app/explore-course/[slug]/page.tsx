"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import TimeLine from "@/components/program/detail-program/timeline/TimeLine";
import ProgramActivityTap, {
  ProgramGeneration,
} from "@/components/program/detail-program/activity/ProgramActivity";
import ProgramEnrollment from "@/components/program/ProgramEnrollment";

import ProgramHeaderSkeleton from "@/components/program/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/program/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/program/skeleton/ProgramActivitySkeleton";

import { useGetMasterProgramByTitleQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
import WorkNodeViewer from "@/components/roadmap/roadmap-detail";

const ProgramDetailPage: React.FC = () => {
  const params = useParams();
  const openingProgramSlug = params?.slug as string;
  const [activeTab, setActiveTab] = useState("Overview");

  // Fetch all opening programs
  const {
    data: allPrograms = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useGetAllOpeningProgramsQuery();

  // Find current program by slug
  const openingProgram = allPrograms.find(
    (op) => op.slug === openingProgramSlug
  );

  // Always call master program hook
  const {
    data: masterProgram,
    isLoading: isMasterLoading,
    isError: isMasterError,
  } = useGetMasterProgramByTitleQuery(
    { title: openingProgram?.programName ?? "" },
    { skip: !openingProgram?.programName }
  );

  // Loading skeletons
  if (isAllLoading || isMasterLoading) {
    return (
      <div className="flex flex-col min-h-screen xl:flex-row p-5 md:p-8 gap-6 my-[20px] mx-auto max-w-7xl ">
        <div className="flex-1">
          <ProgramHeaderSkeleton />
          {activeTab === "Overview" && <ProgramOverviewCardSkeleton />}
          {activeTab === "Curriculum" && <ProgramCurriculumSkeleton />}
          {activeTab === "Activity" && <ProgramActivitySkeleton />}
        </div>
      </div>
    );
  }

  // Error handling
  if (isAllError || !allPrograms)
    return <p className="text-center text-red-500">Failed to load programs!</p>;
  if (!openingProgram)
    return <p className="text-center text-red-500">Program not found!</p>;
  if (isMasterError || !masterProgram)
    return (
      <p className="text-center text-red-500">Master program not found!</p>
    );

  const generations: ProgramGeneration[] = allPrograms
    .filter((op) => op.programName === openingProgram.programName)
    .sort((a, b) => (a.generation ?? 1) - (b.generation ?? 1))
    .map((op) => ({
      uuid: op.uuid,
      title: `Generation ${op.generation ?? 1}`,
    }));

  const tabComponents: Record<string, React.FC> = {
    Overview: () => <ProgramOverviewTap program={masterProgram} />,
    Curriculum: () => (
      <ProgramCurriculumTap
        openingUuid={openingProgram.uuid}
        masterUuid={masterProgram.uuid}
      />
    ),
    Activity: () =>
      generations.length ? (
        <ProgramActivityTap generations={generations} />
      ) : (
        <p className="text-gray-500 text-center">
          No opening programs available.
        </p>
      ),
    Timeline: () => <TimeLine openingProgramUuid={openingProgram.uuid} />,
    Roadmap: () => <WorkNodeViewer programUuid={masterProgram.uuid} />,
    Enrollment: () => <ProgramEnrollment />,
  };

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex lg:flex-col min-h-screen md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
      <div className="flex-1 w-full min-w-0 shrink-0 ">
        <ProgramHeader
          uuid={masterProgram.uuid}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="w-full">
          <ActiveTabComponent />
        </div>
      </div>
      <ProgramSidebar uuid={masterProgram.uuid} />
    </div>
  );
};

export default ProgramDetailPage;
