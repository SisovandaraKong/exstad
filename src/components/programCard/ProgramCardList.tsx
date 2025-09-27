"use client";

import React from "react";
import { useGetAllMasterProgramsQuery } from "./masterProgramApi";
import {
  useGetAllOpeningProgramsQuery,
} from "./openingProgramApi";
import ScholarshipCard from "./ScholarshipCard";
import ShortCourseCardActive from "./ShortCourseCardActive";
import ShortCourseCardActiveSkeleton from "./skeleton/ShortCourseCarcActiveSkeleton";

const ProgramCardList = () => {
  // Fetch master programs
  const { data: programs = [], isLoading: loadingPrograms, isError: errorPrograms } = useGetAllMasterProgramsQuery();

  // Fetch opening programs
  const {data: openingPrograms = [],isLoading: loadingOpenings,isError: errorOpenings,} = useGetAllOpeningProgramsQuery();

  if (errorPrograms || errorOpenings)
    return <p>Failed to load programs.</p>;

  const isLoading = loadingPrograms || loadingOpenings;

  // Helper to find opening program by master program uuid
const getOpeningProgram = (programTitle: string) =>
  openingPrograms.find((o) => o.programName === programTitle);


  // Separate programs
  const scholarshipPrograms = programs.filter((p) => p.programType === "SCHOLARSHIP");
  const shortCoursePrograms = programs.filter((p) => p.programType === "SHORT_COURSE");

  return (
    <div className="flex flex-col gap-8">
      {/* Scholarship Programs */}
      <div>
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
      <div>
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
