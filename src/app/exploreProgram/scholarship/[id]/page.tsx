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
    <div className="flex mx-auto gap-6 max-w-7xl">
      {/* Left section */}
      <div className="flex-1 ">
        <ProgramHeader program={program} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {ActiveTabComponent ? <ActiveTabComponent program={program} /> : null}
        </div>
      </div>

      {/* Right section */}
      <ProgramSidebar program={program} />
    </div>
  );
};

export default ProgramDetailPage;


// import React from 'react'
// import { openingProgramData } from '@/data/openingProgramData';
// import { programData } from '@/data/programData';
// import ProgramOverviewCard from '@/components/programCard/ProgramOverviewCard';
// import ProgramOverviewSidebar from '@/components/programCard/ProgramOverviewSidebar';
// export default function Page() {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="grid grid-cols-1 mx-auto gap-[20px] p-6">
//         {programData.map((program) => (
//           <div
//             key={program.id}
//             className="flex flex-row justify-between gap-6" // 👈 side by side
//           >
//             {/* Left section */}
//             <ProgramOverviewCard program={program} />

//             {/* Right section */}
//             <ProgramOverviewSidebar program={program} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }