// "use client";

// import React from "react";
// import { useGetAllMasterProgramsQuery } from "./masterProgramApi";
// import ShortCourseCardActive from "./ShortCourseCardActive";
// import ShortCourseCardActiveSkeleton from "./skeleton/ShortCourseCarcActiveSkeleton";

// const ShortCourseCardActiveList = () => {
//   const { data: programs = [], isLoading, isError } = useGetAllMasterProgramsQuery();

//   if (isError) return <p>Failed to load short courses.</p>;

//   // Filter only short course programs
//   const shortCoursePrograms = programs.filter(p => p.programType === "SHORT_COURSE");

//   return (
//     <div className="flex flex-col gap-4">
//       {isLoading
//         ? Array.from({ length: 5 }).map((_, i) => (
//             <ShortCourseCardActiveSkeleton key={i} />
//           ))
//         : shortCoursePrograms.map(program => (
//             <ShortCourseCardActive key={program.uuid} {...program} />
//           ))}
//     </div>
//   );
// };

// export default ShortCourseCardActiveList;
