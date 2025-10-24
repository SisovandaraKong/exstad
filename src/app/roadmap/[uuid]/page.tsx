"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetMasterProgramByUuidQuery } from "../../../components/program/masterProgramApi";
import WorkNodeViewer from "../../../components/roadmap/roadmap-detail";
import { Card } from "../../../components/ui/card";

export default function RoadmapDetailPage() {
  const router = useRouter();
  const { uuid } = useParams<{ uuid: string }>();
  const { data: program, isLoading, error } = useGetMasterProgramByUuidQuery({ uuid });

  if (isLoading) return <p>Loading...</p>;
  if (error || !program) return <p>Failed to load roadmap.</p>;

  return (
    <div className="relative">
      {/* Header overlay */}
<div className="absolute top-4 left-4 z-10 w-[90%] max-w-4xl sm:w-auto">
  <Card className="flex flex-r sm:flex-row items-center sm:items-center gap-3 px-4 py-2 shadow-lg flex-wrap sm:flex-nowrap">
    <button
      onClick={() => router.back()}
      className="px-2 py-1 text-sm font-medium bg-muted hover:bg-muted/80 border rounded-md shadow-sm transition hidden sm:inline-block"
    >
      ←
    </button>
    <h1 className="text-lg sm:text-2xl font-bold text-foreground text-center sm:text-left break-words">
      {program.title}
    </h1>
  </Card>
</div>


      {/* Roadmap Viewer */}
      <WorkNodeViewer programUuid={uuid} />
    </div>
  );
}
