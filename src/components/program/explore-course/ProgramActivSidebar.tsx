"use client";

import React from "react";
import { ScrollArea } from "../../ui/scroll-area";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { MasterProgramType } from "@/types/master-program";

type Props = {
  programData: MasterProgramType[]; // ✅ accept from parent
  programFilter: string;
  setProgramFilter: (filter: string) => void;
  levelFilter: string;
  setLevelFilter: (filter: string) => void;
  subFilter: string[];
  setSubFilter: (filter: string[]) => void;
};

const   ProgramActiveSidebar: React.FC<Props> = ({
  programData,
  programFilter,
  setProgramFilter,
  levelFilter,
  setLevelFilter,
  subFilter,
  setSubFilter,
}) => {
  if (!programData.length) {
    return (
      <aside className="w-auto sticky top-28 p-[20px] border rounded-lg bg-background">
        <p className="text-sm text-gray-500">No programs available</p>
      </aside>
    );
  }

  // ✅ Correct mapping for filters
  const scholarshipOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.programType === "SCHOLARSHIP")
        .map((p) => p.title)
        .filter(Boolean)
    )
  );

  const shortCourseOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.programType === "SHORT_COURSE")
        .map((p) => p.title)
        .filter(Boolean)
    )
  );

  const toggleOption = (option: string) => {
    setSubFilter(
      subFilter.includes(option)
        ? subFilter.filter((o) => o !== option)
        : [...subFilter, option]
    );
  };

  const renderOption = (option: string, selected: boolean) => (
    <li key={option} className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 ${
          selected ? "border-4 border-primary" : ""
        }`}
        onClick={() => toggleOption(option)}
      />
      <button
        onClick={() => toggleOption(option)}
        className="text-[13px] font-medium"
      >
        {option}
      </button>
    </li>
  );

  return (
    <aside className="w-auto sticky top-28 p-[20px] border rounded-lg bg-background space-y-6">
      {/* Program Type */}
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faSlidersH} size="lg" />
        <h2 className="text-[20px] font-bold">Filter</h2>
      </div>

      {/* Program Type Filter */}
      <div>
        <h3 className="font-medium text-[16px] mb-2">Program Type</h3>
        <ul className="space-y-2 p-2">
          {["All", "Scholarship Course", "Short Course"].map((type) => (
            <li key={type} className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] ${
                  programFilter === type ? "border-4 border-primary" : ""
                }`}
                onClick={() => {
                  setProgramFilter(type);
                  setSubFilter([]); // reset when type changes
                }}
              />
              <button
                onClick={() => {
                  setProgramFilter(type);
                  setSubFilter([]);
                }}
                className="text-[13px] font-medium"
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Scholarship Filter */}
      <div>
        <h3 className="font-medium text-[16px] mb-2">Scholarship</h3>
        <ul className="space-y-2 p-2">
          {scholarshipOptions.map((option) =>
            renderOption(option, subFilter.includes(option))
          )}
        </ul>
      </div>

      {/* Short Course Filter */}
      <div>
        <h3 className="font-medium text-[16px] mb-2">Short Course</h3>
        <ScrollArea className="h-[140px] rounded-md p-2">
          <ul className="space-y-2 pr-4">
            {shortCourseOptions.map((option) =>
              renderOption(option, subFilter.includes(option))
            )}
          </ul>
        </ScrollArea>
      </div>

      {/* Level Filter */}
      <div>
        <h3 className="font-medium text-[16px] mb-2">Level</h3>
        <ul className="space-y-2 p-2">
          {/* "BASIC" | "INTERMEDIATE" | "ADVANCED"; */}
          {["All", "Basic", "Intermediate", "Advanced"].map((level) => (
            <li key={level} className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] ${
                  levelFilter === level ? "border-4 border-primary" : ""
                }`}
                onClick={() => setLevelFilter(level)}
              />
              <button
                onClick={() => setLevelFilter(level)}
                className="text-[13px] font-medium"
              >
                {level}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ProgramActiveSidebar;
