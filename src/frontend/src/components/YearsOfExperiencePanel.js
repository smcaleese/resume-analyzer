import React, {useEffect, useContext} from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../App'

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
    const { years_of_experience_counts: yearsOfExperienceCounts } = appState.resultsData

    const labels = yearsOfExperienceCounts.map((value, index) => index)
    const values = yearsOfExperienceCounts

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Years of experience required',
                data: values,
                backgroundColor: '#33DAC1'
            }
        ]
    }

    const infoDescription = 'Distribution of years of experience requirements from job posts.' 

    return (
        <DisplayCard header='Experience Distribution' info={infoDescription} className={className}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

const propsEqual = (prevProps, nextProps) => {
    console.log('props:', prevProps, nextProps)
    return true
}

export default React.memo(YearsOfExperiencePanel, propsEqual)
