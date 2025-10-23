"use client";

import React from "react";
import ScholarshipCard from "./ScholarshipCard";
import ShortCourseCardActive from "./ShortCourseCardActive";
import ShortCourseCardActiveSkeleton from "../skeleton/ShortCourseCarcActiveSkeleton";
import { MasterProgramType } from "@/types/master-program";
import { openingProgramType } from "@/types/opening-program";

type Props = {
  programs: MasterProgramType[];
  openingPrograms?: openingProgramType[];
  programFilter?: string;
  subFilter?: string[];
  levelFilter?: string;
  searchValue?: string;
  isLoading?: boolean;
};

const ProgramCardList: React.FC<Props> = ({
  programs,
  openingPrograms = [],
  programFilter = "All",
  subFilter = [],
  levelFilter = "All",
  searchValue = "",
  isLoading = false,
}) => {
  // Helper to find opening program by master program title
    const getOpeningProgram = (programTitle: string) =>
    openingPrograms.find(
      (o) => o.programName === programTitle && o.status === "OPEN"
    );

  // Apply filters first
  let filteredPrograms = programs;

  if (programFilter && programFilter !== "All") {
    filteredPrograms = filteredPrograms.filter(
      (p) =>
        (programFilter === "Scholarship Course" && p.programType === "SCHOLARSHIP") ||
        (programFilter === "Short Course" && p.programType === "SHORT_COURSE")
    );
  }

  if (subFilter.length > 0) {
    filteredPrograms = filteredPrograms.filter((p) => subFilter.includes(p.title));
  }

  if (levelFilter && levelFilter !== "All") {
    filteredPrograms = filteredPrograms.filter(
      (p) => p.programLevel?.toLowerCase() === levelFilter.toLowerCase()
    );
  }

  if (searchValue.trim()) {
    filteredPrograms = filteredPrograms.filter((p) =>
      p.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  
  filteredPrograms = filteredPrograms.filter((p) => getOpeningProgram(p.title));

  const scholarshipPrograms = filteredPrograms.filter((p) => p.programType === "SCHOLARSHIP");
  const shortCoursePrograms = filteredPrograms.filter((p) => p.programType === "SHORT_COURSE");

  return (
    <div className="flex flex-col gap-6">
      {/* Scholarship Programs */}
      <div className="grid gap-6">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <ShortCourseCardActiveSkeleton key={i} />
            ))
          : scholarshipPrograms.map((program) => (
              <ScholarshipCard
                key={program.uuid}
                {...program}
                openingProgram={getOpeningProgram(program.title)}
              />
            ))}
      </div>

      {/* Short Courses */}
      <div className="grid gap-6">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <ShortCourseCardActiveSkeleton key={i} />
            ))
          : shortCoursePrograms.map((program) => (
              <ShortCourseCardActive
                key={program.uuid}
                {...program}
                openingProgram={getOpeningProgram(program.title)}
              />
            ))}
      </div>
    </div>
  );
};

export default ProgramCardList;
