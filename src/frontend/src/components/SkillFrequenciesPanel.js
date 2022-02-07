import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import DisplayCard from './DisplayCard'

const SkillFrequenciesPanel = ({ className, skills, requirementCounts }) => {
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])
    const [backgroundColors, setBackgroundColors] = useState([])

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                // Prevent legend toggle
                onClick: () => {
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ` ${context.formattedValue}`
                    }
                }
            }
        }
    }

    useEffect(() => {
        const sortedRequirementsDesc = Object.entries(requirementCounts).sort((a, b) => b[1] - a[1]).slice(0, 100)
        setLabels(Object.keys(sortedRequirementsDesc))
        setValues(Object.values(sortedRequirementsDesc))

        const backgroundColors = sortedRequirementsDesc.map(([requirement, count]) => {
            const resumeSkillMatch = skills.find((skill) => requirement.toLowerCase() === skill.name.toLowerCase())
            if(resumeSkillMatch) {
                return {
                    backgroundColor: `rgb(${resumeSkillMatch.color})`,
                }
            }
            return {
                backgroundColor: '#ccc',
            }
        })

        setBackgroundColors(backgroundColors)
    }, [])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Skills found in your resume',
                backgroundColor: backgroundColors,
                data: values
            },
        ]
    }

    return (
        <DisplayCard header='Skill Frequencies' height='37.5vh'>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default styled(SkillFrequenciesPanel)`
`