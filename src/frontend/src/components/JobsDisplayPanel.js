import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, Table } from 'react-bootstrap'

const JobsDisplayPanel = ({ className, jobs }) => {
    return (
        <Card className={classnames(className)}>
            <Card.Header className='card-heading' as='h3'>
                Jobs
            </Card.Header>
            <Card.Body className='card-body'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Matched Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{job.company}</td>
                                    <td>{job.title}</td>
                                    <td>{job.skill_match}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default styled(JobsDisplayPanel)`
box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);
max-height: 500px;
padding: 0px;

.card-heading {
    background-color: var(--bs-blue);
    color: #fff;
}

.card-body{
    overflow-y:auto;
}

`
