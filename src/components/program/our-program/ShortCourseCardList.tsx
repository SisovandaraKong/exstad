"use client";

import React from "react";
import { useGetAllMasterProgramsQuery } from "../masterProgramApi";
import ShortCourseCard from "./ShortCourseCard";
import ShortCourseCardSkeleton from "../skeleton/ShortCourseCardSkeleton";
import { useGetAllOpeningProgramsQuery } from "../openingProgramApi";
const ShortCourseCardList = () => {
  const {
    data: programs = [],
    isLoading: loadingPrograms,
    isError: errorPrograms,
  } = useGetAllMasterProgramsQuery();

  const {
    data: openingPrograms = [],
    isLoading: loadingOpenings,
    isError: errorOpenings,
  } = useGetAllOpeningProgramsQuery();

  if (errorPrograms || errorOpenings) return <p>Failed to load programs.</p>;

  const isLoading = loadingPrograms || loadingOpenings;

  // Helper to find the opening program corresponding to a master program
  const getOpeningProgram = (programTitle: string) =>
    openingPrograms.find((o) => o.programName === programTitle);

  // Filter only SHORT_COURSE programs
  const shortCoursePrograms = programs.filter(
    (p) => p.programType === "SHORT_COURSE"
  );

  return (
    <div className="flex flex-col gap-6">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <ShortCourseCardSkeleton key={i} />
          ))
        : shortCoursePrograms.map((program) => (
            <ShortCourseCard
              key={program.uuid}
              {...program}
              openingProgram={getOpeningProgram(program.title)}
            />
          ))}
    </div>
  );
};

export default ShortCourseCardList;
