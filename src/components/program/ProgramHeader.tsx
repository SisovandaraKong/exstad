"use client";

import React from "react";
import Image from "next/image";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";
import { useTranslations } from "next-intl";

type Props = {
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
  const title = masterProgram?.title ?? openingProgram?.title ?? "";
  const thumbnail = openingProgram?.thumbnail  ?? masterProgram?.logoUrl ?? "";
  const programType = masterProgram?.programType ?? "";
  const t = useTranslations();

  // Determine tabs based on opening program existence
  const getTabs = () => {
    const baseTabs = ["overview", "curriculum"];
    
    // If there's an opening program, show all relevant tabs
    if (openingProgram) {
      const openingTabs = [...baseTabs, "timeline", "activity", "roadmap", "enrollment"];
      
      // For SHORT_COURSE, remove activity and timeline
      if (programType === "SHORT_COURSE") {
        return openingTabs.filter((tab) => tab !== "activity" && tab !== "timeline");
      }
      
      return openingTabs;
    }
    
    // If NO opening program (master program only), exclude timeline & enrollment
    const masterTabs = [...baseTabs, "activity", "roadmap"];
    
    // For SHORT_COURSE, remove activity
    if (programType === "SHORT_COURSE") {
      return masterTabs.filter((tab) => tab !== "activity");
    }
    
    return masterTabs;
  };

  const tabs = getTabs();

  return (
    <div className="w-full grid p-[24px] gap-[24px] rounded-t-[24px] bg-background">
      {thumbnail && (
        <Image
          unoptimized
          width={500}
          height={316}
          src={thumbnail}
          alt={title}
          className="rounded-[10px] mt-[20px] w-full h-auto object-cover max-h-[316px]"
        />
      )}

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
            {t(tab)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramHeader;