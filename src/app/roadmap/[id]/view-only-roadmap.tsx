"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams, useParams } from "next/navigation"
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    type Node,
    type Edge,
    ReactFlowProvider,
    type NodeTypes,
    BackgroundVariant,
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ViewOnlyCourseNode } from "@/components/roadmap/view-only-course-node";

const nodeTypes: NodeTypes = {
    course: ViewOnlyCourseNode,
}

export default function ViewOnlyRoadmap() {
    const { id } = useParams() // Fetch the dynamic route parameter
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Memoize the processed nodes and edges to prevent re-processing
    const processedData = useMemo(() => {
        if (nodes.length === 0 && edges.length === 0) return null

        // Convert nodes to view-only format
        const viewOnlyNodes = nodes.map((node: Node) => ({
            ...node,
            type: "course",
            draggable: false,
            selectable: false,
            data: {
                ...node.data,
                viewOnly: true,
            },
        }))

        const viewOnlyEdges = edges.map((edge: Edge) => ({
            ...edge,
            selectable: false,
        }))

        return { nodes: viewOnlyNodes, edges: viewOnlyEdges }
    }, [nodes, edges])

    useEffect(() => {
        let isMounted = true

        const loadData = async () => {
            try {
                setLoading(true)
                setError(null)

                // Fetch data from the API using the id
                const response = await fetch(`https://your-api-endpoint.com/roadmap/${id}`)
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }

                const data = await response.json()
                if (isMounted) {
                    // Assuming the data structure matches your nodes and edges
                    if (data.nodes && data.edges) {
                        setNodes(data.nodes)
                        setEdges(data.edges)
                    } else {
                        setError("Invalid roadmap data format.")
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load roadmap data")
                    console.error("Error loading data:", err)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadData()

        return () => {
            isMounted = false
        }
    }, [id]) // Add id as a dependency

    if (loading) {
        return (
            <ReactFlowProvider>
                <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading roadmap...</p>
                    </div>
                </div>
            </ReactFlowProvider>
        )
    }

    if (error) {
        return (
            <ReactFlowProvider>
                <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                    </div>
                </div>
            </ReactFlowProvider>
        )
    }

    return (
        <ReactFlowProvider>
            <div className="w-full h-full flex flex-col">
                {/* Header */}
                <div className="p-4 bg-white shadow-sm border-b flex justify-between items-center w-fit mt-10 ml-10 fixed z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Roadmap - View Only</h1>
                    </div>
                </div>

                {/* ReactFlow - View Only */}
                <div className="flex-1">
                    {processedData && processedData.nodes.length > 0 ? (
                        <ReactFlow
                            nodes={processedData.nodes}
                            edges={processedData.edges}
                            nodeTypes={nodeTypes}
                            fitView
                            fitViewOptions={{ padding: 0.2 }}
                            minZoom={0.3}
                            maxZoom={2}
                            nodesDraggable={false}
                            nodesConnectable={false}
                            elementsSelectable={false}
                            panOnDrag={true}
                            zoomOnScroll={true}
                            zoomOnPinch={true}
                            defaultEdgeOptions={{
                                animated: true,
                                style: { strokeWidth: 2 },
                            }}
                        >
                            <Controls showInteractive={false} />
                            <MiniMap
                                nodeColor={() => { return "#64748b" }}
                                maskColor="rgba(255, 255, 255, 0.8)"
                            />
                            <Background variant={BackgroundVariant.Dots} gap={20} size={4} color="#e2e8f0" />
                        </ReactFlow>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <p className="text-gray-500 mb-4">No roadmap data to display</p>
                                <Link href="/">
                                    <Button>
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Create a Roadmap
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Watermark */}
                <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-lg shadow-sm text-xs text-gray-500">
                    View Only Mode - No Editing Available
                </div>
            </div>
        </ReactFlowProvider>
    )
}