import React, { useEffect } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import { Container, Col, Row } from 'react-bootstrap'

const FileDisplayPage = ({ className }) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Redirect user with no uploaded resume back to resume upload
        if (!location.state) {
            navigate('/')
        }
    }, [location, navigate])

    // Block Page render if no resume has been uploaded
    if (!location.state) {
        return null
    }

    // TODO: turn these cards into dropdowns or allow them to be rearanged

    return (
        <div className={className}>
            <Container fluid>
                <Row className='box-grid'>
                    <Col lg={7}>
                        <Row>
                            <Col lg={6}>
                                <Row>
                                    <SkillsDisplayPanel skills={location.state.results.skills} />
                                </Row>
                                <Row className='job-display-row'>
                                    <JobsDisplayPanel jobs={location.state.results.jobs}/>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <SkillFrequenciesPanel skills={location.state.results.skills} skillCounts={location.state.results.skill_counts} />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={5}>
                        <PDFPageViewer file={location.state.resume} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default styled(FileDisplayPage)`
height: 100%;
width: 100%;

.box-grid {
    padding: 140px 20px 0px 20px;

    .job-display-row{
        padding: 12px 0px 0px 0px;
    }
}
`
