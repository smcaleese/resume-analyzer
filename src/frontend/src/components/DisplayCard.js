import React from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'

const DisplayCard = ({ header, children, className }) => {
    return (
        <Card className={className} as='h3'>
            <Card.Header className='card-heading'>
                { header }
            </Card.Header>
            <Card.Body className='card-body'>
                { children }
            </Card.Body>
        </Card>
    )
}

export default styled(DisplayCard)`
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
    padding: 0;
    margin-top: 1rem;
    height: ${props => props.height};
    max-height: 100vh;
    border-radius: 10px;

    .card-heading {
        background-color: transparent;
        color: #373B53;
        border-bottom: 0px;
    }
    .card-body {
        overflow-y: auto;
    }
`
