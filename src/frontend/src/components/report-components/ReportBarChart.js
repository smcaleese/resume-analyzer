import React, { useEffect, useContext, useState } from 'react'
import DisplayCard from '../DisplayCard'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../../App'
import LoadingSpinner from '../LoadingSpinner'
import { roles } from '../../constants'

const ReportBarChart = ({ className, dataKey, sorted, header }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
        },
    }
    const { appState } = useContext(AppContext)
    const roleKey = roles[appState.role]
    const chartData = dataKey === 'skill_counts' ? 
        appState.reportsData[dataKey][roleKey] 
        : appState.reportsData[dataKey]

    const [colsToShow, setColsToShow] = useState(20)

    if (!chartData) {
        return <LoadingSpinner />
    }

    useEffect(() => {
        const graphWidth = document.querySelector('.card-body')?.clientWidth
        if(!isNaN(graphWidth)) {
            const numCols = Math.round(graphWidth / 50)
            setColsToShow(numCols)
        }
    }, [])

    const chartEntries = sorted ?
        Object.entries(chartData).sort((a, b) => b[1] - a[1]).slice(0, colsToShow)
        : Object.entries(chartData)

    const labels = chartEntries.map(e => e[0])
    const values = chartEntries.map(e => e[1])

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
        <DisplayCard header={header} className={className}>
            <Bar options={options} data={data} />
        </DisplayCard>
    )
}

export default ReportBarChart 
