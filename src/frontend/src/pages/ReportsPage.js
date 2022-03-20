import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import YearsOfExperiencePanel from '../components/report-components/YearsOfExperienceBarChart'
import SkillFrequenciesTable from '../components/report-components/SkillFrequenciesTable'
import SkillFrequenciesBarChart from '../components/report-components/SkillFrequenciesBarChart'
import LocationsBarChart from '../components/report-components/LocationsBarChart'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { AppContext } from '../App'

const allReports = [
    {
        title: 'experience distribution bar chart',
        component: <YearsOfExperiencePanel />
    },
    {
        title: 'skill frequencies table',
        component: <SkillFrequenciesTable />
    },
    {
        title: 'skill frequencies bar chart',
        component: <SkillFrequenciesBarChart />
    },
    {
        title: 'job post locations bar chart',
        component: <LocationsBarChart />
    },
]

const ReportsPage = ({ className }) => {
    const [inputText, setInputText] = useState('')
    const { appState, dispatch } = useContext(AppContext)
    const [reports, setReports] = useState(allReports)

    const localUrl = 'http://localhost:8000'
    useEffect(() => {
        if (!appState.reportsData) {
            fetch(`${localUrl}/report-data`)
                .then(res => res.json())
                .then(data => {
                    dispatch({ type: 'SET_REPORTS_DATA', payload: data })
                })
        }
    }, [appState])

    const filterReports = (text) => {
        setInputText(text)
        const filteredReports = allReports.filter((report) => {
            return report.title.toLowerCase().includes(text.toLowerCase())
        })
        setReports(filteredReports)
    }

    if(!appState.reportsData) {
        return null
    }

    return (
        <div className={className}>
            <Container fluid>
                <Row>
                    <InputGroup className='mb-3'>
                        <FormControl className='input-box shadow-none' placeholder='Search for reports'
                            value={inputText} onChange={(e) => filterReports(e.target.value)} />
                        <Button variant='dark'>Search</Button>
                    </InputGroup>
                </Row>
                {reports.map((report, index) => {
                    return (
                        <Row key={index}>
                            {report.component}
                        </Row>
                    ) 
                })}
            </Container>
        </div>
    )
}

export default styled(ReportsPage)`
    margin: 0 20px 0 110px;

    .row {
        padding: 10px;
    }
`
