import React, { useEffect, useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

const JobRequirementsIndicator = ({className, skills, reqs, size}) => {
    const [circleState, setCircleState] = useState([])
    var requirements = reqs ? reqs :[]

    const circleSize = size ? `${size}px` : '15px'

    useEffect(() => {
        var matchedSkills=[]
        var unMatchedSkills=[]

        requirements.forEach((req) => {
            const skillMatchInResume = skills.find((skill) => req.toLowerCase() === skill.name.toLowerCase())
            if(skillMatchInResume){
                matchedSkills.push({...skillMatchInResume, match: true})
            }
            else{
                unMatchedSkills.push({name: req, color: '150, 150, 150', match: false})
            }
        })
        setCircleState(matchedSkills.concat(unMatchedSkills))
    }, [])

    const getCircleStyle = (skill) => {
        if(skill.match) {
            return {
                backgroundColor: `rgb(${skill.color})`,
                height: circleSize,
                width: circleSize
            }
        }
        return {
            border: `3px solid rgb(${skill.color})`,
            height: circleSize,
            width: circleSize
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
            margin-top: 2px;
        }
    }
`
