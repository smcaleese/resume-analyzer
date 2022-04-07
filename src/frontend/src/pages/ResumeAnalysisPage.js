import React, { useEffect, useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import YearsOfExperiencePanel from '../components/report-components/YearsOfExperienceBarChart'
import ResumeScorePanel from '../components/ResumeScorePanel'
import { Container, Col, Row, Card } from 'react-bootstrap'
import classnames from 'classnames'
import { AppContext } from '../App'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

const NoResumePage = ({ className }) => (
    <div className={classnames(className, 'center')}>
        <div className='no-resume-page center'>
            <h1>No resume uploaded</h1>
        </div>
    </div>
)

const StyledNoResumePage = styled(NoResumePage)`
    margin: 0px 10px 0px 110px;

    .no-resume-page {
        background-color: white;
        border-radius: 10px;
        padding: 1rem;
        margin: 2rem;
        font-size: 1.5rem;
        width: 20rem;
    }

    .no-resume-page h1 {
        margin: 0;
        font-size: 1.5rem;
    }
`

const FileDisplayPage = ({ className }) => {
    const {appState} = useContext(AppContext)

    if (!appState.resume) {
        return <StyledNoResumePage />
    }

    const layouts = {
        lg: [
            {i: 'skills', x: 0, y: 0, w: 4, h: 15},
            {i: 'skill-frequencies', x: 0, y: 1, w: 4, h: 38},
            {i: 'score-panel', x: 4, y: 0, w: 4, h: 40},
            {i: 'pdf-viewer', x: 8, y: 0, w: 4, h: 60},
            {i: 'matching-jobs', x: 0, y: 2, w: 8, h: 52},
        ], 
        md: [
            {i: 'skills', x: 0, y: 0, w: 3, h: 15},
            {i: 'skill-frequencies', x: 3, y: 0, w: 3, h: 38},
            {i: 'score-panel', x: 4, y: 0, w: 4, h: 40},
            {i: 'pdf-viewer', x: 3, y: 2, w: 3, h: 44},
            {i: 'matching-jobs', x: 0, y: 2, w: 3, h: 26},
        ],
        sm: [
            {i: 'skills', x: 0, y: 0, w: 2, h: 12},
            {i: 'skill-frequencies', x: 0, y: 1, w: 2, h: 38},
            {i: 'score-panel', x: 4, y: 0, w: 4, h: 40},
            {i: 'pdf-viewer', x: 0, y: 2, w: 2, h: 70},
            {i: 'matching-jobs', x: 0, y: 6, w: 2, h: 50},
        ],
        xs: [
            {i: 'skills', x: 0, y: 0, w: 2, h: 25},
            {i: 'skill-frequencies', x: 0, y: 1, w: 2, h: 42},
            {i: 'score-panel', x: 4, y: 0, w: 4, h: 40},
            {i: 'pdf-viewer', x: 0, y: 2, w: 2, h: 30},
            {i: 'matching-jobs', x: 0, y: 6, w: 2, h: 50},
        ]
    }

    return (
        <ResponsiveGridLayout
            className={className}
            layouts={layouts}
            rowHeight={10}
            breakpoints={{ lg: 1200, md: 1000, sm: 800, xs: 600 }}
            cols={{ lg: 12, md: 6, sm: 2, xs: 2 }}
            style={{ height: '100vh' }}
            draggableHandle='.draggable-handle'
        >
            <div key='skills'>
                <SkillsDisplayPanel />
            </div>
            <div key='skill-frequencies'>
                <SkillFrequenciesPanel />
            </div>
            <div key='score-panel'>
                <ResumeScorePanel />
            </div>
            <div key='pdf-viewer'>
                <PDFPageViewer />
            </div>
            <div key='matching-jobs'>
                <JobsDisplayPanel />
            </div>
        </ResponsiveGridLayout>
    )
}

const StyledFileDisplayPage = styled(FileDisplayPage)`
    margin: 0px 10px 0px 110px;

    .react-grid-layout {
        margin: 0;
    }

    .skillFreqPanel {
        padding-right: 0;
        margin-bottom: 10px;
    }

    .card-heading {
        cursor: move;
    }
`

export default StyledFileDisplayPage
