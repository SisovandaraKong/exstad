"use client";

import React from "react";
import Image from "next/image";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";

type Props = {
  // Accept either master program or opening program data
  masterProgram?: MasterProgramType;
  openingProgram?: openingProgramType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ProgramHeader: React.FC<Props> = ({
  masterProgram,
  openingProgram,
  activeTab,
  setActiveTab,
}) => {
  // Derive values from whichever data is available
  const title = masterProgram?.title ?? openingProgram?.title ?? "";
  const subtitle = masterProgram?.subtitle ?? openingProgram?.programName ?? "";
  const posterUrl = openingProgram?.posterUrl ?? "";
  const logoUrl = masterProgram?.logoUrl ?? "";
  const programType = masterProgram?.programType ?? "";
  const programLevel = masterProgram?.programLevel ?? "";

  const defaultTabs = ["Overview", "Curriculum", "Timeline", "Activity", "Roadmap", "Enrollment"];
  const tabs =
    programType === "SHORT_COURSE"
      ? defaultTabs.filter((tab) => tab !== "Activity" && tab !== "Timeline")
      : defaultTabs;

  return (
    <div className="w-full grid p-[24px] gap-[24px] rounded-t-[24px] bg-background">
      {posterUrl && (
        <Image
          unoptimized
          width={500}
          height={316}
          src={posterUrl}
          alt={title}
          className="rounded-[10px] mt-[20px] w-full h-auto object-cover max-h-[316px]"
        />
      )}

      <div className="flex items-center gap-4">
        {logoUrl && (
          <Image
            unoptimized
            width={80}
            height={80}
            src={logoUrl}
            alt={`${title} logo`}
            className="rounded-lg"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
          {programLevel && programType && (
            <p className="text-sm text-gray-500 mt-1">
              {programLevel} • {programType}
            </p>
          )}
        </div>
      </div>

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