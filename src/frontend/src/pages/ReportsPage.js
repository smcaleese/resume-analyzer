import React, { useState } from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import YearsOfExperiencePanel from '../components/YearsOfExperiencePanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap'

const ReportsPage = ({ className }) => {
    const [inputText, setInputText] = useState('')

    return (
        <div className={className}>
            <Container fluid>
                <Row>
                    <InputGroup className='mb-3'>
                        <FormControl className='input-box shadow-none' placeholder='Search for reports'
                            value={inputText} onChange={(e) => setInputText(e.target.value)} />
                        <Button variant='dark'>Search</Button>
                    </InputGroup>
                </Row>
                <Row>
                    <Col xl={6}>
                        <SkillFrequenciesPanel />
                    </Col>
                    <Col xl={6}>
                        <YearsOfExperiencePanel />
                    </Col>
                </Row>
                {/* <Row> </Row> */}
            </Container>
        </div>
    )
}

export default styled(ReportsPage)`
    margin: 0 20px 0 110px;
`
