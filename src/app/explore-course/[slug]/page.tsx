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
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/program/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/program/skeleton/ProgramActivitySkeleton";

import { useGetOpeningProgramBySlugQuery } from "@/components/program/openingProgramApi";
import { useGetMasterProgramByTitleQuery } from "@/components/program/masterProgramApi"; // 👈 Fetch by title

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

  // Loading
  if (isOpeningLoading || isMasterLoading) {
    return (
      <div className="flex flex-col min-h-screen xl:flex-row p-5 md:p-8 gap-6 my-[20px] mx-auto max-w-7xl">
        <div className="flex-1">
          <ProgramHeaderSkeleton />
          {activeTab === "Overview" && <ProgramOverviewCardSkeleton />}
          {activeTab === "Curriculum" && <ProgramCurriculumSkeleton />}
          {activeTab === "Activity" && <ProgramActivitySkeleton />}
        </div>
      </div>
    );
  }

  // Errors
  if (isOpeningError || !openingProgram) {
    return <p className="text-center text-red-500">Opening program not found!</p>;
  }
  if (isMasterError || !masterProgram) {
    return <p className="text-center text-red-500">Master program not found!</p>;
  }

  // Generations
  const generations = [
    {
      uuid: openingProgram.uuid,
      title: `Generation ${openingProgram.generation}`,
    },
  ];

  // Tabs
  const tabComponents: Record<string, React.FC> = {
    Overview: () => <ProgramOverviewTap program={masterProgram} />, // ✅ use master program
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
        <ProgramHeader
          uuid={masterProgram.uuid}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div>
          <ActiveTabComponent />
        </div>
      </div>

      <ProgramSidebar uuid={masterProgram.uuid} />
    </div>
  );
};

export default ProgramDetailPage;
