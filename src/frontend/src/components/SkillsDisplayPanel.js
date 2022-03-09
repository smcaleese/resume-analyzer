import React from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import SkillIcon from '../assets/Icons/skill.png'
import { Col, Row } from 'react-bootstrap'

const SkillBadge = ({ className, skill }) => {
    return (
        <div className={className}>
            {skill}
        </div>
    )
}

const StyledSkillBadge = styled(SkillBadge)`
    display: inline-block;
    color: white;
    background-color: rgb(${props => props.color});
    border-radius: 10px;
    padding: 10px 20px;
    margin: 0.5rem;
    font-size: 1rem;
    height: 40px;
`

const SkillsDisplayPanel = ({ className, skills, skillCounts }) => {

    const resumeSkillCounts = skills.reduce((acc, skill) => {
        const skillName = skill.name.toLowerCase()
        const key = Object.keys(skillCounts).find(key => skillName === key.toLowerCase())

        acc[skillName] = 0
        if (key) {
            acc[skillName] = skillCounts[key]
        }

        return acc
    }, {})

    const sortedSkills = skills.sort((a, b) => {
        const aCount = resumeSkillCounts[a.name.toLowerCase()]
        const bCount = resumeSkillCounts[b.name.toLowerCase()]

        return bCount - aCount
    })

    const skillBoxes = sortedSkills.map((skill, index) =>
        <StyledSkillBadge key={index} skill={skill.name} color={skill.color} />
    )

    const infoDescription = 'List of skills identified from submited resume.'

    return (
        <DisplayCard header='Skills' info={infoDescription} className={className}>
            <Row>
                <Col lg={2} className='d-none d-lg-block'>
                    <img src={SkillIcon} width='70px' />
                </Col>
                <Col lg={10}>
                    <div>
                        {skillBoxes}
                    </div>
                </Col>
            </Row>
        </DisplayCard>
    )
}

export default styled(SkillsDisplayPanel)`
`
