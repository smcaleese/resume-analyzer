import React from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import DisplayCard from './DisplayCard'

const SkillFrequenciesPanel = ({ className, skills, skillCounts }) => {
    const options = {
        responsive: true,
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

    // make bar green if job post skill is found in resume. Otherwise, make it gray
    const backgroundColors = []
    const green = '#4caf50'
    const gray = '#aaa'

    // sort in descending order by value
    const jobPostSkillsSorted = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 100)
    const resumeSkillsSetLower = new Set(skills.map((skill) => skill.name.toLowerCase()))

    // check if each skill is in the resume
    jobPostSkillsSorted.forEach(([name, value]) => {
        if (resumeSkillsSetLower.has(name.toLowerCase())) {
            let color_flag = false
            skills.forEach(skill => {
                if (skill.name.toLowerCase() === name.toLowerCase()){
                    backgroundColors.push(`rgb(${skill.color})`)
                    color_flag = true
                }
            })
            if (!color_flag)
                backgroundColors.push(green)
        } else {
            backgroundColors.push(gray)
        }
    })

    const labels = jobPostSkillsSorted.map((arr) => arr[0])
    const values = jobPostSkillsSorted.map((arr) => arr[1])

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
        <DisplayCard header='Skill Frequencies'>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default styled(SkillFrequenciesPanel)`
`