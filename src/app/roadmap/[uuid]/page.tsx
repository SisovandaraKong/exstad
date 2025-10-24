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
<div className="absolute top-4 left-4 z-10">
  <Card className="flex items-center gap-3 px-4 py-2 shadow-lg flex-row">
    <button
      onClick={() => router.back()}
      className="px-3 py-1.5 text-sm font-medium bg-muted hover:bg-muted/80 border rounded-md shadow-sm transition"
    >
      ← Back
    </button>
    <h1 className="text-3xl font-bold text-foreground">
      {program.title}
    </h1>
  </Card>
</div>

      {/* Roadmap Viewer */}
      <WorkNodeViewer programUuid={uuid} />
    </div>
  );
}
