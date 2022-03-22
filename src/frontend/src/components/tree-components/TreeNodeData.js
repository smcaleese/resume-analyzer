import React from 'react'
import { MarkerType } from 'react-flow-renderer'
import JobRequirementsIndicator from '../JobRequirementsIndicator'

//https://www.tutorialspoint.com/find-n-highest-values-in-an-object-javascript
const getReqs = (counts) => {
    var reqs = []
    var keys = Object.keys(counts)
    for (var x in keys) {
        if (counts[keys[x]] > 3) {
            reqs.push(keys[x])
        }
    }
    if (reqs.length > 12) {
        reqs = []
        Object.keys(counts).sort((a, b) => counts[b] - counts[a]).forEach((key, ind) => {
            if (ind < 12) {
                reqs.push(key)
            }
        })
    }
    return reqs
}

const TreeNode = ({ title, data, skills }) => {
    var requirements = data[title] ? getReqs(data[title], 1) : []
    console.log(title, requirements, data[title])
    return (
        <>
            {title}
            <JobRequirementsIndicator onClick={() => { console.log('test') }} skills={skills} reqs={requirements} size={10} />
        </>

    )
}

export const getNodes = (data, cvData) => {
    var skills = []
    if (cvData) {
        skills = cvData.skills
    }
    if (!data) {
        return []
    }
    return [
        {
            // QA Engineer
            id: '1',
            type: 'input',
            data: {
                label: (
                    <TreeNode title='QA Engineer' data={data} skills={skills} />
                ),
            },
            position: { x: 600, y: 0 },
        },
        {
            // Devops
            id: '2',
            type: 'input',
            onClick: () => { console.log('test') },
            data: {
                label: (
                    <TreeNode title='Devops' data={data} skills={skills} />
                ),
            },
            position: { x: 1000, y: 0 },
        },
        {
            // Junior Frontend
            id: '3',
            data: {
                label: (
                    <TreeNode title='Junior Frontend Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 0, y: 100 },
        },
        {
            // Junior Full Stack
            id: '4',
            data: {
                label: (
                    <TreeNode title='Junior Full Stack Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 200, y: 100 },
        },
        {
            // Junior Backend
            id: '5',
            data: {
                label: (
                    <TreeNode title='Junior Backend Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 400, y: 100 },
        },
        {
            // Business Analyst
            id: '6',
            type: 'input',
            data: {
                label: (
                    <TreeNode title='Business Analyst' data={data} skills={skills} />
                ),
            },
            position: { x: 800, y: 100 },
        },
        {
            // Senior Devops
            id: '7',
            type: 'output',
            data: {
                label: (
                    <TreeNode title='Senior Devops' data={data} skills={skills} />
                ),
            },
            position: { x: 1000, y: 100 },
        },
        {
            // Cloud Engineer
            id: '8',
            type: 'output',
            data: {
                label: (
                    <TreeNode title='Cloud Engineer' data={data} skills={skills} />
                ),
            },
            position: { x: 1200, y: 100 },
        },
        {
            // Automation Engineer
            id: '9',
            type: 'output',
            data: {
                label: (
                    <TreeNode title='Automation Engineer' data={data} skills={skills} />
                ),
            },
            position: { x: 1400, y: 100 },
        },
        {
            // Senior Frontend
            id: '10',
            data: {
                label: (
                    <TreeNode title='Senior Frontend Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 0, y: 200 },
        },
        {
            // Full Stack
            id: '11',
            data: {
                label: (
                    <TreeNode title='Full Stack Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 200, y: 200 },
        },
        {
            // Senior backend
            id: '12',
            data: {
                label: (
                    <TreeNode title='Senior Backend Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 400, y: 200 },
        },
        {
            // Senior QA
            id: '13',
            type: 'output',
            data: {
                label: (
                    <TreeNode title='Senior QA Engineer' data={data} skills={skills} />
                ),
            },
            position: { x: 600, y: 200 },
        },
        {
            // Senior Full Stack
            id: '14',
            data: {
                label: (
                    <TreeNode title='Senior Full Stack Developer' data={data} skills={skills} />
                ),
            },
            position: { x: 200, y: 300 },
        },
        {
            // Development Lead
            id: '15',
            data: {
                label: (
                    <TreeNode title='Development Lead' data={data} skills={skills} />
                ),
            },
            position: { x: 0, y: 400 },
        },
        {
            // Software Architect
            id: '16',
            data: {
                label: (
                    <TreeNode title='Software Architect' data={data} skills={skills} />
                ),
            },
            position: { x: 200, y: 400 },
        },
        {
            //DBA
            id: '17',
            type: 'output',
            data: {
                label: (
                    <TreeNode title='Database Admin (DBA)' data={data} skills={skills} />
                ),
            },
            position: { x: 400, y: 400 },
        },
        {
            // Product Owner
            id: '18',
            data: {
                label: (
                    <TreeNode title='Product Owner' data={data} skills={skills} />
                ),
            },
            position: { x: 800, y: 400 },
        },
        {
            // Project Manager
            id: '19',
            type: 'output',
            data: {
                label: (
                    <TreeNode title='Project Manager' data={data} skills={skills} />
                ),
            },
            position: { x: 800, y: 500 },
        },

    ]
}

export const nodes = getNodes()

export const edges = [
    // Node 1
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e1-4',
        source: '1',
        target: '4',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e1-5',
        source: '1',
        target: '5',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e1-14',
        source: '1',
        target: '13',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 2
    {
        id: 'e2-4',
        source: '2',
        target: '4',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e2-7',
        source: '2',
        target: '7',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e2-8',
        source: '2',
        target: '8',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e2-9',
        source: '2',
        target: '9',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 3
    {
        id: 'e3-10',
        source: '3',
        target: '10',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 4
    {
        id: 'e4-11',
        source: '4',
        target: '11',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 5
    {
        id: 'e5-12',
        source: '5',
        target: '12',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 6
    {
        id: 'e6-18',
        source: '6',
        target: '18',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 10
    {
        id: 'e10-11',
        source: '10',
        target: '11',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 11
    {
        id: 'e11-14',
        source: '11',
        target: '14',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 12
    {
        id: 'e12-11',
        source: '12',
        target: '11',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 14
    {
        id: 'e14-15',
        source: '14',
        target: '15',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e14-16',
        source: '14',
        target: '16',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'e14-17',
        source: '14',
        target: '17',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 15
    {
        id: 'e15-19',
        source: '15',
        target: '19',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    // Node 16
    {
        id: 'e16-19',
        source: '16',
        target: '19',
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
]
