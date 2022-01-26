import React from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const SkillFrequenciesPanel = ({ className, skills }) => {
    const options = {
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ` ${context.formattedValue}`
                    }
                }
            }
        }
    }

    const labels = [
        'Python',
        'Java',
        'JavaScript',
        'C++',
        'C#',
        'HTML',
        'CSS',
        'SQL',
        'React',
        'Ruby on Rails',
        'Node.js',
        'Django',
        'Git',
        'GitHub',
        'AWS',
        'Docker',
    ]

    // how do I change the color depending on whether they have the skill in their resume?

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Skills found in your resume',
                // backgroundColor: '#4caf50',
                backgroundColor: [
                    '#4caf50',
                    '#4caf50',
                    '#4caf50',
                    '#4caf50',
                    '#4caf50',
                    'gray',
                    'gray',
                    'gray',
                ],
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 6, 3, 2, 6, 2, 8]
            },
        ]
    }

    return (
        <Card className={className} as='h3'>
            <Card.Header className='card-heading'>
                Skill Frequencies
            </Card.Header>
            <Card.Body>
                <Bar options={options} data={data} />
            </Card.Body>
        </Card>
    )
}

export default styled(SkillFrequenciesPanel)`
    margin-top: 2rem;
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);

    .card-heading {
        background-color: var(--bs-blue);
        color: #fff;
    }
`