'use client'

import React from "react";
import ShortCourseCardList from "@/components/program/our-program/ShortCourseCardList";

export default function ShortCoursePage() {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center">
      <div className="grid grid-cols-1 gap-[20px] p-6">
              <ShortCourseCardList />
      </div>
    </div>
  );
}
