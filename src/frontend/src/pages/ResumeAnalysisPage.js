import React, { useEffect, useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import YearsOfExperiencePanel from '../components/report-components/YearsOfExperienceBarChart'
import { Container, Col, Row, Card } from 'react-bootstrap'
import { AppContext } from '../App'

const FileDisplayPage = ({ className }) => {
    const {appState} = useContext(AppContext)

    if (!appState.resume) {
        return null
    }

    return (
        <div className={className}>
            <Container fluid>
                <Row>
                    <Col xl={8}>
                        <Row className='left-row'>
                            <Col lg={6}>
                                <Row>
                                    <SkillsDisplayPanel />
                                </Row>
                                {/* <Row>
                                    <YearsOfExperiencePanel />
                                </Row> */}
                            </Col>
                            <Col lg={6} className='skillFreqPanel'>
                                <SkillFrequenciesPanel />
                            </Col>
                        </Row>
                        <Row>
                            <JobsDisplayPanel />
                        </Row>
                    </Col>
                    <Col xl={4}>
                        <PDFPageViewer />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const StyledFileDisplayPage = styled(FileDisplayPage)`
    margin: 0px 10px 0px 110px;

    .skillFreqPanel {
        padding-right: 0;
        margin-bottom: 10px;
    }
`

export default StyledFileDisplayPage
