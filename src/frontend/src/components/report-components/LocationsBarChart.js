import React, {useEffect, useContext} from 'react'
import DisplayCard from '../DisplayCard'
import styled from 'styled-components'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../../App'

const LocationsBarChart = ({ className }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    }
    const { appState } = useContext(AppContext)
    let { location_counts: locationCounts } = appState.reportsData
    locationCounts = locationCounts.slice(0, 10)
    const labels = locationCounts.map(([location, count]) => location)
    const values = locationCounts.map(([location, count]) => count)

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

    return (
        <DisplayCard header='Job Post Locations' className={className}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default LocationsBarChart 
