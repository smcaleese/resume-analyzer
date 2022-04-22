import React, { useContext, useState } from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import { ProgressBar } from 'react-bootstrap'
import { AppContext } from '../App'
import { Doughnut } from 'react-chartjs-2'

const ResumeScorePanel = ({ className }) => {
    const { appState } = useContext(AppContext)
    const { skills, skill_counts: skillCounts, resume_score } = appState.resultsData

    const [resumeScore, setResumeScore] = useState(resume_score.overall_score)
    const [skillScore, setSkillScore] = useState(resume_score.skill_score)
    const [lengthScore, setLengthScore] = useState(resume_score.length_score)

    const options = {
        aspectRatio: 1.2,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            }
        },
    }

    const data = {
        labels: ['Score'],
        datasets: [
            {
                data: [100 - resumeScore, resumeScore],
                backgroundColor: ['#ccc', '#28c76f'],
                borderColor: ['#ccc', '#28c76f'],
                borderWidth: 1,
            },
        ],
    }

    return (
        <DisplayCard header='Resume Score' className={className}>
            <div className='doughnut center'>
                <h1 className='score'>{ resumeScore }</h1>
                <div className='chart'>
                    <Doughnut options={options} data={data} />
                </div>
            </div>
            <div className='bar-rows'>
                <div>
                    <h3>Skills</h3>
                    <ProgressBar now={skillScore} variant='score' />
                </div>
                <div>
                    <h3>Length</h3>
                    <ProgressBar now={lengthScore} variant='score' />
                </div>
            </div>
        </DisplayCard>
    )
}

export default styled(ResumeScorePanel)`
    .doughnut {
        position: relative;
    }

    .score {
        position: absolute;
        font-size: calc(1.5rem + 1vw);
        margin: 0;
    }

    .bar-rows > * {
        margin: 3rem 1rem; 
    }
    
    .bar-rows .row h3 {
        font-size: 1.5rem;
    }
    
    .bar-rows .row p {
        font-size: 1.2rem;
        font-weight: normal;
    }

    .bg-score {
        background-color: #28c76f;
    }

    .progress {
        padding: 0;
    }
`