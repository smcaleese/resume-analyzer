import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import DisplayCard from './DisplayCard'

const SkillFrequenciesPanel = ({className, skills, skillCounts}) => {
    const sortedRequirementsDesc = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 100)

    const labels = sortedRequirementsDesc.map(req => req[0])
    const values = sortedRequirementsDesc.map(req => req[1])

    const backgroundColors = labels.map((label) => {
        const resumeSkillMatch = skills.find((skill) => label.toLowerCase() === skill.name.toLowerCase())
        if(resumeSkillMatch) {
            return `rgb(${resumeSkillMatch.color})`
        }
        return '#bbb'
    })

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
                        return ` ${context.formattedValue}`
                    }
                }
            }
        }
    }

    return (
        <DisplayCard header='Skill Frequencies' height='37.5vh'>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default styled(SkillFrequenciesPanel)`
`