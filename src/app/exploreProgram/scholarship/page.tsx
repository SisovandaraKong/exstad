'use client'
import React, { useState } from "react";
import { programData } from "@/data/programData";
import ScholarshipCard from "@/components/programCard/ScholarshipCard";
import ShortCourseCardActive from "@/components/programCard/ShortCourseCardActive";
import { programType } from "@/types/programs";
import Link from "next/link";
import ProgramActiveSidebar from "@/components/programCard/ProgramActivSidebar";
import ProgramSearch from "@/components/programCard/ProgramSearch";
export default function Page() {
  const [programFilter, setProgramFilter] = useState<string>("All");
  const [subFilter, setSubFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredPrograms = programData.filter((p: programType) => {
    const programMatch = programFilter === "All" || p.program_type === programFilter;
    const levelMatch = levelFilter === "All" || p.level === levelFilter;

    // Multi-select sub-filter
    let subMatch = true;
    if (subFilter.length > 0 && !subFilter.includes("All")) {
      if (p.program_type === "Scholarship Course") {
        subMatch = subFilter.includes(p.title || "");
      } else if (p.program_type === "Short Course") {
        subMatch = subFilter.includes(p.title);
      }
    }
    
    const searchMatch = p.title.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                        p.subtitle.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

    return programMatch && levelMatch && subMatch && searchMatch;
  });

return (
  <div className="bg-whitesmoke">
    {/* Outer container centers content & locks width to 1280px */}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8    w-full">
      {/* Flex row distributes space */}
      <div className="flex py-6 w-full">
        {/* Sidebar (fixed width, no shrinking) */}
        <div className="shrink-0">
          <ProgramActiveSidebar
            programData={programData}
            programFilter={programFilter}
            setProgramFilter={setProgramFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
            subFilter={subFilter}
            setSubFilter={setSubFilter}
          />
        </div>

        {/* Cards (take all remaining space) */}
        <div className="flex-1 ">

          <div className="grid grid-cols-1 gap-y-[20px] ml-12 ">

            <div className="">
      <div className="mx-auto">
        <ProgramSearch total={filteredPrograms.length}
        searchValue={searchValue}
        setSearchValue={setSearchValue}/>
      </div>
      </div>

            {filteredPrograms.map((program: programType) => (
              <Link
                key={program.id}
                href={`/exploreProgram/${
                  program.program_type === "Scholarship Course"
                    ? "scholarship"
                    : "shortcourse"
                }/${program.id}`}
              >
                {program.program_type === "Scholarship Course" ? (
                  <ScholarshipCard {...program} />
                ) : (
                  <ShortCourseCardActive {...program} />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);


}







// import React from "react";
// import { programData } from "@/data/programData";
// import ScholarshipCard from "@/components/programCard/ScholarshipCard";
// import { programType } from "@/types/programs";
// export default function Page() {
//   const shortCourses: programType[] = programData;

//   return (
//     <div className="flex items-center justify-center">
//     <div className="grid grid-cols-1 mx-auto gap-[20px] p-6">
//       {shortCourses.map((course) => (
//         <ScholarshipCard key={course.id} {...course} />
//       ))}
//     </div>
//     </div>
//   );
// }
