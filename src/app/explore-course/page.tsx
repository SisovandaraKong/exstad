"use client";

import React, { useState } from "react";
import ProgramActiveSidebar from "@/components/programCard/ProgramActivSidebar";
import ProgramSearch from "@/components/programCard/ProgramSearch";
import ProgramActiveSidebarSkeleton from "@/components/programCard/skeleton/ProgramActiveSidebarSkeleton";
import ProgramCardList from "@/components/programCard/ProgramCardList"; // <-- new combined component
import { useGetAllMasterProgramsQuery } from "@/components/programCard/masterProgramApi";
import { programData } from "@/data/programData";

export default function ExploreProgramPage() {
  const [programFilter, setProgramFilter] = useState<string>("All");
  const [subFilter, setSubFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: programs = [], isLoading, isError } = useGetAllMasterProgramsQuery();

  if (isError) return <p>Failed to load programs.</p>;

  return (
    <div className="flex flex-col lg:flex-row md:flex-col bg-whitesmoke min-h-screen mx-auto max-w-7xl gap-6 w-full p-5 md:p-8 lg:py-6 lg:px-0">
      
      {/* Sidebar */}
      <div className="shrink-0 w-full lg:w-72 md:w-full">
        {isLoading ? (
          <ProgramActiveSidebarSkeleton />
        ) : (
          <ProgramActiveSidebar
            programData={programData}
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
        {/* Search */}
        <div className="mb-6">
          <ProgramSearch
            total={programs.length}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>

        {/* Combined Program Card List */}
        <div className="mb-6">
          <ProgramCardList />
        </div>
      </div>
    </div>
  );
}
