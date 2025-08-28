import React from "react";
import { programType } from "@/types/programs";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  programData: programType[];
  programFilter: string;
  setProgramFilter: (filter: string) => void;
  levelFilter: string;
  setLevelFilter: (filter: string) => void;
  subFilter: string[];
  setSubFilter: (filter: string[]) => void;
};

const ProgramActiveSidebar: React.FC<Props> = ({
  programData,
  programFilter,
  setProgramFilter,
  levelFilter,
  setLevelFilter,
  subFilter,
  setSubFilter,
}) => {
  // Dynamic options
  const scholarshipOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.program_type === "Scholarship Course")
        .map((p) => p.title || "")
        .filter(Boolean)
    )
  );

  const shortCourseOptions = Array.from(
    new Set(
      programData
        .filter((p) => p.program_type === "Short Course")
        .map((p) => p.title)
    )
  );

  const toggleOption = (option: string) => {
    if (subFilter.includes(option)) {
      setSubFilter(subFilter.filter((o) => o !== option));
    } else {
      setSubFilter([...subFilter, option]);
    }
  };

  const renderOption = (option: string, selected: boolean) => (
    <li key={option} className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 ${
          selected ? "border-4 border-primary" : ""
        }`}
        onClick={() => toggleOption(option)}
      ></div>
      <button onClick={() => toggleOption(option)} className="text-[13px] font-medium">
        {option}
      </button>
    </li>
  );

  return (
    <aside className="w-auto sticky top-22  p-[24px] border rounded-lg bg-background space-y-6">
      {/* Program Type */}
                 <h2 className="text-center">Filter</h2>
      <div>
        <h3 className="font-medium text-[16px] mb-2">Program Type</h3>
        <ul className="space-y-2 p-2">
          {["All", "Scholarship Course", "Short Course"].map((type) => (
            <li key={type} className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 ${
                  programFilter === type ? "border-4 border-primary" : ""
                }`}
                onClick={() => {
                  setProgramFilter(type);
                  setSubFilter([]); // Reset sub filter when type changes
                }}
              ></div>
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

      {/* Scholarship Sub-Filter */}
      <div>
        <h3 className="font-medium text-[16px] mb-2">Scholarship</h3>
        <ul className="space-y-2 p-2">
          {[   ...scholarshipOptions].map((option) =>
            renderOption(option, subFilter.includes(option))
          )}
        </ul>
      </div>

      {/* Short Course Sub-Filter */}
{/* <div>
  <h3 className="font-medium text-[16px] mb-2">Short Course</h3>
  <ul className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
    {["All", ...shortCourseOptions].map((option) =>
      renderOption(option, subFilter.includes(option))
    )}
  </ul>
</div> */}
<div>
  <h3 className="font-medium text-[16px] mb-2">Short Course</h3>
  <ScrollArea className="h-[140px] rounded-md p-2">
    <ul className="space-y-2 pr-4"> {/* pr-4 for scrollbar spacing */}
      {[  
        ...shortCourseOptions,
        "Python",
        "React",
        "Node.js",
        "Docker",
        "Kubernetes",
        "Angular",
        "Vue.js",
        "Machine Learning",
        "AI Fundamentals",
      ].map((option) => renderOption(option, subFilter.includes(option)))}
    </ul>
  </ScrollArea>
</div>




      {/* Level */}
<div>
  <h3 className="font-medium text-[16px] mb-2">Level</h3>
  <ul className="space-y-2 p-2">
    {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
      <li key={level} className="flex items-center gap-2 cursor-pointer">
        <div
          className={`w-[18px] h-[18px] rounded-full border border-[#BFBFBF] flex-shrink-0 ${
            levelFilter === level ? "border-4 border-primary" : ""
          }`}
          onClick={() => setLevelFilter(level)}
        ></div>
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
