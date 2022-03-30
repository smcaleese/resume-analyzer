import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import YearsOfExperiencePanel from '../components/report-components/YearsOfExperienceBarChart'
import SkillFrequenciesTable from '../components/report-components/SkillFrequenciesTable'
import SkillFrequenciesBarChart from '../components/report-components/SkillFrequenciesBarChart'
import LoadingSpinner from '../components/LoadingSpinner'
import LocationsBarChart from '../components/report-components/LocationsBarChart'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { AppContext } from '../App'
import {apiUrl} from '../config.js'

const allReports = [
    {
        title: 'years of experience required bar chart',
        component: <YearsOfExperiencePanel />,
        width: 1,
    },
    {
        title: 'job post skill frequencies table',
        component: <SkillFrequenciesTable />,
        width: 1,
    },
    {
        title: 'job post locations bar chart',
        component: <LocationsBarChart />,
        width: 1,
    },
    {
        title: 'job post skill frequencies distribution bar chart',
        component: <SkillFrequenciesBarChart />,
        width: 2,
    },
]

const ReportsPage = ({ className }) => {
    const [inputText, setInputText] = useState('')
    const { appState, dispatch } = useContext(AppContext)
    const [reports, setReports] = useState(allReports)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!appState.reportsData) {
            setLoading(true)
            fetch(`${apiUrl}/report-data`)
                .then(res => res.json())
                .then(data => {
                    dispatch({ type: 'SET_REPORTS_DATA', payload: data })
                })
        } else {
            setLoading(false)
        }
    })

    if(loading) {
        return <LoadingSpinner />
    }

    const filterReports = (text) => {
        setInputText(text)
        const filteredReports = allReports.filter((report) =>
            report.title.toLowerCase().includes(text.toLowerCase()))
        setReports(filteredReports)
    }

    const reportRows = reports.reduce((acc, report, index) => {
        if (report.width === 1) {
            if (acc[acc.length - 1].length === 2) {
                acc.push([])
            }
            acc[acc.length - 1].push(report)
        }
        if (report.width === 2) {
            if (acc[acc.length - 1].length) {
                acc.push([])
            }
            acc[acc.length - 1].push(report)
            acc.push([])
        }
        return acc

    }, [[]])

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
                {reportRows.map((reportRow, index) => {
                    if (reportRow.length === 1 && reportRow[0].width == 2) {
                        return (
                            <Row key={index}>
                                <Col xxl={12}>
                                    { reportRow[0] ? reportRow[0].component : null }
                                </Col>
                            </Row>
                        )
                    }
                    return (
                        <Row key={index}>
                            <Col xxl={6}>
                                { reportRow[0] ? reportRow[0].component : null }
                            </Col>
                            <Col xxl={6}>
                                { reportRow[1] ? reportRow[1].component : null }
                            </Col>
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
        padding: 20px;
    }
`
