import React, { useEffect, useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

const JobRequirementsIndicator = ({className, skills, requirements}) => {

    const circleStyle = {
        borderRadius: '50%',
        height: '15px',
        width: '15px',
    }

    const [circleState, setCircleState] = useState([])


    useEffect(() => {
        let circleArray = []
        const unMatchedRequirements = []
        requirements.sort()
        requirements.forEach(requirement => {
            let foundFlag = false
            skills.forEach(skill => {
                if (skill.name.toLowerCase() === requirement.toLowerCase()){
                    foundFlag = true
                    circleArray.push({...skill, match: true})
                }
            })
            if(!foundFlag){
                unMatchedRequirements.push({name: requirement, color: '150, 150, 150', match: false})
            }
        })
        circleArray = circleArray.concat(unMatchedRequirements)
        setCircleState(circleArray)
    }, [setCircleState])

    return(
        <Row className={className}>
            {circleState.map((skill, index) => {
                console.log(skill)
                return(
                    <Col xs={1} key={index} className='circle-container'>
                        <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>{skill.name}</Tooltip>}
                        >
                            <div className='circle' style={skill.match ? {backgroundColor:`rgb(${skill.color})`} : {border: `3px solid rgb(${skill.color})`}}></div>
                        </OverlayTrigger>
                    </Col>
                )
            })}
            <Col></Col>
        </Row>
    )
}

export default styled(JobRequirementsIndicator)`
display: flex;
.circle-container{
    flex: 1;

    .circle{
        border-radius: 50%;
        height: 15px;
        width: 15px;
    }
}
 
`
