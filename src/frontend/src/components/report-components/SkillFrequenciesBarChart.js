import React, { useEffect, useContext, useState } from 'react'
import DisplayCard from '../DisplayCard'
import styled from 'styled-components'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../../App'
import classnames from 'classnames'

const YearsOfExperiencePanel = ({ className }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            title: {
                display: false,
            },
        },
        animation: {
            duration: 0,
        }
    }
    const { appState } = useContext(AppContext)
    const { skills, skill_counts: skillCounts } = appState.reportsData
    const [colsToShow, setColsToShow] = useState(20)

    useEffect(() => {
        const graphWidth = document.querySelector('.years-of-experience-panel')?.clientWidth
        if(!isNaN(graphWidth)) {
            const numCols = Math.round(graphWidth / 50)
            setColsToShow(numCols)
        }
    }, [])

    const sortedSkillCounts = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, colsToShow)

    const labels = sortedSkillCounts.map(skill => skill[0])
    const values = sortedSkillCounts.map(skill => skill[1])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Job posts',
                data: values,
                backgroundColor: '#33DAC1'
            }
        ]
    }

    const infoDescription = 'The number of job posts each keyword was found in.' 

    return (
        <DisplayCard header='Job Post Skill Frequencies Distribution' info={infoDescription} className={classnames(className, 'years-of-experience-panel')}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default YearsOfExperiencePanel

