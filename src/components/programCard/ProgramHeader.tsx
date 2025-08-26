"use client";

import { useState } from "react";
import type { programType } from "@/types/programs";

type Props = {
  program: programType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = ["Overview", "Roadmap", "Timeline", "Curriculum", "Activity", "Enrollment"];

const ProgramHeader: React.FC<Props> = ({ program, activeTab, setActiveTab }) => {
  return (
    <div className=" w-[887px] grid p-[24px] gap-[40px]">
      {/* Program Image */}
      <img
        src={program.openingprogram.image}
        alt={program.title}
        className="rounded-[10px] h-[316px] w-full object-cover"
      />

      {/* Tab Navbar */}
      <div className="flex border-b border-gray-300 py-6 mt-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 mx-auto   font-normal transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary rounded-full text-white "
                : "text-primary font-normal bg-white border-1 rounded-full border-primary hover:bg-primary-hover hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramHeader;
