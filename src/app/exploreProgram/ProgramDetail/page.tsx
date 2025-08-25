import React from 'react'
import { openingProgramData } from '@/data/openingProgramData';
import ProgramOverviewCard from '@/components/programCard/ProgramOverviewCard';
export default function page() {
  return (
    <div className="flex items-center justify-center">
    <div className="grid grid-cols-1 mx-auto gap-[20px] p-6">
      {openingProgramData.map((program) => (
        <ProgramOverviewCard key={program.id} program={program} />
      ))}
    </div>
    </div>
  );
}
