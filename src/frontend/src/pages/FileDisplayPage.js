import React, { useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import { Container,Col, Row } from 'react-bootstrap'

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
    console.log(location)

    if (!location.state) {
        return null
    }

    return (
        <div className={className}>
            <Container fluid>
                <Row className='box-grid'>
                    <Col lg={3}>
                        <SkillsDisplayPanel skills={location.state.results.skills}/>
                    </Col>
                    <Col lg={5}></Col>
                    <Col lg={4}>
                        <PDFPageViewer file={location.state.resume}/>
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
}
`
