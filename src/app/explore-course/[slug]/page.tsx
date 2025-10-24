"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";

import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import ProgramActivityTap, { ProgramGeneration } from "@/components/program/detail-program/activity/ProgramActivity";
import ProgramEnrollment from "@/components/program/ProgramEnrollment";

import ProgramHeaderSkeleton from "@/components/program/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/program/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/program/skeleton/ProgramActivitySkeleton";

import { useGetMasterProgramByTitleQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi";

const ProgramDetailPage: React.FC = () => {
  const params = useParams();
  const openingProgramSlug = params?.slug as string;
  const [activeTab, setActiveTab] = useState("Overview");

  // Fetch all opening programs
  const { data: allPrograms = [], isLoading: isAllLoading, isError: isAllError } = useGetAllOpeningProgramsQuery();

  // Find current program by slug
  const openingProgram = allPrograms.find(op => op.slug === openingProgramSlug);

  // Fetch master program data
  const { data: masterProgram, isLoading: isMasterLoading, isError: isMasterError } = useGetMasterProgramByTitleQuery(
    { title: openingProgram?.programName ?? "" },
    { skip: !openingProgram?.programName }
  );

  // Loading skeletons
  if (isAllLoading || isMasterLoading) {
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

  // Error handling
  if (isAllError || !allPrograms) return <p className="text-center text-red-500">Failed to load programs!</p>;
  if (!openingProgram) return <p className="text-center text-red-500">Program not found!</p>;
  if (isMasterError || !masterProgram) return <p className="text-center text-red-500">Master program not found!</p>;

  // Dynamic metadata values
  const metaTitle = masterProgram?.title || "Program Detail";
  const metaDescription = masterProgram?.description || "Explore program details";
  const metaImage = openingProgram?.posterUrl
    ? openingProgram.posterUrl.startsWith("http")
      ? openingProgram.posterUrl
      : `${process.env.NEXT_PUBLIC_BASE_URL}${openingProgram.posterUrl}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/default-poster.png`;

  // Build all generations for this program
  const generations: ProgramGeneration[] = allPrograms
    .filter(op => op.programName === openingProgram.programName)
    .sort((a, b) => (a.generation ?? 1) - (b.generation ?? 1))
    .map(op => ({
      uuid: op.uuid,
      title: `Generation ${op.generation ?? 1}`,
    }));

  const tabComponents: Record<string, React.FC> = {
    Overview: () => <ProgramOverviewTap program={masterProgram} />,
    Curriculum: () => <ProgramCurriculumTap openingUuid={openingProgram.uuid} masterUuid={masterProgram.uuid} />,
    Activity: () =>
      generations.length ? <ProgramActivityTap generations={generations} /> : <p className="text-gray-500 text-center">No opening programs available.</p>,
    Enrollment: () => <ProgramEnrollment />,
  };

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <>
      {/* Dynamic Metadata */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Open Graph / Social */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/program/${openingProgramSlug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>

      {/* Page Content */}
      <div className="flex lg:flex-col min-h-screen md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
        <div className="flex-1">
          <ProgramHeader uuid={masterProgram.uuid} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div>
            <ActiveTabComponent />
          </div>
        </div>
        <ProgramSidebar uuid={masterProgram.uuid} />
      </div>
    </>
  );
};

export default ProgramDetailPage;
