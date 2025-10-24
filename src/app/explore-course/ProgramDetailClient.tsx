"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetMasterProgramBySlugQuery } from "@/components/program/masterProgramApi";
import { useGetOpeningProgramByTitleQuery } from "@/components/program/openingProgramApi";
import ProgramHeader from "@/components/program/ProgramHeader";
import ProgramSidebar from "@/components/program/explore-course/ProgramSidebar";
import ProgramOverviewTap from "@/components/program/detail-program/ProgramOverviewTap";
import ProgramCurriculumTap from "@/components/program/detail-program/curriculum/ProgramCurriculum";
import NotFoundProgram from "@/components/program/components/NotFound";
import ProgramOverviewCardSkeleton from "@/components/program/skeleton/ProgramOverviewTapSkeleton";
import { MasterProgramType } from "@/types/master-program";

interface ProgramDetailClientProps {
  initialProgram?: MasterProgramType;
}

const ProgramDetailClient: React.FC<ProgramDetailClientProps> = ({ initialProgram }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  
  // Fetch master program
  const { data: programData, isLoading, isError } = useGetMasterProgramBySlugQuery(
    { slug },
    { skip: !slug }
  );
  
  // Use SSR data if available
  const masterProgram = programData || initialProgram;
  
  // Fetch opening program
  const { data: openingData } = useGetOpeningProgramByTitleQuery(
    { title: masterProgram?.title ?? "" },
    { skip: !masterProgram?.title }
  );
  
  if (isLoading) return <ProgramOverviewCardSkeleton />;
  if (isError || !masterProgram) return <NotFoundProgram title="Program Not Found" />;
  
  return (
    <div className="min-h-screen bg-white py-10">
      {/* Updated Header - passing both objects */}
      <ProgramHeader
        masterProgram={masterProgram}
        openingProgram={openingData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="mx-auto max-w-7xl mt-10 flex flex-col lg:flex-row gap-6 px-4 lg:px-0">
        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <ProgramSidebar program={masterProgram} openingData={openingData} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "Overview" && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Program Overview</h2>
              <ProgramOverviewTap program={masterProgram} />
            </div>
          )}
          
          {activeTab === "Curriculum" && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Curriculum</h2>
              <ProgramCurriculumTap
                openingUuid={openingData?.uuid ?? ""}
                masterUuid={masterProgram.uuid}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailClient;