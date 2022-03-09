import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import YearsOfExperiencePanel from '../components/YearsOfExperiencePanel'
import { Container, Col, Row, Card } from 'react-bootstrap'

const FileDisplayPage = ({ className }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [skills, setSkills] = useState([])
    const [skillCounts, setSkillCounts] = useState([])
    const [jobs, setJobs] = useState([])
    const [resume, setResume] = useState(null)
    const [yearsOfExperienceCounts, setYearsOfExperienceCounts] = useState([])

    useEffect(() => {
        // Redirect user with no uploaded resume back to resume upload
        if (!location.state) {
            navigate('/')
        }

        const resume = location.state.resume
        setResume(resume)

        const {
            skills,
            skill_counts: skillCounts,
            jobs,
            years_of_experience_counts: counts
        } = location.state.results

        setSkills(skills)
        setSkillCounts(skillCounts)
        setJobs(jobs)
        setYearsOfExperienceCounts(counts)

    }, [location, navigate])

    // Block Page render if no resume has been uploaded
    if (!location.state) {
        return null
    }

    return (
        <div className={className}>
            <Container fluid>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col lg={6}>
                                <Row>
                                    <SkillsDisplayPanel
                                        skills={skills}
                                        skillCounts={skillCounts}
                                    />
                                </Row>
                                <Row>
                                    <YearsOfExperiencePanel
                                        yearsOfExperienceCounts={yearsOfExperienceCounts}
                                    />
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <SkillFrequenciesPanel
                                    skills={skills}
                                    skillCounts={skillCounts}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <JobsDisplayPanel
                                jobs={jobs}
                                skills={skills}
                            />
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <PDFPageViewer file={resume} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default styled(FileDisplayPage)`
    margin: 0px 10px 0px 110px;
`
