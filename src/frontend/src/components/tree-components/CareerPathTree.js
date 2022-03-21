import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer'
import { getNodes as initialNodes, edges as initialEdges } from './TreeNodeData'
import { apiUrl } from '../../config'

const CareerPathTree = ({ className }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes(null))
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds))
    
    useEffect(() => {
        if (nodes.length == 0) {
            fetch(`${apiUrl}/path-data`)
                .then(res => res.json())
                .then(data => {
                    setNodes(initialNodes(data))
                })
        }
    }, [nodes])

    return (
        <ReactFlow
            className={className}
            nodes={nodes}
            edges={edges}
            elementsSelectable={false}
            nodesConnectable={false}
            nodesDraggable={false}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <Controls
                showInteractive={false}
            />
            <Background color='#aaa' gap={16} />
        </ReactFlow>
    )
}

export default styled(CareerPathTree)`
    height: 100%;
`
