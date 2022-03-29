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

const checkParents = (id, skills, reqs_map) => {
    const parentEdges = edges.filter(edge => edge.target == id)
    if (parentEdges.length == 0) {
        return true
    }
    const parentIds = parentEdges.map(edge => {
        return edge.source
    })

    var validParentFlag = false
    parentIds.forEach(pid => {
        if (checkParents(pid, skills, reqs_map)) {
            var skillMatchCount = 0
            const reqs = reqs_map[Object.keys(reqs_map)[parseInt(pid) - 1]]
            skills.forEach(skill => {
                if (reqs.includes(skill.name)) {
                    skillMatchCount++
                }
            })
            if ((skillMatchCount / reqs.length) > 0.5 || (reqs.length == 0 && skills.length > 0)) {
                validParentFlag = true
            }
        }
    })
    if (!validParentFlag) {
        return false
    }
    return true
}

const getStyle = (id, reqs, skills, reqs_map) => {
    if (checkParents(id, skills, reqs_map)) {
        var skillMatchCount = 0
        skills.forEach(skill => {
            if (reqs.includes(skill.name)) {
                skillMatchCount++
            }
        })

        const score = skillMatchCount / reqs.length
        if (score > 0.5 || (reqs.length == 0 && skills.length > 0)) {
            return {
                backgroundColor: '#33DAC1'
            }
        }
        else {
            return {
                background: `linear-gradient(90deg, #33DAC1 ${(score * 150) - 25}%, rgba(255,255,255,0) ${score * 150}%, rgba(255,255,255,0) 100%)`
            }
        }
    }
    else {
        return {
            // Have to set background color so that update are detected
            backgroundColor: 'rgba(255,255,255,1)'
        }
    }
}


const TreeNode = ({ title, data, skills }) => {
    return (
        <>
            {title}
            <JobRequirementsIndicator onClick={() => { console.log('test') }} skills={skills} reqs={data} size={10} />
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

    const reqs = {
        'QA Engineer': data['QA Engineer'] ? getReqs(data['QA Engineer']) : [],
        'Devops': data['Devops'] ? getReqs(data['Devops']) : [],
        'Junior Frontend Developer': data['Junior Frontend Developer'] ? getReqs(data['Junior Frontend Developer']) : [],
        'Junior Full Stack Developer': data['Junior Full Stack Developer'] ? getReqs(data['Junior Full Stack Developer']) : [],
        'Junior Backend Developer': data['Junior Backend Developer'] ? getReqs(data['Junior Backend Developer']) : [],
        'Business Analyst': data['Business Analyst'] ? getReqs(data['Business Analyst']) : [],
        'Senior Devops': data['Senior Devops'] ? getReqs(data['Senior Devops']) : [],
        'Cloud Engineer': data['Cloud Engineer'] ? getReqs(data['Cloud Engineer']) : [],
        'Automation Engineer': data['Automation Engineer'] ? getReqs(data['Automation Engineer']) : [],
        'Senior Frontend Developer': data['Senior Frontend Developer'] ? getReqs(data['Senior Frontend Developer']) : [],
        'Full Stack Developer': data['Full Stack Developer'] ? getReqs(data['Full Stack Developer']) : [],
        'Senior Backend Developer': data['Senior Backend Developer'] ? getReqs(data['Senior Backend Developer']) : [],
        'Senior QA Engineer': data['Senior QA Engineer'] ? getReqs(data['Senior QA Engineer']) : [],
        'Senior Full Stack Developer': data['Senior Full Stack Developer'] ? getReqs(data['Senior Full Stack Developer']) : [],
        'Development Lead': data['Development Lead'] ? getReqs(data['Development Lead']) : [],
        'Software Architect': data['Software Architect'] ? getReqs(data['Software Architect']) : [],
        'Database Admin (DBA)': data['Database Admin (DBA)'] ? getReqs(data['Database Admin (DBA)']) : [],
        'Product Owner': data['Product Owner'] ? getReqs(data['Product Owner']) : []
    }

    return [
        {
            // QA Engineer
            id: '1',
            type: 'input',
            style: getStyle('1', reqs['QA Engineer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='QA Engineer' reqs={reqs['QA Engineer']} skills={skills} />
                ),
            },
            position: { x: 600, y: 0 },
        },
        {
            // Devops
            id: '2',
            type: 'input',
            style: getStyle('2', reqs['Devops'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Devops' data={reqs['Devops']} skills={skills} />
                ),
            },
            position: { x: 1000, y: 0 },
        },
        {
            // Junior Frontend
            id: '3',
            style: getStyle('3', reqs['Junior Frontend Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Junior Frontend Developer' data={reqs['Junior Frontend Developer']} skills={skills} />
                ),
            },
            position: { x: 0, y: 100 },
        },
        {
            // Junior Full Stack
            id: '4',
            style: getStyle('4', reqs['Junior Full Stack Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Junior Full Stack Developer' data={reqs['Junior Full Stack Developer']} skills={skills} />
                ),
            },
            position: { x: 200, y: 100 },
        },
        {
            // Junior Backend
            id: '5',
            style: getStyle('5', reqs['Junior Backend Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Junior Backend Developer' data={reqs['Junior Backend Developer']} skills={skills} />
                ),
            },
            position: { x: 400, y: 100 },
        },
        {
            // Business Analyst
            id: '6',
            type: 'input',
            style: getStyle('6', reqs['Business Analyst'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Business Analyst' data={reqs['Business Analyst']} skills={skills} />
                ),
            },
            position: { x: 800, y: 100 },
        },
        {
            // Senior Devops
            id: '7',
            type: 'output',
            style: getStyle('7', reqs['Senior Devops'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Senior Devops' data={reqs['Senior Devops']} skills={skills} />
                ),
            },
            position: { x: 1000, y: 100 },
        },
        {
            // Cloud Engineer
            id: '8',
            type: 'output',
            style: getStyle('8', reqs['Cloud Engineer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Cloud Engineer' data={reqs['Cloud Engineer']} skills={skills} />
                ),
            },
            position: { x: 1200, y: 100 },
        },
        {
            // Automation Engineer
            id: '9',
            type: 'output',
            style: getStyle('9', reqs['Automation Engineer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Automation Engineer' data={reqs['Automation Engineer']} skills={skills} />
                ),
            },
            position: { x: 1400, y: 100 },
        },
        {
            // Senior Frontend
            id: '10',
            style: getStyle('10', reqs['Senior Frontend Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Senior Frontend Developer' data={reqs['Senior Frontend Developer']} skills={skills} />
                ),
            },
            position: { x: 0, y: 200 },
        },
        {
            // Full Stack
            id: '11',
            style: getStyle('11', reqs['Full Stack Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Full Stack Developer' data={reqs['Full Stack Developer']} skills={skills} />
                ),
            },
            position: { x: 200, y: 200 },
        },
        {
            // Senior backend
            id: '12',
            style: getStyle('12', reqs['Senior Backend Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Senior Backend Developer' data={reqs['Senior Backend Developer']} skills={skills} />
                ),
            },
            position: { x: 400, y: 200 },
        },
        {
            // Senior QA
            id: '13',
            type: 'output',
            style: getStyle('13', reqs['Senior QA Engineer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Senior QA Engineer' data={reqs['Senior QA Engineer']} skills={skills} />
                ),
            },
            position: { x: 600, y: 200 },
        },
        {
            // Senior Full Stack
            id: '14',
            style: getStyle('14', reqs['Senior Full Stack Developer'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Senior Full Stack Developer' data={reqs['Senior Full Stack Developer']} skills={skills} />
                ),
            },
            position: { x: 200, y: 300 },
        },
        {
            // Development Lead
            id: '15',
            style: getStyle('15', reqs['Development Lead'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Development Lead' data={reqs['Development Lead']} skills={skills} />
                ),
            },
            position: { x: 0, y: 400 },
        },
        {
            // Software Architect
            id: '16',
            style: getStyle('16', reqs['Software Architect'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Software Architect' data={reqs['Software Architect']} skills={skills} />
                ),
            },
            position: { x: 200, y: 400 },
        },
        {
            //DBA
            id: '17',
            type: 'output',
            style: getStyle('17', reqs['Database Admin (DBA)'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Database Admin (DBA)' data={reqs['Database Admin (DBA)']} skills={skills} />
                ),
            },
            position: { x: 400, y: 400 },
        },
        {
            // Product Owner
            id: '18',
            style: getStyle('18', reqs['Product Owner'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Product Owner' data={reqs['Product Owner']} skills={skills} />
                ),
            },
            position: { x: 800, y: 400 },
        },
        {
            // Project Manager
            id: '19',
            type: 'output',
            style: getStyle('19', reqs['Project Manager'], skills, reqs),
            data: {
                label: (
                    <TreeNode title='Project Manager' data={reqs['Project Manager']} skills={skills} />
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
