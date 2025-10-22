// "use client"

// import { useEffect, useState } from "react"
// import {
//   ReactFlow,
//   type Node,
//   type Edge,
//   Background,
//   Controls,
//   type NodeProps,
//   Handle,
//   Position,
// } from "@xyflow/react"
// import "@xyflow/react/dist/style.css"

// type HandleType = "source" | "target"

// type HandleConfig = {
//   top: HandleType
//   right: HandleType
//   bottom: HandleType
//   left: HandleType
// }

// type WorkNodeData = {
//   title: string
//   tasks: string[]
//   handles: HandleConfig
// }

// function CustomWorkNodeView({ data }: NodeProps<WorkNodeData>) {
//   return (
//     <div className="min-w-[280px] max-w-[320px] p-4 border rounded-lg shadow-md bg-white">
//       <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
//       <div className="space-y-1">
//         {data.tasks.length > 0 ? (
//           data.tasks.map((task, index) => (
//             <div key={index} className="text-sm p-1 rounded bg-muted/50 flex items-center gap-2">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
//               <span>{task}</span>
//             </div>
//           ))
//         ) : (
//           <p className="text-sm text-muted-foreground italic">No tasks</p>
//         )}
//       </div>

//       {/* Optional: show handles visually (not interactive) */}
//       {(["top", "right", "bottom", "left"] as const).map((position) => {
//         const handleType = data.handles[position]
//         const positions = {
//           top: { top: "-10px", left: "50%", transform: "translateX(-50%)" },
//           right: { right: "-10px", top: "50%", transform: "translateY(-50%)" },
//           bottom: { bottom: "-10px", left: "50%", transform: "translateX(-50%)" },
//           left: { left: "-10px", top: "50%", transform: "translateY(-50%)" },
//         }

//         return (
//           <div key={position} className="absolute" style={positions[position]}>
//             <div
//               className={`w-5 h-5 rounded-full border-2 ${
//                 handleType === "source" ? "bg-green-500" : "bg-blue-500"
//               }`}
//             />
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// const nodeTypes = {
//   workNode: CustomWorkNodeView,
// }

// export default function WorkNodeViewer({ apiData }: { apiData: any }) {
//   const [nodes, setNodes] = useState<Node<WorkNodeData>[]>([])
//   const [edges, setEdges] = useState<Edge[]>([])

//   useEffect(() => {
//     if (!apiData || !apiData[0]) return

//     const roadmapData = apiData[0]

//     // Load nodes
//     const loadedNodes: Node<WorkNodeData>[] = roadmapData.nodes.map((node, index) => {
//       const parts = node.data.label.split(",").map((p) => p.trim())
//       const title = parts[0]

//       const handles: HandleConfig = {
//         top: (parts[1] as HandleType) || "target",
//         right: (parts[2] as HandleType) || "target",
//         bottom: (parts[3] as HandleType) || "target",
//         left: (parts[4] as HandleType) || "target",
//       }

//       return {
//         id: `${index + 1}`,
//         type: "workNode",
//         position: node.position,
//         data: {
//           title,
//           tasks: node.data.description
//             ? node.data.description.split(", ").filter((t) => t.trim() !== "")
//             : [],
//           handles,
//         },
//       }
//     })

//     // Load edges
//     const loadedEdges: Edge[] = roadmapData.edges.map((edge) => {
//       const [sourceId, sourceHandle] = edge.source.split(",").map((s) => s.trim())
//       const [targetId, targetHandle] = edge.target.split(",").map((s) => s.trim())

//       return {
//         id: edge.id,
//         source: sourceId,
//         sourceHandle: sourceHandle || undefined,
//         target: targetId,
//         targetHandle: targetHandle || undefined,
//         type: "smoothstep",
//         animated: edge.animated ?? true,
//         style: { strokeWidth: 2, stroke: "#9333ea" },
//       }
//     })

//     setNodes(loadedNodes)
//     setEdges(loadedEdges)
//   }, [apiData])

//   return (
//     <div className="h-screen w-full">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         fitView
//         panOnDrag={false} // disable moving
//         zoomOnScroll={false} // disable zoom
//         zoomOnPinch={false} // disable pinch
//         nodesDraggable={false} // nodes not draggable
//         nodesConnectable={false} // cannot create new edges
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   )
// }
