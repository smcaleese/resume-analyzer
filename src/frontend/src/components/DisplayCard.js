import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap'

const InfoToolTip = ({ info, className }) => {
    return (
        <OverlayTrigger
            placement='top'
            overlay={
                <Tooltip>
                    {info}
                </Tooltip>
            }
        >
            <div className={classnames(className, 'center')}>
                ?
            </div>
        </OverlayTrigger>
    )
}

const StyledInfoToolTip = styled(InfoToolTip)`
    border-radius: 50%;
    background-color: #373B53;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #fff;
    float: right;
`

const DisplayCard = ({ header, children, info, className }) => {
    return (
        <Card className={className} as='h3'>
            <Card.Header className='card-heading draggable-handle'>
                <Row>
                    <Col xs={11}>
                        <span className='card-title'>
                            {header}
                        </span>
                    </Col>
                    <Col xs={1}>
                        {info ?
                            <>
                                <StyledInfoToolTip info={info} />
                            </>
                            : null}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body className='card-body'>
                {children}
            </Card.Body>
        </Card>
    )
}

export default styled(DisplayCard)`
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
    padding: 0;
    height: ${props => props.height ? props.height : 'auto'};
    max-height: 100vh;
    border-radius: 10px;

    .card-heading {
        cursor: move;
        background-color: transparent;
        border-bottom: 0px;
        padding: 1rem 2rem;

        .card-title {
            color: #373B53;
        }
    }
    .card-body {
        overflow-y: auto;
    }
`
