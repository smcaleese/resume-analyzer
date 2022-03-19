import React, { useEffect, useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import YearsOfExperiencePanel from '../components/YearsOfExperiencePanel'
import { Container, Col, Row, Card } from 'react-bootstrap'
import { AppContext } from '../App'

const FileDisplayPage = ({ className }) => {
    const {appState} = useContext(AppContext)

    if (!appState.resultsData) {
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
                                    <SkillsDisplayPanel />
                                </Row>
                                <Row>
                                    <YearsOfExperiencePanel />
                                </Row>
                            </Col>
                            <Col lg={6} className='skillFreqPanel'>
                                <SkillFrequenciesPanel />
                            </Col>
                        </Row>
                        <Row>
                            <JobsDisplayPanel />
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <PDFPageViewer />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const StyledFileDisplayPage = styled(FileDisplayPage)`
    margin: 0px 10px 0px 110px;

    .skillFreqPanel{
        padding-right: 0;
        position: relative;
        margin-bottom: 10px;
    }
`

const propsEqual = (prevProps, nextProps) => {
    console.log('props:', prevProps, nextProps)
    return true
}

// export default React.memo(StyledFileDisplayPage, propsEqual) 
export default StyledFileDisplayPage
