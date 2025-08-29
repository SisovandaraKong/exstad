'use client';

import { use } from "react";
import React, { useState } from "react";
import type { programType } from "@/types/programs";
import { programData } from "@/data/programData";
import ProgramHeader from "@/components/programCard/ProgramHeader";
import ProgramSidebar from "@/components/programCard/ProgramSidebar";
import ProgramOverviewTap from "@/components/programCard/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/programCard/ProgramCurriculum";
import ProgramActivityTap from "@/components/programCard/ProgramActivity";
import TimeLine from "@/components/programCard/TimeLine";

type Props = {
  params: Promise<{ id: string }>; // params is now a promise
};

// Map tab names to components
const tabComponents: { [key: string]: React.FC<{ program: programType }> } = {
  Overview: ProgramOverviewTap,
  Curriculum: ProgramCurriculumTap,
  Activity: ProgramActivityTap,
  Timeline: TimeLine
};

const ProgramDetailPage: React.FC<Props> = ({ params }) => {
  // ✅ unwrap the promise using React.use()
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);

  // Find the program
  const program: programType | undefined = programData.find((p) => p.id === id);

  // Client-side state
  const [activeTab, setActiveTab] = useState("Overview");

  if (!program) return <p>Program not found!</p>;

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex mx-auto  gap-6 my-[20px] max-w-7xl">
      {/* Left section */}
      <div className="flex-1">
        <ProgramHeader program={program} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div>
          {ActiveTabComponent ? <ActiveTabComponent program={program} /> : null}
        </div>
      </div>

      {/* Right section */}
      <ProgramSidebar program={program} />
    </div>
  );
};

export default ProgramDetailPage;
