import React, { useEffect } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import { Container, Col, Row, Card } from 'react-bootstrap'

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

    return (
        <div className={className}>
            <Container fluid>
                <Row className='box-grid'>
                    <Col lg={8}>
                        <Row>
                            <SkillsDisplayPanel skills={location.state.results.skills} />
                        </Row>
                        <Row>
                            <SkillFrequenciesPanel skills={location.state.results.skills} skillCounts={location.state.results.skill_counts} />
                        </Row>
                        <Row className='job-display-row'>
                            <JobsDisplayPanel jobs={location.state.results.jobs}/>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <PDFPageViewer file={location.state.resume} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default styled(FileDisplayPage)`
    height: 80vh;
    width: 100%;
    padding: 0;

    .box-grid {
        margin: 150px 10px 0px 10px;

        .job-display-row {
            padding: 12px 0px 0px 0px;
        }
    }
`
