"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import ProgramActivityTap from "@/components/program/detail-program/activity/ProgramActivity";
import ProgramEnrollment from "@/components/program/ProgramEnrollment";

import ProgramHeaderSkeleton from "@/components/program/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewSidebarSkeleton from "@/components/program/skeleton/ProgramSidebarSkeleton";
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/program/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/program/skeleton/ProgramActivitySkeleton";
import { useGetMasterProgramByUuidQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";
// import { useGetAllOpeningProgramsQuery } from "@/features/opening-program/openingProgramApi";



const ProgramDetailPage: React.FC = () => {
  const params = useParams();
  const masterProgramUuid = params?.uuid as string;
  const [activeTab, setActiveTab] = useState("Overview");

  // Fetch master program
  const { data: program, isLoading: isProgramLoading, isError: isProgramError } =
    useGetMasterProgramByUuidQuery({ uuid: masterProgramUuid });

  // Fetch all opening programs
  const { data: openingPrograms = [], isLoading: isOpeningProgramsLoading, isError: isOpeningProgramsError } =
    useGetAllOpeningProgramsQuery();

  // Show loading skeletons
  if (isProgramLoading || isOpeningProgramsLoading) {
    return (
      <div className="flex flex-col  min-h-screen xl:flex-row p-5 md:p-8 gap-6 my-[20px] mx-auto max-w-7xl">
        <div className="flex-1">
          <ProgramHeaderSkeleton />
          {activeTab === "Overview" && <ProgramOverviewCardSkeleton />}
          {activeTab === "Curriculum" && <ProgramCurriculumSkeleton />}
          {activeTab === "Activity" && <ProgramActivitySkeleton />}
        </div>
        <ProgramOverviewSidebarSkeleton />
      </div>
    );
  }

  if (isProgramError || !program)
    return <p className="text-center text-red-500">Program not found!</p>;
  if (isOpeningProgramsError)
    return <p className="text-center text-red-500">Failed to load opening programs!</p>;

  // Filter opening programs belonging to this master program
  const programOpeningPrograms = openingPrograms.filter(
    (op) => op.programName === program.title
  );

  // Prepare generations array for tabs
  const generations = programOpeningPrograms.map((op) => ({
    uuid: op.uuid,
    title: `Generation ${op.generation}`,
  }));

  // Map tabs to components
  const tabComponents: { [key: string]: React.FC } = {
    Overview: () => <ProgramOverviewTap program={program} />,
    Curriculum: () => <ProgramCurriculumTap programUuid={program.uuid} />,
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
    <div className="flex lg:flex-col  min-h-screen md:flex-col flex-col xl:flex-row  p-5 md:p-8 lg:py-6 lg:px-0  mx-auto  gap-6 my-[20px] max-w-7xl">
      <div className="flex-1">
        <ProgramHeader uuid={program.uuid} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <ActiveTabComponent />
        </div>
      </div>

      <ProgramSidebar uuid={program.uuid} />
    </div>
  );
};

export default ProgramDetailPage;
