import React, { useContext } from 'react'
import styled from 'styled-components'
import PDFPageViewer from '../components/PDFPageViewer'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'
import SkillFrequenciesPanel from '../components/SkillFrequenciesPanel'
import JobsDisplayPanel from '../components/JobsDisplayPanel'
import ResumeScorePanel from '../components/ResumeScorePanel'
import classnames from 'classnames'
import { AppContext } from '../App'
import { Responsive, WidthProvider } from 'react-grid-layout'
import RecommendationsPanel from '../components/RecommendationsPanel'

const ResponsiveGridLayout = WidthProvider(Responsive)

const NoResumePage = ({ className }) => (
    <div className={classnames(className, 'center')}>
        <div className='no-resume-page center'>
            <h1>No resume uploaded</h1>
        </div>
    </div>
)

const StyledNoResumePage = styled(NoResumePage)`
    height: 50vh;
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
    const { appState } = useContext(AppContext)

    if (!appState.resume) {
        return <StyledNoResumePage />
    }

    // width in columns and height in rowHeight
    const layouts = {
        lg: [
            {i: 'skills', x: 0, y: 0, w: 4, h: 14},
            {i: 'skill-frequencies', x: 0, y: 1, w: 4, h: 38},
            {i: 'score-panel', x: 4, y: 0, w: 4, h: 32},
            {i: 'recommendations-panel', x: 4, y: 0, w: 4, h: 20.5},
            {i: 'pdf-viewer', x: 8, y: 0, w: 4, h: 60},
            {i: 'matching-jobs', x: 0, y: 52, w: 8, h: 42},
        ], 
        md: [
            {i: 'skills', x: 0, y: 0, w: 3, h: 15},
            {i: 'skill-frequencies', x: 3, y: 0, w: 3, h: 38},
            {i: 'score-panel', x: 0, y: 0, w: 3, h: 32},
            {i: 'recommendations-panel', x: 3, y: 0, w: 3, h: 20.5},
            {i: 'pdf-viewer', x: 0, y: 0, w: 3, h: 45},
            {i: 'matching-jobs', x: 3, y: 0, w: 3, h: 42},
        ],
        sm: [
            {i: 'skills', x: 0, y: 0, w: 2, h: 14},
            {i: 'skill-frequencies', x: 0, y: 14, w: 2, h: 40},
            {i: 'score-panel', x: 0, y: 52, w: 2, h: 32},
            {i: 'recommendations-panel', x: 0, y: 86, w: 4, h: 20.5},
            {i: 'matching-jobs', x: 0, y: 100, w: 2, h: 50},
            {i: 'pdf-viewer', x: 0, y: 150, w: 2, h: 70},
        ]
    }

    return (
        <ResponsiveGridLayout
            className={className}
            layouts={layouts}
            rowHeight={10}
            breakpoints={{ lg: 1400, md: 1000, sm: 800 }}
            cols={{ lg: 12, md: 6, sm: 2 }}
            autoSize={true}
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
            <div key='recommendations-panel'>
                <RecommendationsPanel />
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

    .card-heading {
        cursor: move;
    }
`

export default StyledFileDisplayPage
