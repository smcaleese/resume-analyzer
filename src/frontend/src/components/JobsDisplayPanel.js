import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, Table, Accordion, Row, Col } from 'react-bootstrap'
import DisplayCard from './DisplayCard'

const JobsTable = ({ className, jobs }) => {

    return (
        // <Table size='sm' className={className}>
        //     <thead>
        //         <tr>
        //             <th>#</th>
        //             <th>Company</th>
        //             <th>Title</th>
        //             <th>Matched Requirements</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {jobs.map((job, index) => {
        //             return (
        //                 <tr key={index}>
        //                     <td>{index}</td>
        //                     <td>{job.company}</td>
        //                     <td>{job.title}</td>
        //                     <td>{job.skill_match.join(', ')}</td>
        //                 </tr>
        //             )
        //         })}
        //     </tbody>
        // </Table>
        <Accordion>
            <Accordion.Item>
                <Row className='accordian-title'>
                    <Col xs={2}>#</Col>
                    <Col xs={5}>Company</Col>
                    <Col xs={5}>Title</Col>
                </Row>
            </Accordion.Item>
            {jobs.map((job, index) => {

                return(
                    <Accordion.Item eventKey={index+''} key={index}>
                        <Accordion.Header>
                            <Row className='accordian-header'>
                                <Col xs={2}>{index}</Col>
                                <Col xs={5}>{job.company}</Col>
                                <Col xs={5}>{job.title}</Col>
                            </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className='description'>{job.description}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}

const StyledJobsTable = styled(JobsTable)`
    font-size: 12px;
`

const JobsDisplayPanel = ({ className, jobs }) => {
    return (
        <DisplayCard header='Matching Jobs' className={className} height='40vh'>
            <StyledJobsTable jobs={jobs} />
        </DisplayCard>
    )
}

export default styled(JobsDisplayPanel)`
.accordian-title{
    width: 100%;
    font-size: 0.75em;
    padding: 1rem 1.25rem;
}

.accordian-header{
    width: 100%;
}

.description{
    font-size: 0.5em;
}
`
