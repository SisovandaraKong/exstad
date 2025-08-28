"use client";

import { use, useState } from "react";
import type { programType } from "@/types/programs";
import { programData } from "@/data/programData";
import ProgramHeader from "@/components/programCard/ProgramHeader";
import ProgramSidebar from "@/components/programCard/ProgramSidebar";
import ProgramOverviewTap from "@/components/programCard/ProgramOverviewTap";
// import ProgramRoadmapTap from "@/components/programCard/ProgramRoadmapTap"; // Example
import ProgramCurriculumTap from "@/components/programCard/ProgramCurriculum";
import ProgramActivityTap from "@/components/programCard/ProgramActivity";
type Props = {
  params: Promise<{ id: string }>; // params is now a Promise
};

const tabComponents: { [key: string]: React.FC<{ program: programType }> } = {
  Overview: ProgramOverviewTap,
  // Curriculum:ProgramCurriculumTap,
  // Roadmap: ProgramRoadmapTap,
  // Timeline: ProgramTimelineTap,
  Curriculum:ProgramCurriculumTap,
  Activity:ProgramActivityTap,
  // Activity: ProgramActivityTap,
  // Enrollment: ProgramEnrollmentTap,
};

const ProgramDetailPage: React.FC<Props> = ({ params }) => {
  const resolvedParams = use(params); // ✅ unwrap the promise
  const id = parseInt(resolvedParams.id);

  const program: programType | undefined = programData.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!program) return <p>Program not found!</p>;

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="flex mx-auto gap-6  my-[20px] max-w-7xl  ">
      {/* Left section */}
      <div className="flex-1 ">
        <ProgramHeader program={program} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="">
          {ActiveTabComponent ? <ActiveTabComponent program={program} /> : null}
        </div>
      </div>

      {/* Right section */}
      <ProgramSidebar program={program} />
    </div>
  );
};

export default ProgramDetailPage;

