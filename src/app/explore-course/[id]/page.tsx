'use client';

import { use } from "react";
import React, { useState ,useEffect} from "react";
import type { programType } from "@/types/programs";
import { programData } from "@/data/programData";
import ProgramHeader from "@/components/programCard/ProgramHeader";
import ProgramSidebar from "@/components/programCard/ProgramSidebar";
import ProgramOverviewTap from "@/components/programCard/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/programCard/ProgramCurriculum";
import ProgramActivityTap from "@/components/programCard/ProgramActivity";
import TimeLine from "@/components/programCard/TimeLine";
import ProgramHeaderSkeleton from "@/components/programCard/skeleton/ProgramHeaderSkeleton";
import ProgramOverviewSidebarSkeleton from "@/components/programCard/skeleton/ProgramSidebarSkeleton";
import ProgramOverviewCardSkeleton from "@/components/programCard/skeleton/ProgramOverviewTapSkeleton";
import ProgramCurriculumSkeleton from "@/components/programCard/skeleton/ProgramCurriculumSkeleton";
import ProgramActivitySkeleton from "@/components/programCard/skeleton/ProgramActivitySkeleton";
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
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);
  //  unwrap the promise using React.use()
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);

  // Find the program
  const program: programType | undefined = programData.find((p) => p.id === id);

  // Client-side state
  const [activeTab, setActiveTab] = useState("Overview");

  if (!program) return <p>Program not found!</p>;

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    
    <div className="flex lg:flex-col   md:flex-col flex-col xl:flex-row  p-5 md:p-8 lg:py-6 lg:px-0  mx-auto  gap-6 my-[20px] max-w-7xl">
      {/* Left section */}
      <div className="flex-1">
        {loading ? (
  <ProgramHeaderSkeleton />
) : (
  <ProgramHeader 
    program={program} 
    activeTab={activeTab} 
    setActiveTab={setActiveTab} 
  />
)}

       <div> {loading ? (activeTab === "Overview" ? (<ProgramOverviewCardSkeleton />) 
                      : activeTab === "Curriculum" ? ( <ProgramCurriculumSkeleton />)  
                      : activeTab == "Activity" ? (<ProgramActivitySkeleton/>) : null
                    ) : (<ActiveTabComponent program={program} />  )}
        </div>
      </div>

      {/* Right section */}
      {loading ? (
  <ProgramOverviewSidebarSkeleton />
) : (
  <ProgramSidebar program={program} />
)}  

    </div>
  );
};

export default ProgramDetailPage;
