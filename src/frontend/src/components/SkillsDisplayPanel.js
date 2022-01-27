import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, ListGroup } from 'react-bootstrap'

const SkillsDisplayPanel = ({ className, skills }) => {
    console.log(skills)
    return (
        <Card className={classnames(className)}>
            <Card.Header className='card-heading' as='h3'>
                Skills
            </Card.Header>
            <Card.Body className='card-body'>
                <ListGroup variant='flush'>
                    {skills.map((skill, index) => 
                        <ListGroup.Item key={index}>{skill}</ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default styled(SkillsDisplayPanel)`
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
    max-height: 500px;

    .card-heading {
        background-color: var(--bs-blue);
        color: #fff;
    }

    .card-body{
        overflow-y:auto;
    }
`