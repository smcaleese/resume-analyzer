import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Doughnut } from 'react-chartjs-2'
import DisplayCard from './DisplayCard'
import SkillIcon from '../assets/Icons/skill.png'
import { Table } from 'react-bootstrap'
import { AppContext } from '../App'

const roleKeys = {
    'Frontend developer': 'frontend',
    'Backend developer': 'backend',
    'Fullstack developer': 'fullstack',
    'Mobile developer': 'mobile',
    'DevOps engineer': 'devops',
    'DS/ML engineer': 'ml'
}

const SkillFrequenciesPanel = ({ className }) => {
    const { appState } = useContext(AppContext)
    const { skills, skill_counts } = appState.resultsData
    const [sortedSkillCounts, setSortedSkillCounts] = useState([])
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
        const roleSkillCounts = appState.role === 'all skills' ?
            Object.entries(skill_counts)
            : Object.entries(skill_counts).filter(([skill, [count, roles]]) => roles.includes(roleKeys[appState.role]))

        const sortedSkillCounts = roleSkillCounts.sort((a, b) => b[1][0] - a[1][0]).slice(0, 50)
        const labels = sortedSkillCounts.map(e => e[0])
        const values = sortedSkillCounts.map(e => e[1][0])
        setSortedSkillCounts(sortedSkillCounts)
        setLabels(labels)
        setValues(values)
    }, [appState.role])

    const getSkillColor = (name) => {
        const resumeSkillMatch = skills.find((skill) => name.toLowerCase() === skill.name.toLowerCase())
        if (resumeSkillMatch) {
            return resumeSkillMatch.color
        }
        else {
            return '187,187,187'
        }
    }

    const backgroundColors = labels.map((label) => `rgb(${getSkillColor(label)})`)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Skills found in your resume',
                backgroundColor: backgroundColors,
                data: values,
            },
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ` ${context.label}: ${context.formattedValue}`
                    }
                }
            }
        }
    }

    const plugins = [{
        beforeDraw: chart => {
            var ctx = chart.ctx
            ctx.save()
            var image = new Image()
            image.src = SkillIcon
            var imageSize = 100
            ctx.drawImage(image, chart.width / 2 - imageSize / 2, chart.height / 2 - imageSize / 2, imageSize, imageSize)
            ctx.restore()
        }
    }]

    const infoDescription = 'Keyword counts from job posts.'

    return (
        <DisplayCard className={className} header='Skill Frequencies' info={infoDescription}>
            <div className='doughnut-chart'>
                <Doughnut options={options} data={data} plugins={plugins} />
            </div>
            <div className='count-table'>
                <Table responsive='sm' size='sm'>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Skill</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSkillCounts.map((req, index) => {
                            return (
                                <tr key={index}>
                                    <td><div className='circle-indicator' style={{ backgroundColor: `rgb(${getSkillColor(req[0])})` }}></div></td>
                                    <td>{req[0]}</td>
                                    <td>{req[1][0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </DisplayCard>
    )
}

export default styled(SkillFrequenciesPanel)`
    overflow-y: auto;

    .doughnut-chart {
        height: 20rem;
    }

    .count-table {
        height: 20rem;
        overflow-y: auto;
        padding: 10px 40px;

        .circle-indicator {
            height: 15px;
            width: 15px;
            border-radius: 50%;
            margin:10px auto;
        }
    }
`