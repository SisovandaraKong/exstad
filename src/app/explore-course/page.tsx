'use client';

import React, { useState,useEffect } from "react";
import { programData } from "@/data/programData";
import ScholarshipCard from "@/components/programCard/ScholarshipCard";
import ShortCourseCardActive from "@/components/programCard/ShortCourseCardActive";
import { programType } from "@/types/programs";
import ProgramActiveSidebar from "@/components/programCard/ProgramActivSidebar";
import ProgramSearch from "@/components/programCard/ProgramSearch";
import ShortCourseCardActiveSkeleton from "@/components/programCard/skeleton/ShortCourseCarcActiveSkeleton";
import ProgramActiveSidebarSkeleton from "@/components/programCard/skeleton/ProgramActiveSidebarSkeleton";

export default function ExploreProgramPage() {
  const [programFilter, setProgramFilter] = useState<string>("All");
  const [subFilter, setSubFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading for 1.5 seconds
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPrograms = programData.filter((p: programType) => {
    const programMatch = programFilter === "All" || p.program_type === programFilter;
    const levelMatch = levelFilter === "All" || p.level === levelFilter;

    let subMatch = true;
    if (subFilter.length > 0 && !subFilter.includes("All")) {
      subMatch = subFilter.includes(p.title || "");
    }

    const searchMatch =
      p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchValue.toLowerCase());

    return programMatch && levelMatch && subMatch && searchMatch;
  });

  return (
   <div className="flex flex-col  lg:flex-row md:flex-col  bg-whitesmoke min-h-screen mx-auto max-w-7xl  gap-6 w-full p-5 md:p-8 lg:py-6 lg:px-0 ">
      <div className="shrink-0 w-full lg:w-72 md:w-full ">
        {loading ? (
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

      {/* Program Cards */}
      <div className="flex-1">
        {/* Search */}
        <div className="mb-6">
          <ProgramSearch
            total={filteredPrograms.length}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-y-6">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="block">
                  {/* alternate skeletons */}
                  {i % 2 === 0 ? <ShortCourseCardActiveSkeleton /> : <ShortCourseCardActiveSkeleton/>}
                </div>
              ))
            : filteredPrograms.map((program: programType) => (
                <div key={program.id} className="block">
                  {program.program_type === "Scholarship Course" ? (
                    <ScholarshipCard {...program} />
                  ) : (
                    <ShortCourseCardActive {...program} />
                  )}
                </div>
              ))}
        </div>
      </div>

    </div>

  );
}
