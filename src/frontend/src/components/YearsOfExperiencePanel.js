import React from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const YearsOfExperiencePanel = ({ className, yearsOfExperience }) => {
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

    yearsOfExperience.sort((a, b) => a - b)
    const yearsData = {}

    const numIterations = Math.max(...yearsOfExperience)

    let j = 0
    for(let i = 0; i < numIterations; i++) {
        yearsData[i] = 0

        if(yearsOfExperience[j] > i) {
            continue
        }

        while(j < yearsOfExperience.length && yearsOfExperience[j] === i) {
            yearsData[i] += 1
            j++
        }
    }

    const labels = Object.keys(yearsData)
    const values = Object.values(yearsData)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Years of experience required',
                data: values,
                backgroundColor: '#15bf75'
            }
        ]
    }

    return (
        <DisplayCard header='Job Posts Years of Experience Distribution' className={className}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default styled(YearsOfExperiencePanel)`
`
