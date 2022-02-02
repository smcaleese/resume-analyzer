import React from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'

const DisplayCard = ({ header, children, className }) => {
    return (
        <Card className={className} as='h3'>
            <Card.Header className='card-heading'>
                { header }
            </Card.Header>
            <Card.Body>
                { children }
            </Card.Body>
        </Card>
    )
}

export default styled(DisplayCard)`
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
    padding: 0;
    height: ${props => props.height}vh;
    max-height: 100vh;

    .card-heading {
        background-color: var(--bs-blue);
        color: #fff;
    }
`
