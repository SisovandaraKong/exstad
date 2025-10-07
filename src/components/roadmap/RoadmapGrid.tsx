import { programType } from "@/types/programs";
import RoadmapCard from "./RoadmapCard";
export default function RoadmapGrid({ programData }: {programData: programType[]}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {programData.map((data) => (
        <RoadmapCard
          key={data.title}
          icon={data.image}
          title={data.title}
          label={data.level}
        />
      ))}
    </div>
  );
}
