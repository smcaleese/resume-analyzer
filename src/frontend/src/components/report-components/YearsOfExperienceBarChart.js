import React, {useEffect, useContext} from 'react'
import DisplayCard from '../DisplayCard'
import styled from 'styled-components'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../../App'

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
    }

    const { appState } = useContext(AppContext)
    const { years_of_experience_counts: yearsOfExperienceCounts } = appState.reportsData

    const labels = yearsOfExperienceCounts.map((value, index) => index)
    const values = yearsOfExperienceCounts

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

    const infoDescription = 'Years of experienced requirements from job posts.' 

    return (
        <DisplayCard header='Years of experience required' info={infoDescription} className={className}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default YearsOfExperiencePanel
