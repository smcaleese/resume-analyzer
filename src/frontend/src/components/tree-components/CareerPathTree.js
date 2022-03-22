import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import ReactFlow, {
    addEdge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer'
import { getNodes as initialNodes, edges as initialEdges } from './TreeNodeData'
import { apiUrl } from '../../config'
import { AppContext } from '../../App'
import RoleModal from './RoleModal'

const CareerPathTree = ({ className }) => {
    const { appState, dispatch } = useContext(AppContext)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes(appState.treeData, appState.resultsData))
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds))

    const [show, setShow] = useState(false)
    const [modalState, setModalState] = useState({
        title: '',
        skills: []
    })

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        if (nodes.length == 0) {
            fetch(`${apiUrl}/path-data`)
                .then(res => res.json())
                .then(data => {
                    setNodes(initialNodes(data))
                    dispatch({ type: 'SET_TREE_DATA', payload: data })
                })
        }
    }, [nodes, appState])

    return (
        <>
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
                onNodeClick={(_, node) => {
                    setModalState({
                        title: node.data.label.props.title,
                        skills: node.data.label.props.skills
                    })
                    handleShow()
                }}
                fitView
            >
                <Controls
                    showInteractive={false}
                />
                <Background color='#aaa' gap={16} />
            </ReactFlow>
            <RoleModal show={show} handleClose={handleClose} title={modalState.title} skills={modalState.skills} />
        </>
    )
}

export default styled(CareerPathTree)`
    height: 100%;

`
