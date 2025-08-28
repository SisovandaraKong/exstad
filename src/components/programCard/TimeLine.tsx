"use client";

import React from "react";
import ReactFlow, { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import type { programType } from "@/types/programs";

type Props = {
  program: programType;
};

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
};

// Mock timeline data matching your format
const mockTimelineData: TimelineEvent[] = [
  {
    date: "2025-06-11",
    title: "Application period",
    description: "Submit your application and required documents",
  },
  {
    date: "2025-08-19",
    title: "Applicant List",
    description: "Review and shortlist qualified candidates",
  },
  {
    date: "2025-08-30",
    title: "Writing Test",
    description: "Written examination for qualified applicants",
  },
  {
    date: "2025-09-06",
    title: "Interview Test",
    description: "Face-to-face interview with selected candidates",
  },
  {
    date: "2025-09-08",
    title: "Final Result",
    description: "Announcement of final selection results",
  },
  {
    date: "2025-09-15",
    title: "Preliminary Learning",
    description: "Pre-course preparation and orientation",
  },
  {
    date: "2025-09-29",
    title: "Orientation",
    description: "Program introduction and welcome session",
  },
  {
    date: "2025-09-29",
    title: "Course Training",
    description: "Main course content and practical training",
  },
  {
    date: "2025-11-21",
    title: "Final Project",
    description: "Capstone project and final assessment",
  },
  {
    date: "2025-12-27",
    title: "Closing Day",
    description: "Graduation ceremony and course completion",
  },
];

type NodeData = {
  event: TimelineEvent;
  stepNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
};

type CustomNodeProps = {
  data: NodeData;
};

const CustomNode = ({ data }: CustomNodeProps) => {
  const { event, stepNumber, isCompleted, isCurrent } = data;

  // determine color and animation based on status
  let colorClass = "bg-amber-400"; // default: upcoming (yellow/amber)
  let extraClasses = "";
  if (isCompleted) {
    colorClass = "bg-green-500"; // completed -> green
  } else if (isCurrent) {
    colorClass = "bg-red-500"; // current -> red
    extraClasses = " animate-pulse"; // subtle animation for current
  }

  return (
    <div className="relative">
      {/* Main node circle */}
      <div
        className={`rounded-full w-16 h-16 flex gap-4 items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-white ${colorClass}${extraClasses}`}
      >
        {stepNumber}
        <Handle type="source" position={Position.Right} className="opacity-0" />
        <Handle type="target" position={Position.Left} className="opacity-0" />
      </div>

      {/* Label with event details - always positioned to the right */}
      <div className="absolute left-24 top-0 min-w-[280px] max-w-[300px]">
        <div className="bg-background p-5 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {event.date}
            </span>
          </div>
          <h4 className="font-bold text-gray-900 mb-2 text-lg">
            {event.title}
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = { timeline: CustomNode };

const generateNodesAndEdges = (timelineData: TimelineEvent[]) => {
  // compute today's date and tomorrow's date in YYYY-MM-DD (local) to compare with event.date
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // (removed tomorrow computation — we'll mark the next upcoming date as current instead)

  // helper to normalize date strings like '2025-1-21' -> '2025-01-21'
  const normalizeYMD = (s?: string) => {
    if (!s) return s;
    const parts = s.split("-");
    if (parts.length === 3 && /^\d{4}$/.test(parts[0])) {
      const y = parts[0];
      const m = parts[1].padStart(2, "0");
      const d = parts[2].padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    // fallback: try Date parsing
    const dt = new Date(s);
    if (isNaN(dt.getTime())) return s;
    const yy = dt.getFullYear();
    const mm2 = String(dt.getMonth() + 1).padStart(2, "0");
    const dd2 = String(dt.getDate()).padStart(2, "0");
    return `${yy}-${mm2}-${dd2}`;
  };

  // find the next upcoming date (>= today) so we can mark it as current
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
        x: index % 2 === 0 ? -400 : 0,
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
    type: "smoothstep",
    style: {
      stroke: "#253c95",
      strokeWidth: 4, // Increased from 3 to 4
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
            padding: 0,
            includeHiddenNodes: false,
            minZoom: 0.5,
            maxZoom: 0.8,
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
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
