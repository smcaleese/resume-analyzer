import React, { useEffect, useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

const JobRequirementsIndicator = ({className, skills, requirements}) => {
    // console.log('skills in JobRequirementsIndicator:', skills)

    const [circleState, setCircleState] = useState([])

    useEffect(() => {
        const circleArray = requirements.sort().map((requirement) => {
            const skillMatchInResume = skills.find((skill) => requirement.toLowerCase() === skill.name.toLowerCase())
            if(skillMatchInResume) {
                return {...skillMatchInResume, match: true}
            } else {
                return {name: requirement, color: '150, 150, 150', match: false}
            }
        })
        setCircleState(circleArray)
    }, [])

    const getCircleStyle = (skill) => {
        if(skill.match) {
            return {
                backgroundColor: `rgb(${skill.color})`,
            }
        }
        return {
            border: `3px solid rgb(${skill.color})`,
        }
    }

    return (
        <Row className={className}>
            {circleState.map((skill, index) => (
                <Col xs={1} key={index} className='circle-container'>
                    <OverlayTrigger
                        placement='top'
                        overlay={<Tooltip>{skill.name}</Tooltip>}
                    >
                        <div className='circle' style={getCircleStyle(skill)}></div>
                    </OverlayTrigger>
                </Col>
            ))}
            <Col></Col>
        </Row>
    )
}

export default styled(JobRequirementsIndicator)`
    display: flex;
    .circle-container {
        flex: 1;

        .circle {
            border-radius: 50%;
            height: 15px;
            width: 15px;
        }
    }
`
