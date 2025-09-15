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
    <div className="w-full grid p-[24px] gap-[24px] rounded-t-[24px] bg-background">
<Image
  unoptimized
  width={500}
  height={316}
  src={program.thumbnail}
  alt={program.title}
  className="
    rounded-[10px] 
    mt-[20px] 
    w-full 
    h-auto 
    object-cover 
    max-h-[316px] 
  "
/>

      {/* Tab Navbar */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 border-b border-gray-300 py-4 md:py-6">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2 text-xs sm:text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
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
