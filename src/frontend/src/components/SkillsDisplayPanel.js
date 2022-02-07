import React from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'

const SkillBadge = ({ className, skill }) => {
    return (
        <div className={className}>
            { skill }
        </div>
    )
}

const StyledSkillBadge = styled(SkillBadge)`
    display: inline-block;
    color: white;
    background-color: rgb(${props => props.color});
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
`

const SkillsDisplayPanel = ({ className, skills, skillCounts }) => {

    const resumeSkillCounts = skills.reduce((acc, skill) => {
        const skillName = skill.name.toLowerCase()
        const key = Object.keys(skillCounts).find(key => skillName === key.toLowerCase())

        acc[skillName] = 0
        if(key) {
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

    return (
        <DisplayCard header='Resume Skills' className={className}>
            <div className='skill-boxes-container'>
                { skillBoxes }
            </div>
        </DisplayCard>
    )
}

export default styled(SkillsDisplayPanel)`
`
