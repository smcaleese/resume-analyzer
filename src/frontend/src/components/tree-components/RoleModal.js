import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { StyledSkillBadge } from '../SkillsDisplayPanel'
import { apiUrl } from '../../config'
import { StyledJobsTable } from '../JobsDisplayPanel'

const RoleModal = ({ className, show, handleClose, title, skills }) => {
    const [jobsState, setJobsState] = useState([])
    const userSkills = skills ? skills : []

    useEffect(() => {
        if (jobsState.length == 0) {
            fetch(`${apiUrl}/job-data-by-role?role_type=${encodeURIComponent(title.trim())}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setJobsState(data.jobs)
                })
        }
    }, [title])
    return (
        <Modal className={className} size='xl' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {skills.length > 0 ?
                    <div>
                        <h5>Your Skills</h5>
                        {skills.map((skill, index) => {
                            return (
                                <StyledSkillBadge key={index} skill={skill.name} color={skill.color} />
                            )
                        })}
                    </div>
                    :
                    <></>
                }
                {jobsState.length > 0 ?
                    <>
                        <h5>Jobs</h5>
                        <StyledJobsTable className='job-table' jobs={jobsState} skills={userSkills} numJobs={20} />
                    </>
                    :
                    <></>
                }
            </Modal.Body>
        </Modal>
    )
}

export default styled(RoleModal)`
    .job-table{
        max-height: 30vh;
        overflow-y: scroll;
    }
   
`
