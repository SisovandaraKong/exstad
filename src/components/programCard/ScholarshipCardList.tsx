"use client";

import React from "react";
import { useGetAllMasterProgramsQuery } from "./masterProgramApi";
import ScholarshipCard from "./ScholarshipCard";
import ShortCourseCardActiveSkeleton from "./skeleton/ShortCourseCarcActiveSkeleton";

const ScholarshipCardList = () => {
  const { data: programs = [], isLoading, isError } = useGetAllMasterProgramsQuery();

  if (isError) return <p>Failed to load programs.</p>;

  // Filter only scholarship programs
  const scholarshipPrograms = programs.filter(p => p.programType === "SCHOLARSHIP");

  return (
    <div className="">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <ShortCourseCardActiveSkeleton />
            </div>
          ))
        : scholarshipPrograms.map(program => (
            <ScholarshipCard key={program.uuid} {...program} />
          ))}
    </div>
  );
};

export default ScholarshipCardList;
