"use client";

import React from "react";
import ReactFlow, { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import type { programType } from "@/types/programs";
import type { timeline } from "@/types/openingProgramType";

type Props = {
  program: programType;
};

// Mock timeline data 
const mockTimelineData: timeline[] = [
  {
    id:1,
    date: "2025-06-11",
    title: "Application period",
  },
  {
    id:2,
    date: "2025-08-19",
    title: "Applicant List",
  },
  {
    id:3,
    date: "2025-08-30",
    title: "Writing Test",
  },
  {
    id:4,
    date: "2025-09-06",
    title: "Interview Test",
  },
  {
    id:5,
    date: "2025-09-08",
    title: "Final Result",
  },
  {
    id:6,
    date: "2025-09-15",
    title: "Preliminary Learning",
  },
  {
    id:7,
    date: "2025-09-29",
    title: "Orientation",
  },
  {
    id:8,
    date: "2025-09-29",
    title: "Course Training",
  },
  {
    id:9,
    date: "2025-11-21",
    title: "Final Project",
  },
  {
    id:10,
    date: "2025-12-27",
    title: "Closing Day",
  },
];

type NodeData = {
  event: timeline;
  stepNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
};

type CustomNodeProps = {
  data: NodeData;
};

const CustomNode = ({ data }: CustomNodeProps) => {
  const { event, isCompleted, isCurrent, stepNumber } = data;
  const isOddNotOne =
    typeof stepNumber === "number" && stepNumber % 2 === 1 && stepNumber !== 1;

  let colorClass = "bg-yellow-400";
  let extraClasses = "";
  if (isCompleted) {
    colorClass = "bg-green-600";
  } else if (isCurrent) {
    colorClass = "bg-red-600";
    extraClasses = " animate-pulse";
  }

  let textColor = "text-foreground-3";
  if (isCompleted) {
    textColor = "text-foreground";
  } else if (isCurrent) {
    textColor = "text-foreground";
  }

  return (
    <div className="relative">
      {/* Main node circle */}
      <div
        className={`rounded-full w-10 h-10 flex gap-4 items-center justify-center text-white font-bold text-2xl shadow-xl  ${colorClass}${extraClasses}`}
      >
        <div className="rounded-full w-3 h-3 flex gap-4 items-center justify-center text-white font-bold text-2xl shadow-xl bg-background"></div>
        <Handle type="source" position={Position.Right} className="opacity-0" />
        <Handle type="target" position={Position.Left} className="opacity-0" />
      </div>

      {/* Label with event details - always positioned to the right */}
      <div
        className={`absolute flex gap-2 -left-2 ${
          isOddNotOne ? "top-20" : "-top-30"
        } min-w-[280px] max-w-[400px] ${textColor}`}
      >
        <div>
          {/* display step number instead of uuid */}
          <h1 className="text-8xl font-black">{stepNumber}</h1>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span
              className={`font-h4 font-bold  py-1 rounded-full ${
                isOddNotOne ? "relative top-0" : ""
              }`}
            >
              {event.date}
            </span>
          </div>
          <h4 className="font-semibold mb-2 font-h5">{event.title}</h4>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = { timeline: CustomNode };

const generateNodesAndEdges = (timelineData: timeline[]) => {
  // compute today's date and tomorrow's date in YYYY-MM-DD (local) to compare with event.date
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const normalizeYMD = (s?: string) => {
    if (!s) return s;
    const parts = s.split("-");
    if (parts.length === 3 && /^\d{4}$/.test(parts[0])) {
      const y = parts[0];
      const m = parts[1].padStart(2, "0");
      const d = parts[2].padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
   
    const dt = new Date(s);
    if (isNaN(dt.getTime())) return s;
    const yy = dt.getFullYear();
    const mm2 = String(dt.getMonth() + 1).padStart(2, "0");
    const dd2 = String(dt.getDate()).padStart(2, "0");
    return `${yy}-${mm2}-${dd2}`;
  };

  
  const allDates = timelineData
    .map((e) => normalizeYMD(e.date))
    .filter(Boolean)
    .sort();
  const futureDates = allDates.filter((d) => !!d && d >= todayStr) as string[];
  const nextDate = futureDates.length > 0 ? futureDates[0] : null;

  const nodes = timelineData.map((event, index) => {
    const eventDateStr = normalizeYMD(event.date) || "";
    // current if event is today or the next upcoming date
    const isCurrent =
      eventDateStr === todayStr ||
      (nextDate !== null && eventDateStr === nextDate);
    const isCompleted = eventDateStr !== "" && eventDateStr < todayStr; // lexicographic works for YYYY-MM-DD

    return {
      id: `${index + 1}`,
      type: "timeline",
      position: {
        x: index % 2 === 0 ? -500 : 0,
        y: index * 200 + 100,
      },
      data: {
        event,
        stepNumber: index + 1,
        isCompleted,
        isCurrent,
      },
    };
  });

  const edges = timelineData.slice(0, -1).map((_, index) => ({
    id: `e${index + 1}-${index + 2}`,
    source: `${index + 1}`,
    target: `${index + 2}`,
    type: "bezier",
    style: {
      stroke: "#253c95",
      strokeWidth: 8,
    },
    animated: false,
  }));

  return { nodes, edges };
};

const TimeLine: React.FC<Props> = () => {
  const { nodes, edges } = generateNodesAndEdges(mockTimelineData);

  return (
    <div className="h-[190vh] bg-background">
      <div className="h-[185vh] m-0 p-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          defaultViewport={{ x: -1, y: 0, zoom: 1 }}
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
            minZoom: 0.5,
            maxZoom: 0.8,
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        ></ReactFlow>
      </div>
    </div>
  );
};

export default TimeLine;
