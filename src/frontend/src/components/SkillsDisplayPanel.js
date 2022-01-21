import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const SkillsDisplayPanel = ({ className, skills }) => {
    return (
        <div className={classnames(className, 'panel', 'is-primary')}>
            <p className="panel-heading">Skills</p>

            <ul>
                {skills.map(skill => 
                <li key={skill.skill.name} className='panel-block'>{skill.skill.name}</li>
                )}
            </ul>

        </div>
    )
}

export default styled(SkillsDisplayPanel)`
`
