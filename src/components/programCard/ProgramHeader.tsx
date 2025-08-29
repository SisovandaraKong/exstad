"use client";
import type { programType } from "@/types/programs";
import Image from "next/image";

type Props = {
  program: programType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
const ProgramHeader: React.FC<Props> = ({ program, activeTab, setActiveTab }) => {
  // Default tabs
  const defaultTabs = ["Overview", "Curriculum", "Timeline", "Activity", "Roadmap", "Enrollment"];

  // Remove 'Activity' if program type is 'Short Course'
  const tabs = program.program_type === "Short Course"
    ? defaultTabs.filter(tab => tab !== "Activity" && tab !== "Timeline")
    : defaultTabs;

  return (
    <div className="w-[887px] grid p-[24px] gap-[24px] rounded-t-[24px] bg-background">
      {/* Program Image */}
      <Image unoptimized width={500} height={316} src={program.thumbnail} alt={program.title} className="rounded-[10px] mt-[20px] h-[316px] w-full object-cover" />

      {/* Tab Navbar */}
      <div className="flex justify-between border-b border-gray-300 py-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2  font-normal transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary hover:bg-primary-hover rounded-full text-white"
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
