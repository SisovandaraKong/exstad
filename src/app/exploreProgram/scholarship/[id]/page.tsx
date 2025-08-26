"use client";

import { useState } from "react";
import type { programType } from "@/types/programs";
import { programData } from "@/data/programData"; // or your mock data
import ProgramHeader from "@/components/programCard/ProgramHeader";
import ProgramSidebar from "@/components/programCard/ProgramSidebar";
import ProgramOverviewTap from "@/components/programCard/ProgramOverviewTap";

// import ProgramHeader from "@/components/ProgramHeader";
// import ProgramOverviewSidebar from "@/components/ProgramOverviewSidebar";
// import OverviewTab from "@/components/tabs/OverviewTab";
// import RoadmapTab from "@/components/tabs/RoadmapTab";
// import TimelineTab from "@/components/tabs/TimelineTab";
// import CurriculumTab from "@/components/tabs/CurriculumTab";
// import ActivityTab from "@/components/tabs/ActivityTab";
// import EnrollmentTab from "@/components/tabs/EnrollmentTab";

type Props = {
  params: { id: string };
};

const tabs = ["Overview", "Roadmap", "Timeline", "Curriculum", "Activity", "Enrollment"];

const ProgramDetailPage: React.FC<Props> = ({ params }) => {
  const id = parseInt(params.id);
  const program: programType | undefined = programData.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!program) return <p>Program not found!</p>;

  return (
    <div className="flex mx-auto gap-6 max-w-7xl">
      {/* Left section */}
      <div className="flex-1">
        {/* Header + Navbar Tabs */}
        <ProgramHeader program={program} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Overview" && <ProgramOverviewTap program={program} />}
          {/* {activeTab === "Roadmap" && <RoadmapTab program={program} />}
          {activeTab === "Timeline" && <TimelineTab program={program} />}
          {activeTab === "Curriculum" && <CurriculumTab program={program} />}
          {activeTab === "Activity" && <ActivityTab program={program} />}
          {activeTab === "Enrollment" && <EnrollmentTab program={program} />} */}
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