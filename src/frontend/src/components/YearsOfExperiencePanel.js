import React from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const YearsOfExperiencePanel = ({ className, yearsOfExperienceCounts }) => {
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
    }

    const labels = yearsOfExperienceCounts.map((value, index) => index)
    const values = yearsOfExperienceCounts

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Years of experience required',
                data: values,
                backgroundColor: '#33DDAA'
            }
        ]
    }

    const infoDescription = 'Distribution of experience requirements from job listings.' 

    return (
        <DisplayCard header='Experience Distribution' info={infoDescription} className={className}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default styled(YearsOfExperiencePanel)`
`
