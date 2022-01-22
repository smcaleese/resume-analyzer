import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { nanoid } from 'nanoid'

const SkillsDisplayPanel = ({ className, skills }) => {
    return (
        <div className={classnames(className, 'panel', 'is-primary')}>
            <h1 className='panel-heading'>Skills</h1>
            <ul>
                {skills.map(skill => 
                    <li key={nanoid()} className='panel-block'>{skill.name}</li>
                )}
            </ul>
        </div>
    )
}

export default styled(SkillsDisplayPanel)`
    width: 100%;
`;
