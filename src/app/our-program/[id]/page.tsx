'use client';

import React, { useState, use, useEffect } from "react";
import { programData } from "@/data/programData";
import type { programType } from "@/types/programs";

import ProgramHeader from "@/components/programCard/ProgramHeader";
import ProgramSidebar from "@/components/programCard/ProgramSidebar";
import ProgramOverviewTap from "@/components/programCard/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/programCard/ProgramCurriculum";
import ProgramActivityTap from "@/components/programCard/ProgramActivity";

import ProgramHeaderSkeleton from "@/components/programCard/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewSidebarSkeleton from "@/components/programCard/skeleton/ProgramSidebarSkeleton";
import ProgramOverviewCardSkeleton from "@/components/programCard/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/programCard/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/programCard/skeleton/ProgramActivitySkeleton";
import TimeLine from "@/components/programCard/TimeLine";

type Props = {
  params: Promise<{ id: string }>;
};

const tabComponents: { [key: string]: React.FC<{ program: programType }> } = {
  Overview: ProgramOverviewTap,
  Curriculum: ProgramCurriculumTap,
  Activity: ProgramActivityTap,
  Timeline: TimeLine,
};

export default function ProgramDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);

  const program: programType | undefined = programData.find(p => p.id === id);

  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!program) return <p>Program not found!</p>;

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex lg:flex-col md:flex-col flex-col xl:flex-row p-5 md:p-8 lg:py-6 lg:px-0 mx-auto gap-6 my-[20px] max-w-7xl">
      {/* Left Section */}
      <div className="flex-1">
        {/* Header */}
        {loading ? ( <ProgramHeaderSkeleton />) : (  <ProgramHeader program={program} activeTab={activeTab} setActiveTab={setActiveTab} /> )}
        {/* Active Tab Content */}
        <div>  {loading ? (
            activeTab === "Overview" 
            ? (  <ProgramOverviewCardSkeleton /> ) 
            : activeTab === "Curriculum" ? 
            ( <ProgramCurriculumSkeleton /> )
            : activeTab === "Activity" ?
            ( <ProgramActivitySkeleton />) 
            : null
          ) : (
            <ActiveTabComponent program={program} />
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      {loading ? (
        <ProgramOverviewSidebarSkeleton />
      ) : (
        <ProgramSidebar program={program} />
      )}
    </div>
  );
}
