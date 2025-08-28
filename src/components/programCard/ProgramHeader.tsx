"use client";

import type { programType } from "@/types/programs";

type Props = {
  program: programType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = ["Overview", "Curriculum", "Timeline", "Activity", "Roadmap", "Enrollment"];

const ProgramHeader: React.FC<Props> = ({ program, activeTab, setActiveTab }) => {
  return (
    <div className="w-[887px] grid p-[24px] gap-[40px] rounded-t-[24px] bg-background">
      {/* Program Image */}
      <img src={program.thumbnail} alt={program.title} className="rounded-[10px] mt-[20px] h-[316px] w-full object-cover" />

      {/* Tab Navbar */}
      <div className="flex border-b border-gray-300 py-6  overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4  py-2 mr-auto font-normal transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary hover:bg-primary-hover   rounded-full text-white"
                : "text-primary bg-white border border-primary rounded-full hover:bg-primary hover:text-white"
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
