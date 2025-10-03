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
import { useGetMasterProgramByTitleQuery } from "@/components/program/masterProgramApi";
import { useGetOpeningProgramBySlugQuery } from "@/components/program/openingProgramApi";

// Define proper types
interface OpeningProgramType {
  uuid: string;
  programName: string;
  generation?: number;
  // Add other fields if needed
}

const ProgramDetailPage: React.FC = () => {
  const params = useParams();
  const openingProgramSlug = params?.slug as string;
  const [activeTab, setActiveTab] = useState("Overview");

  // Fetch opening program by slug
  const {
    data: openingProgram,
    isLoading: isOpeningLoading,
    isError: isOpeningError,
  } = useGetOpeningProgramBySlugQuery({ slug: openingProgramSlug });

  // Fetch master program by title (use programName from openingProgram)
  const {
    data: masterProgram,
    isLoading: isMasterLoading,
    isError: isMasterError,
  } = useGetMasterProgramByTitleQuery(
    { title: openingProgram?.programName ?? "" },
    { skip: !openingProgram?.programName }
  );

  // Loading skeletons
  if (isOpeningLoading || isMasterLoading) {
    return (
      <div className="flex flex-col xl:flex-row p-5 md:p-8 gap-6 my-[20px] mx-auto max-w-7xl">
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

  if (isMasterError || !masterProgram)
    return <p className="text-center text-red-500">Program not found!</p>;
  if (isOpeningError || !openingProgram)
    return <p className="text-center text-red-500">Failed to load opening programs!</p>;

  // Prepare generations array (since openingProgram is a single object)
  const generations: { uuid: string; title: string }[] = openingProgram
    ? [
        {
          uuid: openingProgram.uuid,
          title: `Generation ${openingProgram.generation ?? 1}`,
        },
      ]
    : [];

  const tabComponents: { [key: string]: React.FC } = {
    Overview: () => <ProgramOverviewTap program={masterProgram} />,
    Curriculum: () => (
      <ProgramCurriculumTap openingUuid={openingProgram.uuid} masterUuid={masterProgram.uuid} />
    ),
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
    <div className="flex lg:flex-col md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
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
