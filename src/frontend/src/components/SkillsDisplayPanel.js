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

const SkillsDisplayPanel = ({ className, skills }) => {
    console.log(skills)

    const skillBoxes = skills.map((skill, index) => 
        <StyledSkillBadge key={index} skill={skill.name} color={skill.color} />
    )

    return (
        <DisplayCard header='Skills' className={className}>
            <div className='skill-boxes-container'>
                { skillBoxes }
            </div>
        </DisplayCard>
    )
}

export default styled(SkillsDisplayPanel)`
`
