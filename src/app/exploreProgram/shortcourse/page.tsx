import React from "react";
import { shortCoursesData } from "@/data/shortcourse";
import ShortCourseCard from "@/components/programCard/ShortCourseCard";
import { shortCoursesType } from "@/types/shortCourseType";
export default function ShortCoursePage() {
  const shortCourses: shortCoursesType[] = shortCoursesData;

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
