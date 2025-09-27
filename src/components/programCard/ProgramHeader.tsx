"use client";

import React from "react";
import Image from "next/image";
import { useGetMasterProgramByUuidQuery } from "@/components/programCard/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/programCard/openingProgramApi";
import type { MasterProgramType } from "@/types/master-program";
import type { openingProgramType } from "@/types/opening-program";
import ProgramHeaderSkeleton from "@/components/programCard/skeleton/ProgramHeaderSkeleton";

type Props = {
  uuid: string; // UUID of the program
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

// Combined type
interface ProgramWithOpening extends MasterProgramType {
  openingProgram?: openingProgramType;
}

const ProgramHeader: React.FC<Props> = ({ uuid, activeTab, setActiveTab }) => {
  // Fetch master program
  const { data: masterProgram, isLoading: loadingMaster, isError: errorMaster } =
    useGetMasterProgramByUuidQuery({ uuid });

  // Fetch all opening programs
  const { data: openingPrograms = [], isLoading: loadingOpening, isError: errorOpening } =
    useGetAllOpeningProgramsQuery();

  const isLoading = loadingMaster || loadingOpening;
  const isError = errorMaster || errorOpening;

  if (isLoading) return <ProgramHeaderSkeleton />;
  if (isError || !masterProgram) return <p className="text-red-500">Failed to load program header.</p>;

  // Attach matching opening program
  const openingProgram = openingPrograms.find(
    (op) => op.programName === masterProgram.title
  );

  // Use combined type pattern
  const program: ProgramWithOpening = { ...masterProgram, openingProgram };

  // Default tabs
  const defaultTabs = ["Overview", "Curriculum", "Timeline", "Activity", "Roadmap", "Enrollment"];

  // Remove 'Activity' and 'Timeline' for short courses
  const tabs =
    program.programType === "SHORT_COURSE"
      ? defaultTabs.filter((tab) => tab !== "Activity" && tab !== "Timeline")
      : defaultTabs;

  return (
    <div className="w-full grid p-[24px] gap-[24px] rounded-t-[24px] bg-background">
      <Image
        unoptimized
        width={500}
        height={316}
        src={program.openingProgram?.thumbnail || "/placeholder.png"}
        alt={program.title}
        className="rounded-[10px] mt-[20px] w-full h-auto object-cover max-h-[316px]"
      />

      {/* Tab Navbar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 border-b border-gray-300 py-4 md:py-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 items-center justify-center flex sm:px-4 sm:py-2 md:px-6 md:py-2 text-xs sm:text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary hover:bg-primary-hover rounded-full text-white"
                : "text-primary bg-white border border-primary rounded-full hover:bg-primary hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramHeader;
