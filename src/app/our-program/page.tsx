'use client'

import React, { useEffect, useState } from "react";
import ShortCourseCard from "@/components/programCard/ShortCourseCard";
import ShortCourseCardSkeleton from "@/components/programCard/skeleton/ShortCourseCardSkeleton";
import { programType } from "@/types/programs";

export default function ShortCoursePage() {
  const [shortCourses, setShortCourses] = useState<programType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      import("@/data/programData").then((module) => {
        const data: programType[] = module.programData.filter(
          (program) => program.program_type === "Short Course"
        );
        setShortCourses(data);
        setLoading(false);
      });
    }, 1500);
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center">
      <div className="grid grid-cols-1 gap-[20px] p-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ShortCourseCardSkeleton key={i} />
            ))
          : shortCourses.map((course) => (
              <ShortCourseCard key={course.id} {...course} />
            ))}
      </div>
    </div>
  );
}
