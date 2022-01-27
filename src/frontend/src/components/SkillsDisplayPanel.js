import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import SkillCard from './SkillCard'
import { Card, Row } from 'react-bootstrap'

const SkillsDisplayPanel = ({ className, skills }) => {
    console.log(skills)
    return (
        <Card className={classnames(className)}>
            <Card.Header className='card-heading' as='h3'>
                Skills
            </Card.Header>
            <Card.Body className='card-body'>
                <Row>
                    {skills.map((skill, index) => 
                        <SkillCard key={index} skill={skill.name} color={skill.color}/>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}

export default styled(SkillsDisplayPanel)`
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
    max-height: 500px;
    padding:0 ;

    .card-heading {
        background-color: var(--bs-blue);
        color: #fff;
    }

    .card-body{
        overflow-y:auto;
    }
`