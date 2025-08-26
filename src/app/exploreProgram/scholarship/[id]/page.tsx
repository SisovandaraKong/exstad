import React from "react";
import { programData } from "@/data/programData";
import ProgramOverviewCard from "@/components/programCard/ProgramOverviewCard";
import ProgramOverviewSidebar from "@/components/programCard/ProgramOverviewSidebar";
import { programType } from "@/types/programs";
import ProgramTimeLine from "@/components/programCard/ProgramTimeLine";

interface Props {
  params: { id: string };
}

const ProgramDetailPage: React.FC<Props> = ({ params }) => {
  const id = parseInt(params.id);
  const program: programType | undefined = programData.find((p) => p.id === id);

  if (!program) return <p>Program not found!</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row justify-between gap-6">
        {/* Left section */}
        <ProgramOverviewCard program={program} />

        {/* Right section */}
        <ProgramOverviewSidebar program={program} />
      </div>
      <div>
        <ProgramTimeLine />
      </div>
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
