import React from "react";
import { programData } from "@/data/programData";
import ScholarshipCard from "@/components/programCard/ScholarshipCard";
import { programType } from "@/types/programs";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex items-center justify-center max-w-7xl">
    <div className="grid grid-cols-1 mx-auto gap-[20px] p-6">
      {programData.map((program) => (
        <Link key={program.id} href={`/exploreProgram/scholarship/${program.id}`}>
            <ScholarshipCard {...program} />
          </Link>
      ))}
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
