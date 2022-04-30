import React, { useContext } from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import SkillIcon from '../assets/Icons/skill.png'
import { Col, Row } from 'react-bootstrap'
import { AppContext } from '../App'
import { roles } from '../constants'

const SkillBadge = ({ className, skill, key }) => {
    return (
        <div className={className} key={key}>
            {skill}
        </div>
    )
}

export const StyledSkillBadge = styled(SkillBadge)`
    display: inline-block;
    color: white;
    background-color: rgb(${props => props.color});
    border-radius: 10px;
    padding: 10px 20px;
    margin: 0.5rem;
    font-size: 1rem;
    height: 40px;
`

const SkillsDisplayPanel = ({ className }) => {
    const { appState } = useContext(AppContext)
    const { skills, skill_counts: skillCounts } = appState.resultsData
    const { role } = appState
    const roleKey = roles[role]

    const resumeSkillCounts = skills.reduce((acc, skill) => {
        const match = Object.keys(skillCounts[roleKey]).find(key => key.toLowerCase() === skill.name.toLowerCase())

        acc[skill.name] = 0
        if (match) {
            acc[skill.name] = skillCounts[roleKey][match]
        }
        return acc
    }, {})

    const sortedSkills = skills.sort((a, b) => resumeSkillCounts[b.name] - resumeSkillCounts[a.name])

    const skillBoxes = sortedSkills.map((skill, index) =>
        <StyledSkillBadge key={index} skill={skill.name} color={skill.color} />
    )

    const infoDescription = 'List of skills identified from submited resume.'

    return (
        <DisplayCard header='Resume Skills' info={infoDescription} className={className}>
            <Row>
                <Col lg={2} className='d-none d-lg-block'>
                    <img src={SkillIcon} width='70px' />
                </Col>
                <Col lg={10} className='skill-list'>
                    <div>
                        {skillBoxes}
                    </div>
                </Col>
            </Row>
        </DisplayCard>
    )
}

const StyledSkillsDisplayPanel = styled(SkillsDisplayPanel)`
    .skill-list {
        height: 10rem;
        overflow-y: scroll; 
    }
`

export default StyledSkillsDisplayPanel
