'use client';

import React from "react";
import { programData } from "@/data/programData";
import ShortCourseCard from "@/components/programCard/ShortCourseCard";
import { programType } from "@/types/programs";
import Link from "next/link";

export default function ShortCoursePage() {
  const shortCourses: programType[] = programData.filter(
    (program) => program.program_type === "Short Course"
  );

  return (
    <div className=" max-w-7xl mx-auto  flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-[20px] p-6 lg:py-6 lg:px-0 mx-auto">
        {shortCourses.map((course) => (
          <Link key={course.id} href={`/activeProgram/${course.id}`} className="block">
            <ShortCourseCard {...course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
