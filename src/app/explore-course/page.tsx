"use client";

import React, { useState } from "react";
import ProgramActiveSidebar from "@/components/program/explore-course/ProgramActivSidebar";
import ProgramSearch from "@/components/program/ProgramSearch";
import ProgramActiveSidebarSkeleton from "@/components/program/skeleton/ProgramActiveSidebarSkeleton";
import ProgramCardList from "@/components/program/explore-course/ProgramCardList";
import { useGetAllMasterProgramsQuery } from "@/components/program/masterProgramApi";
import { useGetAllOpeningProgramsQuery } from "@/components/program/openingProgramApi"; 

export default function ExploreProgramPage() {
  const [programFilter, setProgramFilter] = useState("All");
  const [subFilter, setSubFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  // ✅ Fetch both master programs and opening programs
  const { data: allPrograms = [], isLoading, isError } = useGetAllMasterProgramsQuery(
      undefined, 
  { refetchOnMountOrArgChange: true }
  );

  const programs = allPrograms.filter(p => p.visibility === "PUBLIC");

  const { data: allOpeningProgram = [] } = useGetAllOpeningProgramsQuery(
         undefined, 
  { refetchOnMountOrArgChange: true }
  );
  const openingPrograms = allOpeningProgram.filter(p=> p.status === "OPEN")

  const visiblePrograms = programs.filter((p) =>
  openingPrograms.some((o) => o.programName === p.title)
);

  if (isError) return <p>Failed to load programs.</p>;

  return (
    <div className="flex flex-col  lg:flex-row md:flex-col  bg-whitesmoke min-h-screen mx-auto max-w-7xl  gap-6 w-full p-5 md:p-8 lg:py-8 lg:px-0 ">
      {/* Sidebar */}
      <div className="shrink-0 w-full lg:w-72">
        {isLoading ? (
          <ProgramActiveSidebarSkeleton />
        ) : (
          <ProgramActiveSidebar
            programData={programs}
            programFilter={programFilter}
            setProgramFilter={setProgramFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
            subFilter={subFilter}
            setSubFilter={setSubFilter}
          />
        )}
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="mb-6 ">
          <ProgramSearch
            total={visiblePrograms.length}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>

        <div >
          <ProgramCardList
            programs={visiblePrograms}
            openingPrograms={openingPrograms} 
            programFilter={programFilter}
            subFilter={subFilter}
            levelFilter={levelFilter}
            searchValue={searchValue}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}