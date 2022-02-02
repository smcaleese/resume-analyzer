import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, Table } from 'react-bootstrap'
import DisplayCard from './DisplayCard'

const JobsTable = ({ className, jobs }) => {
    console.log('jobs:', jobs)

    return (
        <Table size='sm' className={className}>
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
                            <td>{job.skill_match.join(', ')}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

const StyledJobsTable = styled(JobsTable)`
    font-size: 12px;
`

const JobsDisplayPanel = ({ className, jobs }) => {
    return (
        <DisplayCard header='Matching Jobs' className={className} height='50'>
            <StyledJobsTable jobs={jobs} />
        </DisplayCard>
    )
}

export default styled(JobsDisplayPanel)`
    overflow-y: scroll;
`
