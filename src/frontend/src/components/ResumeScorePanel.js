import React, { useContext, useState } from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import { Col, Row, ProgressBar, Button } from 'react-bootstrap'
import { AppContext } from '../App'
import { Doughnut } from 'react-chartjs-2'

const ResumeScorePanel = ({ className }) => {
    const { appState } = useContext(AppContext)
    const { skills, skill_counts: skillCounts, resume_score } = appState.resultsData

    console.log('score:', resume_score)

    const [resumeScore, setResumeScore] = useState(resume_score.overall_score)
    const [skillScore, setSkillScore] = useState(resume_score.skill_score)
    const [lengthScore, setLengthScore] = useState(resume_score.length_score)

    const options = {
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
            <Row>
                <Col className='center doughnut'>
                    <h1 className='score'>{ resumeScore }</h1>
                    <div className='chart'>
                        <Doughnut options={options} data={data} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='bar-rows'>
                    <Row>
                        <h3>Skills</h3>
                        <ProgressBar now={skillScore} variant='score' />
                    </Row>
                    <Row>
                        <h3>Length</h3>
                        <ProgressBar now={lengthScore} variant='score' />
                    </Row>
                </Col>
            </Row>
        </DisplayCard>
    )
}

export default styled(ResumeScorePanel)`
    .score {
        position: absolute;
        font-size: 4rem;
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
