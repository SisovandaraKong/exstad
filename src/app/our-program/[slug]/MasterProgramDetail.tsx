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

import { useGetMasterProgramBySlugQuery } from "@/components/program/masterProgramApi";
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

  // Fetch master program
  const {
    data: masterProgram,
    isLoading: isMasterLoading,
    isError: isMasterError,
  } = useGetMasterProgramBySlugQuery(
    { slug: masterProgramSlug ?? initialProgram?.title ?? "" },
    { skip: !masterProgramSlug && !initialProgram?.title }
  );

  // Fetch all opening programs
  const { data: allPrograms = [], isLoading: isAllProgramsLoading } =
    useGetAllOpeningProgramsQuery();

  // 🕒 Loading
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

  // ❌ Error handling
  if (isMasterError || !masterProgram) {
    return <NotFoundProgram title="Master program not found" />;
  }

  // 🧩 Related opening programs
  const relatedOpenings = allPrograms.filter(
    (op) => op.programName === masterProgram.title
  );

  // 🕓 Get the latest opening program
  const latestOpeningProgram = relatedOpenings
    .slice()
    .sort((a, b) => {
      if (a.audit.createdAt && b.audit.createdAt) {
        return new Date(b.audit.createdAt).getTime() - new Date(a.audit.createdAt).getTime();
      }
      return (b.generation ?? 0) - (a.generation ?? 0);
    })[0];

  // 🏁 Check if latest program is closed
  const isClosed =
    latestOpeningProgram && latestOpeningProgram.status?.toLowerCase() === "closed";

  // 📊 Generations for activity tab
  const generations: ProgramGeneration[] = relatedOpenings
    .sort((a, b) => (a.generation ?? 1) - (b.generation ?? 1))
    .map((op) => ({
      uuid: op.uuid,
      title: `Generation ${op.generation ?? 1}`,
    }));

  // 🧭 Tabs setup
  const tabComponents: Record<string, React.FC> = {
    overview: () => <ProgramOverviewTap program={masterProgram} />,
    curriculum: () => (
      <ProgramCurriculumTap
        openingUuid={latestOpeningProgram?.uuid}
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
          openingProgram={latestOpeningProgram}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* If the latest opening program is closed, show notice */}
        {isClosed && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-center">
            🚫 This opening program has already closed.
          </div>
        )}

        <div>
          <ActiveTabComponent />
        </div>
      </div>

      {/* Sidebar still shows data (can show closed notice inside if needed) */}
      <ProgramSidebar
        program={masterProgram}
        openingData={latestOpeningProgram}
        isClosed={isClosed} // optional if your sidebar supports this prop
      />
    </div>
  );
};

export default MasterProgramDetailPage;
