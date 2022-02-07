import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, Table, Accordion, Row, Col } from 'react-bootstrap'
import DisplayCard from './DisplayCard'
import JobRequirementsIndicator from './JobRequirementsIndicator'

// TODO
// Fix the indicator circles
const JobsTable = ({ className, jobs, skills }) => {
    return (
        <Accordion>
            <Accordion.Item>
                <Row className='accordian-title'>
                    <Col xs={2}>Company</Col>
                    <Col xs={5}>Title</Col>
                    <Col xs={5}>Requirements</Col>
                </Row>
            </Accordion.Item>
            {jobs.map((job, index) => (
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                        <Row className='accordian-header'>
                            <Col xs={2}>{job.company}</Col>
                            <Col xs={5}>{job.title}</Col>
                            <Col xs={2}><JobRequirementsIndicator skills={skills} requirements={job.requirements} /></Col>
                        </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p className='description'>{job.description}</p>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

const StyledJobsTable = styled(JobsTable)`
    font-size: 12px;
`

const JobsDisplayPanel = ({ className, jobs, skills }) => {
    return (
        <DisplayCard header='Matching Jobs' className={className} height='40vh'>
            <StyledJobsTable jobs={jobs} skills={skills} />
        </DisplayCard>
    )
}

export default styled(JobsDisplayPanel)`
    .accordian-title {
        width: 100%;
        font-size: 0.75em;
        padding: 1rem 1.25rem;
        margin: 0;
    }

    .accordian-header {
        width: 100%;
    }

    .description {
        font-size: 0.5em;
    }
`
