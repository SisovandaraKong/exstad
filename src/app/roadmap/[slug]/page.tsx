"use client";

import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import { useParams, useRouter } from "next/navigation";
import { useGetMasterProgramBySlugQuery } from "../../../components/program/masterProgramApi";
import WorkNodeViewer from "../../../components/roadmap/roadmap-detail";
import { Card } from "../../../components/ui/card";

export default function RoadmapDetailPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { data: program, isLoading, error } = useGetMasterProgramBySlugQuery({ slug });


  if (isLoading) return <div className="h-screen"><LoadingOverlay/></div>;
  if (error || !program) return <p>Failed to load roadmap.</p>;
  console.log("Program Data:", program);
  return (
    <div className="relative">
      {/* Header overlay */}
<div className="absolute top-10 left-10 z-10 w-[90%] max-w-4xl sm:w-auto">
  <Card className="flex flex-row items-center gap-3 px-4 py-2 shadow-lg flex-wrap sm:flex-nowrap">
    <button
      onClick={() => router.back()}
      className="px-2 py-1 text-sm font-medium bg-muted hover:bg-muted/80 border rounded-md shadow-sm transition hidden sm:inline-block cursor-pointer"
    >
      ←
    </button>
    <h1
      onClick={() => router.back()}
      className="text-lg sm:text-2xl font-bold text-foreground text-center sm:text-left break-words cursor-pointer"
    >
      {program.title}
    </h1>
  </Card>
</div>



      {/* Roadmap Viewer */}
      <WorkNodeViewer programUuid={program.uuid} programType="programs" />

    </div>
  );
}
