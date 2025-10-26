"use client";

import { useEffect } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomWorkNode from "./CustomWorkNode";
import { useGetAllRoadmapsQuery } from "../../features/roadmapApi";
import type {
  HandleConfig,
  HandleType,
  WorkNodeData,
  RoadmapResponse,
  RoadmapNode,
  RoadmapEdge,
} from "../../types/roadmap";
import { Card } from "../ui/card";
import { Zoom } from "swiper/modules";

const nodeTypes = {
  workNode: CustomWorkNode,
};

export default function WorkNodeViewer({
  programUuid,
  programType = "programs", // ✅ default to "programs"
}: {
  programUuid: string;
  programType?: "programs" | "opening-programs";
}) {
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetAllRoadmapsQuery(
    { programType, programUuid },
    { skip: !programUuid }
  );

  const [nodes, setNodes] = useNodesState<Node<WorkNodeData>>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (!apiData || !apiData[0]) return;

    const roadmapData: RoadmapResponse[number] = apiData[0];

    const loadedNodes: Node<WorkNodeData>[] = roadmapData.nodes.map(
      (node: RoadmapNode, index: number) => {
        const parts = node.data.label.split(",").map((p: string) => p.trim());
        const title = parts[0];

        const handles: HandleConfig = {
          top: (parts[1] as HandleType) || "target",
          right: (parts[2] as HandleType) || "target",
          bottom: (parts[3] as HandleType) || "target",
          left: (parts[4] as HandleType) || "target",
        };

        const color = parts[5] || "";

        return {
          id: `${index + 1}`,
          type: "workNode",
          position: node.position,
          data: {
            title,
            color,
            tasks: node.data.description
              ? node.data.description.split(", ").filter((t: string) => t.trim() !== "")
              : [],
            handles,
            onEdit: () => {},
            onDelete: () => {},
          },
          draggable: false,
          selectable: false,
        };
      }
    );

    const loadedEdges: Edge[] = roadmapData.edges.map((edge: RoadmapEdge) => {
      const [sourceId, sourceHandle] = edge.source.split(",").map((s: string) => s.trim());
      const [targetId, targetHandle] = edge.target.split(",").map((s: string) => s.trim());

      return {
        id: edge.id,
        source: sourceId,
        sourceHandle,
        target: targetId,
        targetHandle,
        type: "smoothstep",
        animated: edge.animated ?? true,
        style: { strokeWidth: 2, stroke: "#9333ea" },
      };
    });

    setNodes(loadedNodes);
    setEdges(loadedEdges);
  }, [apiData, setNodes, setEdges]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1">
        <Card className="h-full border-none p-0">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll
            zoomOnPinch
            panOnScroll
            panOnDrag
          >
            <Background />
            <Controls className="dark:text-black" showInteractive={false} />
          </ReactFlow>
        </Card>
      </div>
    </div>
  );
}
