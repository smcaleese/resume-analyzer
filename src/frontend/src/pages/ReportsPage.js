import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import ReportBarChart from '../components/report-components/ReportBarChart'
import SkillFrequenciesTable from '../components/report-components/SkillFrequenciesTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { AppContext } from '../App'
import {apiUrl} from '../config.js'

const allReports = [
    {
        title: 'job post years of experience required bar chart',
        component: (
            <ReportBarChart 
                header='Job post years of experience requirements'
                dataKey='years_of_experience_counts'
                sorted={false}
            />
        ),
        width: 1,
    },
    {
        title: 'job post skill frequencies table',
        component: <SkillFrequenciesTable />,
        width: 1,
    },
    {
        title: 'job post locations bar chart',
        component: (
            <ReportBarChart 
                header='Job post locations' 
                dataKey='location_counts'
                sorted={true}
            />
        ),
        width: 1,
    },
    {
        title: 'job post skill frequencies distribution bar chart',
        component: (
            <ReportBarChart 
                header='Job post skill frequencies' 
                dataKey='skill_counts'
                sorted={true}
            />
        ),
        width: 1,
    },
    {
        title: 'job post soft skills bar chart',
        component: (
            <ReportBarChart 
                header='Job post soft skill frequencies' 
                dataKey='soft_skill_counts'
                sorted={true}
            />
        ),
        width: 1,
    }
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

    .input-box {
        padding: 1rem;
        font-size: 1.2rem;
    }

    .row {
        padding: 20px;
    }
`
