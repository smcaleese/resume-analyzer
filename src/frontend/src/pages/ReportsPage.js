import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import YearsOfExperiencePanel from '../components/YearsOfExperiencePanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import SkillFrequenciesTable from '../components/report-components/SkillFrequenciesTable'
import SkillFrequenciesBarChart from '../components/report-components/SkillFrequenciesBarChart'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { AppContext } from '../App'

const ReportsPage = ({ className }) => {
    const [inputText, setInputText] = useState('')
    const { appState, dispatch } = useContext(AppContext)

    const localUrl = 'http://localhost:8000'
    // const serverUrl = 'https://fourth-year-project-api.herokuapp.com'
    useEffect(() => {
        if (!appState.resultsData) {
            fetch(`${localUrl}/report-data`)
                .then(res => res.json())
                .then(data => {
                    console.log('data:', data)
                    dispatch({ type: 'SET_RESULTS_DATA', payload: data })
                })
        }
    }, [appState])

    if (!appState.resultsData) {
        return null
    }

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
                        <YearsOfExperiencePanel />
                    </Col>
                    <Col xl={6}>
                        <SkillFrequenciesTable />
                    </Col>
                </Row>
                <Row>
                    <div>
                        <SkillFrequenciesBarChart />
                    </div>
                </Row>
                <Row>

                </Row>
            </Container>
        </div>
    )
}

export default styled(ReportsPage)`
    margin: 0 20px 0 110px;

    .row {
        margin: 15px;
    }
`
