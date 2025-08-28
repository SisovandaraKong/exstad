import React from "react";
import {programData } from "@/data/programData";
import ShortCourseCard from "@/components/programCard/ShortCourseCard";
import { programType} from "@/types/programs";
export default function ShortCoursePage() {
  const shortCourses: programType[] = programData.filter((program) => program.program_type ===  "Short Course");

  return (
    <div className="flex items-center justify-center">
    <div className="grid grid-cols-1 mx-auto gap-[20px] p-6">
      {shortCourses.map((course) => (
        <ShortCourseCard key={course.id} {...course} />
      ))}
    </div>
    </div>
  );
}
